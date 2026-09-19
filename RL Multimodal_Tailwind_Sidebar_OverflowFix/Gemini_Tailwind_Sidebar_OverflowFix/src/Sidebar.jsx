import { useState, useEffect } from 'react'

export const SIDEBAR_EXPANDED = 280
export const SIDEBAR_COLLAPSED = 84

const BRAND = 'Nexus Studio'

const NAV_GROUPS = [
  {
    label: 'Main Menu',
    items: [
      { label: 'Dashboard', icon: '📊', active: true },
      { label: 'Analytics', icon: '📈' },
      { label: 'Products', icon: '📦' },
      { label: 'Customers', icon: '👥' },
      { label: 'Transactions', icon: '💳' },
      { label: 'Discounts', icon: '🏷️' },
    ],
  },
  {
    label: 'Management',
    items: [
      { label: 'Content', icon: '📝' },
      { label: 'Media Library', icon: '📁' },
      { label: 'Messages', icon: '📩', badge: 4 },
    ],
  },
  {
    label: 'System',
    items: [
      { label: 'Settings', icon: '⚙️' },
      { label: 'Help & Support', icon: '❓' },
    ],
  },
]

function BrandMark({ compact }) {
  return (
    <div
      className={`flex items-center gap-3 ${compact ? 'lg:justify-center lg:px-0' : ''}`}
    >
      <div
        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-emerald-500 text-sm font-bold text-slate-900"
        aria-hidden="true"
      >
        N
      </div>
      <div className={`min-w-0 ${compact ? 'lg:hidden' : ''}`}>
        <span className="block truncate text-sm font-semibold text-white">
          {BRAND.toUpperCase()}
        </span>
      </div>
      <svg
        className={`h-4 w-4 shrink-0 text-slate-400 ${compact ? 'lg:hidden' : ''}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  )
}

export default function Sidebar({ collapsed, onToggleCollapse, mobileOpen, onClose }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  const itemClass = (item) =>
    'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors' +
    (collapsed ? ' lg:justify-center lg:px-0' : '') +
    (item.active
      ? ' bg-emerald-500/10 font-medium text-emerald-400'
      : ' text-slate-400 hover:bg-slate-800 hover:text-white')

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-30 hidden flex-col overflow-x-hidden border-r border-slate-800 bg-slate-900 text-slate-300 transition-[width] duration-200 ease-in-out lg:flex ${
          collapsed ? 'lg:w-[84px]' : 'lg:w-[280px]'
        }`}
        aria-label="Sidebar"
      >
        <header className="flex h-16 shrink-0 items-center px-5">
          <BrandMark compact={collapsed} />
        </header>

        <nav
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-4"
          aria-label="Primary"
        >
          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="mb-3">
              <p
                className={`px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 ${
                  collapsed ? 'lg:hidden' : ''
                }`}
              >
                {group.label}
              </p>
              <ul className="space-y-0.5">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <a href="#" title={item.label} className={itemClass(item)}>
                      <span
                        className="grid w-6 shrink-0 place-items-center text-base leading-none"
                        aria-hidden="true"
                      >
                        {item.icon}
                      </span>
                      <span className={`truncate ${collapsed ? 'lg:hidden' : ''}`}>
                        {item.label}
                      </span>
                      {item.badge ? (
                        <span
                          className={`ml-auto shrink-0 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 ${
                            collapsed ? 'lg:hidden' : ''
                          }`}
                        >
                          {item.badge}
                        </span>
                      ) : null}
                      {item.active ? (
                        <span
                          className={`ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 ${
                            collapsed ? 'lg:absolute lg:right-2.5 lg:ml-0' : ''
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

        <footer className="shrink-0 border-t border-slate-800 px-3 py-3">
          <div
            className={`flex items-center gap-3 px-1 py-1 ${
              collapsed ? 'lg:justify-center lg:px-0' : ''
            }`}
          >
            <div
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-xs font-bold text-emerald-400"
              aria-hidden="true"
            >
              AM
            </div>
            <div className={`min-w-0 ${collapsed ? 'lg:hidden' : ''}`}>
              <p className="truncate text-sm font-medium text-white">Alex Morgan</p>
              <p className="truncate text-xs text-slate-500">Product Designer</p>
            </div>
          </div>
          <button
            type="button"
            id="collapseSidebar"
            aria-expanded={!collapsed}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            onClick={onToggleCollapse}
            className={`mt-1 flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-slate-800 hover:text-white ${
              collapsed ? 'lg:justify-center lg:px-0' : ''
            }`}
          >
            <svg
              className={`h-5 w-5 shrink-0 transition-transform duration-200 ${
                collapsed ? 'rotate-180' : ''
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            <span className={`truncate ${collapsed ? 'lg:hidden' : ''}`}>
              Collapse Sidebar
            </span>
          </button>
        </footer>
      </aside>

      <div
        className={`fixed inset-0 z-50 ${mobileOpen ? 'flex' : 'hidden'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Sidebar menu"
      >
        <div
          className="absolute inset-0 bg-black/60"
          aria-hidden="true"
          id="backdrop"
          onClick={onClose}
        />
        <div className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col overflow-x-hidden bg-slate-900 text-slate-300 shadow-xl">
          <header className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-800 px-5 py-4">
            <BrandMark />
            <button
              type="button"
              id="closeSidebar"
              aria-label="Close menu"
              className="shrink-0 rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
              onClick={onClose}
            >
              &#x2715;
            </button>
          </header>
          <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-4" aria-label="Mobile">
            {NAV_GROUPS.map((group) => (
              <div key={group.label} className="mb-3">
                <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  {group.label}
                </p>
                <ul className="space-y-0.5">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <a
                        href="#"
                        onClick={onClose}
                        className={
                          'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors' +
                          (item.active
                            ? ' bg-emerald-500/10 font-medium text-emerald-400'
                            : ' text-slate-400 hover:bg-slate-800 hover:text-white')
                        }
                      >
                        <span
                          className="grid w-6 shrink-0 place-items-center text-base leading-none"
                          aria-hidden="true"
                        >
                          {item.icon}
                        </span>
                        <span className="truncate">{item.label}</span>
                        {item.badge ? (
                          <span className="ml-auto shrink-0 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                            {item.badge}
                          </span>
                        ) : null}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}