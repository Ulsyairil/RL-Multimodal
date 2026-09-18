import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar({ sidebarOpen, sidebarCollapsed, toggleSidebar, toggleSidebarCollapse, darkMode, toggleDarkMode }) {
  const location = useLocation()

  const navLinks = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/features', label: 'Features', icon: '⭐' },
    { path: '/multimodal', label: 'Multimodal', icon: '🧠' },
    { path: '/rl', label: 'Reinforcement Learning', icon: '🎯' },
    { path: '/docs', label: 'Docs', icon: '📄' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      <nav className={`navbar ${sidebarOpen ? 'navbar-open' : ''} ${darkMode ? 'navbar-dark' : 'navbar-light'}`}>
        <div className="navbar-brand">
          <button className="hamburger" onClick={toggleSidebar} aria-label="Toggle menu">
            <span className={`bar ${sidebarOpen ? 'bar-active' : ''}`}></span>
            <span className={`bar ${sidebarOpen ? 'bar-active' : ''}`}></span>
            <span className={`bar ${sidebarOpen ? 'bar-active' : ''}`}></span>
          </button>
          <span className="brand-icon">✦</span>
          <span className="navbar-title">RL Multimodal</span>
        </div>
        <div className="navbar-actions">
          <button className="theme-toggle" onClick={toggleDarkMode} aria-label="Toggle theme">
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button
            className="collapse-toggle"
            onClick={toggleSidebarCollapse}
            aria-label="Collapse sidebar"
          >
            {sidebarCollapsed ? '▸' : '◂'}
          </button>
        </div>
      </nav>
      <div className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''} ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <ul className="sidebar-menu">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={isActive(link.path) ? 'active' : ''}
                onClick={() => window.innerWidth <= 768 && toggleSidebar()}
              >
                <span className="link-icon">{link.icon}</span>
                <span className="link-label">{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={`overlay ${sidebarOpen ? 'overlay-active' : ''}`} onClick={toggleSidebar}></div>
    </>
  )
}

export default Navbar