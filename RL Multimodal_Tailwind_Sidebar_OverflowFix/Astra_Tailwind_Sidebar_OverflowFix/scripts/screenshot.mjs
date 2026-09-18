import { spawn } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright'

const PORT = 4011
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

const server = spawn(
  'npx',
  ['vite', 'preview', '--port', String(PORT), '--strictPort', '--host', '127.0.0.1'],
  { stdio: 'ignore' },
)

const results = []

let page

const layoutCheck = async (url, viewport) => {
  await page.setViewportSize(viewport)
  await page.goto(url, { waitUntil: 'networkidle' })
  return page.evaluate(() => {
    const aside = document.querySelector('aside')
    const footer = aside?.querySelector('footer')
    const header = aside?.querySelector('header')
    const nav = aside?.querySelector('nav')
    const fb = footer?.getBoundingClientRect()
    const hb = header?.getBoundingClientRect()
    return {
      asideWidth: aside ? Math.round(aside.getBoundingClientRect().width) : null,
      headerWithinViewport: hb && hb.top >= 0 && hb.bottom <= window.innerHeight,
      footerWithinViewport: fb && fb.top >= 0 && fb.bottom <= window.innerHeight,
      footerBottomIsAtViewportBottom: fb ? Math.round(window.innerHeight - fb.bottom) : null,
      navScrolls: nav ? nav.scrollHeight > nav.clientHeight : null,
      navScrollableClassApplied: nav ? getComputedStyle(nav).overflowY === 'auto' : null,
      pageOverflowsHorizontally: document.documentElement.scrollWidth > window.innerWidth,
    }
  })
}

const overlayCheck = async (url, viewport) => {
  await page.setViewportSize(viewport)
  await page.goto(url, { waitUntil: 'networkidle' })
  return page.evaluate(() => {
    const header = document.querySelector('header')
    const main = document.querySelector('main')
    const hb = header?.getBoundingClientRect()
    const firstH = main?.querySelector('h1')
    const firstTop = firstH ? firstH.getBoundingClientRect().top : null
    return {
      headerHeight: hb?.height ?? null,
      headerAtTop: hb ? hb.top === 0 : null,
      firstHeadingTop: firstTop !== null ? Math.round(firstTop) : null,
      overlapsHero: firstTop !== null && firstTop < (hb?.height ?? 0),
      bodyScrollWidthPaintWidth: document.body.scrollWidth > window.innerWidth,
    }
  })
}

try {
  await waitForServer(BASE, 30000)
  await mkdir(OUT, { recursive: true })

  const browser = await chromium.launch()
  page = await browser.newPage()

  // After, desktop
  results.push({ shot: 'after-desktop', ...(await layoutCheck(`${BASE}/`, { width: 1440, height: 900 })) })
  await page.screenshot({ path: `${OUT}/sidebar-after-desktop.png` })

  // Before, desktop (query param)
  results.push({ shot: 'before-desktop', ...(await layoutCheck(`${BASE}/?view=before`, { width: 1440, height: 900 })) })
  await page.screenshot({ path: `${OUT}/sidebar-before-desktop.png` })

  // After, short viewport
  results.push({ shot: 'after-short-viewport', ...(await layoutCheck(`${BASE}/`, { width: 1280, height: 520 })) })
  await page.screenshot({ path: `${OUT}/sidebar-after-short-viewport.png` })

  // After short viewport, scroll nav to bottom -> footer stays pinned
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' })
  await page.evaluate(() => {
    const nav = document.querySelector('aside nav')
    nav.scrollTop = nav.scrollHeight
  })
  await page.waitForTimeout(150)
  await page.screenshot({ path: `${OUT}/sidebar-after-short-viewport-scrolled.png` })
  const scrolled = await page.evaluate(() => {
    const footer = document.querySelector('aside footer')
    const header = document.querySelector('aside header')
    const fb = footer.getBoundingClientRect()
    const hb = header.getBoundingClientRect()
    return {
      headerWithinViewportAfterScroll: hb.top >= 0 && hb.bottom <= window.innerHeight,
      footerWithinViewportAfterScroll: fb.top >= 0 && fb.bottom <= window.innerHeight,
    }
  })
  results.push({ shot: 'after-short-viewport-scrolled', ...scrolled })

  // Before, short viewport (query param)
  results.push({ shot: 'before-short-viewport', ...(await layoutCheck(`${BASE}/?view=before`, { width: 1280, height: 520 })) })
  await page.screenshot({ path: `${OUT}/sidebar-before-short-viewport.png` })

  // After, mobile with drawer open
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(200)
  await page.evaluate(() => document.getElementById('openSidebar').click())
  await page.waitForTimeout(200)
  const drawerShown = await page.evaluate(() =>
    document.getElementById('mobileSidebar').classList.contains('flex'),
  )
  await page.screenshot({ path: `${OUT}/sidebar-after-mobile-drawer-open.png` })

  const escClosed = await page.evaluate(async () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await new Promise((r) => setTimeout(r, 100))
    return !document.getElementById('mobileSidebar').classList.contains('flex')
  })

  await page.evaluate(() => document.getElementById('openSidebar').click())
  await page.waitForTimeout(100)
  const backdropClosed = await page.evaluate(async () => {
    document.getElementById('backdrop').click()
    await new Promise((r) => setTimeout(r, 100))
    return !document.getElementById('mobileSidebar').classList.contains('flex')
  })

  results.push({
    shot: 'after-mobile-drawer-open',
    drawerVisible: drawerShown,
    escapeClosesDrawer: escClosed,
    backdropClosesDrawer: backdropClosed,
  })

  await page.close()
  await browser.close()
} finally {
  server.kill()
}

await mkdir(OUT, { recursive: true })
await writeFile(`${OUT}/sidebar-check-summary.json`, JSON.stringify(results, null, 2))
console.log(JSON.stringify(results, null, 2))