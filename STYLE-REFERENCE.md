# Portfolio — Architecture & Guide de style

## Stack

| Technologie | Rôle |
|---|---|
| React 19 + Vite 8 | Framework / build |
| Tailwind CSS v4 | Styles (utilitaire) |
| Framer Motion v12 | Animations |
| react-router-dom v7 | Routing (HashRouter) |

---

## Arborescence `src/`

```
src/
├── components/
│   ├── IntroOverlay.jsx    # Splash d'entrée "eliedev"
│   ├── Navbar.jsx          # Barre de navigation fixe
│   ├── Hero.jsx            # Section accueil (plein écran)
│   ├── GlitchCanvas.jsx    # Canvas pixels verts animés
│   ├── SectionDivider.jsx  # Séparateur entre sections
│   ├── About.jsx           # Bio, skills, timeline
│   ├── Projects.jsx        # Grille de projets
│   ├── Contact.jsx         # Liens sociaux, CV
│   ├── Footer.jsx          # Crédits
│   └── SectionHeading.jsx  # (non utilisé, retirer)
├── hooks/
│   └── useInView.js        # IntersectionObserver one-shot
├── ide/                    # Page secondaire "mode IDE"
├── App.jsx                 # Routes + layout principal
├── index.css               # Thème, keyframes, CSS global
└── main.jsx                # Point d'entrée React
```

---

## Flux de rendu (App.jsx)

```
<Routes>
  <Route path="/">
    <IntroOverlay />          ← "eliedev" flashy, se retire après 2.4s
    <motion.div fadeIn>       ← portfolioShell
      <Navbar />              ← fixe, scroll progress bar
      <main>
        <Hero />              ← arrière-plan: GlitchCanvas
        <SectionDivider />    ← motifs ◆●◇○ animés
        <About />             ← démarre en invert(1), transitionne
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
      <!-- orbes floues fixes (x3) + grain overlay (fixe) -->
    </motion.div>
  </Route>
  <Route path="/ide"> ... </Route>
</Routes>
```

---

## Système de style

### Palette actuelle (tailwind v4 — `index.css`)

```css
@theme {
  --font-sans: 'Inter', ...;
  --font-heading: 'Space Grotesk', ...;
  --font-mono: 'JetBrains Mono', ...;
  --color-accent: #4ade80;
  --animate-cursor-blink: ...;
  --animate-gradient: ...;
}
```

Fond global : `#0b0b0b` — texte : `gray-100` à `gray-600` — accent : `green-400` / `cyan-400`

### Conventions de classes Tailwind

- **Section wrapper** : `py-24 sm:py-32 border-t border-white/5`
- **Conteneur interne** : `max-w-5xl mx-auto px-6`
- **Label de section** : `font-mono text-sm text-green-400` avec `// ` en `text-gray-600`
- **Cartes** : `rounded-xl border border-white/[0.07] bg-white/[0.02] p-5`
- **Tags technos** : `font-mono text-[0.68rem] text-cyan-400/60 border border-cyan-500/10 bg-cyan-500/5 rounded px-2 py-0.5`
- **Badge dispo** : `rounded-full border border-green-500/20 bg-green-500/[0.08] px-5 py-2.5 text-green-300`

### CSS personnalisé (index.css)

```css
/* orbes floues — .orb (fixed, blur(100px), z-0) */
@keyframes orb-float / orb-float-2 / orb-float-3

/* grain overlay — .grain (fixed, SVG noise, opacity 0.035, mix-blend overlay) */

/* curseur clignotant — animate-cursor-blink */
@keyframes cursor-blink

/* dégradé animé — animate-gradient */
@keyframes gradient-shift 4s ease infinite
```

---

## Animations et transitions — inventaire complet

### 1. IntroOverlay (arrivée sur le site)

- **Texte "eliedev"** : gradient animé `from-cyan-400 via-emerald-400 to-violet-400` avec `bg-[length:200%_auto]` + `animate-gradient`
- **Entrée** : scale 0.8 → 1, opacity 0 → 1 (0.5s ease-out)
- **Sortie** : scale → 0.4, y → -80, opacity → 0 (0.5s ease), overlay fade (0.6s)
- **Durée** : 2.4s total (1.8s visible + 0.6s sortie)

### 2. Navbar

- **Entrée** : fade + slide down (0.4s)
- **Au scroll** : arrière-plan flou après 40px de scroll
- **Barre de progression** : jauge `from-green-500 to-cyan-400` qui se remplit au scroll
- **Menu mobile** : accordéon avec AnimatePresence

### 3. Hero (GlitchCanvas)

- **Canvas** : ~300 petits carrés verts (`#4ade80`) — glitch (téléportation, colonnes) + dérive + flicker
- **Scroll → convergence** : quand l'utilisateur scrolle (intensity < 0.06), les pixels convergent en grille → écran vert uni
- **Titre** : 3 mots "Développeur web fullstack" apparaissent mot à mot avec slide + rotateX (stagger 0.1s, delay 0.5s)

### 4. SectionDivider (entre chaque section)

- Trait horizontal transparent → white/6
- 2 points lumineux qui voyagent (gauche→droite, 6s loop, décalés)
- 4 symboles géométriques (◆●◇○) qui pulsent en cascade

### 5. About

- **Contenu** : fade-up via `motion.div` (0.6s, triggered par useInView)
- **Timeline** : slide-in avec stagger
- **Transition spéciale** : la section **démarre en `filter: invert(1)`** (négatif photo) →
  quand elle entre dans le viewport, transition 0.9s vers `filter: invert(0)`

### 6. Projects

- **Grille 3 colonnes** (responsive : 2 sur mobile)
- **Cartes** : `motion.a` — fade-up staggered (index * 0.07s)
- **Hover** : `-translate-y-0.5` + glow `shadow-[0_0_30px_-8px_rgba(74,222,128,0.15)]`

### 7. Contact

- **Contenu** : fade-up via `motion.div` (0.6s)
- **Liens sociaux** : staggered avec slide-up
- **Bouton CV** : fade-in

---

## Hook clé : `useInView`

```js
const [ref, inView] = useInView({ threshold: 0.15 })
// one-shot — ne se déclenche qu'une fois, unobserve après
```

Utilisé dans : About (timeline), Projects (cartes), Contact (animations)

---

## Scroll tracking manuel

Hero utilise son propre scroll listener pour calculer `intensity` :

```js
const [scrollY, setScrollY] = useState(0)
// intensity = clamp(0, 1 - scrollY / (vh * 1.2), 1)
// intensity → GlitchCanvas
```

---

## Éléments de fond globaux (App.jsx)

- **3 orbes floues** : positions fixes, animation 28-40s, couleurs emerald/cyan/green à 10-15%
- **Grain overlay** : SVG noise, fixed, z-9999, pointer-events none, 3.5% opacity

---

## Ce qu'un nouveau style peut modifier

1. **Palette de couleurs** : `index.css` (thème Tailwind) + classes dans chaque composant
2. **Typos** : polices dans `index.css` (theme)
3. **Animations d'entrée** : variants Framer Motion dans chaque composant
4. **GlitchCanvas** : remplacer par un autre effet canvas ou supprimer
5. **SectionDivider** : remplacer les symboles/formes
6. **Arrière-plans** : orbes/grain dans App.jsx
7. **Transition About** : `filter: invert()` modifiable ou supprimable
8. **IntroOverlay** : texte, animation, durée
9. **Layout** : `max-w-5xl`, grille projets (3→2 colonnes), padding sections
