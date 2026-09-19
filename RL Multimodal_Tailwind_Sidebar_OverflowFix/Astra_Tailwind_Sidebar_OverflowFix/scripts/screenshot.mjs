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
    const nav = aside?.querySelector('nav')
    const fb = footer?.getBoundingClientRect()
    return {
      asideWidth: aside ? Math.round(aside.getBoundingClientRect().width) : null,
      footerWithinViewport: fb && fb.top >= 0 && fb.bottom <= window.innerHeight,
      footerBottomIsAtViewportBottom: fb ? Math.round(window.innerHeight - fb.bottom) : null,
      navScrolls: nav ? nav.scrollHeight > nav.clientHeight : null,
      navScrollableClassApplied: nav ? getComputedStyle(nav).overflowY === 'auto' : null,
      pageOverflowsHorizontally: document.documentElement.scrollWidth > window.innerWidth,
    }
  })
}

const themeCheck = async () => {
  await page.evaluate(() => document.querySelector('button[aria-label*="theme"]').click())
  await page.waitForTimeout(300)
  const darkOn = await page.evaluate(() => ({
    htmlHasDark: document.documentElement.classList.contains('dark'),
    asideBg: getComputedStyle(document.querySelector('aside')).backgroundColor,
  }))
  await page.screenshot({ path: `${OUT}/sidebar-after-desktop-dark.png` })

  await page.evaluate(() => document.querySelector('button[aria-label*="theme"]').click())
  await page.waitForTimeout(300)
  const darkOff = await page.evaluate(() => !document.documentElement.classList.contains('dark'))
  return { ...darkOn, darkOff }
}

const drawerState = () =>
  page.evaluate(() => {
    const aside = document.getElementById('appSidebar')
    const btn = document.getElementById('openSidebar')
    const collapse = document.getElementById('collapseSidebar')
    const backdrop = document.getElementById('backdrop')
    const main = document.querySelector('main')
    const header = document.getElementById('appHeader')
    const r = aside ? aside.getBoundingClientRect() : null
    return {
      headerPresent: !!header,
      hamburgerExpanded: btn.getAttribute('aria-expanded'),
      collapseExpanded: collapse?.getAttribute('aria-expanded') ?? null,
      asideVisible: r ? r.right > 0 && r.left < window.innerWidth : false,
      asideWidth: r ? Math.round(r.width) : null,
      viewportWidth: window.innerWidth,
      expectedHalf: Math.round(window.innerWidth / 2),
      asideRight: r ? Math.round(r.right) : null,
      backdropOpacity: getComputedStyle(backdrop).opacity,
      mainPadLeft: Math.round(parseFloat(getComputedStyle(main).paddingLeft)),
      bodyOverflow: getComputedStyle(document.body).overflow,
    }
  })

const desktopCollapseCheck = async () => {
  const open = await drawerState()
  await page.evaluate(() => document.getElementById('collapseSidebar').click())
  await page.waitForTimeout(400)
  await page.screenshot({ path: `${OUT}/sidebar-after-desktop-collapsed.png` })
  const collapsed = await drawerState()
  await page.evaluate(() => document.getElementById('collapseSidebar').click())
  await page.waitForTimeout(400)
  const reOpened = await drawerState()
  return { desktopOpen: open, desktopCollapsed: collapsed, desktopReOpened: reOpened }
}

const mobileDrawerCheck = async () => {
  const closed = await drawerState()
  await page.evaluate(() => document.getElementById('openSidebar').click())
  await page.waitForTimeout(450)
  const half = await drawerState()
  await page.evaluate(() => document.getElementById('openSidebar').click())
  await page.waitForTimeout(450)
  const full = await drawerState()
  await page.screenshot({ path: `${OUT}/sidebar-after-mobile-drawer.png` })

  const escClosed = await page.evaluate(async () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await new Promise((r) => setTimeout(r, 450))
    return document.getElementById('appSidebar').getBoundingClientRect().right <= 0
  })

  await page.evaluate(() => document.getElementById('openSidebar').click())
  await page.waitForTimeout(450)
  const backdropClosed = await page.evaluate(async () => {
    document.getElementById('backdrop').click()
    await new Promise((r) => setTimeout(r, 450))
    return document.getElementById('appSidebar').getBoundingClientRect().right <= 0
  })

  return {
    mobileClosed: closed,
    mobileHalf: half,
    mobileFull: full,
    escapeClosesDrawer: escClosed,
    backdropClosesDrawer: backdropClosed,
  }
}

const darkMobileDrawerCheck = async () => {
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(200)
  await page.evaluate(() => document.querySelector('button[aria-label*="theme"]').click())
  await page.waitForTimeout(300)
  await page.evaluate(() => document.getElementById('openSidebar').click())
  await page.waitForTimeout(450)
  await page.screenshot({ path: `${OUT}/sidebar-after-mobile-drawer-dark.png` })
  const drawer = await page.evaluate(() => {
    const aside = document.getElementById('appSidebar')
    return {
      drawerBg: getComputedStyle(aside).backgroundColor,
      width: Math.round(aside.getBoundingClientRect().width),
      htmlHasDark: document.documentElement.classList.contains('dark'),
    }
  })
  await page.evaluate(() => document.getElementById('openSidebar').click())
  await page.waitForTimeout(450)
  await page.evaluate(() => document.querySelector('button[aria-label*="theme"]').click())
  await page.waitForTimeout(200)
  return drawer
}

try {
  await waitForServer(BASE, 30000)
  await mkdir(OUT, { recursive: true })

  const browser = await chromium.launch()
  page = await browser.newPage()

  // After, desktop (light, sidebar open at 288px)
  results.push({ shot: 'after-desktop', ...(await layoutCheck(`${BASE}/`, { width: 1440, height: 900 })) })
  await page.screenshot({ path: `${OUT}/sidebar-after-desktop.png` })

  // Theme switcher (desktop)
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' })
  results.push({ shot: 'after-theme', ...(await themeCheck()) })

  // Desktop: Collapse Sidebar button toggles 288px <-> 80px icon rail
  results.push({ shot: 'after-desktop-collapse', ...(await desktopCollapseCheck()) })

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
    const fb = footer.getBoundingClientRect()
    return {
      footerWithinViewportAfterScroll: fb.top >= 0 && fb.bottom <= window.innerHeight,
    }
  })
  results.push({ shot: 'after-short-viewport-scrolled', ...scrolled })

  // Before, short viewport (query param)
  results.push({ shot: 'before-short-viewport', ...(await layoutCheck(`${BASE}/?view=before`, { width: 1280, height: 520 })) })
  await page.screenshot({ path: `${OUT}/sidebar-before-short-viewport.png` })

  // After, mobile: hamburger cycles closed -> half -> full -> closed
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(200)
  results.push({ shot: 'after-mobile-cycle', ...(await mobileDrawerCheck()) })

  // After, mobile drawer in dark theme
  results.push({ shot: 'after-mobile-drawer-dark', ...(await darkMobileDrawerCheck()) })

  await page.close()
  await browser.close()
} finally {
  server.kill()
}

await mkdir(OUT, { recursive: true })
await writeFile(`${OUT}/sidebar-check-summary.json`, JSON.stringify(results, null, 2))
console.log(JSON.stringify(results, null, 2))