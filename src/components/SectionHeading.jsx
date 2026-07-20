import { motion } from 'framer-motion'

export default function SectionHeading({ kicker, title, description, align = 'center' }) {
  const alignClass = align === 'left' ? 'text-left items-start' : 'text-center items-center'

  return (
    <motion.div className={`flex flex-col gap-3 ${alignClass}`}>
      {kicker ? (
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-cyan-300">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          {kicker}
        </span>
      ) : null}
      <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-50">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-gray-400">
          {description}
        </p>
      ) : null}
    </motion.div>
  )
}
