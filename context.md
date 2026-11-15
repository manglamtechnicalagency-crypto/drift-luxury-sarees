# DRIFT — Project Context & Architecture Reference

> **Living Documentation**: Maintained and updated after every architectural, infrastructure, or code change in the repository.

---

## 1. Project Overview
- **Brand / Concept**: **DRIFT** — Luxury Indian Saree E-Commerce & Curated Handloom Design Archive.
- **Core Mission**: Present six documented Indian textile traditions (*Varanasi Katan, Patan Patola, Jodhpuri Bandhej, Rajasthani Leheriya, Kanchipuram Korvai, and Heritage Paithani*) as contemporary design studies through an editorial 3D digital experience.
- **Compliance & Integrity**: Design studies clearly disclaimed; zero invented reviews, suppliers, prices, or fake certification claims. All imagery represents authentic handloom textile photography.

---

## 2. Technical Stack & Infrastructure

### Frontend Architecture
- **Framework**: Next.js 15.5.29 (App Router)
- **UI Runtime**: React 18.3.1 (React 18 compatibility preserved; no React Three Fiber / Drei)
- **Styling**: Tailwind CSS 3.4.14 with custom luxury palette (`#2B070E` deep wine, `#FAF7F2` warm sand, `#A80F24` imperial crimson, `#D4AF37` / `#E6B83A` antique gold)
- **3D & Canvas Graphics**: Direct Three.js (r169) client effects with WebGL cleanup (`ZariDustLayer.tsx`, `SilkScene.tsx`, `ParticleField.tsx`)
- **Animation & Motion**: Framer Motion 11.11.9, GSAP 3.12.5 (ScrollTrigger scrubbed timelines), Lenis smooth scroll
- **State Management**: Zustand 5.1.0 (`src/store/useStore.ts`) with edge collections hydration and local persistence

### Cloudflare Free-Tier Edge Ecosystem
- **Live Production URL**: `https://drift-luxury-sarees.manglamtechnicalagency.workers.dev`
- **Hosting**: Cloudflare Pages / Workers via `@opennextjs/cloudflare` with static asset binding (`env.ASSETS`)
- **Edge API Framework**: Hono 4.13.18 mounted at `/api/[[...route]]` (`src/server/api.ts`)
- **Relational Database**: Cloudflare D1 (`drift-commerce-db`, ID: `1a3ca3d6-47f5-4da4-a049-b6306af7f878`) with 6 states and 48 sarees seeded
- **Object Storage**: Cloudflare R2 (`drift-media-assets`) zero-egress bucket serving media assets with immutable caching (`Cache-Control: public, max-age=31536000, immutable`)
- **Edge Cache & Rate Limiting**: Cloudflare KV (`EDGE_CACHE`, ID: `31dae1ce64ba4db5b4098890f9c6e37d`) caching `/api/collections` for 300s and enforcing IP rate limits (5 req/min on `/api/newsletter`, 10/hr on `/api/orders`)

---

## 3. Directory Layout & File Ownership

```text
├── db/
│   ├── schema.sql              # D1 schema: states, sarees, orders, newsletter_subscribers + indexes
│   ├── seed.sql                # Generated idempotent SQL seed data (6 states, 48 sarees)
│   └── seed.ts                 # TypeScript D1 seeder script
├── public/
│   ├── collections/            # Verified regional imagery (banarasi, gujarati, jodhpuri, etc.)
│   │   └── models/             # 5 high-resolution verified luxury Indian bridal model assets
│   ├── r2-manifest.json        # Verified 209-asset manifest for R2 bucket synchronization
│   └── og-image.jpg            # 1200x630 share preview image
├── scripts/
│   └── upload-r2.ts            # Recursive R2 asset sync script with MIME mapping
├── src/
│   ├── app/
│   │   ├── api/[[...route]]/   # Hono API edge route handler
│   │   ├── globals.css         # Global styles, keyframes, scrollbar, silk shimmer utilities
│   │   ├── layout.tsx          # Root layout with metadata, navbar, cart drawer, preloader
│   │   ├── page.tsx            # Full editorial storefront assembly
│   │   ├── not-found.tsx       # Custom branded 404 page returning genuine HTTP 404
│   │   ├── sitemap.ts          # Dynamic /sitemap.xml generation
│   │   └── robots.ts           # Dynamic /robots.txt generation
│   ├── components/
│   │   ├── hero/               # FullBleedHero.tsx (video background, gold dust, unslop copy)
│   │   ├── preloader/          # PaisleyPreloader.tsx (hydrated Kalka medallion animation)
│   │   ├── navigation/         # GlassNavbar.tsx (sticky glassmorphic header, regional mega-menu)
│   │   ├── editorial/          # LoomJourney.tsx (GSAP scroll-scrubbed silk passage), SilkScene.tsx
│   │   ├── marquee/            # InfiniteMarqueeAndStates.tsx (dual-track hardware ticker + 3D tilt grid)
│   │   ├── carousel/           # CurvedArcCarousel.tsx (3D cylindrical curved arc stage)
│   │   ├── grids/              # MerchandisingGrids.tsx (state-filtered design studies & textile swatches)
│   │   ├── bridal/             # BridalCollectionZone.tsx (scalloped gold sinusoidal wave + spotlight)
│   │   ├── quickadd/           # QuickAddRows.tsx (vertical editorial cards, 4-tone warp/weft bars)
│   │   ├── studio/             # AutumnWinterStudio.tsx (3D lookbook studio + Change Look selector)
│   │   ├── drawers/            # SlideOverCartDrawer.tsx (1-step checkout drawer + receipt card)
│   │   ├── journal/            # FannedDeckAndFooter.tsx (3D fanned cards + wired newsletter footer)
│   │   └── common/             # CollectionsEdgeHydrator.tsx (client-side edge hydration)
│   ├── data/collections/       # Six regional catalogs (48 sarees, registry.ts, types.ts)
│   ├── lib/
│   │   └── media.ts            # resolveMediaUrl() resolving R2 public URLs vs local /public
│   ├── server/
│   │   └── api.ts              # Hono edge endpoints: health, collections, sarees, orders, newsletter, media
│   └── store/
│       └── useStore.ts         # Central Zustand store (cart, wishlist, filters, edge data)
├── open-next.config.ts         # OpenNext configuration for Cloudflare Pages
├── wrangler.toml               # Unified Cloudflare configuration & bindings
└── .dev.vars                   # Local environment variable template
```

---

## 4. Edge API Contract (`src/server/api.ts`)

| Endpoint | Method | Cache / Rate Limit | Description |
|---|---|---|---|
| `/api/health` | `GET` | No cache | Connectivity diagnostics for D1, R2, KV bindings. |
| `/api/collections` | `GET` | KV cached (300s) | Returns all 6 states + 48 sarees from D1; fallback to static registry. |
| `/api/sarees` | `GET` | Parameterized D1 query | Supports filters `?state=`, `?bridal=`, `?arc=`, `?q=`. |
| `/api/sarees/:id` | `GET` | Parameterized D1 query | Single saree provenance, weave specs, cultural story, and stock count. |
| `/api/orders` | `POST` | Zod validated | Validates cart items, atomically decrements stock via `DB.batch()`, persists order (`DRIFT-2026-XXXX`), invalidates KV collections cache. |
| `/api/newsletter` | `POST` | KV rate limit (5/min per IP) | Zod validated email subscription inserted into `newsletter_subscribers` D1 table. |
| `/api/media/*` | `GET` | Immutable headers | Direct R2 streaming fallback proxy with ETag. |

---

## 6. Recent Polish, Deduplication & Visual Realism Upgrades

- **Image Deduplication & Provenance (Zero Duplicates)**:
  - Harvested and normalized 209 distinct authentic museum and craft archive photographs (Wikimedia Commons Handloom & Textile Collections, LACMA, Cleveland Museum of Art, Textile Museum of Canada).
  - Executed SHA-256 hash audit across all 209 collection images under `public/collections/`: verified **209 unique hashes, 0 duplicate groups**.
  - Synchronized all 209 deduplicated assets to Cloudflare R2 bucket `drift-media-assets` (`npm run r2:sync`).

- **Real Saree Cloth in Trend Atelier (`TrendAtelier.tsx`)**:
  - Eliminated procedural SVG vector zigzags from the atelier main stage.
  - Replaced with authentic high-resolution saree cloth photography (`activeClothImage`), complete with an interactive toggle between full saree drape view and macro weave texture inspection.
  - Saree palette thumbnails replaced with genuine handloom fabric previews.

- **Photographic Realism & Single Couture Muse ("Priya") Across All Sarees (`VirtualFittingRoom.tsx` & `TrendAtelier.tsx`)**:
  - Eliminated disparate multi-model images and synthetic multiply blend projections over models.
  - Introduced single consistent Indian couture editorial muse, **Priya** (24-year-old South Asian woman with golden-amber skin, jasmine gajra chignon, and royal antique temple jewelry), photographed across 6 authentic regional saree masterworks:
    1. **Varanasi Katan**: Crimson red & real gold zari kadhwa floral jaal (`priya_banarasi_red.jpg`).
    2. **Patan Patola**: Emerald green & mustard double-ikat Seedha Pallu drape (`priya_gujarati_patola.jpg`).
    3. **Kanchipuram Korvai**: Royal purple & crimson Gopuram Rekku temple spires (`priya_kanchipuram_purple.jpg`).
    4. **Rajasthani Leheriya**: Saffron & rani pink diagonal wave drape with scalloped gota patti (`priya_rajasthani_leheriya.jpg`).
    5. **Jodhpuri Bandhej**: Midnight navy & vermilion red micro-knot tie-dye with zardozi (`priya_jodhpuri_bandhani.jpg`).
    6. **Maharashtra Paithani**: Peacock teal & magenta with traditional gold-and-pearl nath (`priya_paithani_peacock.jpg`).
  - Catalog carousel thumbnails dynamically showcase Priya in the saree's traditional regional drape.
  - Multi-perspective switcher (`👤 Model Priya` / `👗 Saree Drape` / `🔍 Macro Weave`) gives real interactive depth.
  - End-to-end verification suite: **90/90 assertions passed (0 failures)**.

- **Elimination of Square Box Particles**:
  - Removed `PointsMaterial` particle quads (`ZariDustLayer.tsx` and `PaisleyDustLayer.tsx`) across hero and preloader components.
  - Purged 450-count `THREE.Points` particle mesh from `SareeHeroCanvas.tsx` that rendered square pixel artifacts in WebGL over the model drape.
  - Storefront displays only clean, authentic photographic textures and editorial lighting.

- **Interactive Model Fitting Room Overhaul (`VirtualFittingRoom.tsx`)**:
  - Fixed blank brown preview viewport caused by blocking `imageLoaded` check that forced the stage image to `opacity-0`.
  - Implemented `lastUserAction` ('saree' | 'drape') state logic: selecting any catalog saree dynamically displays that specific saree's relatable model photograph on the main stage; selecting any drape silhouette (Nivi, Seedha Pallu, Nauvari Kashta, Atpoure, Modern Cocktail) updates to that authentic silhouette.
  - Step 1 carousel thumbnails updated from uniform regional fallback to `RELATABLE_SAREE_MODELS[saree.id]`: all 48 catalog sarees now display distinctive, craft-accurate model photography.
  - Seamless three-way perspective switching (`Drape`, `Saree`, `Weave`) between model drape, full heirloom silk cloth, and macro zari weave.

- **Merchandising Grids & Card UI/UX Modernization (`MerchandisingGrids.tsx`)**:
  - Centralized and exported `RELATABLE_SAREE_MODELS` from `src/data/collections/colorways.ts` to map all 48 catalog sarees across 6 regions to unique couture model photography of muse Priya.
  - Eliminated repetitive photo duplication across regional cards.
  - Overwrote erroneous Wikimedia food image (`saree_03_detail.jpg`) with authentic 24K gold zari macro weave (`panetar_luxury_silk_macro_1794754762039.jpg`) and bridal model drape (`priya_gujarati_panetar.jpg`). Strict zero-food rule enforced across entire codebase.
  - Resolved text collisions between craft origin strings and the `3 Variants` badge; streamlined top badge to frosted glass `Design Study` pill and top-right wishlist heart.
  - Smooth hover zoom (`group-hover:scale-105`) and alternate editorial angle cross-fade.

- **Couture Trend Atelier Variant Mapping (`TrendAtelier.tsx`)**:
  - Introduced `TREND_LOOK_MODELS` mapping all 18 regional trend concepts across 6 states to distinct model drapes, macro textures, and primary silk views.
  - Eliminated identical thumbnail repetitions in the right-hand variant list. Selecting any look ("Liquid tissue gold & jamun", "Moon ivory & champagne jaal", "Vermilion katan") updates both list thumbnail and primary stage to the corresponding couture saree.

- **Edge Deployment & Verification**:
  - GitHub Repository: [https://github.com/manglamtechnicalagency-crypto/drift-luxury-sarees](https://github.com/manglamtechnicalagency-crypto/drift-luxury-sarees).
  - Cloudflare Workers Current Version ID: `4ba729fc-a915-4426-a7d5-3f4ce1621ace`.
  - Live Edge URL: `https://drift-luxury-sarees.manglamtechnicalagency.workers.dev` (Verified HTTP 200).
  - Verification Suite: **89/89 assertions passed (0 failures)** via `scripts/verify-fitting-room.mjs`.
  - TypeScript Compiler: **0 errors** via `npx tsc --noEmit`.
  - Section Removals:
    - Removed inline "Interactive Model Fitting Room" (`VirtualFittingRoom`) from `src/components/studio/AutumnWinterStudio.tsx`.
    - Preserved dedicated modal fitting room (`activeModal === 'fitting-room'`) in `SearchAndFilmModals.tsx`.
  - Large Screen Typography:
    - Added responsive paragraph scaling in `src/app/globals.css` (`1024px`, `1280px`, `1536px`) for archival prose and craft notes.
    - Scaled paragraph sizes across `FullBleedHero.tsx`, `CurvedArcCarousel.tsx`, `TrendAtelier.tsx`, `AutumnWinterStudio.tsx`, `VirtualFittingRoom.tsx`, `BridalCollectionZone.tsx`, `FAQSection.tsx`, `ReviewsSection.tsx`, and `QuickShopModal.tsx` (`lg:text-lg xl:text-xl/2xl`).
  - Merchandising & Fitting Fixes:
    - Purged non-saree Unsplash URLs (`photo-1617627143750-d86bc21e42bb`) across all regional collection definitions.
    - Connected `RELATABLE_SAREE_MODELS` to `MerchandisingGrids.tsx`, `VirtualFittingRoom.tsx`, `CurvedArcCarousel.tsx`, `SearchAndFilmModals.tsx`, and `QuickShopModal.tsx`.
    - Every Gujarati saree card and thumbnail renders distinct relatable model photography and editorial drape angles.
    - Removed 3D red cloth mesh from LoomJourney backdrop; cleaned typography and metadata overlays.
    - Rebuilt and deployed full OpenNext package to Cloudflare Workers.

---

## 7. NPM Scripts & Commands

- `npm run dev`: Local Next.js development server.
- `npm run build`: Production Next.js build.
- `npm run cf:typegen`: Generates `worker-configuration.d.ts` from `wrangler.toml`.
- `npm run db:migrate:local`: Runs `db/schema.sql` against local D1 database.
- `npm run db:migrate:prod`: Runs `db/schema.sql` against remote production D1 database.
- `npm run db:seed`: Seeds 6 states and 48 sarees into D1 database (`db/seed.ts`).
- `npm run r2:sync`: Syncs local media assets to Cloudflare R2 (`scripts/upload-r2.ts`).
- `npm run pages:build`: Compiles and bundles Next.js for Cloudflare Pages via `@opennextjs/cloudflare`.
- `npm run pages:deploy`: Builds and deploys `.open-next/assets` to Cloudflare Pages.

---

## 6. Launch Checklist Progress

- [x] **Hydration Mismatch Fix**: Deterministic SSR/client styles in `PaisleyPreloader.tsx` and `FullBleedHero.tsx`.
- [x] **Visual Design & Layout Fix**: Redesigned `QuickAddRows.tsx` to eliminate button collision and repeat imagery.
- [x] **Marquee Motion Animation**: Added `@keyframes marqueeScroll` dual-track hardware ticker with accessible pause toggle.
- [x] **Asset Integrity**: Purged placeholder momo/dumpling image completely; deployed 5 verified luxury bridal models.
- [x] **Unslop Copywriting**: Purged empty promotional AI fluff across hero, marquee, carousel, and editorial journey.
- [x] **Cloudflare Infrastructure**: Full wiring of D1, R2, KV, Hono API, OpenNext build, and 1-step checkout drawer.
- [x] **Round 1 (Google)**: Custom 404 page returning verified HTTP 404 status, unique page titles with `%s | DRIFT` template, plain meta descriptions, internal link audit (0 broken links), dynamic `sitemap.xml`, and `robots.txt` with sitemap reference and no `Disallow: /`.
- [x] **Round 2 (Sharing)**: Open Graph (`og:title`, `og:description`, `og:image`, `og:url`), Twitter cards (`summary_large_image`), high-res 1200x630 share preview image (`public/og-image.jpg`), descriptive alt text across all product, state, and studio components (empty `alt=""` or `aria-hidden` on decorative icons/shimmers).
- [x] **Round 3 (Forms & Tracking)**: Honeypot anti-spam (`website_url` rejection on `/api/newsletter` & `/api/orders`), Cloudflare KV IP rate limiting (5 req/min newsletter, 10 orders/hr checkout), server Zod payload validation, genuine `<meta name="robots" content="noindex, nofollow">` on `/thank-you` page (excluded from sitemap), EU/UK/Swiss compliant GA4 consent banner (`G-XXXXXXXXXX`) with zero scripts before explicit acceptance, and authentic `/privacy` policy page reflecting exact data collection.
- [x] **Round 4 (Trust)**: Verified 100% clean HTTPS with zero mixed-content warnings, accessible luxury FAQ section (`src/components/faq/FAQSection.tsx`) with 5 sourced answers and explicit `[CONFIRM]` markers (NO FAQ schema), and customer review section (`src/components/reviews/ReviewsSection.tsx`) containing strictly uninvented placeholders for verified customer quotes and SKUs (NO fake reviews, NO review-star schema). Full production bundle `.open-next/worker.js` validated.
- [x] **Teamwork Run (Trends & Interactive Fitting Room)**:
  - Scraped 2026 saree trends across 11 regional traditions via `scripts/extract-saree-trends.ts`.
  - Ingested authentic motif patterns, 4-tone color pairings, and drape styles (`nivi`, `seedha-pallu`, `nauvari-kashta`, `atpoure`, `modern-cocktail`) into `src/data/collections/colorways.ts`, `trendEdit.ts`, and `extracted-trends.json`.
  - Built `src/components/fitting-room/VirtualFittingRoom.tsx` (1,028 lines): direct Three.js WebGL micro-sheen on single model photographs with real-time drape, motif, and colorway switching.
  - Verified across 95 assertions in `scripts/verify-fitting-room.mjs` and 30 assertions in `scripts/verify-virtual-fitting-room.ts` (100% PASS, 0 failures). Production Next.js build exit code 0.

---

## 7. Governing Rules & Engineering Constraints
1. **Caveman Mode**: Terse communication, no filler, exact technical substance.
2. **React 18 & Direct Three.js**: No React Three Fiber / Drei. Clean canvas setup and tear down inside client effects. Non-WebGL fallback always maintained.
3. **Design Study Labeling**: Archive clearly labeled as design studies; no fabricated artisan or product authenticity claims.
4. **Accessibility First**: Respects `prefers-reduced-motion`, visible focus states, semantic HTML, and empty `alt=""` for decorative assets.
