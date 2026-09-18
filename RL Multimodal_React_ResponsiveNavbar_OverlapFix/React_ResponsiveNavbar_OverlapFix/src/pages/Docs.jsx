import React from 'react'

function Docs() {
  const docs = [
    { title: 'Getting Started', desc: 'Quick start guide to set up the responsive navbar.', time: '5 min' },
    { title: 'Navbar Overlap Fix', desc: 'Learn how the CSS-based overlap fix prevents content from hiding behind the fixed navbar.', time: '10 min' },
    { title: 'Responsive Design', desc: 'Guide to implementing responsive breakpoints and mobile-first design patterns.', time: '15 min' },
    { title: 'Sidebar Configuration', desc: 'Customize the sidebar behavior, collapse states, and navigation items.', time: '8 min' },
    { title: 'Theme Customization', desc: 'Set up dark/light mode theming with CSS custom properties.', time: '7 min' },
    { title: 'API Reference', desc: 'Complete API documentation for all components and utilities.', time: '20 min' },
    { title: 'Deployment Guide', desc: 'Deploy your application to Vercel, Netlify, or AWS with zero config.', time: '12 min' },
  ]

  return (
    <div className="home-page">
      <section className="hero" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #6c63ff 50%, #0f3460 100%)' }}>
        <h1>Documentation</h1>
        <p>Everything you need to build with React</p>
      </section>
      <div className="section">
        <div className="doc-list">
          {docs.map((d, i) => (
            <div className="doc-item" key={i}>
              <div>
                <h3>{d.title}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', marginTop: '4px' }}>{d.desc}</p>
              </div>
              <span>{d.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Docs