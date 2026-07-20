# Portfolio VOLT KINETIC — Spécifications complètes

> Stack : React 19 + Vite 8 + Tailwind v4 + Framer Motion v12 + react-router-dom v7
> Auteur : Elie Chardin

---

## 1. Déploiement GitHub Pages

### Prérequis
- Repo GitHub : `https://github.com/Elieleche/mon-portfolio`
- Domaine custom (optionnel) : `elie-chardin.fr`

### Setup vite config
```js
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/mon-portfolio/', // nom du repo GitHub
})
```

### Déployer
```bash
npm run build
# copier dist/ vers gh-pages ou utiliser action GitHub
```

Alternative : ajouter `"homepage": "https://elieleche.github.io/mon-portfolio"` dans `package.json`.

### Fichiers requis dans /public
- `favicon.svg` — icône du site
- `cv-elie-chardin.pdf` — CV à télécharger (✅ placeholder OK, fichier à déposer)
- `og-image.png` — 1200×630px, image de partage réseaux sociaux

---

## 2. Thème VOLT KINETIC

### Couleurs
```css
--color-volt:      #D4FF00   /* vert fluo */
--color-volt-hot:  #FF3EA5   /* rose */
--color-volt-deep: #7A5CFF   /* violet */
--color-ink:       #F4F4F2   /* blanc cassé */
```

### Fond
- `#0A0A0F` (noir profond), appliqué via `#0b0b0b` sur les conteneurs

### Polices (Google Fonts / Fontshare)
- **Bricolage Grotesque** — headings (mais utilisé comme `font-heading` via Space Grotesk/Inter fallback dans le code actuel)
- **General Sans** — body (via Inter fallback actuellement)
- **JetBrains Mono** — mono

Fonts actuellement chargées dans `index.html` : Inter, JetBrains Mono, Space Grotesk.  
→ Si changement vers Bricolage Grotesque / General Sans : mettre à jour les `href` et les `font-family` dans `index.css`.

### Scroll snap
```css
html { scroll-snap-type: y mandatory; }
section { snap-align: start; scroll-margin-top: 3.5rem; } /* 14 = h-14 de la navbar */
```
Sections concernées : Hero (#accueil), About (#apropos), Projects (#projets), Contact (#contact).

### Animations globales
- 3 orbes floues (blur 80px) flottantes en arrière-plan, opacité 0.05/0.035
- Grain overlay SVG (opacité 0.02, mix-blend overlay)
- IntroOverlay splash "eliedev" une fois par session (sessionStorage)

---

## 3. Architecture des composants

```
src/
├── App.jsx              # Routes (/ + /ide + catch-all redirect)
├── main.jsx             # Entry point ReactDOM
├── index.css            # Thème Tailwind v4, keyframes, snap
├── hooks/
│   └── useInView.js     # Custom hook intersection observer
├── components/
│   ├── Navbar.jsx       # Barre fixe, scroll progress, menu mobile
│   ├── Hero.jsx         # Accueil : prompt, KineticText, badge, CTAs
│   ├── About.jsx        # Bio, skills, timeline, transition invert au scroll
│   ├── Projects.jsx     # Grille 3 colonnes, 5 projets + CTA, expand
│   ├── Contact.jsx      # Badge dispo, liens sociaux (3), téléchargement CV
│   ├── Footer.jsx       # Copyright + stack credit
│   ├── KineticText.jsx  # Split lettre/mot avec spring, scale hashé, cycle couleurs
│   ├── SectionDivider.jsx # Trait + points voyageurs + symboles ◆●◇○
│   └── IntroOverlay.jsx # Splash "eliedev" avec sessionStorage + reduced-motion
└── ide/
    └── IdePage.jsx      # Route /ide (non modifiée)
```

---

## 4. Contenu textuel complet

### Navbar
- `~/elie.chardin`
- Liens : `à propos` / `projets` / `contact`

### Hero
```
▶ elie.chardin _

[KineticText] Développeur web fullstack

Étudiant à Epitech Lyon — recherche stage dev web (alternance/4-6 mois)

● En recherche stage dev web · disp. jeudi & vendredi

[Voir mes projets] [Me contacter]

● git status: available · Epitech Lyon
```

### About — Bio
```
Étudiant à Epitech Lyon, je me spécialise dans le développement web fullstack.
Passionné par les interfaces modernes et les expériences soignées.

J'ai effectué un stage en développement Angular au sein de la SNCF, et je
développe régulièrement des projets en React pour explorer de nouvelles approches.

Disponible pour un stage / CDD, jeudi et vendredi en entreprise, du
15 septembre au 28 février.
```

Soft skills : Curieux, Autonome, Esprit d'équipe, Rigoureux  
Stack : React, Angular, TypeScript, JavaScript, Node.js, Python, Git, Docker

### About — Timeline (7 items)
1. **Première année Epitech Lyon** — Piscine pour découvrir le C, première année concentrée sur le C et la gestion de la mémoire.
2. **Deuxième année à Epitech Lyon** — (pas de description)
3. **Stage — Développeur Angular** — Développement d'une application web fullstack en Angular & AWS chez SNCF DGSI Voyageurs
4. **Encore une Piscine !** — Piscine pour découvrir le C++ et le Rust, avec des projets de Network, d'orienté objet...
5. **Spécialisation web** — Malgré mon attrait pour certaines technos à l'école, la majorité de mes projets perso sont restés orientés web fullstack.
6. **Piscine AWS** — En lien avec Epitech, j'ai participé à une piscine organisée par AWS pour découvrir les services cloud et l'infrastructure as code.
7. **Recherche de stage / CDD** — Disponible jeudi & vendredi en entreprise, du 15 sept. au 28 fév. De préférence en développement web fullstack.

### Projets — 5 fiches

**CS2 Don't Be a Bottom**
- Desc : Bot Discord tout-en-un pour CS2 : smokes time-codées, suivi Elo Faceit et app web.
- Contexte : Personnel — lassé de devoir alt-tab pendant les matchs pour chercher des smokes.
- Rôle : Solo
- Challenge : Coordination des appels API Faceit (rate limits) + rendu de graphiques Matplotlib en mémoire sans fichier temporaire.
- Tech : Architecture modulaire Python... (voir About.jsx ligne 9)
- Tags : Python, Discord.py, Faceit API, Matplotlib

**Zappy**
- Desc : Jeu réseau Epitech : serveur C, IA Python asynchrone, GUI C++/SFML isométrique.
- Contexte : Projet de fin de module réseau Epitech — équipe de 7, 3 mois.
- Rôle : Serveur C (scheduler, protocole TCP, simulation du monde torique)
- Challenge : Synchronisation temps réel entre serveur C, GUI SFML et IA Python asyncio — gestion des deadlocks sur le scheduler multi-client.
- Tags : C, C++17, SFML, Python, TCP

**Raytracer**
- Desc : Moteur de rendu 3D par lancer de rayons en C++17 avec design patterns Factory/Strategy/Composite.
- Contexte : Projet Epitech — 4 personnes, 1 mois.
- Rôle : Architecture des matériaux (Reflective, Transparent, Composite) + parsing de scène
- Challenge : Implémentation correcte de la réfraction (loi de Snell-Descartes) et du rendu multithreadé sans race conditions.
- Tags : C++17, SFML, Multithreading, Makefile

**Arcade**
- Desc : Plateforme de jeux rétro à chargement dynamique de plugins .so.
- Contexte : Projet Epitech — 3 personnes, 1 mois.
- Rôle : Core (chargement dynamique .so, pont IGame/IGraphical) + binding des événements
- Challenge : Interface C++ dynamique via dlopen/dlsym sans fuite mémoire ni crash.
- Tags : C++, ncurses, SDL2, SFML

**CODNAME**
- Desc : Tournoi de prompt injection : défendre un code secret derrière un mot de passe, ou le voler chez l'adversaire.
- Contexte : Tournoi de prompt injection Epitech (2026) — solo, 2 semaines. Sujet : sécurité LLM / red teaming.
- Rôle : Conception et exécution de l'attaque + rédaction de la défense
- Challenge : Trouver une attaque unique fonctionnant contre toute défense adverse.
- Tags : Prompt Engineering, LLM, Red Team, Security

**CTA card** : `$ contact --collaboration` / Envie de builder ensemble ? / cliquer pour me contacter ▸

### Contact
```
// contact

Envie d'échanger ?

Je suis disponible pour discuter d'une opportunité de stage / CDD.
N'hésitez pas à m'écrire — je réponds rapidement.

● En recherche stage dev web · disp. jeudi & vendredi

[GitHub] [LinkedIn] [Email]

[Télécharger mon CV]
```

### Footer
```
© 2026 Elie Chardin
React · Tailwind · Framer Motion
```

---

## 5. Placeholders restants à remplir

| Fichier | Champ | Valeur actuelle | Statut |
|---------|-------|-----------------|--------|
| `Projects.jsx` | CS2 github | `'#'` | ❌ lien manquant |
| `Projects.jsx` | Zappy github | `'#'` | ❌ lien manquant |
| `Projects.jsx` | Raytracer github | `'#'` | ❌ lien manquant |
| `Projects.jsx` | Arcade github | `'#'` | ❌ lien manquant |
| `Projects.jsx` | CODNAME github | `'#'` | ❌ lien manquant |
| `Projects.jsx` | Zappy source | `'#'` | ❌ lien manquant |
| `Projects.jsx` | Raytracer source | `'#'` | ❌ lien manquant |
| `Projects.jsx` | Arcade source | `'#'` | ❌ lien manquant |
| `Projects.jsx` | CODNAME source | `'#'` | ❌ lien manquant |
| `/public/` | CV | `cv-elie-chardin.pdf` | ❌ fichier à déposer |
| `/public/` | OG image | `og-image.png` | ❌ fichier à créer |

---

## 6. Roadmap / améliorations possibles

### Court terme (avant mise en ligne)
- [ ] Remplir les 9 liens GitHub/source des projets
- [ ] Déposer le CV PDF dans `/public/cv-elie-chardin.pdf`
- [ ] Créer une OG image 1200×630 dans `/public/og-image.png`
- [ ] Ajouter une capture d'écran par projet (champ image dans les données)
- [ ] Vérifier le titre de la timeline "Deuxième année à Epitech Lyon" — description vide

### Moyen terme
- [ ] Page 404 personnalisée
- [ ] Formulaire de contact fonctionnel (au lieu de juste mailto)
- [ ] Filtres sur la grille de projets par techno
- [ ] Version anglaise (toggle FR/EN)

### Long terme
- [ ] Stats GitHub en direct
- [ ] Tests unitaires (vitest)
- [ ] Blog / articles

---

## 7. Build & dev

```bash
npm install      # installer les dépendances
npm run dev      # serveur dev (Vite)
npm run build    # build production → dist/
npm run preview  # prévisualiser le build
npm run lint     # linter (si configuré)
```

Build actuel : ✅ zéro erreur, 396 KB JS gzipé (126 KB), 47 KB CSS (8 KB gzip).

---

## 8. Comportements spéciaux

- **prefers-reduced-motion** : KineticText et IntroOverlay désactivent leurs animations (rendu statique)
- **IntroOverlay** : ne s'affiche qu'une fois par session onglet (sessionStorage)
- **About** : commence en `filter: invert(1)` → transition 0.9s vers normal au scroll
- **Projets** : grille responsive 1/2/3 colonnes, expand avec AnimatePresence
- **Navbar** : fond opaque + blur au scroll, barre de progression en haut
- **SectionDivider** : points voyageurs qui défilent horizontalement
- **Orbes** : 3 cercles flous en fixed background, animations float différentes
