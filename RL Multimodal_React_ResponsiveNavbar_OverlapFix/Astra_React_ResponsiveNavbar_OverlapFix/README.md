# React Responsive Navbar Overlap Fix

**Author:** Astra

## 1. What I was asked to fix

The request showed a fixed navigation bar colliding with page content at multiple
viewport sizes: the hero heading and intro could sit underneath the header, long
labels pushed the nav links and CTA toward the viewport edge, and small screens had
no collapsed menu. I was asked to fix the overlap without redesigning the UI.

## 2. What I changed

I constrained the header (`fixed inset-x-0 top-0 z-50 h-16`) and offset the page
content (`main` → `pt-16`) so nothing renders under the bar. The long brand now
truncates (`min-w-0 truncate`) instead of pushing links out, desktop links stay in
one row (`hidden md:flex` + `whitespace-nowrap`), and below `md` the links collapse
into a hamburger/accordion menu with `aria-label`, `aria-expanded`, and
`aria-controls`. I kept the existing sections, colors, and layout intent unchanged.

Files: `src/AfterNavbar.jsx` (the fix), `src/BeforeNavbar.jsx` (buggy baseline,
view via `?view=before`), `src/Content.jsx`, `src/App.jsx`, `src/navData.js`.

## 3. How to run my submission

```bash
npm install
npm run dev        # http://localhost:5173 — fixed version (default)
# http://localhost:5173/?view=before — buggy baseline for comparison
npm run build
npm run verify     # regenerates screenshot evidence + layout checks
```

## 4. My rendered verification

I verified the actual rendered output in headless Chromium (Playwright), not just
the diff. `firstHeadingTop` is the y-position of the hero `<h1>` and
`overlapsHero` is true when that heading sits under the header:

| Shot | Viewport | headerHeight | firstHeadingTop | overlapsHero |
| --- | --- | --- | --- | --- |
| before-desktop | 1440×900 | 57 | **0** | **true** |
| after-desktop | 1440×900 | 64 | 128 | false |
| before-mobile | 390×844 | 57 | **0** | **true** |
| after-mobile | 390×844 | 64 | 128 | false |
| after-mobile-menu-open | 390×844 | hamburger click → `menuVisible: true` | | |

Rendering confirms the heading starts cleanly below the header after the fix, and
the mobile menu opens on interaction. Evidence: `verification/navbar-*.png` +
`verification/navbar-check-summary.json`.

## 5. Honest disclosure

Tested: mobile hamburger open state and header/content overlap at desktop + mobile.
Not tested: full keyboard-only interaction flow and screen-reader announcements —
I included visible `focus-visible` outlines and ARIA attributes, but I did not run an
automated accessibility audit.