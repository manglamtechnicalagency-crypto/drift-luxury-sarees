# DRIFT Project Agent Guide

This project is a Next.js 15 / React 18 editorial storefront using Three.js directly, GSAP, and Framer Motion. Keep the craft archive clearly labeled as design studies until sellers, exact SKUs, image rights, prices, materials, and stock are verified.

## Agent lanes and file ownership

- **Motion and accessibility:** `src/components/hero/FullBleedHero.tsx`, `src/components/preloader/PaisleyPreloader.tsx`, `src/components/editorial/LoomJourney.tsx`, and motion-related rules in `src/app/globals.css`.
- **Three.js runtime and performance:** `src/components/editorial/SilkScene.tsx`, `src/components/canvas/ParticleField.tsx`, and Three.js scene wrappers under `src/components/hero/` and `src/components/preloader/`.
- **Regional catalog and imagery:** one assigned region at a time under `src/data/collections/<region>/` and `public/collections/<region>/`. Do not edit shared registry/types while another agent owns those files. Keep a `SOURCES.md` or `RESEARCH.md` for every region. Do not treat generic or duplicated images as verified product photography.
- **QA and integration:** read-only by default. Review agent changes, run the production build when implementation changes need verification, and report findings with file paths and severity. Make no code edits unless explicitly assigned.

## Coordination rules

1. The parent agent assigns one lane and file scope to each subagent before work starts.
2. Do not edit another lane's files or shared files unless the parent explicitly reassigns ownership.
3. Report changed files, decisions, checks run, and remaining blockers when finished.
4. Preserve React 18 compatibility. Avoid React Three Fiber and Drei; use direct Three.js inside client-only effects with cleanup and a non-WebGL fallback.
5. Respect `prefers-reduced-motion`, keyboard operation, and clear focus states. Avoid autoplay or continuous motion without an accessible pause or reduced-motion alternative.
6. Do not invent supplier, maker, price, stock, rating, certification, or product-authenticity claims.
