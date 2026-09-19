import { useState, useEffect } from 'react'
import { BRAND, navGroups } from './navData'
import Content from './Content'

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'

function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false
    const saved = window.localStorage.getItem('sidebar-theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    window.localStorage.setItem('sidebar-theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <button
      type="button"
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={dark}
      title="Toggle theme"
      onClick={() => setDark((v) => !v)}
      className={`${focusRing} grid place-items-center rounded-md p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200`}
    >
      {dark ? (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}

function MenuIcon({ step }) {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {step === 'full' ? (
        <path d="M18 6 6 18M6 6l12 12" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  )
}

function SearchBox() {
  return (
    <div className="relative">
      <svg
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        type="search"
        placeholder="Search metrics, orders, users..."
        aria-label="Search metrics, orders, users"
        className="w-52 rounded-lg border border-gray-200 bg-gray-50 py-1.5 pl-9 pr-14 text-sm text-gray-700 outline-none transition-colors placeholder:text-gray-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 xl:w-72 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-indigo-500 dark:focus:bg-slate-800 dark:focus:ring-indigo-500/20"
      />
      <kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-gray-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-gray-400 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-400">
        ⌘K
      </kbd>
    </div>
  )
}

export function BuggySidebar() {
  return (
    <>
      <aside className="flex w-72 flex-col border-r border-gray-200 bg-white">
        <nav className="overflow-visible px-3 py-4">
          <ul className="space-y-1">
            {navGroups.map((group) => (
              <li key={group.label}>
                <p className="px-3 pb-1 pt-4 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  {group.label}
                </p>
                <ul className="space-y-1">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <a
                        href="#"
                        className={
                          'flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700' +
                          (item.active ? ' bg-indigo-50 text-indigo-700' : '')
                        }
                      >
                        <span className="grid w-5 shrink-0 place-items-center" aria-hidden="true">
                          {item.icon}
                        </span>
                        <span className="truncate">{item.label}</span>
                        {item.badge ? (
                          <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                            {item.badge}
                          </span>
                        ) : null}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>

        <footer className="border-t border-gray-100 p-3">
          <div className="flex items-center gap-3 px-1 py-1">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
              AM
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-gray-900">Alex Morgan</p>
              <p className="truncate text-xs text-gray-500">Product Designer</p>
            </div>
          </div>
        </footer>
      </aside>

      <main className="min-w-0 flex-1">
        <Content />
      </main>
    </>
  )
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileStep, setMobileStep] = useState('closed')
  const mobileOpen = mobileStep !== 'closed'

  useEffect(() => {
    if (mobileOpen) {
      const handleKey = (e) => {
        if (e.key === 'Escape') setMobileStep('closed')
      }
      document.addEventListener('keydown', handleKey)
      return () => document.removeEventListener('keydown', handleKey)
    }
  }, [mobileOpen])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const cycleMobile = () =>
    setMobileStep((prev) => (prev === 'closed' ? 'half' : prev === 'half' ? 'full' : 'closed'))

  const base = collapsed ? 'lg:w-20' : 'lg:w-72'
  const mobileWidth = mobileStep === 'half' ? 'w-1/2' : mobileStep === 'full' ? 'w-full' : 'w-72'
  const mobileTransform = mobileOpen ? 'translate-x-0 visible' : '-translate-x-full invisible'

  return (
    <>
      <header
        id="appHeader"
        className="fixed inset-x-0 top-0 z-50 flex h-16 items-center gap-3 border-b border-gray-200 bg-white px-4 shadow-sm dark:border-slate-700 dark:bg-slate-800"
      >
        <button
          type="button"
          id="openSidebar"
          aria-controls="appSidebar"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close sidebar menu' : 'Open sidebar menu'}
          className={`${focusRing} grid place-items-center rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 lg:hidden dark:text-slate-200 dark:hover:bg-slate-700`}
          onClick={cycleMobile}
        >
          <MenuIcon step={mobileStep} />
        </button>

        <div className="flex min-w-0 items-center gap-2">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-indigo-600 text-sm font-bold text-white" aria-hidden="true">
            N
          </div>
          <span className="truncate text-sm font-semibold text-gray-900 dark:text-white">{BRAND}</span>
          <svg className="h-4 w-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>

        <div className="ml-auto hidden items-center gap-2 sm:flex">
          <SearchBox />
          <button
            type="button"
            className={`${focusRing} hidden items-center gap-1 rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500 md:inline-flex`}
          >
            <span aria-hidden="true">+</span> New
          </button>
          <button
            type="button"
            aria-label="Notifications, 3 unread"
            className={`${focusRing} relative rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:hover:bg-slate-700 dark:text-slate-400`}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
            <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold text-white" aria-hidden="true">
              3
            </span>
          </button>
          <ThemeToggle />
          <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500" aria-label="Alex Morgan" aria-hidden="true" />
        </div>
      </header>

      <div
        className={`fixed bottom-0 left-0 right-0 top-16 z-30 bg-slate-900/40 transition-opacity duration-300 lg:hidden ${
          mobileOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        id="backdrop"
        aria-hidden="true"
        onClick={() => setMobileStep('closed')}
      />

      <aside
        id="appSidebar"
        aria-label="Sidebar"
        tabIndex={-1}
        className={`fixed bottom-0 left-0 top-16 z-40 flex flex-col overflow-x-hidden border-r border-gray-200 bg-white shadow-xl transition-[transform,width,visibility] duration-300 ease-in-out dark:border-slate-700 dark:bg-slate-900 ${mobileWidth} ${base} ${mobileTransform} lg:translate-x-0 lg:visible`}
      >
        <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-4" aria-label="Primary">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p
                className={`px-3 pb-1 pt-4 text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-slate-500 ${
                  collapsed ? 'lg:hidden' : ''
                }`}
              >
                {group.label}
              </p>
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href="#"
                      title={item.label}
                      className={`relative flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-800 ${
                        collapsed ? 'lg:justify-center lg:px-0' : ''
                      }${item.active ? ' bg-indigo-50 text-indigo-700 hover:bg-indigo-50 dark:bg-indigo-500/20 dark:text-indigo-300 dark:hover:bg-indigo-500/20' : ''}`}
                    >
                      <span className="grid w-5 shrink-0 place-items-center text-base" aria-hidden="true">
                        {item.icon}
                      </span>
                      <span className={`truncate ${collapsed ? 'lg:hidden' : ''}`}>{item.label}</span>
                      {item.badge ? (
                        <span
                          className={`ml-auto shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-700 dark:text-slate-300 ${
                            collapsed ? 'lg:hidden' : ''
                          }`}
                        >
                          {item.badge}
                        </span>
                      ) : null}
                      {item.active ? (
                        <span
                          className={`ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500 ${
                            collapsed ? 'lg:absolute lg:right-2 lg:ml-0' : ''
                          }`}
                          aria-hidden="true"
                        />
                      ) : null}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <footer className="shrink-0 border-t border-gray-100 py-2 dark:border-slate-700">
          <div className={`flex items-center gap-3 px-3 py-2 ${collapsed ? 'lg:justify-center lg:px-0' : ''}`}>
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
              AM
            </div>
            <div className={`min-w-0 ${collapsed ? 'lg:hidden' : ''}`}>
              <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Alex Morgan</p>
              <p className="truncate text-xs text-gray-500 dark:text-slate-400">Product Designer</p>
            </div>
          </div>
          <button
            type="button"
            id="collapseSidebar"
            aria-expanded={!collapsed}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            onClick={() => setCollapsed((v) => !v)}
            className={`${focusRing} flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-800 ${
              collapsed ? 'lg:justify-center lg:px-0' : ''
            }`}
          >
            <svg
              className="h-5 w-5 shrink-0 transition-transform duration-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {collapsed ? <path d="m15 18-6-6 6-6" /> : <path d="m9 18 6-6-6-6" />}
            </svg>
            <span className={`truncate ${collapsed ? 'lg:hidden' : ''}`}>
              {collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            </span>
          </button>
        </footer>
      </aside>

      <main
        className={`flex min-h-screen flex-col pt-16 bg-gray-50 transition-[padding] duration-300 dark:bg-slate-950 ${
          collapsed ? 'lg:pl-20' : 'lg:pl-72'
        }`}
      >
        <Content />
      </main>
    </>
  )
}