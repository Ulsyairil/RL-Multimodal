import { BRAND, navLinks } from './navData'
import Content from './Content'

export default function BeforeNavbar() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-200 bg-white">
        <div className="flex h-14 items-center gap-4 px-4">
          <span className="whitespace-nowrap text-lg font-black text-gray-900">
            {BRAND}
          </span>
          <nav className="flex items-center gap-5">
            {navLinks.map((link) => (
              <a
                key={link}
                className="whitespace-nowrap text-sm font-medium text-gray-700"
              >
                {link}
              </a>
            ))}
          </nav>
          <button className="ml-auto shrink-0 whitespace-nowrap rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">
            Get Started
          </button>
        </div>
      </header>

      {/* No top padding: page content is hidden behind the fixed bar. */}
      <Content pad={false} />
    </>
  )
}