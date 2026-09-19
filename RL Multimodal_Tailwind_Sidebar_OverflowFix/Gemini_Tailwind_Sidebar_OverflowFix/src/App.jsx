import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import Dashboard from './Dashboard'

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600'

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
        className="w-48 rounded-lg border border-gray-200 bg-gray-50 py-1.5 pl-9 pr-12 text-sm text-gray-700 outline-none transition-colors placeholder:text-gray-400 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100 md:w-64 xl:w-72 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:border-emerald-500 dark:focus:bg-slate-800 dark:focus:ring-emerald-500/20"
      />
      <kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-gray-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-gray-400 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-400">
        ⌘K
      </kbd>
    </div>
  )
}

function ThemeToggle({ dark, onToggle }) {
  return (
    <button
      type="button"
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={dark}
      title="Toggle theme"
      onClick={onToggle}
      className={`${focusRing} grid place-items-center rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200`}
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

export default function App() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false
    const saved = window.localStorage.getItem('nexus-theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    window.localStorage.setItem('nexus-theme', dark ? 'dark' : 'light')
  }, [dark])

  const gutter = collapsed ? 'lg:pl-[84px]' : 'lg:pl-[280px]'

  return (
    <>
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((v) => !v)}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <main
        className={`min-h-screen bg-gray-50 transition-[padding] duration-200 ease-in-out dark:bg-slate-950 ${gutter}`}
      >
        <header
          className={`sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-gray-200 bg-white/80 px-4 backdrop-blur transition-[padding] duration-200 ease-in-out dark:border-slate-800 dark:bg-slate-900/80 ${gutter}`}
        >
          <button
            type="button"
            className={`${focusRing} rounded-lg border border-gray-200 p-2 text-gray-600 transition-colors hover:bg-gray-100 lg:hidden dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800`}
            onClick={() => setMobileOpen(true)}
            aria-label="Open sidebar"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex min-w-0 items-center gap-2 lg:hidden">
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-emerald-500 text-sm font-bold text-slate-900" aria-hidden="true">
              N
            </div>
            <span className="truncate text-sm font-semibold text-gray-900 dark:text-white">
              Nexus Studio
            </span>
          </div>

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <SearchBox />
            <button
              type="button"
              className={`${focusRing} hidden items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-emerald-500 md:inline-flex`}
            >
              <span aria-hidden="true">+</span> New
            </button>
            <button
              type="button"
              aria-label="Notifications, 3 unread"
              className={`${focusRing} relative rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-slate-800`}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold text-white" aria-hidden="true">
                3
              </span>
            </button>
            <ThemeToggle dark={dark} onToggle={() => setDark((v) => !v)} />
            <div
              className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 ring-2 ring-white dark:ring-slate-900"
              aria-label="Alex Morgan"
              aria-hidden="true"
            />
          </div>
        </header>

        <Dashboard />
      </main>
    </>
  )
}