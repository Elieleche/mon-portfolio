# Portfolio — Nouveau style : "VOLT KINETIC"

> À implémenter par-dessus l'architecture existante (voir STYLE-REFERENCE.md).
> Stack inchangée : React 19 + Vite + Tailwind v4 + Framer Motion v12 + react-router-dom v7.
> Ce document ne touche PAS à l'arborescence ni à la logique — uniquement palette, typo, classes, et specs des composants visuels.

## Direction créative

Fond sombre conservé (permet le contraste maximal), mais **une seule couleur flashy** devient la signature du site, déclinée en 3 nuances pour les animations de lettres (taille + couleur variables par caractère). Fini le thème "vert hacker/terminal" — nouvelle identité : **brutaliste / kinétique / pop**, plus proche d'un portfolio créatif haut de gamme que d'un thème "dev matrix".

---

## Palette (Tailwind v4 — `index.css` `@theme`)

```css
@theme {
  --font-sans: 'General Sans', 'Inter', system-ui, sans-serif;
  --font-heading: 'Bricolage Grotesque', 'Archivo Black', sans-serif; /* display, gras, impact */
  --font-mono: 'JetBrains Mono', monospace;

  /* Couleur flashy signature */
  --color-volt: #D4FF00;        /* lime électrique — accent principal, CTA, highlights */
  --color-volt-hot: #FF3EA5;    /* rose chaud — 2e ton pour alterner sur les lettres */
  --color-volt-deep: #7A5CFF;   /* violet électrique — 3e ton, profondeur/ombres colorées */

  --color-bg: #0A0A0F;          /* fond quasi noir, légèrement bleuté */
  --color-bg-alt: #12121A;      /* fond section alterné */
  --color-ink: #F4F4F2;         /* texte clair */
  --color-ink-dim: #8A8A94;     /* texte secondaire */

  --animate-letter-pop: letter-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
  --animate-gradient-flash: gradient-flash 3s ease infinite;
}
```

Fond global : `#0A0A0F` — texte : `#F4F4F2` → `#8A8A94` — accent unique décliné : `volt` / `volt-hot` / `volt-deep`.

**Règle d'usage couleur** : le `volt` (lime) reste dominant et rare — CTA, mots-clés, hover states. `volt-hot` et `volt-deep` n'apparaissent que dans les animations de lettres (jamais en fond de bouton ou en gros aplat) pour garder un seul repère de couleur fort.

---

## Typographie

- **Titres (`font-heading`)** : très gras (800-900), tailles généreuses, `letter-spacing: -0.02em`, tout en majuscules pour les labels de section.
- **Corps (`font-sans`)** : normal, lisible, contraste doux (`ink-dim`).
- **Mono (`font-mono`)** : conservé pour tags techs, labels `// section`, badges.

Police display recommandée si dispo via Google Fonts / Fontshare : **Bricolage Grotesque** (variable font — important, voir animations) ou **Archivo Black** en fallback statique.

---

## Conventions de classes Tailwind (remplace celles de STYLE-REFERENCE.md)

- **Section wrapper** : `py-24 sm:py-32 border-t border-white/5` *(inchangé)*
- **Conteneur interne** : `max-w-5xl mx-auto px-6` *(inchangé)*
- **Label de section** : `font-mono text-sm text-[var(--color-volt)] uppercase tracking-wider` avec `// ` en `text-white/30`
- **Cartes** : `rounded-2xl border-2 border-white/10 bg-white/[0.03] p-5` — bordure plus marquée (esprit brutaliste léger)
- **Tags technos** : `font-mono text-[0.68rem] text-[var(--color-volt)]/70 border border-[var(--color-volt)]/20 bg-[var(--color-volt)]/5 rounded px-2 py-0.5`
- **Badge dispo** : `rounded-full border border-[var(--color-volt)]/30 bg-[var(--color-volt)]/10 px-5 py-2.5 text-[var(--color-volt)]`
- **Bouton CTA principal** : fond plein `bg-[var(--color-volt)] text-black font-bold`, hover `scale-[1.03]` + ombre `shadow-[0_0_40px_-8px_rgba(212,255,0,0.5)]`

---

## Éléments de fond globaux

- **Orbes floues** : remplacer les 3 orbes emerald/cyan par des orbes `volt` / `volt-hot` / `volt-deep` à très faible opacité (8-12%), même comportement de dérive lente (28-40s).
- **Grain overlay** : conservé à l'identique (texture SVG noise, 3.5% opacity).
- **Curseur clignotant / dégradé animé** : le `animate-gradient` existant est remplacé par `gradient-flash`, qui cycle entre les 3 tons volt au lieu de cyan/emerald/violet — utilisé sur le texte du IntroOverlay.

---

## Ce que ce style change concrètement par composant

1. **IntroOverlay** : texte d'accroche passe en dégradé `volt → volt-hot → volt-deep`, `bg-[length:200%_auto]` + `animate-gradient-flash`. Support de l'effet "lettres qui pop" décrit dans NEW-ANIMATIONS-IDEAS.md.
2. **Navbar** : barre de progression au scroll passe de `from-green-500 to-cyan-400` à `from-[var(--color-volt)] to-[var(--color-volt-hot)]`.
3. **Hero** : le GlitchCanvas (pixels verts) est remplacé par un canvas de particules `volt` (voir idées d'animation) OU conservé en remplaçant juste la couleur des carrés par `--color-volt`.
4. **SectionDivider** : les symboles ◆●◇○ passent en `volt`/`volt-hot` alternés au lieu du vert unique.
5. **Projects** : hover glow passe en `shadow-[0_0_30px_-8px_rgba(212,255,0,0.25)]`.
6. **About** : la transition `filter: invert(1) → invert(0)` est conservée telle quelle (elle fonctionne avec n'importe quelle palette).

---

## Notes pour l'implémentation (opencode)

- Ne pas casser le hook `useInView` ni la structure de `App.jsx` — uniquement remplacer classes/couleurs/keyframes.
- Si `Bricolage Grotesque` (variable font) n'est pas disponible facilement via `@fontsource` ou Google Fonts, fallback sur `Archivo Black` + `font-weight: 900` fixe (perte de l'effet variable mais visuel proche).
- Toutes les couleurs `green-*` / `cyan-*` du code existant doivent être recherchées et remplacées par les tokens `--color-volt*` ci-dessus (recherche globale utile : `green-400`, `green-500`, `cyan-400`, `emerald`).