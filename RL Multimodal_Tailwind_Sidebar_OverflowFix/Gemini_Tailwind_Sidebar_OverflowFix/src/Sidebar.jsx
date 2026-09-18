import { useState, useEffect, useRef } from 'react'

const SECTIONS = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', active: true },
      { label: 'Training status', active: false },
    ],
  },
  {
    title: 'Data',
    items: [
      { label: 'Datasets', active: false },
      { label: 'Annotations queue', active: false },
      { label: 'Label quality reports', active: false },
    ],
  },
  {
    title: 'Training',
    items: [
      { label: 'Active runs', active: false },
      { label: 'Hyperparameter sweeps', active: false },
      { label: 'Reward model tuning', active: false },
      { label: 'Policy optimization logs', active: false },
    ],
  },
  {
    title: 'Evaluation',
    items: [
      { label: 'Model benchmarks', active: false },
      { label: 'Confidence scoring', active: false },
      { label: 'EvaluationConfigurationTasksDashboardReportsSettingsPage',
        active: false },
    ],
  },
  {
    title: 'Team',
    items: [
      { label: 'Members & roles', active: false },
      { label: 'Audit history', active: false },
      { label: 'API keys', active: false },
    ],
  },
]

export default function Sidebar({ mobileOpen, onClose }) {
  const [collapsed, setCollapsed] = useState({})
  const navRef = useRef(null)

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    if (mobileOpen) {
      document.addEventListener('keydown', handleKey)
      return () => document.removeEventListener('keydown', handleKey)
    }
  }, [mobileOpen, onClose])

  const toggleSection = (title) => {
    setCollapsed((prev) => ({ ...prev, [title]: !prev[title] }))
  }

 return (
    <>
      {/* Desktop sidebar — fixed so header/footer stay pinned */}
      <aside
        className="fixed inset-y-0 left-0 z-30 hidden w-[280px] flex-col overflow-x-hidden border-r border-slate-700 bg-slate-900 text-slate-300 lg:flex"
        aria-label="Sidebar"
      >
        <header className="flex shrink-0 items-center gap-3 border-b border-slate-700 px-5 py-4">
          <div className="h-8 w-8 shrink-0 rounded-lg bg-emerald-500" aria-hidden="true" />
          <span className="min-w-0 truncate text-sm font-semibold text-white">
            RL Multimodal
          </span>
        </header>

        <nav ref={navRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-4" aria-label="Primary">
          {SECTIONS.map((section) => {
            const isCollapsed = collapsed[section.title]
            return (
              <div key={section.title} className="mb-2">
                <button
                  onClick={() => toggleSection(section.title)}
                  className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 transition-colors hover:text-slate-300"
                >
                  {section.title}
                  <span className={`text-slate-600 transition-transform ${isCollapsed ? '' : 'rotate-90'}`}>
                    ▸
                  </span>
                </button>
                {!isCollapsed && (
                  <ul className="mt-0.5 space-y-0.5">
                    {section.items.map((item) => (
                      <li key={item.label}>
                        <a
                          href="#"
                          className={
                            'block rounded-md px-3 py-2 text-sm transition-colors' +
                            (item.active
                              ? ' bg-emerald-500/10 font-medium text-emerald-400'
                              : ' text-slate-400 hover:bg-slate-800 hover:text-white')
                            + (item.label.startsWith('EvaluationConfiguration') ? ' break-words' : '')
                          }
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}
        </nav>

        <footer className="shrink-0 border-t border-slate-700 px-5 py-3">
          <p className="text-xs text-slate-500">Signed in as riley.k@example.com</p>
        </footer>
      </aside>

      {/* Mobile drawer */}
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
          <header className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-700 px-5 py-4">
            <span className="min-w-0 truncate text-sm font-semibold text-white">
              RL Multimodal
            </span>
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
            {SECTIONS.map((section) => {
              const isCollapsed = collapsed[section.title]
              return (
                <div key={section.title} className="mb-2">
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 transition-colors hover:text-slate-300"
                  >
                    {section.title}
                    <span className={`text-slate-600 transition-transform ${isCollapsed ? '' : 'rotate-90'}`}>
                      ▸
                    </span>
                  </button>
                  {!isCollapsed && (
                    <ul className="mt-0.5 space-y-0.5">
                      {section.items.map((item) => (
                        <li key={item.label}>
                          <a
                            href="#"
                            className="block rounded-md px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
                            onClick={onClose}
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            })}
          </nav>
        </div>
      </div>
    </>
  )
}