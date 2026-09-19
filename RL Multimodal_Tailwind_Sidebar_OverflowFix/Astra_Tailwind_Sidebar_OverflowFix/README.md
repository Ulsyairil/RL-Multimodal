# Nexus Admin Dashboard — Sidebar Overflow Fix

## 1. What I was asked to fix

The sidebar's navigation list was taller than the viewport. Because the sidebar
was not height-constrained, the whole page stretched: the top of the sidebar
scrolled off, the user card and collapse control fell below the fold, and a
long unbroken label threatened horizontal page overflow at every viewport size.
The fix had to stop the overflow without redesigning the layout, while the
mobile experience lacked a usable drawer, the header had no way to switch the
app theme, and the overall design was retrofitted to the **Nexus Admin
Dashboard** reference (header with search / quick actions, grouped sidebar
menu, dashboard overview with stats, charts, and an orders table).

## 2. What I changed

The whole app now follows the reference: a full-width **top header** holds the
Nexus Studio brand, a search box with `⌘K`, a `+ New` button, a notification
bell (3 unread), the light/dark switcher, and the avatar. The sidebar is
`fixed inset-y-0` (below the header) with its `overflow-y-auto` nav region
constrained between pinned header and footer regions — the user card and the
**Collapse Sidebar** button stay visible while only the menu scrolls.

Control is two-fold:

- **Desktop (`lg` and up)** — the sidebar defaults open (288 px). The bottom
  **Collapse Sidebar** button steps it to an 80 px icon rail and back; `main`
  reclaims the space (`lg:pl-20`).
- **Mobile (below `lg`)** — a **hamburger icon** in the header steps the sidebar
  **closed → half (50 % of the viewport) → full (100 %)** on every click, over
  a backdrop that closes on click or Escape, with body scroll locked while open.

The dashboard content matches the reference: Dashboard Overview heading with a
Last-30-Days filter and Export button, three metric cards (Total Revenue,
Active Users, Conversion Rate), Revenue Analytics area chart with 7D/30D
toggle, Traffic Sources progress bars, and a Recent Orders table with status
badges and pagination. Theme switching is class-based (`@custom-variant dark`)
and persists in `localStorage`, respecting OS preference on first visit.

Files: `src/AfterSidebar.jsx` (the fix and buggy baseline via `?view=before`),
`src/BuggySidebar`, `src/Content.jsx`, `src/App.jsx`, `src/navData.js`,
`src/index.css` (class-based `dark` variant).

## 3. How to run my submission

```bash
npm install
npm run dev          # http://localhost:5173 — fixed version (default)
# http://localhost:5173/?view=before — buggy baseline for comparison
npm run build
npm run verify       # regenerates screenshot evidence + layout checks
```

## 4. My rendered verification

I verified the rendered output in headless Chromium (Playwright) — DOM
geometry, not a claimed diff:

- **after / short viewport (1280×520):** sidebar footer fully visible and flush
  with the bottom (`footerBottomIsAtViewportBottom: 0`), nav scrolls
  (`navScrolls: true`), no horizontal overflow; after scrolling the nav to the
  bottom the footer stays pinned (`footerWithinViewportAfterScroll: true`).
- **before / short viewport (1280×520):** footer sits below the fold
  (`footerWithinViewport: false`, `footerBottomIsAtViewportBottom: -122`) and the
  nav is not scrollable, so the whole page had to scroll.
- **after / desktop (1440×900):** 288 px sidebar, footer pinned flush, no
  horizontal overflow; the Collapse Sidebar button steps it to 80 px
  (`asideWidth: 80`, `mainPadLeft: 80`) and back to 288 px.
- **after / mobile (390×844):** sidebar defaults closed; the header hamburger
  steps it to half width (`asideWidth: 195 == viewport/2`), then full
  (`asideWidth: 390 == viewport`); Escape + backdrop both close it and body
  scroll is locked while open (`bodyOverflow: hidden`).
- **after / theme:** toggling the switcher adds `dark` to `<html>` and darkens
  the sidebar/header (`htmlHasDark: true`, dark background), shown in the dark
  screenshots; toggling again restores light.
- **before / desktop (1440×900):** the unconstrained sidebar ends 258 px short of
  the viewport bottom and its footer drops below the fold whenever the viewport
  is short (see the short-viewport bullet above).

Evidence: `verification/sidebar-*.png` + `verification/sidebar-check-summary.json`.

## 5. Honest disclosure

Tested: in-sidebar scrolling with pinned user-card/collapse footer, the
desktop Collapse Sidebar toggle, the mobile closed/half/full hamburger cycle,
backdrop + Escape-key dismissal, and the light/dark theme switch. Not tested:
screen-reader announcements — controls carry `aria-expanded` and the drawer is
a labeled fixed `aside`, but no automated accessibility audit was run.