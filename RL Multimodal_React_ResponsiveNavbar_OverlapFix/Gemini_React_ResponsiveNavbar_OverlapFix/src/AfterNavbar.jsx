import { useState } from 'react'
import { BRAND, navLinks } from './navData'
import Content from './Content'

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'

export default function AfterNavbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4">
          <a
            href="#top"
            className={`min-w-0 truncate text-lg font-black text-gray-900 ${focusRing}`}
          >
            {BRAND}
          </a>

          <nav className="hidden items-center gap-5 md:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link}
                className={`whitespace-nowrap text-sm font-medium text-gray-600 hover:text-gray-900 ${focusRing}`}
              >
                {link}
              </a>
            ))}
          </nav>

          <button
            className={`ml-auto hidden shrink-0 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 md:block ${focusRing}`}
          >
            Get Started
          </button>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className={`ml-auto block shrink-0 rounded-md p-2 text-gray-700 hover:bg-gray-100 md:hidden ${focusRing}`}
          >
            <span aria-hidden="true">{open ? '\u2715' : '\u2630'}</span>
          </button>
        </div>

        {open && (
          <nav
            id="mobile-menu"
            aria-label="Mobile"
            className="border-t border-gray-200 bg-white px-4 py-3 shadow-md md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link}
                onClick={() => setOpen(false)}
                className={`block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 ${focusRing}`}
              >
                {link}
              </a>
            ))}
            <button className="mt-2 w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
              Get Started
            </button>
          </nav>
        )}
      </header>

      <main className="pt-16">
        <Content />
      </main>
    </>
  )
}