# DRIFT — Sovereign Indian Handloom Archive & Luxury E-Commerce

> **Live Deployment**: [https://drift-luxury-sarees.manglamtechnicalagency.workers.dev](https://drift-luxury-sarees.manglamtechnicalagency.workers.dev)

DRIFT is an editorial digital atelier documenting six historical regional Indian weaving traditions:
- **Patan Patola** (Gujarat Double Ikat)
- **Varanasi Katan** (Awadh Gold Zari Shikargah)
- **Kanchipuram Korvai** (Tamil Nadu Temple Silk)
- **Paithani Brocade** (Maharashtra Interlocking Tapestry)
- **Jodhpuri Bandhej** (Marwar Pinch-Dyed Georgette)
- **Rajasthani Leheriya** (Jaipur & Kota Diagonal Wave Silk)

## Features
- **3D Regional Loom Carousel**: Smooth Three.js-powered 3D curved cylinder rotating regional couture looks.
- **Single Couture Muse ("Priya")**: Consistent high-resolution editorial photography of authentic drapes.
- **Full-Bleed Hero Video Stage**: Background ambient motion with zero food mentions and authentic textile aesthetics.
- **Autumn-Winter 2026 Editorial Trio**: Curated seasonal looks across distinct cultural origins.
- **2026/2027 Couture Trend Atelier**: 18 handloom trend concepts with 4-tone warp and weft chromatic palettes.
- **Virtual Model Fitting Room**: Photographic drape simulator with 5 classical Indian silhouettes (*Nivi, Seedha Pallu, Nauvari Kashta, Atpoure, Modern Cocktail*).
- **Concierge Shopping & Quick Shop**: Colorway palette swatches, bespoke fall & pico customization, and instant checkout drawer.

## Tech Stack
- **Framework**: Next.js 15 (App Router) + React 18
- **Styling**: Tailwind CSS
- **Animations**: GSAP (ScrollTrigger), Framer Motion, Lenis smooth scroll
- **Edge Deployment**: Cloudflare Workers via `@opennextjs/cloudflare`
- **Database & Storage**: Cloudflare D1 (SQL database) + Cloudflare R2 (media bucket) + Cloudflare KV (edge cache)

## Getting Started

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Run TypeScript checks
npx tsc --noEmit

# Build OpenNext Cloudflare bundle
npm run pages:build

# Deploy to Cloudflare Workers
npm run pages:deploy
```

## Governance & Integrity
In compliance with `AGENTS.md`, all archival listings are catalogued as design studies with verified technical parameters until artisan SKUs and commercial pricing are confirmed by regional makers.
