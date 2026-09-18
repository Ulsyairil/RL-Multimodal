import React from 'react'

function Home() {
  return (
    <div className="home-page">
      <section id="home" className="hero">
        <h1>RL Multimodal Platform</h1>
        <p>
          Powered by RL Multimodal AI, featuring a responsive navbar with overlap fix
          for seamless user experience across all devices.
        </p>
      </section>

      <section id="features" className="section">
        <h2>Features</h2>
        <div className="cards">
          <div className="card">
            <div className="card-icon">🧠</div>
            <h3>Multimodal AI</h3>
            <p>Process text, image, and audio inputs simultaneously for comprehensive understanding.</p>
          </div>
          <div className="card">
            <div className="card-icon">🎯</div>
            <h3>Reinforcement Learning</h3>
            <p>Optimize decision-making through trial and error with reward-based learning agents.</p>
          </div>
          <div className="card">
            <div className="card-icon">⚡</div>
            <h3>Real-Time Responsive</h3>
            <p>Adaptive UI that handles navbar overlap issues elegantly on all screen sizes.</p>
          </div>
          <div className="card">
            <div className="card-icon">✦</div>
            <h3>Multimodal Integration</h3>
            <p>Powerful multimodal reasoning capabilities with integrated RL agents and a unified pipeline.</p>
          </div>
        </div>
      </section>

      <section id="multimodal" className="section">
        <h2>Multimodal Capabilities</h2>
        <div className="info-box">
          <p>
            Our platform seamlessly combines multiple modalities — vision, language, and audio —
            to create a unified understanding pipeline. The responsive navbar ensures content
            is never hidden behind the fixed header.
          </p>
        </div>
      </section>

      <section id="rl" className="section">
        <h2>Reinforcement Learning</h2>
        <div className="info-box">
          <p>
            Built with RL agents that learn optimal navigation and interaction patterns.
            The overlap fix ensures UI elements are always accessible regardless of scroll
            position or viewport size.
          </p>
        </div>
      </section>

      <section id="docs" className="section">
        <h2>Documentation</h2>
        <div className="info-box">
          <p>
            Comprehensive guides for integrating the React responsive navbar
            into your projects. Includes overlap fix strategies and responsive design patterns.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Home