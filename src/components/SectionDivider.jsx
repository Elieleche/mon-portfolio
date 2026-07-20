import { motion } from 'framer-motion'

const shapes = [
  { icon: '◆', delay: 0,   color: 'var(--color-volt)' },
  { icon: '●', delay: 1.2, color: 'var(--color-volt-hot)' },
  { icon: '◇', delay: 2.4, color: 'var(--color-volt-deep)' },
  { icon: '○', delay: 0.6, color: 'var(--color-volt)' },
]

export default function SectionDivider() {
  return (
    <div className="relative h-20 sm:h-24 overflow-hidden">
      {/* Horizontal gradient line */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Glowing dot that travels */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--color-volt)]/30 blur-[2px]"
        animate={{ left: ['-10%', '110%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[var(--color-volt-hot)]/40"
        animate={{ left: ['-10%', '110%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear', delay: 3 }}
      />

      {/* Geometric shapes */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-6 sm:gap-10">
        {shapes.map((shape) => (
          <motion.span
            key={shape.icon}
            className="text-[8px] sm:text-[10px]"
            style={{ color: shape.color }}
            animate={{
              opacity: [0.04, 0.15, 0.04],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: shape.delay,
            }}
          >
            {shape.icon}
          </motion.span>
        ))}
      </div>
    </div>
  )
}
