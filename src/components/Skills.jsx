import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import {
  SiReact, SiAngular, SiTypescript, SiJavascript,
  SiTailwindcss, SiHtml5, SiCss, SiSass,
  SiNodedotjs, SiPython, SiC, SiCplusplus, SiRust,
  SiDocker, SiGit, SiGithubactions,
  SiMongodb, SiPostgresql, SiRedis, SiFigma,
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa'
import { FiPlay } from 'react-icons/fi'

const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { label: 'React', icon: SiReact },
      { label: 'Angular', icon: SiAngular },
      { label: 'TypeScript', icon: SiTypescript },
      { label: 'JavaScript', icon: SiJavascript },
      { label: 'Tailwind CSS', icon: SiTailwindcss },
      { label: 'Framer Motion', icon: FiPlay },
      { label: 'HTML5', icon: SiHtml5 },
      { label: 'CSS3', icon: SiCss },
      { label: 'Sass', icon: SiSass },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { label: 'Node.js', icon: SiNodedotjs },
      { label: 'Python', icon: SiPython },
      { label: 'C', icon: SiC },
      { label: 'C++', icon: SiCplusplus },
      { label: 'Rust', icon: SiRust },
    ],
  },
  {
    title: 'DevOps & Cloud',
    skills: [
      { label: 'Docker', icon: SiDocker },
      { label: 'AWS', icon: FaAws },
      { label: 'Git', icon: SiGit },
      { label: 'CI/CD', icon: SiGithubactions },
    ],
  },
  {
    title: 'Bases de données & Outils',
    skills: [
      { label: 'MongoDB', icon: SiMongodb },
      { label: 'PostgreSQL', icon: SiPostgresql },
      { label: 'Redis', icon: SiRedis },
      { label: 'Figma', icon: SiFigma },
    ],
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function Skills() {
  const [ref, inView] = useInView()

  return (
    <section id="skills" className="py-24 sm:py-32 border-t border-white/5 snap-start scroll-mt-14">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24, scale: 0.97, filter: 'blur(4px)' }}
          animate={inView ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="font-mono text-sm text-[var(--color-volt)] mb-10 uppercase tracking-wider">
            <span className="text-white/30">// </span>skills
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {skillCategories.map((cat) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
              >
                <p className="font-mono text-xs text-[var(--color-volt)]/60 mb-6 uppercase tracking-wider">
                  // {cat.title}
                </p>

                <motion.div
                  className="flex flex-wrap gap-3"
                  variants={containerVariants}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                >
                  {cat.skills.map(({ label, icon: Icon }) => (
                    <motion.div
                      key={label}
                      variants={itemVariants}
                      className="group flex flex-col items-center gap-1.5 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 transition-all duration-300 hover:border-[var(--color-volt)]/40 hover:bg-[var(--color-volt)]/[0.04] hover:shadow-[0_0_20px_-4px_var(--color-volt)]/20 cursor-default"
                    >
                      <Icon className="text-xl transition-all duration-300 group-hover:text-[var(--color-volt)] group-hover:scale-110" />
                      <span className="font-mono text-[10px] text-gray-500 transition-colors duration-300 group-hover:text-[var(--color-volt)]/70">
                        {label}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
