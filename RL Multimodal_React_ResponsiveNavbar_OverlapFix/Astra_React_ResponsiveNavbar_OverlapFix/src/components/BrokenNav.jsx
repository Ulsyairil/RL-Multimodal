import './BrokenNav.css'

/**
 * The "BEFORE" (buggy) version: navbar uses `position: fixed` without compensation.
 * Because fixed is removed from the document flow, content below it slides up and
 * gets covered by the navbar — that is the overlap problem.
 */
export default function BrokenNav() {
  return (
    <div className="broken-nav">
      <span className="broken-nav__brand">
        <span className="broken-nav__logo">N</span>
        NavLab
      </span>
      <div className="broken-nav__links">
        <a href="#before">Home</a>
        <a href="#features">Features</a>
        <a href="#content">Content</a>
      </div>
    </div>
  )
}