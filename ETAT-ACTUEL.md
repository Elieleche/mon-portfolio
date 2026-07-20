# Portfolio — État actuel complet (juillet 2026)

> À donner à Claude pour savoir quoi ajouter/modifier.

---

## Stack technique

React 19 + Vite 8 + Tailwind CSS v4 + Framer Motion v12 + react-router-dom v7

---

## Thème : "VOLT KINETIC"

| Token | Couleur | Usage |
|---|---|---|
| `--color-volt` | `#D4FF00` | Accent principal, labels, badges, boutons |
| `--color-volt-hot` | `#FF3EA5` | 2e ton animations lettres |
| `--color-volt-deep` | `#7A5CFF` | 3e ton, timeline, profondeur |
| `--color-bg` | `#0A0A0F` | Fond global |
| `--color-ink` | `#F4F4F2` | Texte clair |
| `--color-ink-dim` | `#8A8A94` | Texte secondaire |
| `--font-heading` | Bricolage Grotesque / Archivo Black | Titres display |
| `--font-sans` | General Sans / Inter | Corps de texte |
| `--font-mono` | JetBrains Mono | Tags, labels `//`, code |

---

## Routage

- `/` → Portfolio one-page (sections ancrées)
- `/ide` → Page secondaire "mode IDE" (style VS Code)
- `*` → Redirection vers `/`

---

## Composants — inventaire complet

### 1. `IntroOverlay.jsx`
- Splash d'entrée : "eliedev" en dégradé volt→hot→deep animé
- Lettres popent une à une (spring, 0.15s + stagger 0.06s)
- Puis zoom arrière + fondu (2.4s total) → page révélée

### 2. `Navbar.jsx`
- Fixe, transparente → floue au scroll (40px threshold)
- Barre de progression volt→hot en bas (scroll progress)
- Menu mobile hamburger (AnimatePresence)
- Lien gauche : `~/elie.chardin` (ancre #accueil)

### 3. `Hero.jsx`
- Pleine écran, snap-start
- Prompt terminal : `▶ elie.chardin _` (cursor clignotant)
- Titre `<KineticText>` : "Développeur web fullstack" mot par mot (ink→volt→volt-hot)
- Tagline : "Étudiant à Epitech Lyon — interfaces soignées..."
- Badge dispo : dot vert pulsant + texte volt
- 2 CTA : "Voir mes projets" (fond volt) + "Me contacter" (bordure)
- Git status : `● git status: available · Epitech Lyon`

### 4. `About.jsx`
- Transition spéciale : **démarre en `filter: invert(1)`** (négatif photo) → transition 0.9s vers normal quand visible
- Bio : Epitech Lyon, stage Angular SNCF, dispo stage/CDD
- Stack : React, Angular, TypeScript, JavaScript, Node.js, Python, Git, Docker
- Soft skills : Curieux, Autonome, Esprit d'équipe, Rigoureux
- Timeline (7 étapes) : Piscine C → 2e année → Stage Angular → Piscine C++/Rust → Spécialisation web → Piscine AWS → Recherche stage

### 5. `Projects.jsx`
- Grille 3 colonnes (2 sur mobile), snap
- 5 projets + 1 carte CTA (6e slot)
- Chaque carte : cliquable → expand avec détails techniques (AnimatePresence)
- En-tête : titre + icônes GitHub + lien externe
- Tags en volt, bordure `border-2`
- CTA card : bordure pointillée, "Envie de travailler ensemble ?" → lien `#contact`

#### Projets listés :
1. **CS2 Don't Be a Bottom** — Python, Discord.py, Faceit API, Matplotlib
2. **Zappy** — C, C++17, SFML, Python, TCP
3. **Raytracer** — C++17, SFML, Multithreading, Makefile
4. **Arcade** — C++, ncurses, SDL2, SFML
5. **CODNAME** — Prompt Engineering, LLM, Red Team, Security
6. *(CTA)* — lien vers contact

### 6. `Contact.jsx`
- Titre "Envie d'échanger ?"
- Badge dispo (identique Hero)
- 3 liens sociaux : GitHub, LinkedIn, Email (icônes SVG, staggered)
- Bouton Télécharger CV (fond volt, glow hover)

### 7. `Footer.jsx`
- Copyright `[Prénom Nom]` (à remplacer)
- Ligne : "React · Tailwind · Framer Motion"

### 8. `SectionDivider.jsx`
- Entre chaque section : trait horizontal + 2 points lumineux voyageurs (volt/volt-hot)
- 4 symboles géométriques ◆●◇○ qui pulsent en cascade

### 9. `KineticText.jsx` *(composant réutilisable)*
- Split texte par lettre ou mot
- Animation spring (lettre) ou fade (mot)
- Cycle de couleurs stable, scale variance hashée
- Trigger mount ou inView

### 10. `GlitchCanvas.jsx` *(existant mais non utilisé)*
- Canvas pixels volt, convergence vers écran vert
- Désactivé du Hero, gardé pour usage futur

---

## Éléments de fond globaux

- **3 orbes floues** : volt/hot/deep, dérive 28-40s, fixed, z-0
- **Grain overlay** : SVG noise, 3.5% opacity, mix-blend overlay, fixed, z-9999

---

## Comportements de scroll

- `scroll-snap-type: y mandatory` sur `<html>` + `snap-start` sur chaque section
- Navbar : `scroll-mt-14` (56px) sur About/Projects/Contact, pas sur Hero
- `useInView` : IntersectionObserver one-shot pour déclencher animations

---

## Placeholders à remplacer

| Où | Valeur actuelle |
|---|---|
| Footer | `[Prénom Nom]` |
| Contact GitHub | `https://github.com/[username]` |
| Contact LinkedIn | `https://linkedin.com/in/[username]` |
| Contact Email | `mailto:[ton@email.com]` |
| Contact CV | `/cv-[prenom-nom].pdf` |
| Projets liens GitHub | `'#'` (5 projets) |
| Projets liens source | `'#'` (Zappy, Raytracer, Arcade, CODNAME) |
| Stage Angular détail | `[techno backend]` et `[entreprise]` |

---

## Idées possibles d'ajouts (liste non fermée)

- Section compétences visuelle (barres de progression, radar chart)
- Section témoignages / recommandations
- Mode dark/light toggle
- Page blog / articles techniques
- Timeline plus riche (années, dates précises)
- Filtres sur la grille projets (par techno)
- Galerie d'images pour les projets
- Stats en direct (GitHub contributions, etc.)
- Formulaire de contact fonctionnel
- Version anglaise du site
- Page 404 personnalisée
- Analytics / SEO
- Tests unitaires (vitest)
- Animations de scrolling supplémentaires
