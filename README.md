# Plant Recommender

A React-based houseplant matching engine that combines a content-based scoring model with a synthetic collaborative filtering model.

## Features

- Six-question plant consultation
- Content-based matching using light, watering, space, experience, pets, and purpose
- Collaborative matching using similar grower profiles
- Adjustable hybrid weighting between personal criteria and similar growers
- Ranked plant shortlist with match reasons

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite.

## Build

```bash
npm run build
```

## Main component

The original component is kept as `src/J6.jsx` and is rendered through `src/main.jsx`.
