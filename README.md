# Portfolio — [Prénom Nom]

Portfolio personnel construit avec React, Tailwind CSS et Framer Motion.

## Stack

- React + Vite
- Tailwind CSS v4
- Framer Motion (animations)
- react-router-dom (HashRouter pour GitHub Pages)
- gh-pages (déploiement)

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

## Déploiement sur GitHub Pages

1. Configure le `base` dans `vite.config.js` avec le nom de ton dépôt :
   ```js
   base: '/nom-de-ton-depot/',
   ```

2. Lance le déploiement :
   ```bash
   npm run deploy
   ```

Le site sera accessible sur `https://<username>.github.io/<nom-de-ton-depot>/`

## Personnalisation

Remplace tous les placeholders entre `[crochets]` par tes vraies informations :

- `[Prénom]` / `[Nom]` — ton nom complet
- `[PN]` — les initiales pour le logo navbar
- `[username]` — ton GitHub username
- `[ton@email.com]` — ton adresse email
- `[entreprise]` — l'entreprise de ton stage
- Les descriptions de projets dans `src/components/Projects.jsx`
- Les compétences dans `src/components/About.jsx`
- Les liens sociaux dans `src/components/Contact.jsx`
- Le fichier CV : place ton PDF dans `public/` et adapte le lien dans Contact.jsx
