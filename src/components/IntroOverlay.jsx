import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function IntroOverlay({ onFinish }) {
  const [phase, setPhase] = useState(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const shown = sessionStorage.getItem('introShown')
    if (shown || prefersReducedMotion) {
      sessionStorage.setItem('introShown', 'true')
      onFinish()
      return
    }
    setPhase('enter')
    sessionStorage.setItem('introShown', 'true')
    const t1 = setTimeout(() => setPhase('exit'), 1800)
    const t2 = setTimeout(() => onFinish(), 2400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onFinish]) // eslint-disable-line react-hooks/exhaustive-deps

  if (phase !== 'enter' && phase !== 'exit') return null

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0b0b0b]"
      initial={false}
      animate={phase === 'exit' ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <motion.span
        className="font-heading font-bold text-6xl sm:text-7xl md:text-8xl tracking-tight bg-gradient-to-r from-[var(--color-volt)] via-[var(--color-volt-hot)] to-[var(--color-volt-deep)] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-flash"
        initial={{ opacity: 0, scale: 0.8, filter: 'blur(8px)' }}
        animate={
          phase === 'exit'
            ? { opacity: 0, scale: 0.4, y: -80, filter: 'blur(0px)' }
            : { opacity: 1, scale: 1, filter: 'blur(0px)' }
        }
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {phase === 'enter' &&
          [...'eliedev'].map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block"
              style={{
                color: ['#D4FF00', '#FF3EA5', '#7A5CFF', '#F4F4F2', '#D4FF00', '#FF3EA5', '#7A5CFF'][i],
              }}
              initial={{ opacity: 0, scale: 0.7, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.06, type: 'spring', stiffness: 300, damping: 16 }}
            >
              {ch}
            </motion.span>
          ))}
        {phase !== 'enter' && 'eliedev'}
      </motion.span>
    </motion.div>
  )
}
