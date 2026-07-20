# Résumé du projet — mon-portfolio

## Présentation

**mon-portfolio** est un portfolio personnel en ligne développé par **Elie Chardin**, étudiant en informatique à **Epitech Lyon**. Le site met en avant son profil, ses compétences, ses projets et ses coordonnées, dans une optique de recherche de **stage / CDD** (jeudi et vendredi en entreprise, du 15 septembre au 28 février).

L’identité visuelle repose sur un thème sombre, des dégradés cyan/bleu et des animations fluides. Le ton général est orienté **développement web fullstack**, avec un souci particulier porté aux interfaces soignées et à l’expérience utilisateur.

---

## Stack technique

| Catégorie        | Technologie                          |
|------------------|--------------------------------------|
| Framework UI     | React 19                             |
| Build tool       | Vite 8                               |
| Styles           | Tailwind CSS v4                      |
| Animations       | Framer Motion                        |
| Routing          | react-router-dom (HashRouter)        |
| Déploiement      | gh-pages (GitHub Pages)              |
| Linting          | oxlint                               |

---

## Architecture

```
mon-portfolio/
├── public/              # Assets statiques (favicon, CV PDF)
├── src/
│   ├── components/      # Sections du portfolio
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   ├── Contact.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── SectionHeading.jsx
│   ├── ide/
│   │   └── IdePage.jsx  # Vue alternative « mode IDE »
│   ├── hooks/
│   │   └── useInView.js # Détection d’entrée dans le viewport
│   ├── App.jsx          # Routage et layout principal
│   ├── main.jsx         # Point d’entrée React
│   └── index.css        # Thème global Tailwind
├── vite.config.js
└── package.json
```

---

## Pages et routes

Le site expose deux vues via `HashRouter` :

| Route   | Composant    | Description                                      |
|---------|--------------|--------------------------------------------------|
| `/`     | Portfolio    | Page principale one-page avec sections ancrées   |
| `/ide`  | `IdePage`    | Variante immersive inspirée d’un éditeur de code |
| `*`     | Redirection  | Renvoie vers `/`                                 |

---

## Sections du portfolio

### Hero (`#accueil`)
- Bandeau de disponibilité animé (stage / CDD)
- Nom, titre et pitch personnel
- Informations de disponibilité (rythme et période)
- Boutons d’appel à l’action vers projets et contact
- Indicateur de scroll animé

### À propos (`#apropos`)
- Présentation biographique et qualités humaines
- Barres de compétences animées (React, Angular, JS/TS, Node.js, Python, Git, Docker…)
- Timeline du parcours académique et professionnel (Epitech, stages, piscines, spécialisation web, AWS)

### Projets (`#projets`)
- Grille de 6 cartes de projets cliquables
- Chaque carte affiche titre, description, tags technologiques et lien GitHub
- Animations au survol et à l’apparition dans le viewport

### Contact (`#contact`)
- Message d’accroche et rappel de disponibilité
- Liens sociaux (GitHub, LinkedIn, email)
- Bouton de téléchargement du CV (PDF dans `public/`)

---

## Mode IDE (`/ide`)

Une page secondaire qui simule un environnement de développement (style VS Code) :

- **Explorer** : arborescence fictive du projet
- **Éditeur** : contenu éditorial avec coloration syntaxique
- **Terminal** : sortie simulée de commandes npm
- **Panneau latéral** : statut, raccourcis et liens vers contact/projets

Ce mode renforce l’identité « développeur » du portfolio tout en restant décoratif (pas d’IDE fonctionnel).

---

## Fonctionnalités transverses

- **Navbar fixe** : transparente au départ, floutée au scroll ; menu mobile responsive
- **Animations** : entrées en fondu, barres de progression, stagger sur le Hero (Framer Motion)
- **Hook `useInView`** : déclenche les animations une seule fois quand une section entre dans le viewport (Intersection Observer)
- **Design system** : polices Inter + Space Grotesk, palette sombre `#020617`, accents cyan, glassmorphism (`backdrop-blur`, bordures semi-transparentes)
- **Scroll fluide** : ancres internes entre sections

---

## Scripts npm

```bash
npm run dev       # Serveur de développement Vite
npm run build     # Build de production dans dist/
npm run preview   # Prévisualisation du build
npm run deploy    # Build + déploiement sur GitHub Pages
npm run lint      # Vérification avec oxlint
```

---

## Déploiement

Le site est configuré pour **GitHub Pages** :

- `base: '/mon-portfolio/'` dans `vite.config.js`
- URL cible : `https://<username>.github.io/mon-portfolio/`
- Le `HashRouter` évite les problèmes de routing côté serveur sur GitHub Pages

---

## État d’avancement

### Personnalisé
- Nom : Elie Chardin
- École : Epitech Lyon
- Disponibilité stage / CDD
- Parcours et timeline dans About
- Page IDE complète

### Placeholders restants
Certains contenus utilisent encore des valeurs entre crochets à remplacer :

- Initiales navbar : `[PN]`
- Footer : `[Prénom Nom]`
- Projets : titres, descriptions et liens GitHub
- Contact : username GitHub/LinkedIn, email
- Stage Angular : `[entreprise]`, `[techno backend]`
- CV : `/cv-[prenom-nom].pdf`

---

## Objectif du projet

Présenter de manière professionnelle et visuellement soignée le profil d’un développeur web fullstack en recherche d’opportunité en entreprise, tout en démontrant directement ses compétences front-end (React, Tailwind, animations, responsive design) à travers le site lui-même.
