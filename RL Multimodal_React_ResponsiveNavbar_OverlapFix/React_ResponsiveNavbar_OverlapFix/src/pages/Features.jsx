import React from 'react'

function Features() {
  const features = [
    { icon: '🧠', title: 'Multimodal AI', desc: 'Process text, image, and audio simultaneously for comprehensive understanding and reasoning.' },
    { icon: '🎯', title: 'Reinforcement Learning', desc: 'Optimize decision-making through trial and error with reward-based learning agents.' },
    { icon: '⚡', title: 'Real-Time Processing', desc: 'Low-latency inference with streaming responses for interactive applications.' },
    { icon: '🔒', title: 'Secure by Design', desc: 'End-to-end encryption and privacy-first architecture for sensitive data.' },
    { icon: '📊', title: 'Analytics Dashboard', desc: 'Built-in analytics and monitoring tools to track model performance in real-time.' },
    { icon: '🔌', title: 'API Integration', desc: 'Seamless REST and GraphQL APIs to integrate with any existing workflow.' },
  ]

  return (
    <div className="home-page">
      <section className="hero" style={{ background: 'linear-gradient(135deg, #0f3460 0%, #16213e 50%, #1a1a2e 100%)' }}>
        <h1>Features</h1>
        <p>Everything you need to build powerful multimodal applications</p>
      </section>
      <div className="section">
        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-card-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Features