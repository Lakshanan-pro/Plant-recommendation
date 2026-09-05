# Plant Recommender — Houseplant Matching Engine

An interactive React app that recommends houseplants based on a short
6‑question quiz about your light, watering habits, space, experience, pets,
and priorities. Under the hood it blends two recommendation strategies:

- **Content-based scoring** — compares your answers directly against each
  plant's care profile (light, water, size, difficulty, pet-safety, etc.).
- **Collaborative filtering** — compares your profile against a synthetic
  community of past "growers" and borrows what worked well for the most
  similar ones (k‑nearest‑neighbors style, using cosine similarity).
- **Hybrid blend** — a slider lets you weight how much to trust your own
  criteria vs. the "similar growers" signal, and the shortlist re-ranks live.

## Tech Stack

- [React 18](https://react.dev/)
- [Vite 5](https://vitejs.dev/) — dev server & build tool
- [Tailwind CSS 3](https://tailwindcss.com/) — utility classes used in the UI
- [lucide-react](https://lucide.dev/) — icon set used throughout the UI

## Project Structure

```
webapp/
├── index.html                 # Vite entry HTML
├── package.json
├── vite.config.js             # Vite config (dev/preview server settings)
├── tailwind.config.js         # Tailwind content paths
├── postcss.config.js          # Tailwind/Autoprefixer pipeline
├── public/
│   └── vite.svg                # favicon
└── src/
    ├── main.jsx                 # React root / entry point
    ├── App.jsx                  # Top-level app shell, renders the recommender
    ├── index.css                # Tailwind directives + base styles
    ├── assets/                  # Static assets (images, etc.)
    └── components/
        └── PlantRecommender.jsx # Original quiz + recommendation engine UI
```

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) 18+ (tested with Node 22)
- npm (comes with Node)

### Install dependencies

```bash
npm install
```

### Run the app in development mode

```bash
npm run dev
```

This starts the Vite dev server (default: http://localhost:5173) with hot
module reloading. Open the printed URL in your browser.

### Build for production

```bash
npm run build
```

The optimized static build is output to the `dist/` folder.

### Preview the production build locally

```bash
npm run preview
```

## Notes on the implementation

- The full quiz + scoring engine + results UI lives in
  `src/components/PlantRecommender.jsx` — this is your original component,
  unchanged in logic or design, and re-exported as `App`'s content.
- The component uses **inline styles** for most visual design (colors,
  spacing, typography) and a handful of **Tailwind utility classes**
  (`flex`, `gap-*`, `grid-cols-*`, etc.) for layout — Tailwind is configured
  so those utility classes render correctly.
- Google Fonts (`Fraunces` and `IBM Plex Sans`) are imported at runtime via a
  `<style>` tag inside the component itself (as in the original file) — no
  extra configuration was needed for this to work.
- `lucide-react` was added as a dependency because the component imports
  icons (`Leaf`, `Sun`, `Droplet`, `Ruler`, `Sparkles`, `ChevronRight`,
  `ChevronLeft`, `RotateCcw`, `Info`) from it.

## Dependencies Added

| Package | Type | Reason |
|---|---|---|
| `react`, `react-dom` | dependency | Core React runtime |
| `lucide-react` | dependency | Icon components used in the JSX |
| `vite`, `@vitejs/plugin-react` | devDependency | Dev server & build tooling for React |
| `tailwindcss`, `postcss`, `autoprefixer` | devDependency | Utility classes (`flex`, `gap-2`, `grid-cols-3`, etc.) used in the JSX |
| `@types/react`, `@types/react-dom` | devDependency | Editor type support (optional, safe to remove if unused) |

## Verified

- ✅ `npm install` completes cleanly.
- ✅ `npm run build` completes with no errors (production bundle generated).
- ✅ `npm run dev` serves the app with no console errors; quiz flow,
  scoring, and results rendering all work end to end.
