import { motion } from 'framer-motion'

const explorerFiles = [
  { label: 'portfolio/', muted: true },
  { label: 'src/', muted: true },
  { label: 'components/', muted: true },
  { label: 'Hero.jsx' },
  { label: 'About.jsx' },
  { label: 'Projects.jsx' },
  { label: 'Contact.jsx' },
  { label: 'IDE.md', active: true },
]

const openTabs = ['IDE.md', 'Hero.jsx', 'Projects.jsx']

const editorLines = [
  'portfolio.mode = "ide"',
  'portfolio.tone = "editorial / terminal"',
  'availability = {',
  '  format: "stage / CDD",',
  '  cadence: "jeudi + vendredi",',
  '  window: "15 septembre -> 28 février"',
  '}',
  '',
  'focus = ["web fullstack", "interfaces soignées", "expérience claire"]',
]

const terminalLines = [
  '$ npm run ide',
  '> mon-portfolio@0.0.0 ide',
  '> launching editorial shell...',
  '',
  '[ready] Explorer mounted',
  '[ready] Editor stream online',
  '[ready] Terminal waiting for input',
  '',
  'Elie@portfolio:~/stage$ echo "disponible"',
  'disponible',
]

const activity = [
  { label: 'Hero.v1', value: '92%' },
  { label: 'About.timeline', value: '7 nodes' },
  { label: 'Projects.cards', value: '6 blocks' },
  { label: 'Contact.cta', value: '1 action' },
]

function lineClass(content) {
  if (content.includes('mode')) return 'text-cyan-200'
  if (content.includes('availability')) return 'text-emerald-300'
  if (content.includes('focus')) return 'text-sky-200'
  if (content.includes('window')) return 'text-amber-200'
  return 'text-gray-300'
}

export default function IdePage() {
  const isStandaloneIde = typeof window !== 'undefined' && window.location.pathname.includes('/ide/')
  const backHref = isStandaloneIde ? '../' : '#/classic'
  const sectionHrefPrefix = isStandaloneIde ? '../#' : '#/'

  return (
    <section className="min-h-screen bg-[#020617] px-4 py-4 text-gray-50 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-[1600px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#07111f]/90 shadow-2xl shadow-black/40 backdrop-blur-2xl">
        <header className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400/90" />
              <span className="h-3 w-3 rounded-full bg-amber-300/90" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/90" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-cyan-200/70">IDE mode</p>
              <p className="text-sm text-gray-300">mon-portfolio / workspace</p>
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-2 text-xs text-gray-400 md:flex">
            <span className="text-cyan-200">Elie Chardin</span>
            <span className="text-gray-600">•</span>
            <span>Stage / CDD</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <a href={backHref} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 transition hover:border-cyan-400/30 hover:text-cyan-200">
              Retour portfolio
            </a>
          </div>
        </header>

        <div className="grid flex-1 lg:grid-cols-[240px_1fr_340px]">
          <aside className="border-b border-white/10 bg-black/20 p-4 lg:border-b-0 lg:border-r lg:border-white/10">
            <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.28em] text-gray-500">
              <span>Explorer</span>
              <span className="text-cyan-200">Open</span>
            </div>

            <div className="space-y-1 text-sm">
              {explorerFiles.map((file) => (
                <div
                  key={file.label}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 transition ${
                    file.active ? 'bg-cyan-500/10 text-cyan-200' : 'text-gray-300 hover:bg-white/5'
                  }`}
                >
                  <span className={file.muted ? 'text-gray-600' : 'text-cyan-300'}>
                    {file.muted ? '▸' : '▸'}
                  </span>
                  <span className={file.muted ? 'text-gray-500' : ''}>{file.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Workspace state</p>
              <div className="mt-4 space-y-3 text-sm">
                {activity.map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-3">
                    <span className="text-gray-400">{item.label}</span>
                    <span className="font-mono text-cyan-200">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <main className="border-b border-white/10 bg-[#07111f]/85 p-4 lg:border-b-0 lg:border-r lg:border-white/10 lg:p-6">
            <div className="mb-4 flex flex-wrap items-center gap-2 border-b border-white/10 pb-3">
              {openTabs.map((tab, index) => (
                <div
                  key={tab}
                  className={`rounded-t-xl border px-4 py-2 text-sm ${
                    index === 0
                      ? 'border-cyan-400/30 bg-cyan-500/10 text-cyan-100'
                      : 'border-white/10 bg-white/5 text-gray-400'
                  }`}
                >
                  {tab}
                </div>
              ))}
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#030712]/90 shadow-inner shadow-black/30">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 text-xs text-gray-500">
                <span>IDE.md</span>
                <span>markdown / preview</span>
              </div>
              <div className="grid grid-cols-[64px_1fr] gap-0 font-mono text-sm leading-7">
                <div className="border-r border-white/10 bg-black/20 px-3 py-4 text-right text-gray-600">
                  {editorLines.map((_, index) => (
                    <div key={index}>{index + 1}</div>
                  ))}
                </div>
                <div className="px-5 py-4">
                  {editorLines.map((line, index) => (
                    <div key={index} className={lineClass(line)}>
                      {line || '\u00a0'}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Quick notes</p>
                <p className="mt-3 text-sm leading-relaxed text-gray-300">
                  Portfolio pensé comme un espace de travail vivant: lisible, technique, et légèrement ludique.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Shortcuts</p>
                <p className="mt-3 text-sm leading-relaxed text-gray-300">
                  <span className="font-mono text-cyan-200">Ctrl + K</span> pour naviguer, <span className="font-mono text-cyan-200">Cmd + Enter</span> pour envoyer le message.
                </p>
              </div>
            </div>
          </main>

          <aside className="bg-black/20 p-4 lg:p-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/20">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.32em] text-gray-500">Terminal</p>
                <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-emerald-300">
                  live
                </span>
              </div>

              <div className="mt-4 space-y-2 rounded-2xl border border-white/10 bg-[#030712] p-4 font-mono text-sm leading-6 text-gray-300">
                {terminalLines.map((line, index) => (
                  <div key={index} className={index === 0 ? 'text-cyan-200' : index === 7 ? 'text-amber-200' : ''}>
                    {line || '\u00a0'}
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-100/70">Status</p>
                <p className="mt-3 text-sm leading-relaxed text-gray-200">
                  Disponible pour stage / CDD, jeudi et vendredi en entreprise, du 15 sept. au 28 fév.
                </p>
              </div>

              <div className="mt-5 flex gap-3">
                <a
                  href={`${sectionHrefPrefix}contact`}
                  className="flex-1 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-400 px-4 py-3 text-center text-sm font-semibold text-gray-950 transition hover:-translate-y-0.5"
                >
                  Ouvrir le contact
                </a>
                <a
                  href={`${sectionHrefPrefix}projets`}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-200 transition hover:border-cyan-400/30 hover:text-cyan-200"
                >
                  Projets
                </a>
              </div>
            </div>

            <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-gray-300">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Reading list</p>
              <ul className="mt-3 space-y-2">
                <li>• React + Tailwind + Framer Motion</li>
                <li>• Architecture simple, visuel plus expressif</li>
                <li>• Parcours orienté web fullstack</li>
              </ul>
            </div>
          </aside>
        </div>

        <footer className="flex flex-col gap-3 border-t border-white/10 bg-white/[0.04] px-4 py-3 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>IDE session active: portfolio-ui</p>
          <p className="font-mono text-cyan-200/70">#/ide · ready</p>
        </footer>
      </div>
    </section>
  )
}