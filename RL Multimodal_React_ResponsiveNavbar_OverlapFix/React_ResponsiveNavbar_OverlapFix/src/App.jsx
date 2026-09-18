import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Features from './pages/Features'
import Multimodal from './pages/Multimodal'
import RL from './pages/RL'
import Docs from './pages/Docs'
import NotFound from './pages/NotFound'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [darkMode, setDarkMode] = useState(true)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const toggleSidebarCollapse = () => setSidebarCollapsed(!sidebarCollapsed)
  const toggleDarkMode = () => setDarkMode(!darkMode)

  return (
    <BrowserRouter>
      <div className={`app ${darkMode ? 'dark' : 'light'}`}>
        <Navbar
          sidebarOpen={sidebarOpen}
          sidebarCollapsed={sidebarCollapsed}
          toggleSidebar={toggleSidebar}
          toggleSidebarCollapse={toggleSidebarCollapse}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/multimodal" element={<Multimodal />} />
            <Route path="/rl" element={<RL />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App