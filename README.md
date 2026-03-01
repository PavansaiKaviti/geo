# Geo

Next.js + TypeScript app with region mismatch dialog (MUI) and IP on home.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Flow

1. User visits with **`?site_region=ca`** (or `site_region=us`) from a different region.
2. Middleware reads Vercel geo and sets **`x-region-mismatch: true`** when region doesn’t match.
3. **RegionProvider** reads headers and renders **RegionMismatchDialog** (MUI).
4. User sees: **“Looking for Canada?”** (or US) with **Visit Canada** / **Visit US** and **Stay here**.

## Test on Vercel

- **US user on CA site:** share `https://your-app.vercel.app/?site_region=ca` — they see the “Looking for Canada?” dialog.
- **CA user on US site:** share `https://your-app.vercel.app/?site_region=us` — they see the “Looking for US?” dialog.
- **Home page** shows **IP address** when deployed on Vercel.

## Scripts

- `npm run dev` – start dev server
- `npm run build` – build for production
- `npm run start` – start production server
- `npm run lint` – run ESLint
