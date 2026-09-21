# New R. A. Jewellery House — demo website

Next.js 16 (App Router) + TypeScript + Tailwind 4. No database, no cart — a showroom site that drives calls, WhatsApp chats and store visits.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (must pass with zero errors/warnings)
npm run lint
```

## Update the gold rate

Edit `src/config/goldRate.ts`: set `perGram22K`, `perGram18K`, `updatedAt`, and `isDemo: false` once real values are used. The strip above the header updates everywhere.

## Swap images

The shop's own photos live in `source-photos/` (not served). Run `node scripts/build-photos.mjs` to resize and rename them into `public/images/` (hero, bridal, products, everyday, OG image). To use a different photo, edit the file mapping at the top of that script and re-run it, or drop a finished JPG straight into `public/images/` under the same filename. The logo is `public/images/logo/ra-logo.png` (also `src/app/icon.png` for the favicon). Ratios: hero 16:7 desktop / 4:5 mobile, bridal portrait 3:4, product tiles 1:1, OG 1200x630. Record sources in `public/images/CREDITS.md`.

## Swap products, categories, reviews

- Products: `src/data/products.ts` (code, name, weight, purity, image, tags)
- Collections and their filters: `src/data/collections.ts`
- Categories: `src/data/categories.ts`
- Reviews: `src/data/reviews.ts`
- Home copy and hero slides: `src/data/home.ts`
- Business facts (phone, address, hours, rating): `src/config/site.ts`

Anything assumed is marked `TODO(client)` and listed in `PLACEHOLDERS.md`.
