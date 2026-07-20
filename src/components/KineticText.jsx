import { motion, useReducedMotion } from 'framer-motion'
import { useMemo } from 'react'
import { useInView } from '../hooks/useInView'

const colorMap = {
  volt: '#D4FF00',
  'volt-hot': '#FF3EA5',
  'volt-deep': '#7A5CFF',
  ink: '#F4F4F2',
}

function hash(i) {
  return ((Math.sin(i * 12.9898 + 78.233) * 43758.5453) % 1 + 1) / 2
}

const letterVar = {
  hidden: { opacity: 0, y: 24, rotate: -6 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      delay: i * 0.04,
      type: 'spring',
      stiffness: 300,
      damping: 18,
    },
  }),
}

const wordVar = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.45,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

export default function KineticText({
  text,
  as: Tag = 'span',
  splitBy = 'letter',
  trigger = 'mount',
  colorCycle = ['volt', 'volt-hot', 'volt-deep', 'ink'],
  stagger,
  className = '',
  ...rest
}) {
  const [ref, inView] = trigger === 'inView' ? useInView() : [null, true]
  const prefersReducedMotion = useReducedMotion()

  const tokens = splitBy === 'letter' ? [...text] : text.split(' ')
  const variants = splitBy === 'letter' ? letterVar : wordVar
  const step = stagger ?? (splitBy === 'letter' ? 0.04 : 0.08)

  const scales = useMemo(
    () => tokens.map((_, i) => 1 + (hash(i) - 0.5) * 0.3),
    [tokens.length],
  )

  const childClassName =
    splitBy === 'word' ? 'inline-block mr-[0.3em] last:mr-0' : 'inline-block'

  if (prefersReducedMotion) {
    return (
      <Tag className={className} {...rest}>
        {tokens.map((token, i) => {
          const colorKey = colorCycle[i % colorCycle.length]
          const color = colorMap[colorKey] || colorKey
          return (
            <span key={i} className={childClassName} style={{ color }}>
              {splitBy === 'letter' && token === ' ' ? '\u00A0' : token}
            </span>
          )
        })}
      </Tag>
    )
  }

  return (
    <Tag ref={ref} className={className} {...rest}>
      {(inView ? tokens : []).map((token, i) => {
        const colorKey = colorCycle[i % colorCycle.length]
        const color = colorMap[colorKey] || colorKey

        return (
          <motion.span
            key={`${token}-${i}`}
            custom={i}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={{
              hidden: variants.hidden,
              visible: (i) => ({
                ...variants.visible(i),
                scale: scales[i],
              }),
            }}
            className={childClassName}
            style={{ color }}
          >
            {splitBy === 'letter' && token === ' ' ? '\u00A0' : token}
          </motion.span>
        )
      })}
    </Tag>
  )
}
