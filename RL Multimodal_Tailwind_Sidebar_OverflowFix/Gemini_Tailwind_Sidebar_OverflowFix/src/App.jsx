import { useState } from 'react'
import Sidebar from './Sidebar'
import Dashboard from './Dashboard'

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <main className="min-h-screen lg:pl-[280px]">
        <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-gray-200 bg-white/80 px-6 py-3 backdrop-blur">
          <button
            className="rounded-lg border border-gray-200 p-2 hover:bg-gray-100 lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open sidebar"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-sm font-semibold text-gray-900">RL Multimodal Dashboard</h1>
        </header>
        <Dashboard />
      </main>
    </>
  )
}