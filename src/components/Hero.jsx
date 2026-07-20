import { motion } from 'framer-motion'
import KineticText from './KineticText'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' },
  }),
}

export default function Hero() {
  return (
    <section
      id="accueil"
      className="min-h-screen flex flex-col justify-center pt-14 pb-20 snap-start"
    >
      {/* 
        ⚡ VOLT KINETIC ⚡
        Tu explores le code source ? Bon reflexe.
        La console cache encore un message...
      */}
      
      <div className="max-w-5xl mx-auto px-6 w-full">

        {/* Dev wink 1: terminal prompt */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex items-center gap-2 font-mono text-sm text-[var(--color-volt)] mb-6"
        >
          <span>▶</span>
          <span>elie.chardin</span>
          <span className="animate-cursor-blink">_</span>
        </motion.div>

        {/* Name / Title — kinetic text */}
        <KineticText
          text="Développeur web fullstack"
          as="h1"
          splitBy="word"
          trigger="mount"
          colorCycle={['ink', 'volt', 'volt-hot']}
          stagger={0.1}
          className="font-heading font-bold leading-[0.92] tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl overflow-hidden"
        />

        {/* Tagline */}
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-8 text-base sm:text-lg text-gray-400 max-w-lg leading-relaxed"
        >
          Étudiant à Epitech Lyon — recherche stage dev web (alternance/4-6 mois)

        </motion.p>

        {/* Availability badge — élément dominant */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-8"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-[var(--color-volt)]/30 bg-[var(--color-volt)]/10 px-5 py-2.5 animate-badge-glow">
            <span className="relative flex h-2 w-2 shrink-0">
              <motion.span
                className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-volt)]"
                animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.6, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-volt)]" />
            </span>
            <span className="text-sm font-medium text-[var(--color-volt)]">
              En recherche stage dev web · disp. jeudi &amp; vendredi
            </span>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-10 flex flex-wrap gap-3"
        >
          <a
            href="#projets"
            className="rounded-lg bg-[var(--color-volt)] px-6 py-2.5 text-sm font-bold text-black transition hover:scale-[1.03] hover:shadow-[0_0_40px_-8px_rgba(212,255,0,0.5)]"
          >
            Voir mes projets
          </a>
          <a
            href="#contact"
            className="rounded-lg border-2 border-white/10 px-6 py-2.5 text-sm text-gray-300 transition hover:border-[var(--color-volt)]/40 hover:text-white"
          >
            Me contacter
          </a>
        </motion.div>

        {/* Dev wink 2: git status */}
        <motion.p
          custom={5}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-16 font-mono text-xs text-gray-600"
        >
          <span className="text-[var(--color-volt)]/50">●</span>{' '}git status: available · Epitech Lyon
        </motion.p>

      </div>
    </section>
  )
}
