# Weather App ☀️🌦️

**Weather App** est une application web responsive construite avec **React + TypeScript + Vite** qui affiche la météo actuelle, les prévisions horaires et sur 5 jours pour une ville donnée (API : OpenWeatherMap).

---

## 📌 Fonctionnalités

- Recherche de la météo par ville (`SearchBox`) 🔎
- Bouton "Current Location" (placeholder) pour définir la ville courante (`CurrentLocation`) 📍
- Affichage des infos principales : température, ressenti, humidité, vent, pression (`WheaterInfos`) 🌡️
- Prévisions horaires (`Hourly`) et prévisions 5 jours (`NextDays`) ⏱️📅
- Mode clair / sombre (`ToogleMode`) 🌙☀️
- Indicateur de chargement (`Loader`) et gestion basique d'erreurs ⚠️

---

## 🧰 Stack technique

- React 19 + TypeScript
- Vite (bundler)
- TailwindCSS + DaisyUI
- Lucide icons
- OpenWeatherMap API

---

## 🚀 Installation et exécution

**Pré-requis :** Node.js (>= 18 recommandé)

1. Cloner le dépôt :

```bash
git clone <repo-url>
cd Weather-App
```

2. Installer les dépendances :

```bash
npm install
# ou
# yarn install
```

3. Lancer en mode développement :

```bash
npm run dev
```

Scripts (déclarés dans `package.json`) :

- `npm run dev` : démarre le serveur de développement (Vite)
- `npm run build` : build de production (`tsc -b && vite build`)
- `npm run preview` : prévisualise le build
- `npm run lint` : exécute ESLint

---

## 🔑 Configuration de l'API key (recommandation)

Actuellement, une clé API est codée en dur dans `src/App.tsx`. Pour la sécurité, remplace-la par une variable d'environnement Vite :

1. Créer un fichier `.env` à la racine :

```
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

2. Utiliser la variable dans `src/App.tsx` :

```ts
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
```

3. Ajouter `.env` à `.gitignore` pour éviter de publier la clé.

> 💡 Suggestion : utiliser la géolocalisation réelle du navigateur pour un vrai bouton "Current Location".

---

## 🧩 Structure principale

- `src/App.tsx` — logique principale, appels à l'API
- `src/components` — composants UI (`SearchBox`, `CurrentLocation`, `WheaterInfos`, `NextDays`, `Hourly`, `Loader`, `ToogleMode`, `LocationName`)
- `public/` — assets statiques
- `vite.config.ts`, `tsconfig.json`, `eslint.config.js`

---

## ✅ Améliorations recommandées

- Supprimer la clé API codée en dur et utiliser `import.meta.env` ✅
- Ajouter tests unitaires / intégration (Vitest / Jest)
- Améliorer l'UX d'erreurs et de chargement
- Cacher/limiter les appels API (caching) et pagination des prévisions
- Internationalisation (i18n)

---

## 🙋 Contribuer

1. Fork & clone
2. Créer une branche dédiée : `feat/...` ou `fix/...`
3. Ouvrir une Pull Request décrivant les changements
4. Lancer `npm run lint` avant la PR

---

## 📜 Licence

Ce projet est sous licence **MIT**.

---

Si tu veux, je peux :

- ajouter un fichier `.env.example` et mettre à jour `src/App.tsx` pour utiliser `import.meta.env` ✅
- traduire ce README en anglais 🇬🇧
- ajouter une section déploiement (Vercel / Netlify)

Dis-moi ce que tu souhaites que je fasse ensuite ! ✨
If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
