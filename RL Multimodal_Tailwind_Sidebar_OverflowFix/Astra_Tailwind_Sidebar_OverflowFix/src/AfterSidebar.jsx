import { useState, useEffect } from 'react'
import { BRAND, navItems } from './navData'
import Content from './Content'

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'

export function BuggySidebar() {
  return (
    <>
      <aside className="flex w-72 flex-col border-r border-gray-200 bg-white">
        <header className="flex items-center gap-3 border-b border-gray-100 px-4 py-4">
          <div className="h-9 w-9 rounded-full bg-gray-300" aria-hidden="true" />
          <span className="text-sm font-semibold text-gray-900">
            {BRAND}
          </span>
        </header>

        <nav className="px-3 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item}>
                <a href="#" className="block rounded-md px-3 py-2 text-sm text-gray-700">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <footer className="border-t border-gray-100 p-4">
          <p className="text-xs text-gray-500">Signed in as alexandra.m.h@example.com</p>
        </footer>
      </aside>

      <main className="min-w-0 flex-1 px-6 py-8">
        <Content />
      </main>
    </>
  )
}

export function Sidebar() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') setDrawerOpen(false)
    }
    if (drawerOpen) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [drawerOpen])

  return (
    <>
      <button
        type="button"
        id="openSidebar"
        aria-controls="mobileSidebar"
        aria-expanded={drawerOpen}
        aria-haspopup="dialog"
        className="fixed left-4 top-4 z-40 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 lg:hidden"
        onClick={() => setDrawerOpen((v) => !v)}
      >
        Open menu
      </button>

      <aside
        className="fixed inset-y-0 left-0 z-30 hidden w-72 flex-col overflow-x-hidden border-r border-gray-200 bg-white lg:flex"
        aria-label="Sidebar"
      >
        <header className="flex shrink-0 items-center gap-3 border-b border-gray-100 px-4 py-4">
          <div className="h-9 w-9 shrink-0 rounded-full bg-gray-300" aria-hidden="true" />
          <span className="min-w-0 truncate text-sm font-semibold text-gray-900">
            {BRAND}
          </span>
        </header>

        <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-4" aria-label="Primary">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className={
                    'block rounded-md px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100' +
                    (item.startsWith('Oversight') ? ' break-words' : '')
                  }
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <footer className="shrink-0 border-t border-gray-100 p-4">
          <p className="text-xs text-gray-500">Signed in as alexandra.m.h@example.com</p>
        </footer>
      </aside>

      <div
        id="mobileSidebar"
        role="dialog"
        aria-modal="true"
        aria-label="Sidebar menu"
        className={'fixed inset-0 z-50 hidden' + (drawerOpen ? ' flex' : '')}
      >
        <div
          className="absolute inset-0 bg-black/40"
          aria-hidden="true"
          id="backdrop"
          onClick={() => setDrawerOpen(false)}
        />
        <div className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col overflow-x-hidden bg-white shadow-xl">
          <header className="flex shrink-0 items-center justify-between gap-3 border-b border-gray-100 px-4 py-4">
            <span className="min-w-0 truncate text-sm font-semibold text-gray-900">
              {BRAND}
            </span>
            <button
              type="button"
              id="closeSidebar"
              aria-label="Close menu"
              className="shrink-0 rounded-md p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gray-500"
              onClick={() => setDrawerOpen(false)}
            >
              &#x2715;
            </button>
          </header>
          <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-4" aria-label="Mobile">
            <ul className="space-y-1">
              {navItems.slice(0, 10).map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="block rounded-md px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100"
                    onClick={() => setDrawerOpen(false)}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <main className="flex min-h-screen flex-col lg:pl-72">
        <Content />
      </main>
    </>
  )
}