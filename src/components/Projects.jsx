import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const projects = [
  {
    title: 'CS2 Don\'t Be a Bottom',
    description: 'Bot Discord tout-en-un pour CS2 : smokes time-codées, suivi Elo Faceit et app web.',
    details: 'Architecture modulaire Python : services indépendants (API Faceit, génération graphiques Matplotlib) séparés de l\'interface Discord (cogs). Commandes slash avec autocomplete, cache des stats pour limiter les appels API. App web déployée sur Vercel avec Dashboard responsive.',
    context: 'Personnel — lassé de devoir alt-tab pendant les matchs pour chercher des smokes.',
    role: 'Solo',
    challenge: 'Coordination des appels API Faceit (rate limits) + rendu de graphiques Matplotlib en mémoire sans fichier temporaire.',
    tags: ['Python', 'Discord.py', 'Faceit API', 'Matplotlib'],
    github: 'https://github.com/Elieleche/cs2-dont-be-a-bottom',
    source: 'https://cs-bot-eta.vercel.app',
  },
  {
    title: 'Zappy',
    description: 'Jeu réseau Epitech : serveur C, IA Python asynchrone, GUI C++/SFML isométrique.',
    details: 'Serveur TCP non-bloquant avec scheduler temps réel, monde torique, régénération périodique des ressources. IA agent basée sur asyncio : rôles REINE/FOODER/SOLDIER avec machine à états, pathfinding, communication via Broadcast. GUI SFML avec rendu iso, HUD et parsing du protocole texte. Tests Criterion (C) + pytest (Python).',
    context: 'Projet de fin de module réseau Epitech — équipe de 7, 3 mois.',
    role: 'Serveur C (scheduler, protocole TCP, simulation du monde torique)',
    challenge: 'Synchronisation temps réel entre serveur C, GUI SFML et IA Python asyncio — gestion des deadlocks sur le scheduler multi-client.',
    tags: ['C', 'C++17', 'SFML', 'Python', 'TCP'],
    github: 'https://github.com/Elieleche/zappy',
    source: 'https://github.com/Elieleche/zappy',
  },
  {
    title: 'Raytracer',
    description: 'Moteur de rendu 3D par lancer de rayons en C++17 avec design patterns Factory/Strategy/Composite.',
    details: 'Parsing de scène texte en primitives (sphère, plan, cylindre, cône, tore, mesh .obj), matériaux composites (FlatColor, Reflective, Transparent), transformations chaînées (Translation/Rotation/Scale), rendu multithreadé par blocs, Ambient Occlusion, ombres portées. Architecture orientée interface : IRenderStrategy, IMaterial, IEffectStrategy, IBackgroundStrategy.',
    context: 'Projet Epitech — 4 personnes, 1 mois.',
    role: 'Architecture des matériaux (Reflective, Transparent, Composite) + parsing de scène',
    challenge: 'Implémentation correcte de la réfraction (loi de Snell-Descartes) et du rendu multithreadé sans race conditions sur les pixels.',
    tags: ['C++17', 'SFML', 'Multithreading', 'Makefile'],
    github: 'https://github.com/Elieleche/raytracer',
    source: 'https://github.com/Elieleche/raytracer',
  },
  {
    title: 'Arcade',
    description: 'Plateforme de jeux rétro à chargement dynamique de plugins .so.',
    details: 'Architecture core/plugins : le cœur charge des bibliothèques dynamiques (.so) et fait le pont entre IGame (logique pure) et IGraphical (affichage pur). 3 libs graphiques (ncurses, SDL2, SFML) interchangeables à chaud. 2 jeux (Snake, Démineur) sans aucune dépendance d\'affichage. Événements normalisés via un système d\'Event/RenderObject commun.',
    context: 'Projet Epitech — 3 personnes, 1 mois.',
    role: 'Core (chargement dynamique .so, pont IGame/IGraphical) + binding des événements',
    challenge: 'Interface C++ dynamique via dlopen/dlsym garantissant la compatibilité jeu↔graphique sans fuite mémoire ni crash au déchargement.',
    tags: ['C++', 'ncurses', 'SDL2', 'SFML'],
    github: 'https://github.com/Elieleche/arcade',
    source: 'https://github.com/Elieleche/arcade',
  },
  {
    title: 'CODNAME',
    description: 'Tournoi de prompt injection : défendre un code secret derrière un mot de passe, ou le voler chez l\'adversaire.',
    details: 'Deux fichiers texte seulement. Defense.prompt : system prompt résistant aux injections, avec template {password}/{secret}. Attack.prompt : prompt unique d\'attaque conçu pour fonctionner contre toute défense. Cible : granite3.1-moe. Techniques : role prompting, confusion sémantique, jailbreak indirect, encoding bypass. Aucun code, uniquement de l\'ingénierie sociale de LLM.',
    context: 'Tournoi de prompt injection Epitech (2026) — solo, 2 semaines. Sujet : sécurité LLM / red teaming.',
    role: 'Conception et exécution de l\'attaque + rédaction de la défense',
    challenge: 'Trouver une attaque unique fonctionnant contre toute défense adverse, pas seulement une cible spécifique.',
    tags: ['Prompt Engineering', 'LLM', 'Red Team', 'Security'],
    github: 'https://github.com/Elieleche/codname',
    source: 'https://github.com/Elieleche/codname',
  },
  {
    isCTA: true,
    title: '$ contact --collaboration',
    description: 'Je suis ouvert aux collaborations, stages et CDD. Envoyer un message →',
    tags: [],
    details: '',
    github: '#',
    source: '#contact',
  },
]

function TiltCard({ children, className, style, ...rest }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    requestAnimationFrame(() => setTilt({ x, y }))
  }

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 })

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        ...style,
        transform: `perspective(600px) rotateY(${tilt.x * 6}deg) rotateX(${-tilt.y * 6}deg)`,
        transition: 'transform 0.15s ease-out',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      {...rest}
    >
      {children}
    </div>
  )
}

function ProjectCard({ project, index, inView }) {
  const [expanded, setExpanded] = useState(false)

  if (project.isCTA) {
    return (
      <motion.a
        href="#contact"
        initial={{ opacity: 0, y: 16, scale: 0.95, filter: 'blur(3px)' }}
        animate={inView ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } : {}}
        transition={{ delay: index * 0.07, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="group flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/10 bg-white/[0.015] p-5 transition-all duration-300 hover:border-[var(--color-volt)]/40 hover:bg-[var(--color-volt)]/[0.03] hover:shadow-[0_0_50px_-12px_rgba(212,255,0,0.2)] min-h-[240px] text-center"
      >
        <motion.span
          className="font-mono text-xs text-[var(--color-volt)]/50 mb-3"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          $ contact --collaboration
        </motion.span>
        <p className="font-heading text-lg font-bold text-gray-400 group-hover:text-[var(--color-volt)] transition-colors leading-snug">
          Envie de travailler<br />ensemble&nbsp;?
        </p>
        <motion.span
          className="font-mono text-xs text-gray-600 mt-4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          cliquer pour me contacter ▸
        </motion.span>
      </motion.a>
    )
  }

  return (
    <TiltCard>
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.95, filter: 'blur(3px)' }}
        animate={inView ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } : {}}
        transition={{ delay: index * 0.07, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        layout
        onClick={() => setExpanded(!expanded)}
        className="group flex flex-col rounded-2xl border-2 border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:border-[var(--color-volt)]/30 hover:bg-white/[0.06] hover:shadow-[0_0_40px_-12px_rgba(212,255,0,0.25)] cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="flex items-start justify-between gap-3 mb-2" style={{ transform: 'translateZ(20px)' }}>
          <h3 className="font-heading text-base font-semibold text-gray-100 group-hover:text-white transition-colors">
            {project.title}
          </h3>
          <div className="flex items-center gap-2 shrink-0 mt-0.5">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-gray-600 hover:text-gray-400 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href={project.source}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-gray-600 hover:text-gray-400 transition-colors"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </div>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-4" style={{ transform: 'translateZ(15px)' }}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-3" style={{ transform: 'translateZ(10px)' }}>
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="font-mono text-[0.68rem] text-[var(--color-volt)]/70 border border-[var(--color-volt)]/20 bg-[var(--color-volt)]/5 rounded px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>

        <span className="font-mono text-[0.6rem] text-gray-600 group-hover:text-[var(--color-volt)]/60 transition-colors" style={{ transform: 'translateZ(5px)' }}>
          {expanded ? '▴ réduire' : '▾ détails techniques'}
        </span>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
              style={{ transform: 'translateZ(0)' }}
            >
              <div className="pt-4 mt-3 border-t border-white/10 space-y-3">
                {project.context && (
                  <div>
                    <span className="font-mono text-[0.6rem] text-[var(--color-volt)]/50 uppercase tracking-wider">Contexte</span>
                    <p className="text-xs text-gray-400 leading-relaxed mt-0.5">{project.context}</p>
                  </div>
                )}
                {project.role && (
                  <div>
                    <span className="font-mono text-[0.6rem] text-[var(--color-volt)]/50 uppercase tracking-wider">Rôle</span>
                    <p className="text-xs text-gray-400 leading-relaxed mt-0.5">{project.role}</p>
                  </div>
                )}
                {project.challenge && (
                  <div>
                    <span className="font-mono text-[0.6rem] text-[var(--color-volt)]/50 uppercase tracking-wider">Challenge</span>
                    <p className="text-xs text-gray-400 leading-relaxed mt-0.5">{project.challenge}</p>
                  </div>
                )}
                <div>
                  <span className="font-mono text-[0.6rem] text-[var(--color-volt)]/50 uppercase tracking-wider">Tech</span>
                  <p className="text-xs text-gray-400 leading-relaxed mt-0.5">{project.details}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </TiltCard>
  )
}

export default function Projects() {
  const [ref, inView] = useInView()

  return (
    <section id="projets" className="py-24 sm:py-32 border-t border-white/5 snap-start scroll-mt-14">
      <div className="max-w-5xl mx-auto px-6">
        <p className="font-mono text-sm text-[var(--color-volt)] mb-10 uppercase tracking-wider">
          <span className="text-white/30">// </span>projets
        </p>
        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
