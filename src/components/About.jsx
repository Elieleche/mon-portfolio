import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const skills = [
  'React', 'Angular', 'TypeScript', 'JavaScript',
  'Node.js', 'Python', 'Git', 'Docker',
]

const timeline = [
  {
    title: 'Première année Epitech Lyon',
    description: 'Piscine pour découvrir le C, première année concentrée sur le C et la gestion de la mémoire.',
  },
  {
    title: 'Deuxième année à Epitech Lyon',
    description: 'Approfondissement du C++ et de la POO, premiers projets en équipe, initiation au développement web et aux outils DevOps.',
  },
  {
    title: 'Stage — Développeur Angular',
    description: "Développement d'une application web fullstack en Angular & AWS chez SNCF DGSI Voyageurs",
  },
  {
    title: 'Encore une Piscine !',
    description: "Piscine pour découvrir le C++ et le Rust, avec des projets de Network, d'orienté objet...",
  },
  {
    title: 'Spécialisation web',
    description: "Malgré mon attrait pour certaines technos à l'école, la majorité de mes projets perso sont restés orientés web fullstack.",
  },
  {
    title: 'Piscine AWS',
    description: "En lien avec Epitech, j'ai participé à une piscine organisée par AWS pour découvrir les services cloud et l'infrastructure as code.",
  },
  {
    title: 'Recherche de stage / CDD',
    description: 'Disponible jeudi & vendredi en entreprise, du 15 sept. au 28 fév. De préférence en développement web fullstack.',
  },
]

export default function About() {
  const [ref, inView] = useInView()
  const [deinverted, setDeinverted] = useState(false)
  const [timelineProgress, setTimelineProgress] = useState(0)

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setDeinverted(true), 150)
      return () => clearTimeout(t)
    }
  }, [inView])

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const section = document.getElementById('apropos')
          if (!section) return
          const rect = section.getBoundingClientRect()
          const totalScroll = rect.height + window.innerHeight
          const scrolled = window.innerHeight - rect.top
          const p = Math.max(0, Math.min(1, scrolled / totalScroll))
          setTimelineProgress(p)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      id="apropos"
      className="py-24 sm:py-32 border-t border-white/5 snap-start scroll-mt-14"
      style={{
        filter: deinverted ? 'invert(0)' : 'invert(1)',
        transition: 'filter 0.9s ease',
      }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24, scale: 0.97, filter: 'blur(4px)' }}
          animate={inView ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="font-mono text-sm text-[var(--color-volt)] mb-10 uppercase tracking-wider">
            <span className="text-white/30">// </span>à propos
          </p>

          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <div className="space-y-4 text-gray-300 text-[0.95rem] leading-relaxed">
                <p>
                  Étudiant à <strong className="text-white font-medium">Epitech Lyon</strong>,
                  je me spécialise dans le développement web fullstack. Passionné par les
                  interfaces modernes et les expériences soignées.
                </p>
                <p>
                  J'ai effectué un stage en développement Angular au sein de la SNCF, et je développe
                  régulièrement des projets en React pour explorer de nouvelles approches.
                </p>
                <p>
                  Disponible pour un{' '}
                  <strong className="text-[var(--color-volt)] font-medium">stage / CDD</strong>,
                  jeudi et vendredi en entreprise, du{' '}
                  <strong className="text-[var(--color-volt)] font-medium">15 septembre au 28 février</strong>.
                </p>
              </div>

              <div className="mt-8">
                <p className="font-mono text-xs text-[var(--color-volt)]/60 mb-3">// stack</p>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-xs text-gray-400 rounded border border-white/8 bg-white/[0.03] px-2.5 py-1"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {['Curieux', 'Autonome', 'Esprit d\'équipe', 'Rigoureux'].map((soft) => (
                  <span
                    key={soft}
                    className="text-xs text-gray-500 border border-white/5 rounded-full px-3 py-1"
                  >
                    {soft}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="font-mono text-xs text-[var(--color-volt)]/60 mb-5">// parcours</p>
              <div className="relative timeline-section">
                <div className="absolute left-[3px] top-1.5 bottom-1.5 w-[2px] bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="w-full rounded-full bg-gradient-to-b from-[var(--color-volt)] via-[var(--color-volt-hot)] to-[var(--color-volt-deep)]"
                    style={{ transform: `scaleY(${timelineProgress})`, transformOrigin: 'top' }}
                  />
                </div>
                <div className="space-y-5 pl-6">
                  {timeline.map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: 10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: i * 0.05 + 0.2, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="flex gap-3"
                    >
                      <span className="mt-0.5 font-mono text-[var(--color-volt-deep)] text-xs shrink-0">▸</span>
                      <div>
                        <p className="text-sm font-medium text-gray-100">{item.title}</p>
                        {item.description && (
                          <p className="mt-0.5 text-sm text-gray-500 leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
