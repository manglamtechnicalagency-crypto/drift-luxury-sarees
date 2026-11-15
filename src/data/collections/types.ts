export type StateSlug =
  | 'gujarati'
  | 'rajasthani'
  | 'jodhpuri'
  | 'banarasi'
  | 'kanchipuram'
  | 'heritage-states';

export type TextileMotif =
  | 'diamond'
  | 'dots'
  | 'checks'
  | 'waves'
  | 'floral'
  | 'chevron';

export type DrapeStyleId =
  | 'nivi'
  | 'seedha-pallu'
  | 'nauvari-kashta'
  | 'atpoure'
  | 'modern-cocktail';

export interface DrapeStyleDefinition {
  id: DrapeStyleId;
  name: string;
  regionalOrigin: string;
  description: string;
  palluPlacement: 'left-shoulder' | 'front-bodice' | 'double-drape' | 'belted-cinched';
}

export interface ColorPairing {
  body: string;      // Primary body silk hex
  border: string;    // Border accent / Korvai trim hex
  pallu: string;     // Pallu weft / end-panel hex
  zari: string;      // Metallic yarn highlight hex
}

export interface SareeColorway {
  id: string;
  name: string;
  palette: [string, string, string, string];
  motif: TextileMotif;
  note: string;
  pairing?: ColorPairing;
  inspiration?: string;
}

export interface SareePatternSet {
  motifs: string[];               // e.g. ["Shikargah", "Kalka", "Ashrafi Butta"]
  borderMotif: string;            // e.g. "Gopuram Rekku stepped spires"
  palluMotif: string;             // e.g. "Dense narrative tapestry panel"
  primaryTechnique: string;       // e.g. "Kadwa supplementary weft"
  motifDensity: 'delicate-sprig' | 'all-over-jaal' | 'geometric-grid' | 'fluid-wave';
  selvedgeStyle: string;          // e.g. "1-inch razor gold zari wire"
}

export interface SareeImages {
  primary: string;
  detail: string;
  editorial: string;
  pallu: string;
  fallbackPrimary: string;
  fallbackDetail: string;
  fallbackEditorial: string;
}

export interface SareeSpecs {
  length: string;
  weight: string;
  care: string;
  borderDetails: string;
  palluDetails: string;
  motifs: string[];
  patternSet?: SareePatternSet;
}

export interface TrendBridge {
  trendId: string;
  trendTitle: string;
  direction: string;
  rationale: string;
  sourceUrl?: string;
  sourceLabel?: string;
}

export interface SareeProduct {
  id: string;
  name: string;
  title: string;
  slug: string;
  region: StateSlug;
  craft: string;
  originState: string;
  price: number;
  priceDisplay: string;
  originalPrice?: number;
  originalPriceDisplay?: string;
  fabric: string;
  zariType: string;
  weaveTime: string;
  leadArtisan?: string;
  provenance: string;
  trendingBadge?: string;
  description: string;
  story: string;
  color: string;
  colorHex: string;
  palette: string[];
  drapeStyle: string;
  supportedDrapes?: DrapeStyleId[];
  colorways?: SareeColorway[];
  images: SareeImages;
  specs: SareeSpecs;
  rating: number;
  reviewsCount: number;
  isAvailable: boolean;
  stockCount: number;
  trendBridge?: TrendBridge;
}

export interface StateCollection {
  id: string;
  slug: StateSlug;
  name: string;
  hindiName: string;
  tagline: string;
  historicalEra: string;
  craftOverview: string;
  keyWeaves: string[];
  heroImage: string;
  editorialBanner: string;
  fallbackHero: string;
  fallbackBanner: string;
  accentColor: string;
  secondaryColor: string;
  glowColor: string;
  stats: {
    artisanGuilds: number;
    heritageCenturies: number;
    flagshipPieces: number;
  };
}

export interface LookbookPreset {
  id: string;
  title: string;
  subtitle: string;
  stateSlug: StateSlug;
  sareeIds: string[];
  quote: string;
  aestheticMood: string;
}
