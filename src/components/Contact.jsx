import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/Elieleche',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/elie-chardin',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:eliechardin.dev@gmail.com',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
]

export default function Contact() {
  const [ref, isInView] = useInView()

  return (
    <section id="contact" className="py-24 sm:py-32 border-t border-white/5 snap-start scroll-mt-14">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24, scale: 0.97, filter: 'blur(4px)' }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="font-mono text-sm text-[var(--color-volt)] mb-8 uppercase tracking-wider">
            <span className="text-white/30">// </span>contact
          </p>

          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
            Envie d&apos;&eacute;changer&nbsp;?
          </h2>
          <p className="text-gray-400 mb-8 max-w-lg leading-relaxed">
            Je suis disponible pour discuter d&apos;une opportunit&eacute; de stage / CDD.
            N&apos;h&eacute;sitez pas &agrave; m&apos;&eacute;crire &mdash; je r&eacute;ponds rapidement.
          </p>

          {/* Availability reminder */}
          <div className="mb-10 inline-flex items-center gap-3 rounded-full border border-[var(--color-volt)]/20 bg-[var(--color-volt)]/[0.08] px-5 py-2.5 animate-badge-glow">
            <span className="relative flex h-2 w-2 shrink-0">
              <motion.span
                className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-volt)]"
                animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.6, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-volt)]" />
            </span>
            <span className="text-sm text-[var(--color-volt)]">
              En recherche stage dev web &middot; disp. jeudi &amp; vendredi
            </span>
          </div>

          {/* Social links */}
          <div className="flex flex-wrap gap-3 mb-10">
            {socialLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                className="flex items-center gap-2 rounded-lg border border-white/8 bg-white/[0.03] px-4 py-2.5 text-sm text-gray-400 transition hover:border-white/15 hover:text-gray-200"
              >
                {link.icon}
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* CV download */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <a
              href="/cv-elie-chardin.pdf"
              download
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-volt)] px-6 py-2.5 text-sm font-bold text-black transition hover:scale-[1.03] hover:shadow-[0_0_40px_-8px_rgba(212,255,0,0.5)]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              T&eacute;l&eacute;charger mon CV
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}