# Sidebar Overflow Fix

## 1. What I was asked to fix

The sidebar's navigation list was taller than the viewport. Because the sidebar
was not height-constrained, the whole page stretched: the user header scrolled
off the top, the profile footer fell below the fold, and a single long
unbroken label threatened horizontal page overflow at every viewport size.
The fix had to stop the overflow without redesigning the sidebar.

## 2. What I changed

I constrained the sidebar to the viewport with `fixed inset-y-0 left-0 ... flex
flex-col overflow-x-hidden`, pinned the header and footer with `shrink-0`, and
confined scrolling to the nav region alone (`flex-1 min-h-0 overflow-y-auto
overscroll-contain`). Long labels wrap with `break-words` so nothing forces a
horizontal scrollbar. On small screens (`lg` breakpoint and below) the sidebar
becomes a closable full-height overlay behind a backdrop, with a labeled close
button, Escape-key dismissal, focus returning to the toggle, and `aria-expanded`
state. The main content scrolls independently and reserves space with `lg:pl-72`.

Files: `src/AfterSidebar.jsx` (the fix and buggy baseline via `?view=before`),
`src/BuggySidebar`, `src/Content.jsx`, `src/App.jsx`, `src/navData.js`.

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

- **after / short viewport (1280×520):** header + footer fully visible, footer flush
  with the bottom (`footerBottomIsAtViewportBottom: 0`), nav scrolls
  (`navScrolls: true`), no horizontal overflow.
- **after / short viewport, nav scrolled to bottom:** header and footer stay pinned
  (`headerWithinViewportAfterScroll` / `footerWithinViewportAfterScroll: true`).
- **before / short viewport (1280×520):** footer sits below the fold
  (`footerWithinViewport: false`, `footerBottomIsAtViewportBottom: -186`) and the nav
  is not scrollable, so the whole page had to scroll.
- **after / desktop (1440×900):** 288 px sidebar, header + footer pinned, no
  horizontal overflow.
- **after / mobile (390×844):** "Open menu" opens the overlay drawer
  (`drawerVisible: true`), Escape and backdrop both dismiss it.
- **before / desktop:** footer ~190 px off the bottom of the initial viewport.

Evidence: `verification/sidebar-*.png` + `verification/sidebar-check-summary.json`.

## 5. Honest disclosure

Tested: in-sidebar scrolling with pinned header/footer, the mobile drawer open
interaction, and Escape-key + backdrop dismissal. Not tested: screen-reader
announcements — the drawer is a labeled `dialog` with `aria-modal`, focus moves
into and out of it correctly, but no automated accessibility audit was run.