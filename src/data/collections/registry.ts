import { SareeProduct, StateCollection, StateSlug, LookbookPreset, DrapeStyleId, TextileMotif } from './types';
import { gujaratiMeta } from './gujarati/meta';
import { gujaratiSarees } from './gujarati/sarees';
import { rajasthaniMeta } from './rajasthani/meta';
import { rajasthaniSarees } from './rajasthani/sarees';
import { jodhpuriMeta } from './jodhpuri/meta';
import { jodhpuriSarees } from './jodhpuri/sarees';
import { banarasiMeta } from './banarasi/meta';
import { banarasiSarees } from './banarasi/sarees';
import { kanchipuramMeta } from './kanchipuram/meta';
import { kanchipuramSarees } from './kanchipuram/sarees';
import { heritagestatesMeta } from './heritage-states/meta';
import { heritagestatesSarees } from './heritage-states/sarees';
import { getSareeColorways, getSareePatternSet, getSareeSupportedDrapes } from './colorways';

function enrichSaree(saree: SareeProduct): SareeProduct {
  const colorways = saree.colorways && saree.colorways.length > 0 ? saree.colorways : getSareeColorways(saree);
  const patternSet = saree.specs?.patternSet || getSareePatternSet(saree);
  const supportedDrapes = saree.supportedDrapes && saree.supportedDrapes.length > 0 ? saree.supportedDrapes : getSareeSupportedDrapes(saree);

  const titleLower = (saree.title || '').toLowerCase();
  const title =
    titleLower.includes('study') || titleLower.includes('concept') || titleLower.includes('reference')
      ? saree.title
      : `${saree.name} · Illustrative Craft Style Study`;

  const descLower = (saree.description || '').toLowerCase();
  const description =
    descLower.includes('study') || descLower.includes('concept') || descLower.includes('reference') || descLower.includes('unverified')
      ? saree.description
      : `Style reference: ${saree.craft} is included as a visual craft concept study. Fiber content, exact technique, and commercial claims are unverified.`;

  return {
    ...saree,
    price: 0,
    priceDisplay: 'Price on request',
    originalPrice: undefined,
    originalPriceDisplay: undefined,
    isAvailable: false,
    stockCount: 0,
    rating: 0,
    reviewsCount: 0,
    title,
    description,
    trendingBadge: saree.trendingBadge || 'Craft style study',
    supportedDrapes,
    colorways,
    specs: {
      ...saree.specs,
      patternSet,
    },
  };
}

const enrichedGujarati = gujaratiSarees.map(enrichSaree);
const enrichedRajasthani = rajasthaniSarees.map(enrichSaree);
const enrichedJodhpuri = jodhpuriSarees.map(enrichSaree);
const enrichedBanarasi = banarasiSarees.map(enrichSaree);
const enrichedKanchipuram = kanchipuramSarees.map(enrichSaree);
const enrichedHeritage = heritagestatesSarees.map(enrichSaree);

export const STATE_COLLECTIONS: Record<StateSlug, StateCollection> = {
  gujarati: gujaratiMeta,
  rajasthani: rajasthaniMeta,
  jodhpuri: jodhpuriMeta,
  banarasi: banarasiMeta,
  kanchipuram: kanchipuramMeta,
  'heritage-states': heritagestatesMeta,
};

export const ALL_STATE_METAS: StateCollection[] = [
  gujaratiMeta,
  rajasthaniMeta,
  jodhpuriMeta,
  banarasiMeta,
  kanchipuramMeta,
  heritagestatesMeta,
];

export const COLLECTION_FILTERS = [
  { id: 'all' as const, label: 'All regions' },
  ...ALL_STATE_METAS.map((state) => ({ id: state.slug, label: state.name })),
];

export const ALL_SAREES: SareeProduct[] = [
  ...enrichedGujarati,
  ...enrichedRajasthani,
  ...enrichedJodhpuri,
  ...enrichedBanarasi,
  ...enrichedKanchipuram,
  ...enrichedHeritage,
];

export const SAREES_BY_REGION: Record<StateSlug, SareeProduct[]> = {
  gujarati: enrichedGujarati,
  rajasthani: enrichedRajasthani,
  jodhpuri: enrichedJodhpuri,
  banarasi: enrichedBanarasi,
  kanchipuram: enrichedKanchipuram,
  'heritage-states': enrichedHeritage,
};

export const LOOKBOOK_PRESETS: LookbookPreset[] = [
  {
    "id": "regal-court-edit",
    "title": "The Court of Kashi & Patan",
    "subtitle": "Imperial Double Ikat & Varanasi Kadwa Brocades",
    "stateSlug": "banarasi",
    "sareeIds": [
      "ban-01",
      "guj-01",
      "ban-02",
      "guj-05"
    ],
    "quote": "Where gold warp meets mathematical perfection on ancient wooden looms.",
    "aestheticMood": "Rich gold zari, deep crimson silks, temple incense, antique bronze reflections."
  },
  {
    "id": "desert-mirage-edit",
    "title": "Echoes of Mehrangarh & Amber",
    "subtitle": "Royal Rajput Wave-Dyed Chiffons & Micro-Knot Bandhej",
    "stateSlug": "jodhpuri",
    "sareeIds": [
      "jod-01",
      "raj-01",
      "jod-02",
      "raj-03"
    ],
    "quote": "A celebration of desert rain, dancing peacocks, and generational tie-dye alchemy.",
    "aestheticMood": "Fiery saffron, cobalt blue, mirrorwork reflections, crisp evening wind."
  },
  {
    "id": "temple-sanctuary-edit",
    "title": "Kailasanathar to Padmanabhaswamy",
    "subtitle": "Kanchipuram Korvai Temple Spires & Pure Kasavu Tissue",
    "stateSlug": "kanchipuram",
    "sareeIds": [
      "kan-01",
      "kan-02",
      "kan-04",
      "kan-07"
    ],
    "quote": "Three-ply mulberry silk interlocked by twin weavers beneath granite temple towers.",
    "aestheticMood": "Peacock emerald, raw ivory silk, sacred kumkum, pure tested 24K gold."
  },
  {
    "id": "pan-india-heirloom-edit",
    "title": "The Great Loom Arcs of India",
    "subtitle": "Paithani Peacock Tapestry, Chanderi Tissue & Wild Assam Muga",
    "stateSlug": "heritage-states",
    "sareeIds": [
      "her-01",
      "her-03",
      "her-07",
      "her-05"
    ],
    "quote": "From Godavari riverbanks to Brahmaputra golden cocoons — sovereign textile art.",
    "aestheticMood": "Kaleidoscopic peacocks, wild liquid gold silk, chessboards of eternity."
  }
];

export function getSareeById(id: string): SareeProduct | undefined {
  return ALL_SAREES.find((s) => s.id === id);
}

export function getSareeBySlug(slug: string): SareeProduct | undefined {
  return ALL_SAREES.find((s) => s.slug === slug);
}

export function getStateCollection(slug: StateSlug): StateCollection {
  return STATE_COLLECTIONS[slug];
}

export function getFeaturedSarees(): SareeProduct[] {
  return ALL_STATE_METAS.map((state) => ALL_SAREES.find((saree) => saree.region === state.slug)).filter(
    (saree): saree is SareeProduct => Boolean(saree)
  );
}

export function searchSarees(query: string): SareeProduct[] {
  const q = query.toLowerCase().trim();
  if (!q) return ALL_SAREES;
  return ALL_SAREES.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.craft.toLowerCase().includes(q) ||
      s.fabric.toLowerCase().includes(q) ||
      s.originState.toLowerCase().includes(q) ||
      s.color.toLowerCase().includes(q)
  );
}

export function getRegionalSarees(region: StateSlug): SareeProduct[] {
  return SAREES_BY_REGION[region] || [];
}

export function getSareesByDrape(drape: DrapeStyleId): SareeProduct[] {
  return ALL_SAREES.filter((saree) => saree.supportedDrapes?.includes(drape));
}

export function getSareesByMotif(motif: TextileMotif): SareeProduct[] {
  return ALL_SAREES.filter((saree) =>
    saree.colorways?.some((colorway) => colorway.motif === motif)
  );
}
