# CLAUDE.md — New R. A. Jewellery House (Demo Website)

## What we're building

A **demo / pitch website** for **New R. A. Jewellery House**, a local gold jewellery shop at Rajarhat Chowmatha, Kolkata. It will be shown to the owner as part of a Reba Digital Solutions proposal, so it must look finished, load fast, and work perfectly on a phone (the owner will open it on WhatsApp).

Visual reference: parashmanijewellers.com — a Bengali gold jeweller with editorial image grids, centred section titles between hairline rules, an icon strip of trust points, and deep wine / blush / white-silk product photography. **Match that level and feel, but do not copy their images, copy text, logo or layout pixel-for-pixel.** All content here is original.

## Business facts (source of truth — keep in `src/config/site.ts`)

| Field            | Value                                                                             |
| ---------------- | --------------------------------------------------------------------------------- |
| Name             | New R. A. Jewellery House                                                         |
| Short name       | RA Jewellers                                                                      |
| Address          | Bus Stand, Rajarhat Chowmatha, L-91B, Kolkata, West Bengal 700135                 |
| Phone / WhatsApp | +91 90385 13522 (`tel:+919038513522`, `https://wa.me/919038513522`)               |
| Google rating    | 4.2 ★ (53 reviews)                                                                |
| Category         | Jewelry store                                                                     |
| Hours            | Evening opening at 5 pm confirmed; **full schedule is TODO — confirm with owner** |
| Service area     | Rajarhat, New Town, Chinar Park, Baguiati, Salt Lake, Kestopur                    |

Anything not in this table (founding year, hallmark/HUID claims, making charges, schemes, staff names) is **placeholder** and must be marked with `// TODO(client): confirm` and listed in `PLACEHOLDERS.md`.

## Tech stack

- Next.js 16 (App Router, React Server Components), TypeScript, Tailwind CSS
- `next/font` for Google Fonts, `next/image` for all images
- No database. All content is **data-driven** from `src/config/*.ts` and `src/data/*.ts` so real data can be swapped in later without touching components
- Deployable to Vercel as-is; `npm run build` must pass with zero errors and zero lint warnings

## Folder structure

```
src/
  app/
    layout.tsx            // fonts, metadata, JSON-LD, WhatsApp float
    page.tsx              // home
    collections/[slug]/page.tsx
    about/page.tsx
    contact/page.tsx
    sitemap.ts, robots.ts
  components/
    layout/  Header, Footer, MobileNav, WhatsAppFab
    home/    Hero, GoldRateBar, CategoryRow, BridalMosaic, TrustStrip,
             ProductShowcase, EverydaySection, Reviews, VisitStore
    ui/      SectionTitle, ProductCard, Button
  config/    site.ts, nav.ts, goldRate.ts, theme.ts
  data/      categories.ts, products.ts, reviews.ts, collections.ts
public/images/
  hero/ bridal/ products/ everyday/ store/   // see "Images" below
PLACEHOLDERS.md
```

## Design system

Base the look on Bengali bridal gold: sindoor red, wine silk, blush, and the soft white satin used in product shoots. Avoid a generic cream-and-terracotta "luxury template" look.

**Colour tokens** (define in `tailwind.config` / CSS variables):

- `wine` #5A0F2E — primary dark, section backgrounds behind gold products
- `alta` #9B1B4B — accent, links, active states (named after alta, the bridal red dye)
- `gold` #C8962E — rules, icons, price highlights; never as body text on white (contrast)
- `blush` #F4DDE2 — soft section backgrounds, cards behind model shots
- `silk` #FCFAF8 — page background
- `ink` #2B1A21 — body text

**Type:**

- Headings: **Marcellus** (engraved Roman letterforms — feels like a hallmark stamp). Title case, not all caps; generous letter-spacing only on the centred section titles
- Body: **Jost** 400/500
- Bengali: **Noto Serif Bengali** for a single Bengali line under each major section title (e.g. "সোনার গয়না, রাজারহাটের বিশ্বাস"). This bilingual touch is the site's signature — keep it to one short line per section, never full paragraphs
- Body line length ≤ 75ch, line-height 1.6

**Section title pattern** (like the reference): centred title with a thin `gold` hairline on each side, Bengali subline beneath. Build once as `<SectionTitle title bn />`.

**Principles:**

- Photography does the selling. Big images, few words, lots of whitespace
- Spend boldness in one place: the **BridalMosaic**. Everything else stays calm
- One orchestrated load animation on the hero only; no fade-up on every section. Respect `prefers-reduced-motion`
- Square corners on image tiles (editorial feel); small radius only on buttons
- Mobile first. Test at 360px wide

## Home page sections (in order)

1. **GoldRateBar** — thin `wine` strip above the header: "Today's gold rate (22K / 916): ₹\_**\_ per gram · 18K: ₹\_\_**". Values from `config/goldRate.ts` with an `updatedAt` date. Mark as demo values
2. **Header** — logo text (serif wordmark "New R. A. Jewellery House" until a real logo arrives), nav: Home, Collections, Bridal, About, Contact; right side: phone icon + "WhatsApp us" button. Sticky, collapses to a drawer on mobile
3. **Hero** — full-width carousel (3 slides): bridal model shot, necklace close-up on wine silk, festive collection. Headline + one CTA: "Visit the store" / "See bridal collection". Auto-advance paused on hover and for reduced motion
4. **CategoryRow** — horizontal scroll on mobile, grid on desktop: Necklace, Earrings, Bangles & Chur, Rings, Tikli & Mang Tikka, Chain, Pola–Badhano, Kids. Circular crops on `blush`
5. **BridalMosaic** (reference image 1 + 2) — title "Made for Your Big Day". Desktop: one tall model portrait (left, 2 rows) + 4 product tiles on white satin (right 2×2). Below it, a 4-up row alternating model / product on wine silk. Hover: slight zoom + product name overlay
6. **TrustStrip** (reference image 3, top) — `blush` band, 5 line-icons in `gold` stroke: Expert craftsmanship · BIS hallmarked gold (TODO confirm) · Jewellery for every occasion · Custom orders · Old gold exchange (TODO confirm). Use inline SVG line icons, not an icon font
7. **ProductShowcase** (reference image 3, bottom) — title "Let Your Jewellery Speak". 4 square product tiles on dark wood / wine backgrounds. Each ProductCard: image, name, weight (e.g. "approx. 8.2 g"), purity badge, "Ask price on WhatsApp" link that opens `wa.me` with a pre-filled message including the product name and code. **No fixed prices** (gold rates change daily)
8. **EverydaySection** — "Light Jewellery for Every Day": lightweight chains, studs, office-wear rings. Short paragraph + 3 tiles
9. **Reviews** — Google rating badge (4.2 ★, 53 reviews) + 3 short review cards (placeholder text, clearly marked) + "Read reviews on Google" link
10. **VisitStore** — embedded Google Map (iframe, lazy), address, hours, "Get directions" and "Call now" buttons. Line: "Right at the Rajarhat Chowmatha bus stand"
11. **Footer** — 4 columns like the reference: brand + short blurb; Support (Contact, Custom orders, Old gold exchange); Shop (categories); Shop timings. Bottom bar: © year, "Website by Reba Digital Solutions" linking rebadigitalsolutions.com

**WhatsAppFab** — floating green button bottom-right on every page, pre-filled message "Hi, I'd like to know about your jewellery collection."

## Other pages

- `/collections/[slug]` — generated from `data/collections.ts` (bridal, everyday, necklaces, earrings, bangles, rings). Filter chips by category, grid of ProductCards
- `/about` — shop story (placeholder), craftsmanship, store photos
- `/contact` — map, call, WhatsApp, simple enquiry form that composes a WhatsApp message (no backend)

## Images

- Use placeholders now. Generate simple on-brand placeholder images (solid `wine` / `blush` / white-satin gradients with the item name) **or** use free-license stock from Unsplash/Pexels downloaded into `public/images/`. Record every image source in `public/images/CREDITS.md`
- **Never hotlink or download images from parashmanijewellers.com or any other jeweller**
- Keep filenames semantic (`bridal-necklace-01.jpg`) so real shoot photos from the shop can drop in with the same names
- Aspect ratios: hero 16:7 desktop / 4:5 mobile, mosaic portrait 3:4, product tiles 1:1
- Always set `alt` text describing the piece ("22K gold choker with red enamel flowers")

## SEO (local)

- Title pattern: `{Page} | New R. A. Jewellery House, Rajarhat`
- Home title: "Gold Jewellery Shop in Rajarhat, New Town | New R. A. Jewellery House"
- JSON-LD `JewelryStore` in layout: name, address, geo, telephone, openingHours (TODO), aggregateRating 4.2/53, sameAs (Google Maps URL TODO)
- Open Graph image (1200×630) for WhatsApp link previews — this matters most, since the owner will share the link on WhatsApp
- `sitemap.ts`, `robots.ts`, semantic headings (one h1 per page)

## Quality bar

- Lighthouse mobile ≥ 90 performance, ≥ 95 accessibility
- Visible keyboard focus, colour contrast AA, all interactive targets ≥ 44px
- No layout shift from images (always width/height or `fill` with sized parent)
- Test on 360px, 768px, 1280px, 1536px

## Working rules for Claude Code

1. Start by scaffolding the project, config files and design tokens; show the SectionTitle + one section before building the rest
2. Build the home page section by section in the order above; run `npm run build` after each major step
3. Keep all copy in data/config files, not hard-coded in components
4. Every assumed fact gets `// TODO(client): confirm` and a line in `PLACEHOLDERS.md`
5. Do not add a cart, checkout, login or payment — this is a showroom site that drives calls, WhatsApp chats and store visits
6. When done, write a short `README.md`: how to run, how to update the gold rate, how to swap images and products
