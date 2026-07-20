# Portfolio — Nouvelles animations : typographie cinétique & scroll

> Complète NEW-STYLE-GUIDE.md. À implémenter avec Framer Motion v12 (déjà en dépendance) et le hook `useInView` existant (`src/hooks/useInView.js`).
> Objectif : chaque texte important devient un mini-spectacle — lettres qui varient en taille/couleur/poids — sans nuire à la lisibilité ni aux perfs.

---

## 1. Composant central : `<KineticText />`

Nouveau composant réutilisable, à créer dans `src/components/KineticText.jsx`.

**Principe** : split le texte en `<span>` par lettre (ou par mot selon le contexte), chaque lettre reçoit :
- un `delay` en cascade (stagger),
- une couleur piochée dans `[volt, volt-hot, volt-deep, ink]` (cycle ou aléatoire seedé pour rester stable au reload),
- une variation de taille (`font-size` ou `scale`) et parfois de graisse si police variable disponible.

**Props suggérées** :
```jsx
<KineticText
  text="Développeur web fullstack"
  as="h1"                     // balise de sortie
  splitBy="word"              // "letter" | "word"
  trigger="inView"            // "inView" | "mount" | "hover"
  colorCycle={["volt", "volt-hot", "volt-deep", "ink"]}
  sizeVariance={0.15}         // +/- 15% de variation de taille par lettre
  stagger={0.04}
/>
```

**Variants Framer Motion type** :
```js
const letter = {
  hidden: { opacity: 0, y: 20, scale: 0.7, rotate: -6 },
  visible: (i) => ({
    opacity: 1, y: 0, scale: 1, rotate: 0,
    transition: { delay: i * 0.04, type: "spring", stiffness: 300, damping: 18 }
  })
}
```

**Où l'utiliser (avec parcimonie — 1 à 2 fois max par section)** :
- IntroOverlay : le "eliedev" en entrée (remplace le simple gradient) → lettres qui popent une à une avec couleur alternée.
- Hero : le titre "Développeur web fullstack" — déjà animé mot à mot dans l'existant, on ajoute la variation de couleur/taille par lettre sur le mot-clé (ex: "fullstack" en kinetic complet, le reste en fade classique pour ne pas surcharger).
- Titres de section (`About`, `Projects`, `Contact`) : uniquement le mot-clé du titre, pas toute la phrase.

⚠️ **Règle anti-surcharge** : jamais plus d'un `KineticText` actif visible à l'écran en même temps. Le reste du texte reste sobre (fade-up classique) pour que l'effet garde son impact.

---

## 2. Idées d'animations au scroll (nouvelles, en plus de l'existant)

### A. Hover-scrub sur les titres de section
Au survol d'un titre de section, chaque lettre grossit légèrement et change de couleur selon la position de la souris (proximité = plus flashy). Effet "magnétique" léger, en CSS/JS pur (`onMouseMove` + calcul de distance), pas besoin de lib.

### B. Compteur de progression cinétique dans la Navbar
La barre de progression existante (jauge scroll) est complétée par un **pourcentage texte** à côté, dont les chiffres changent de couleur/taille en fonction de la vitesse de scroll (scroll rapide = lettres plus grandes et plus flashy, scroll lent = calme).

### C. "Split reveal" sur les paragraphes clés (About)
Au lieu du simple fade-up, le paragraphe de présentation se révèle mot par mot avec un `clip-path` qui monte (façon rideau), chaque mot avec une micro-variation de couleur en fin de révélation (flash volt puis retour au blanc en 0.2s) — donne un effet "punchy" sans rester coloré en continu.

### D. Cartes Projets : titre en kinetic au hover
Le titre du projet, au hover de la carte, se réanime lettre par lettre avec un léger `y` bounce + couleur volt qui traverse le mot comme une vague (stagger très court, 0.02s).

### E. Scroll-linked morph sur le fond (remplace/complète le GlitchCanvas)
Utiliser `useScroll` + `useTransform` de Framer Motion pour lier la teinte dominante du fond (orbes) à la position de scroll : on traverse doucement `volt-deep → volt-hot → volt` entre le Hero et le Footer, créant une progression chromatique sur toute la page (subtil, jamais saturé, opacité max 12%).

### F. Section transition "flash" (remplace/complète SectionDivider)
Au moment où une nouvelle section entre en viewport, un très bref flash (80-120ms) d'un des 3 tons volt traverse le `SectionDivider` horizontal (comme un influx électrique), avant de revenir à l'état neutre blanc/6%.

### G. Nombre/stats animés en kinetic (si section stats/skills)
Si des chiffres apparaissent (années d'XP, nb de projets), ils comptent depuis 0 avec une taille qui "overshoot" légèrement au moment d'atteindre la valeur finale (spring bounce), couleur volt qui se fige une fois arrivé à la valeur cible.

---

## 3. Priorisation suggérée (si tout n'est pas implémenté d'un coup)

| Priorité | Animation | Effort | Impact |
|---|---|---|---|
| 1 | `KineticText` sur IntroOverlay + mot-clé Hero | Moyen | Très fort (1re impression) |
| 2 | Hover kinetic sur titres de cartes Projets (D) | Faible | Fort |
| 3 | Flash chromatique sur SectionDivider (F) | Faible | Moyen |
| 4 | Split reveal paragraphes About (C) | Moyen | Moyen |
| 5 | Scroll-linked morph fond (E) | Moyen-élevé | Moyen (subtil) |
| 6 | Hover-scrub magnétique titres (A) | Élevé | Bonus |
| 7 | Compteur scroll dans Navbar (B) | Faible | Bonus |

---

## 4. Contraintes de performance à respecter

- Toujours utiliser `transform` et `opacity` (pas `width`/`top`/`font-size` animés en boucle) pour rester GPU-friendly — sauf `KineticText` où la variation de taille se fait via `scale`, pas `font-size`, pour la même raison.
- Le split par lettre ne doit se faire qu'au `mount`/`inView` (one-shot, comme `useInView` actuel) — jamais de re-split au re-render.
- Sur mobile : réduire le nombre de lettres animées individuellement (préférer `splitBy="word"` plutôt que `"letter"` en dessous de 640px) pour éviter de multiplier les `motion.span` sur petit écran.
- Respecter `prefers-reduced-motion` : si activé, `KineticText` doit s'afficher directement sans stagger ni scale (fade simple 0.2s).