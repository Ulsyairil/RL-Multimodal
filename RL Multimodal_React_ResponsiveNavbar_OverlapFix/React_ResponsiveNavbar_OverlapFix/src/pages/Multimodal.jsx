import React from 'react'

function Multimodal() {
  const modalities = [
    { icon: '📝', name: 'Text', desc: 'Natural language understanding, generation, and translation across 100+ languages.' },
    { icon: '🖼️', name: 'Vision', desc: 'Image recognition, object detection, and scene understanding from photos and videos.' },
    { icon: '🎵', name: 'Audio', desc: 'Speech-to-text, text-to-speech, and audio classification with high accuracy.' },
    { icon: '🎬', name: 'Video', desc: 'Frame-by-frame analysis, action recognition, and video summarization.' },
    { icon: '🔢', name: 'Numerical', desc: 'Mathematical reasoning, data analysis, and scientific computation.' },
    { icon: '🌐', name: 'Code', desc: 'Code generation, debugging, and review across multiple programming languages.' },
  ]

  return (
    <div className="home-page">
      <section className="hero" style={{ background: 'linear-gradient(135deg, #6c63ff 0%, #1a1a2e 50%, #0f3460 100%)' }}>
        <h1>Multimodal Capabilities</h1>
        <p>Seamlessly combining multiple input and output modalities</p>
      </section>
      <div className="section">
        <div className="modality-cards">
          {modalities.map((m, i) => (
            <div className="modality-card" key={i}>
              <div className="mod-icon">{m.icon}</div>
              <h3>{m.name}</h3>
              <p>{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Multimodal