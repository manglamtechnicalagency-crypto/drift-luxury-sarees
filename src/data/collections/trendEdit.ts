import type { StateSlug } from './types';
import type { TextileMotif } from './colorways';

export interface TrendConcept {
  id: string;
  title: string;
  palette: [string, string, string, string];
  motif: TextileMotif;
  direction: string;
  rationale: string;
  sources: { label: string; url: string }[];
  pairing?: {
    body: string;
    border: string;
    pallu: string;
    zari: string;
  };
}

const STYLE_REPORT_2026 = {
  label: 'Aza Editorials · Top Trending Saree Styles for 2026',
  url: 'https://www.azafashions.com/blog/top-trending-saree-styles-for-2026/',
};
const COUTURE_2026 = {
  label: "Harper's Bazaar India · India Couture Week 2026",
  url: 'https://www.harpersbazaar.in/fashion/story/india-couture-week-2026-in-all-its-glory-celebrating-the-artisans-the-atelier-and-the-art-of-couture-1431572-2026-07-30',
};
const FESTIVE_2026 = {
  label: 'Aza Editorials · Reception sarees for 2026',
  url: 'https://www.azafashions.com/blog/what-types-of-sarees-are-popular-for-receptions-right-now/',
};
const HANDLOOM_REGISTRY = {
  label: 'Development Commissioner (Handlooms) · Pan India handloom sarees',
  url: 'https://www.handlooms.nic.in/assets/img/information_handlooms/List%20of%20Handloom%20Saree.pdf',
};
const HANDLOOM_PUBLICATIONS = {
  label: 'Development Commissioner (Handlooms) · Craft documentation library',
  url: 'https://handlooms.nic.in/publications.php',
};
const PAITHANI_DOCUMENTATION = {
  label: 'Development Commissioner (Handlooms) · Paithani documentation',
  url: 'https://handlooms.nic.in/assets/img/Publications/Paithani%20sarees%20and%20Dress%20Materials635701517283000941.pdf',
};
const TEXTILES_MINISTRY = {
  label: 'Ministry of Textiles · Traditional Handloom Clusters of India',
  url: 'https://texmin.nic.in/',
};

/**
 * Editorial direction for a 2026/2027-inspired visual story. Palettes, motifs, and pairings
 * are conceptual design studies; they do not describe available commercial products or
 * verified material, weave, origin, or seller inventory.
 */
export const TREND_EDIT: Record<StateSlug, TrendConcept[]> = {
  banarasi: [
    {
      id: 'ban-tissue-jamun',
      title: 'Liquid tissue gold & jamun',
      palette: ['#4A1D34', '#C9A84E', '#7E3659', '#F4E7CA'],
      motif: 'chevron',
      direction: 'Fine spun metallic tissue warp blended with a deep jamun berry weft; liquid drape catching low evening light with razor-sharp chevron zari selvedge.',
      rationale: 'Liquid metallic tissue and deep aubergine/berry jewel tones dominate 2026 couture runways and reception edits, modernizing heavy katan brocades into fluid evening wear.',
      sources: [COUTURE_2026, FESTIVE_2026, HANDLOOM_PUBLICATIONS],
      pairing: {
        body: '#4A1D34',
        border: '#C9A84E',
        pallu: '#7E3659',
        zari: '#F4E7CA',
      },
    },
    {
      id: 'ban-ivory-champagne-jaal',
      title: 'Moon ivory & champagne jaal',
      palette: ['#F5EFE6', '#D4AF37', '#B95C65', '#E3C889'],
      motif: 'floral',
      direction: 'Translucent kora-silk ivory ground layered with interlocking floral jaal in spun champagne zari, punctuated by subtle rose meenakari flower-heads.',
      rationale: 'Airy kora organza bases and tonal ivory-champagne brocades answer the 2026 shift toward destination wedding minimalism while preserving artisanal Banarasi jangla weaving.',
      sources: [STYLE_REPORT_2026, FESTIVE_2026, HANDLOOM_PUBLICATIONS],
      pairing: {
        body: '#F5EFE6',
        border: '#D4AF37',
        pallu: '#E3C889',
        zari: '#B95C65',
      },
    },
    {
      id: 'ban-vermilion-shikargah',
      title: 'Vermilion katan & antique shikargah',
      palette: ['#9B1D28', '#D89933', '#5E1B26', '#F0D49C'],
      motif: 'diamond',
      direction: 'Rich crimson katan base framed by diamond hunting-forest (shikargah) medallions, paired with an architectural kadhwa border and a heavy brocade pallu.',
      rationale: 'Revival of heirloom heritage animal/floral silhouettes in high-density kadhwa weaves satisfies couture demand for authentic, museum-grade bridal textiles.',
      sources: [COUTURE_2026, HANDLOOM_PUBLICATIONS, HANDLOOM_REGISTRY],
      pairing: {
        body: '#9B1D28',
        border: '#5E1B26',
        pallu: '#D89933',
        zari: '#F0D49C',
      },
    },
  ],

  gujarati: [
    {
      id: 'guj-navratna-malachite',
      title: 'Navratna jewel & malachite ikat',
      palette: ['#184E3F', '#8C1D2F', '#D19C4C', '#F3E5C8'],
      motif: 'diamond',
      direction: 'Precision 8-harness double-ikat diamond grid combining malachite green and deep madder red, framed by a narrow beaten-gold border.',
      rationale: 'The resurgence of mathematical geometric precision and dual-tone hand-dyed ikat satisfies 2026 couture interest in investment heirlooms and slow craft.',
      sources: [HANDLOOM_REGISTRY, COUTURE_2026, STYLE_REPORT_2026],
      pairing: {
        body: '#184E3F',
        border: '#8C1D2F',
        pallu: '#D19C4C',
        zari: '#F3E5C8',
      },
    },
    {
      id: 'guj-ashavali-rosegold',
      title: 'Rose gold lattice & ashavali mor',
      palette: ['#7A1937', '#B84961', '#D6B46A', '#EFE0C9'],
      motif: 'floral',
      direction: 'A deep rose lacquer ground covered in delicate khinkhab vines, featuring stylized Ashavali peacocks enamelled in subtle jewel threadwork.',
      rationale: "Ahmedabad's historic Ashavali brocading brings Mughal-Persian architectural flora into 2026 red-carpet evening dressing with fluid metallic luster.",
      sources: [STYLE_REPORT_2026, COUTURE_2026, HANDLOOM_REGISTRY],
      pairing: {
        body: '#7A1937',
        border: '#D6B46A',
        pallu: '#B84961',
        zari: '#EFE0C9',
      },
    },
    {
      id: 'guj-ivory-shisha',
      title: 'Moon ivory & emerald shisha',
      palette: ['#EAE1D0', '#1C4A3E', '#C79F55', '#8A3446'],
      motif: 'dots',
      direction: 'Clean, unbleached ivory silk ground with mathematically spaced miniature shisha mirror reflections and a micro-fine viridian selvedge.',
      rationale: 'Architectural negative space paired with micro-embellishment matches the 2026 appetite for subtle gala pieces that catch ambient chandelier lighting.',
      sources: [COUTURE_2026, FESTIVE_2026, HANDLOOM_REGISTRY],
      pairing: {
        body: '#EAE1D0',
        border: '#1C4A3E',
        pallu: '#C79F55',
        zari: '#8A3446',
      },
    },
  ],

  rajasthani: [
    {
      id: 'raj-dune-wave',
      title: 'Dune saffron & monsoon lake wave',
      palette: ['#C56F30', '#F0C06A', '#1C637A', '#F2E5CE'],
      motif: 'waves',
      direction: 'Diagonal undulating wave channels shifting across warm saffron to cool lake blue, framed by razor-thin gota patti edging.',
      rationale: 'Fluid kinetic movement and dynamic two-tone color shifts capture 2026 festive trends celebrating monsoon-inspired lightweight silk drapes.',
      sources: [STYLE_REPORT_2026, FESTIVE_2026, HANDLOOM_REGISTRY],
      pairing: {
        body: '#C56F30',
        border: '#1C637A',
        pallu: '#F0C06A',
        zari: '#F2E5CE',
      },
    },
    {
      id: 'raj-rani-gota',
      title: 'Rani pink & pistachio organza',
      palette: ['#B01F50', '#829E7A', '#DBB468', '#F9EFE6'],
      motif: 'floral',
      direction: 'Featherweight organza base in saturated rani pink, punctuated by geometric hammered gold ribbons and soft pistachio silk borders.',
      rationale: 'Weightless semi-sheer fabrics embellished with architectural ribbon appliqués bridge traditional Rajasthani royalty with contemporary cocktail silhouettes.',
      sources: [COUTURE_2026, FESTIVE_2026, STYLE_REPORT_2026],
      pairing: {
        body: '#B01F50',
        border: '#829E7A',
        pallu: '#DBB468',
        zari: '#F9EFE6',
      },
    },
    {
      id: 'raj-kota-amber',
      title: 'Terracotta amber & kota khat',
      palette: ['#9B4734', '#DE9147', '#C6A355', '#EADCC6'],
      motif: 'checks',
      direction: 'Graphic checkered square weave combining sheer cotton-silk khats with rich terracotta grounding and radiant amber border bands.',
      rationale: 'Lightweight translucent textures and earthy desert pigments reflect 2026 resort-couture interest in breathable luxury handlooms.',
      sources: [HANDLOOM_REGISTRY, STYLE_REPORT_2026, TEXTILES_MINISTRY],
      pairing: {
        body: '#9B4734',
        border: '#DE9147',
        pallu: '#C6A355',
        zari: '#EADCC6',
      },
    },
  ],

  jodhpuri: [
    {
      id: 'jod-indigo-saffron',
      title: 'Mehrangarh indigo & kesar bandhej',
      palette: ['#132347', '#36527D', '#DB9624', '#F4DC9E'],
      motif: 'dots',
      direction: 'Deep indigo georgette base with micro-fine pinch-dyed saffron constellation dots, accented by a solid Marwari architectural border.',
      rationale: 'Saturated evening jewel tones with high-contrast resist-dye patterns provide dramatic visual impact under modern ambient venue lighting.',
      sources: [FESTIVE_2026, COUTURE_2026, HANDLOOM_REGISTRY],
      pairing: {
        body: '#132347',
        border: '#DB9624',
        pallu: '#36527D',
        zari: '#F4DC9E',
      },
    },
    {
      id: 'jod-crimson-sandstone',
      title: 'Marwar crimson & sandstone ochre',
      palette: ['#881C2C', '#D07A48', '#CBB06D', '#F4E7CE'],
      motif: 'diamond',
      direction: 'Heavy crimson silk field balanced by sand-ochre framing and interlocking diamond latticework echoing Marwar fort jharokhas.',
      rationale: 'Monolithic royal reds paired with sandstone neutrals recreate regal Rajasthani bridal authority with refined modern restraint.',
      sources: [COUTURE_2026, STYLE_REPORT_2026, TEXTILES_MINISTRY],
      pairing: {
        body: '#881C2C',
        border: '#D07A48',
        pallu: '#CBB06D',
        zari: '#F4E7CE',
      },
    },
    {
      id: 'jod-twilight-mirror',
      title: 'Twilight plum & burnished copper',
      palette: ['#3F233B', '#7A3F64', '#C97D52', '#EED8BA'],
      motif: 'chevron',
      direction: 'Dark plum dusk ground shifting into copper zig-zag chevrons, finished with minimalist antique glass accents along the pallu fall.',
      rationale: 'Moody plum and copper combinations provide a luxurious alternative to black for winter couture soirées.',
      sources: [FESTIVE_2026, COUTURE_2026, STYLE_REPORT_2026],
      pairing: {
        body: '#3F233B',
        border: '#C97D52',
        pallu: '#7A3F64',
        zari: '#EED8BA',
      },
    },
  ],

  kanchipuram: [
    {
      id: 'kan-peacock-copper',
      title: 'Peacock tissue & molten copper',
      palette: ['#095568', '#2C8787', '#C46D3B', '#EBD292'],
      motif: 'checks',
      direction: 'High-density metallic tissue body interlocked with contrasting molten copper borders via authentic triple-shuttle Korvai interlocking.',
      rationale: 'Metallic tissue weaves paired with unconventional copper and bronze zari replace classic yellow gold in 2026 luxury bridal statements.',
      sources: [FESTIVE_2026, STYLE_REPORT_2026, HANDLOOM_REGISTRY],
      pairing: {
        body: '#095568',
        border: '#C46D3B',
        pallu: '#2C8787',
        zari: '#EBD292',
      },
    },
    {
      id: 'kan-temple-red',
      title: 'Temple vermilion & gopuram gold',
      palette: ['#9E1A2B', '#DE5D4E', '#CCA142', '#F6E6B8'],
      motif: 'diamond',
      direction: 'Deep kumkum red silk body with stepped temple spires (gopuram rekku) interlocked into a monolithic 14-inch solid gold zari border.',
      rationale: 'Pure heritage iconography remains the apex standard of south Indian ceremonial luxury, celebrating artisanal loom virtuosity.',
      sources: [HANDLOOM_REGISTRY, COUTURE_2026, STYLE_REPORT_2026],
      pairing: {
        body: '#9E1A2B',
        border: '#CCA142',
        pallu: '#DE5D4E',
        zari: '#F6E6B8',
      },
    },
    {
      id: 'kan-viridian-amethyst',
      title: 'Viridian emerald & amethyst lotus',
      palette: ['#144C3D', '#5E2B52', '#D5B05A', '#E8DEC7'],
      motif: 'floral',
      direction: 'Lustrous viridian green body contrasted with an amethyst purple korvai border, carrying circular kamalam lotus motifs in antique zari.',
      rationale: 'Bold dual-tone jewel combinations (emerald & purple) offer vibrant chromatic depth that photographs vividly across day and night events.',
      sources: [STYLE_REPORT_2026, FESTIVE_2026, HANDLOOM_REGISTRY],
      pairing: {
        body: '#144C3D',
        border: '#5E2B52',
        pallu: '#D5B05A',
        zari: '#E8DEC7',
      },
    },
  ],

  'heritage-states': [
    {
      id: 'heritage-paithani-peacock',
      title: 'Asawali peacock & pomegranate paithani',
      palette: ['#185369', '#9C233E', '#5B8C46', '#D9B455'],
      motif: 'diamond',
      direction: 'Iridescent two-tone silk body woven with peacock changer warp-weft, opening into an elaborate tapestry-woven pallu with bangdi mor peacocks.',
      rationale: "Ancient tapestry weft-interlocking techniques in Maharashtra's Paithani craft create museum-grade heirloom collector pieces.",
      sources: [PAITHANI_DOCUMENTATION, COUTURE_2026, HANDLOOM_REGISTRY],
      pairing: {
        body: '#185369',
        border: '#5B8C46',
        pallu: '#9C233E',
        zari: '#D9B455',
      },
    },
    {
      id: 'heritage-chanderi-silver',
      title: 'Chanderi sheer moon & silver foil',
      palette: ['#DED7C8', '#8EA396', '#B7915C', '#F7F2E8'],
      motif: 'floral',
      direction: 'Airy, semi-sheer cotton-silk drape catching summer breeze, sprinkled with silver-gold ashrafi motifs and finished with a minimalist tissue selvedge.',
      rationale: 'Lightweight translucent comfort meets understated luxury, leading the trend toward warm-weather destination weddings and intimate ceremonies.',
      sources: [FESTIVE_2026, STYLE_REPORT_2026, HANDLOOM_REGISTRY],
      pairing: {
        body: '#DED7C8',
        border: '#8EA396',
        pallu: '#B7915C',
        zari: '#F7F2E8',
      },
    },
    {
      id: 'heritage-baluchari-narrative',
      title: 'Swarnachari crimson & wild muga gold',
      palette: ['#8A1B28', '#C39A3A', '#2D4559', '#EAD8AF'],
      motif: 'checks',
      direction: 'Deep crimson silk field adorned with architectural terracotta narrative panels woven in unrefined golden muga and swarnachari gold yarns.',
      rationale: 'Narrative textiles that tell regional folklore and mythological stories satisfy modern luxury collectors seeking expressive artisanal provenance.',
      sources: [HANDLOOM_PUBLICATIONS, COUTURE_2026, HANDLOOM_REGISTRY],
      pairing: {
        body: '#8A1B28',
        border: '#2D4559',
        pallu: '#C39A3A',
        zari: '#EAD8AF',
      },
    },
  ],
};

export interface MacroTrend {
  id: string;
  title: string;
  tagline: string;
  signatureLook: string;
  targetOccasion: string;
  technicalConnection: string;
  regionalTraditions: string[];
  palette: [string, string, string, string];
  motif: TextileMotif;
  pairing: {
    body: string;
    border: string;
    pallu: string;
    zari: string;
  };
}

export const CONTEMPORARY_MACRO_TRENDS: MacroTrend[] = [
  {
    id: 'liquid-metallic-tissue',
    title: 'Liquid Metallic Tissue Silks',
    tagline: 'Weightless molten metallic warp woven with spun gold and liquid copper',
    signatureLook: 'High-sheen fluid drape with razor-sharp chevron zari selvedge',
    targetOccasion: 'Red-carpet cocktail soirées, evening receptions, destination galas',
    technicalConnection: 'Ultra-fine micro-denier metallic zari warps replacing heavy zardozi encrustations',
    regionalTraditions: ['Varanasi / Banarasi Kora Tissue', 'Kanchipuram Molten Tissue Korvai'],
    motif: 'chevron',
    palette: ['#E6CA85', '#4A1D34', '#7E3659', '#F4E7CA'],
    pairing: {
      body: '#E6CA85',
      border: '#4A1D34',
      pallu: '#7E3659',
      zari: '#F4E7CA',
    },
  },
  {
    id: 'gossamer-organza-kora',
    title: 'Gossamer Organza & Kora Floral Embroidery',
    tagline: 'Translucent sheer bases with micro badla and hand-painted meenakari flora',
    signatureLook: 'Floating moonlit kora ground with delicate scalloped selvedge and floral creeper',
    targetOccasion: 'Day weddings, Mehendi rituals, intimate summer palace ceremonies',
    technicalConnection: 'Degummed low-twist mulberry silk and fine organza pit-loom weaving with floating weft flora',
    regionalTraditions: ['Chanderi Semi-Sheer', 'Varanasi Kora Organza Jangla', 'Rajasthani Gota Organza'],
    motif: 'floral',
    palette: ['#F5EFE6', '#D4AF37', '#E3C889', '#B95C65'],
    pairing: {
      body: '#F5EFE6',
      border: '#D4AF37',
      pallu: '#E3C889',
      zari: '#B95C65',
    },
  },
  {
    id: 'pastel-moonlit-classics',
    title: 'Pastel & Moonlit Banarasis / Kanjeevarams',
    tagline: 'Powder blue, sage pistachio, and oyster silver with matte antique sona-rupa zari',
    signatureLook: 'Soft mineral pastel silk field with brushed silver-gold temple spires',
    targetOccasion: 'Contemporary millennial bridal, morning muhurtham, destination nuptials',
    technicalConnection: 'Low-twist organic pastel mulberry silks paired with dual silver-gold (sona-rupa) zari',
    regionalTraditions: ['Kanchipuram Pastel Korvai', 'Banarasi Kadhwa Pastel Katan'],
    motif: 'diamond',
    palette: ['#9CAF88', '#6E3D48', '#D6C7A1', '#EAE6DF'],
    pairing: {
      body: '#9CAF88',
      border: '#6E3D48',
      pallu: '#D6C7A1',
      zari: '#EAE6DF',
    },
  },
  {
    id: 'pre-draped-modern-cocktail',
    title: 'Pre-Draped Modern & Cocktail Silhouettes',
    tagline: 'Structured corsetry and pre-pleated fluidity for contemporary soirées',
    signatureLook: 'Svelte pre-pleated drape with cinched metallic waist detailing and cascading fluid pallu',
    targetOccasion: 'Modern sangeet, cocktail parties, after-party celebrations',
    technicalConnection: 'Lightweight modal and handloom silk-cotton tailored for dynamic mobility without bulk',
    regionalTraditions: ['Kutchi Gajji Silk Bandhani', 'Chanderi Silk-Cotton', 'Paithani Silk'],
    motif: 'chevron',
    palette: ['#3F233B', '#C97D52', '#7A3F64', '#EED8BA'],
    pairing: {
      body: '#3F233B',
      border: '#C97D52',
      pallu: '#7A3F64',
      zari: '#EED8BA',
    },
  },
  {
    id: 'ombre-kinetic-transitions',
    title: 'Ombre & Kinetic Color Transitions',
    tagline: 'Seamless multi-tone gradient shifts across sunset saffron, desert rose, and lake cyan',
    signatureLook: 'Fluid diagonal resist-dyed waves dissolving into contrasting border hues',
    targetOccasion: 'Evening galas, luxury resort wear, modern reception wear',
    technicalConnection: 'Master artisan dip-resist dyeing (Leheriya) and two-tone changer iridescent wefts',
    regionalTraditions: ['Rajasthani Leheriya', 'Maharashtra Paithani Changer Warp-Weft'],
    motif: 'waves',
    palette: ['#C56F30', '#1C637A', '#F0C06A', '#F2E5CE'],
    pairing: {
      body: '#C56F30',
      border: '#1C637A',
      pallu: '#F0C06A',
      zari: '#F2E5CE',
    },
  },
  {
    id: 'minimalist-architectural-zari',
    title: 'Minimalist & Architectural Zari Handlooms',
    tagline: 'Quiet-luxury handlooms featuring clean geometry, micro square khats, and razor selvedges',
    signatureLook: 'Translucent square grid ground with razor-sharp 1-inch solid gold band',
    targetOccasion: 'Gallery openings, high-profile corporate galas, private durbars',
    technicalConnection: 'Structural pit-loom square khat weaving and double-ikat geometric alignment',
    regionalTraditions: ['Kota Doria Khat', 'Patan Patola Navratna', 'Maheshwari Adda', 'Kerala Kasavu'],
    motif: 'checks',
    palette: ['#184E3F', '#8C1D2F', '#D19C4C', '#F3E5C8'],
    pairing: {
      body: '#184E3F',
      border: '#8C1D2F',
      pallu: '#D19C4C',
      zari: '#F3E5C8',
    },
  },
  {
    id: 'narrative-heirloom-revival',
    title: 'Storytelling & Heirloom Narrative Revival',
    tagline: 'Resurrecting museum-grade figurative storytelling—hunting forests, durbars, and epics',
    signatureLook: 'Multi-tiered pictorial pallu panels depicting royal durbars and flora/fauna',
    targetOccasion: 'Collector heirlooms, traditional wedding muhurtham, heritage gala wear',
    technicalConnection: 'High-density Kadhwa supplementary weft and draw-loom figurative jacquard with wild silks',
    regionalTraditions: ['Varanasi Shikargah Katan', 'Bishnupur Swarnachari & Baluchari', 'Assam Muga'],
    motif: 'diamond',
    palette: ['#9B1D28', '#5E1B26', '#D89933', '#F0D49C'],
    pairing: {
      body: '#9B1D28',
      border: '#5E1B26',
      pallu: '#D89933',
      zari: '#F0D49C',
    },
  },
];

export function getAllTrendConcepts(): TrendConcept[] {
  return Object.values(TREND_EDIT).flat();
}

export function getTrendsByRegion(region: StateSlug): TrendConcept[] {
  return TREND_EDIT[region] || [];
}
