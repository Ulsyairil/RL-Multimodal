import { spawn } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright'

const PORT = 4010
const BASE = `http://127.0.0.1:${PORT}`
const OUT = 'verification'

function waitForServer(url, timeoutMs) {
  const start = Date.now()
  return new Promise((resolve, reject) => {
    const tick = async () => {
      try {
        const res = await fetch(url)
        if (res.ok) return resolve()
      } catch {
        /* not up yet */
      }
      if (Date.now() - start > timeoutMs) return reject(new Error('server timeout'))
      setTimeout(tick, 300)
    }
    tick()
  })
}

const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort', '--host', '127.0.0.1'], {
  stdio: 'ignore',
})

const results = []

try {
  await waitForServer(BASE, 30000)
  await mkdir(OUT, { recursive: true })

  const browser = await chromium.launch()
  const page = await browser.newPage()

  const overlayCheck = async (url, viewport) => {
    await page.setViewportSize(viewport)
    await page.goto(url, { waitUntil: 'networkidle' })
    return page.evaluate(() => {
      const main = document.querySelector('main')
      const header = document.querySelector('header')
      if (!header) return { error: 'no header' }
      const hb = header.getBoundingClientRect()
      const firstH = main?.querySelector('h1')
      const firstTop = firstH ? firstH.getBoundingClientRect().top : null
      return {
        headerHeight: hb.height,
        headerAtTop: hb.top === 0,
        firstHeadingTop: firstTop !== null ? Math.round(firstTop) : null,
        overlapsHero: firstTop !== null && firstTop < hb.height,
        bodyScrollWidthPaintWidth: document.body.scrollWidth > window.innerWidth,
      }
    })
  }

  // After, desktop
  results.push({ shot: 'after-desktop', ...(await overlayCheck(`${BASE}/`, { width: 1440, height: 900 })) })
  await page.screenshot({ path: `${OUT}/navbar-after-desktop.png` })

  // Before, desktop
  results.push({ shot: 'before-desktop', ...(await overlayCheck(`${BASE}/?view=before`, { width: 1440, height: 900 })) })
  await page.screenshot({ path: `${OUT}/navbar-before-desktop.png` })

  // After, mobile
  results.push({ shot: 'after-mobile', ...(await overlayCheck(`${BASE}/`, { width: 390, height: 844 })) })
  await page.screenshot({ path: `${OUT}/navbar-after-mobile.png` })

  // After, mobile with menu open
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' })
  await page.click('button[aria-label="Toggle navigation menu"]')
  await page.waitForTimeout(150)
  await page.screenshot({ path: `${OUT}/navbar-after-mobile-menu-open.png` })
  results.push({
    shot: 'after-mobile-menu-open',
    menuVisible: await page.locator('#mobile-menu').isVisible(),
  })

  // Before, mobile (expect horizontal overflow)
  results.push({ shot: 'before-mobile', ...(await overlayCheck(`${BASE}/?view=before`, { width: 390, height: 844 })) })
  await page.screenshot({ path: `${OUT}/navbar-before-mobile.png` })

  await page.close()
  await browser.close()
} finally {
  server.kill()
}

await mkdir(OUT, { recursive: true })
await writeFile(`${OUT}/navbar-check-summary.json`, JSON.stringify(results, null, 2))
console.log(JSON.stringify(results, null, 2))