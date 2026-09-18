import React from 'react'

function RL() {
  const steps = [
    { num: 1, title: 'Observation', desc: 'The agent receives state information from the environment, including multimodal inputs from vision, text, and audio sensors.' },
    { num: 2, title: 'Decision', desc: 'Based on observations, the agent selects an action using its policy network, optimized through deep reinforcement learning.' },
    { num: 3, title: 'Action', desc: 'The agent executes the chosen action in the environment, receiving immediate feedback through the reward signal.' },
    { num: 4, title: 'Learning', desc: 'The agent updates its policy using reward signals and experience replay, continuously improving its decision-making strategy.' },
  ]

  return (
    <div className="home-page">
      <section className="hero" style={{ background: 'linear-gradient(135deg, #0f3460 0%, #6c63ff 50%, #1a1a2e 100%)' }}>
        <h1>Reinforcement Learning</h1>
        <p>Intelligent agents that learn optimal behavior through interaction</p>
      </section>
      <div className="section">
        <div className="rl-steps">
          {steps.map((s) => (
            <div className="step-card" key={s.num}>
              <div className="step-number">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RL