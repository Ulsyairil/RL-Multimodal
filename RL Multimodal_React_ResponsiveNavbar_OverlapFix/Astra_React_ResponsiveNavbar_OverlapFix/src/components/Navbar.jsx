import { useEffect, useState } from 'react'
import './Navbar.css'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Before', href: '#before' },
  { label: 'Fix', href: '#features' },
  { label: 'Responsive', href: '#content' },
  { label: 'About', href: '#about' },
]

/**
 * Responsive Navbar with Overlap Fix.
 *
 * KEY FIX:
 * 1. `position: sticky` (not fixed) — the element stays in the document flow,
 *    so content below it is never hidden/overlapped.
 * 2. The navbar height is locked via the CSS variable `--nav-height` so it stays
 *    consistent with `scroll-padding-top` for anchor jumps (menu links).
 * 3. If `fixed` is unavoidable: add padding-top to the content equal to the
 *    navbar height. Shown in the BrokenNav component.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Auto-close the mobile menu when the viewport grows to desktop size.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = (e) => e.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <a href="#home" className="navbar__brand" onClick={() => setOpen(false)}>
        <span className="navbar__logo">N</span>
        <span>
          Nav<span className="navbar__brand-accent">Lab</span>
        </span>
      </a>

      <nav className={`navbar__links${open ? ' is-open' : ''}`}>
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className={`navbar__toggle${open ? ' is-active' : ''}`}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="navbar-links"
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  )
}