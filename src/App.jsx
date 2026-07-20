import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import SectionDivider from './components/SectionDivider'
import IntroOverlay from './components/IntroOverlay'
import IdePage from './ide/IdePage'
import { Navigate, Route, Routes } from 'react-router-dom'

const SECTIONS = ['accueil', 'apropos', 'skills', 'projets', 'contact']

const orbColors = {
  accueil: { c1: 'rgba(212,255,0,0.05)', c2: 'rgba(255,62,165,0.035)', c3: 'rgba(122,92,255,0.035)' },
  apropos: { c1: 'rgba(122,92,255,0.05)', c2: 'rgba(212,255,0,0.035)', c3: 'rgba(255,62,165,0.035)' },
  skills: { c1: 'rgba(212,255,0,0.05)', c2: 'rgba(122,92,255,0.035)', c3: 'rgba(255,62,165,0.035)' },
  projets: { c1: 'rgba(255,62,165,0.05)', c2: 'rgba(122,92,255,0.035)', c3: 'rgba(212,255,0,0.035)' },
  contact: { c1: 'rgba(212,255,0,0.05)', c2: 'rgba(122,92,255,0.035)', c3: 'rgba(255,62,165,0.035)' },
}

function ScrollIndicator() {
  const [info, setInfo] = useState({ label: 'accueil', percent: 0, idx: 1, total: SECTIONS.length })

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      const percent = total > 0 ? Math.round((scrollY / total) * 100) : 0

      let activeIdx = 0
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i])
        if (el && el.getBoundingClientRect().top <= 200) {
          activeIdx = i
          break
        }
      }

      setInfo({ label: SECTIONS[activeIdx], percent, idx: activeIdx + 1, total: SECTIONS.length })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="scroll-indicator" style={{ opacity: info.percent > 2 ? 0.35 : 0 }}>
      [~] {info.label} · {info.idx}/{info.total} · {info.percent}%
    </div>
  )
}

export default function App() {
  const [introDone, setIntroDone] = useState(false)
  const [activeSection, setActiveSection] = useState('accueil')

  useEffect(() => {
    console.log(
      '%c⚡ VOLT KINETIC // eliedev ⚡',
      'color: #D4FF00; font-size: 20px; font-weight: bold; font-family: monospace; letter-spacing: 2px;'
    )
    console.log(
      '%cTu explores le DevTools ? Bon œil. Quelque chose clignote ailleurs...',
      'color: #8A8A94; font-size: 12px; font-family: monospace;'
    )
    console.log(
      '%c▸ indice : regarde du côté du terminal, dans le Hero',
      'color: #FF3EA5; font-size: 12px; font-family: monospace;'
    )
  }, [])

  useEffect(() => {
    const onScroll = () => {
      let activeIdx = 0
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i])
        if (el && el.getBoundingClientRect().top <= 300) {
          activeIdx = i
          break
        }
      }
      setActiveSection(SECTIONS[activeIdx])
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const colors = orbColors[activeSection] || orbColors.accueil

  const portfolioShell = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className="bg-[#0b0b0b] min-h-screen relative">
      {/* Background orbs */}
      <motion.div
        className="orb -top-40 -left-40 w-[500px] h-[500px]"
        animate={{ background: colors.c1 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        style={{ animation: 'orb-float 28s ease-in-out infinite' }}
      />
      <motion.div
        className="orb top-1/3 -right-32 w-[400px] h-[400px]"
        animate={{ background: colors.c2 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        style={{ animation: 'orb-float-2 35s ease-in-out infinite' }}
      />
      <motion.div
        className="orb bottom-0 left-1/4 w-[350px] h-[350px]"
        animate={{ background: colors.c3 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        style={{ animation: 'orb-float-3 40s ease-in-out infinite' }}
      />
      {/* Grain overlay */}
      <div className="grain" />
      <ScrollIndicator />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
    </motion.div>
  )

  return (
    <Routes>
      <Route path="/" element={
        <>
          {!introDone && <IntroOverlay onFinish={() => setIntroDone(true)} />}
          {portfolioShell}
        </>
      } />
      <Route path="/ide" element={<IdePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
