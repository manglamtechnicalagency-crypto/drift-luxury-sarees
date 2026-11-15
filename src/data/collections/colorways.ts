import {
  SareeProduct,
  StateSlug,
  TextileMotif,
  SareeColorway,
  ColorPairing,
  DrapeStyleId,
  DrapeStyleDefinition,
  SareePatternSet,
} from './types';

export type { TextileMotif, SareeColorway, ColorPairing, DrapeStyleId, DrapeStyleDefinition, SareePatternSet };

export const DRAPE_STYLE_DEFINITIONS: Record<DrapeStyleId, DrapeStyleDefinition> = {
  'nivi': {
    id: 'nivi',
    name: 'Regal Pleated Nivi Drape',
    regionalOrigin: 'Pan-Indian / Classical Ateliers',
    description: 'Classic frontal pleats tucked at the waist with decorative pallu draped gracefully over the left shoulder.',
    palluPlacement: 'left-shoulder',
  },
  'seedha-pallu': {
    id: 'seedha-pallu',
    name: 'Traditional Seedha Pallu Drape',
    regionalOrigin: 'Gujarat & Rajasthan',
    description: 'Pleats tucked at waist with the ornate pallu brought from back over the right shoulder and pinned across the bodice.',
    palluPlacement: 'front-bodice',
  },
  'nauvari-kashta': {
    id: 'nauvari-kashta',
    name: 'Maharashtrian Nauvari Kashta Drape',
    regionalOrigin: 'Maharashtra (Paithan & Pune)',
    description: 'Athletic bifurcated dhoti drape with central pleats taken back between legs for sovereign poise and movement.',
    palluPlacement: 'left-shoulder',
  },
  'atpoure': {
    id: 'atpoure',
    name: 'Bengali Atpoure Heritage Drape',
    regionalOrigin: 'West Bengal & Odisha',
    description: 'Box-pleated wrap with sweeping pallu draped over both shoulders, anchoring heirloom silver key-bunch ornaments.',
    palluPlacement: 'double-drape',
  },
  'modern-cocktail': {
    id: 'modern-cocktail',
    name: 'Modern Pre-Pleated Cocktail Drape',
    regionalOrigin: 'Contemporary Atelier / Red Carpet',
    description: 'Svelte pre-pleated silhouette with cinched metallic waist detailing and weightless fluid evening pallu.',
    palluPlacement: 'belted-cinched',
  },
};

/**
 * Verified Single Editorial Couture Model ("Priya")
 * Consistently represents all 6 regional saree traditions and classical drape silhouettes.
 */
export const PRIYA_EDITORIAL_MODEL = {
  name: 'Priya',
  title: 'DRIFT Atelier Couture Muse',
  bio: 'Exclusive handloom editorial model photographed in authentic regional drapes.',
  images: {
    'banarasi': '/collections/models/priya_banarasi_red.jpg',
    'gujarati': '/collections/models/priya_gujarati_patola.jpg',
    'kanchipuram': '/collections/models/priya_kanchipuram_purple.jpg',
    'rajasthani': '/collections/models/priya_rajasthani_leheriya.jpg',
    'jodhpuri': '/collections/models/priya_jodhpuri_bandhani.jpg',
    'heritage-states': '/collections/models/priya_paithani_peacock.jpg',
  } as Record<StateSlug, string>,
  drapes: {
    'nivi': '/collections/models/priya_banarasi_red.jpg',
    'seedha-pallu': '/collections/models/priya_gujarati_patola.jpg',
    'nauvari-kashta': '/collections/models/priya_paithani_peacock.jpg',
    'atpoure': '/collections/models/priya_kanchipuram_purple.jpg',
    'modern-cocktail': '/collections/models/priya_jodhpuri_bandhani.jpg',
  } as Record<DrapeStyleId, string>,
};

const regionalStudies: Record<StateSlug, SareeColorway[]> = {
  banarasi: [
    {
      id: 'tissue-gold-jamun',
      name: 'Liquid tissue gold & jamun',
      palette: ['#4A1D34', '#C9A84E', '#7E3659', '#F4E7CA'],
      motif: 'chevron',
      note: 'Deep jamun berry with spun gold chevron selvedge.',
      pairing: {
        body: '#4A1D34',
        border: '#C9A84E',
        pallu: '#7E3659',
        zari: '#F4E7CA',
      },
    },
    {
      id: 'ivory-champagne-jaal',
      name: 'Ivory & champagne jaal',
      palette: ['#F5EFE6', '#D4AF37', '#B95C65', '#E3C889'],
      motif: 'floral',
      note: 'Sheer moonlit kora ground with champagne floral creeper.',
      pairing: {
        body: '#F5EFE6',
        border: '#D4AF37',
        pallu: '#E3C889',
        zari: '#B95C65',
      },
    },
    {
      id: 'vermilion-shikargah',
      name: 'Vermilion & antique shikargah',
      palette: ['#9B1D28', '#D89933', '#5E1B26', '#F0D49C'],
      motif: 'diamond',
      note: 'Imperial crimson katan with kadhwa animal medallions.',
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
      id: 'navratna-malachite',
      name: 'Navratna & malachite ikat',
      palette: ['#184E3F', '#8C1D2F', '#D19C4C', '#F3E5C8'],
      motif: 'diamond',
      note: 'Double-ikat geometric grid in malachite and madder.',
      pairing: {
        body: '#184E3F',
        border: '#8C1D2F',
        pallu: '#D19C4C',
        zari: '#F3E5C8',
      },
    },
    {
      id: 'ashavali-rosegold',
      name: 'Rose gold & ashavali mor',
      palette: ['#7A1937', '#B84961', '#D6B46A', '#EFE0C9'],
      motif: 'floral',
      note: 'Ruby khinkhab brocade with enamelled peacock motifs.',
      pairing: {
        body: '#7A1937',
        border: '#D6B46A',
        pallu: '#B84961',
        zari: '#EFE0C9',
      },
    },
    {
      id: 'ivory-emerald-shisha',
      name: 'Ivory & emerald shisha',
      palette: ['#EAE1D0', '#1C4A3E', '#C79F55', '#8A3446'],
      motif: 'dots',
      note: 'Architectural negative ivory with mirror reflection points.',
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
      id: 'dune-monsoon-wave',
      name: 'Saffron dune & monsoon wave',
      palette: ['#C56F30', '#F0C06A', '#1C637A', '#F2E5CE'],
      motif: 'waves',
      note: 'Fluid multi-color leheriya flowing into deep lake teal.',
      pairing: {
        body: '#C56F30',
        border: '#1C637A',
        pallu: '#F0C06A',
        zari: '#F2E5CE',
      },
    },
    {
      id: 'rani-pistachio-gota',
      name: 'Rani pink & pistachio gota',
      palette: ['#B01F50', '#829E7A', '#DBB468', '#F9EFE6'],
      motif: 'floral',
      note: 'Organza pink base with architectural ribbon applique.',
      pairing: {
        body: '#B01F50',
        border: '#829E7A',
        pallu: '#DBB468',
        zari: '#F9EFE6',
      },
    },
    {
      id: 'terracotta-kota-khat',
      name: 'Terracotta & kota khat',
      palette: ['#9B4734', '#DE9147', '#C6A355', '#EADCC6'],
      motif: 'checks',
      note: 'Translucent square khat grid in warm desert pigments.',
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
      id: 'indigo-kesar-bandhej',
      name: 'Mehrangarh indigo & kesar',
      palette: ['#132347', '#36527D', '#DB9624', '#F4DC9E'],
      motif: 'dots',
      note: 'Marwar midnight indigo with micro-point saffron bandhani.',
      pairing: {
        body: '#132347',
        border: '#DB9624',
        pallu: '#36527D',
        zari: '#F4DC9E',
      },
    },
    {
      id: 'crimson-sandstone-ochre',
      name: 'Marwar crimson & sandstone',
      palette: ['#881C2C', '#D07A48', '#CBB06D', '#F4E7CE'],
      motif: 'diamond',
      note: 'Heavy royal crimson framed by sand-ochre diamond jaali.',
      pairing: {
        body: '#881C2C',
        border: '#D07A48',
        pallu: '#CBB06D',
        zari: '#F4E7CE',
      },
    },
    {
      id: 'twilight-burnished-copper',
      name: 'Twilight plum & copper',
      palette: ['#3F233B', '#7A3F64', '#C97D52', '#EED8BA'],
      motif: 'chevron',
      note: 'Desert dusk plum paired with metallic copper zig-zags.',
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
      id: 'peacock-molten-copper',
      name: 'Peacock & molten copper',
      palette: ['#095568', '#2C8787', '#C46D3B', '#EBD292'],
      motif: 'checks',
      note: 'Mayil peacock blue interlocked with copper korvai border.',
      pairing: {
        body: '#095568',
        border: '#C46D3B',
        pallu: '#2C8787',
        zari: '#EBD292',
      },
    },
    {
      id: 'temple-red-gopuram',
      name: 'Temple red & gopuram gold',
      palette: ['#9E1A2B', '#DE5D4E', '#CCA142', '#F6E6B8'],
      motif: 'diamond',
      note: 'Sacred kumkum red body with soaring temple spire zari.',
      pairing: {
        body: '#9E1A2B',
        border: '#CCA142',
        pallu: '#DE5D4E',
        zari: '#F6E6B8',
      },
    },
    {
      id: 'viridian-amethyst-lotus',
      name: 'Viridian & amethyst lotus',
      palette: ['#144C3D', '#5E2B52', '#D5B05A', '#E8DEC7'],
      motif: 'floral',
      note: 'Emerald body with imperial purple korvai and gold lotus.',
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
      id: 'paithani-peacock-muniya',
      name: 'Asawali peacock & muniya',
      palette: ['#185369', '#9C233E', '#5B8C46', '#D9B455'],
      motif: 'diamond',
      note: 'Two-tone peacock silk with tapestry-woven bangdi mor.',
      pairing: {
        body: '#185369',
        border: '#5B8C46',
        pallu: '#9C233E',
        zari: '#D9B455',
      },
    },
    {
      id: 'chanderi-sheer-silver',
      name: 'Chanderi sheer & silver leaf',
      palette: ['#DED7C8', '#8EA396', '#B7915C', '#F7F2E8'],
      motif: 'floral',
      note: 'Gossamer moonlit kora with silver ashrafi coin buttas.',
      pairing: {
        body: '#DED7C8',
        border: '#8EA396',
        pallu: '#B7915C',
        zari: '#F7F2E8',
      },
    },
    {
      id: 'swarnachari-crimson-muga',
      name: 'Swarnachari crimson & muga',
      palette: ['#8A1B28', '#C39A3A', '#2D4559', '#EAD8AF'],
      motif: 'checks',
      note: 'Crimson silk field with wild golden muga narrative panels.',
      pairing: {
        body: '#8A1B28',
        border: '#2D4559',
        pallu: '#C39A3A',
        zari: '#EAD8AF',
      },
    },
  ],
};

export function inferMotifFromSaree(saree: SareeProduct): TextileMotif {
  const text = `${saree.name} ${saree.craft} ${saree.specs.motifs.join(' ')} ${saree.description}`.toLowerCase();
  if (text.includes('wave') || text.includes('leheriya') || text.includes('tarang') || text.includes('ripple')) {
    return 'waves';
  }
  if (text.includes('dot') || text.includes('bandhani') || text.includes('bandhej') || text.includes('shisha') || text.includes('mirror') || text.includes('butti')) {
    return 'dots';
  }
  if (text.includes('check') || text.includes('khat') || text.includes('pasapalli') || text.includes('doria') || text.includes('chatai')) {
    return 'checks';
  }
  if (text.includes('floral') || text.includes('flower') || text.includes('lotus') || text.includes('kamal') || text.includes('jangla') || text.includes('bel') || text.includes('jaal') || text.includes('asawali') || text.includes('malli')) {
    return 'floral';
  }
  if (text.includes('chevron') || text.includes('tissue') || text.includes('zig-zag') || text.includes('flame') || text.includes('rekku') || text.includes('gopuram')) {
    return 'chevron';
  }
  return 'diamond';
}

export function getSareeSupportedDrapes(saree: SareeProduct): DrapeStyleId[] {
  if (saree.supportedDrapes && saree.supportedDrapes.length > 0) {
    return saree.supportedDrapes;
  }
  const reg = saree.region;
  const craft = (saree.craft || '').toLowerCase();
  const origin = (saree.originState || '').toLowerCase();

  if (reg === 'gujarati' || reg === 'rajasthani' || reg === 'jodhpuri' || craft.includes('bandhani') || craft.includes('patola') || craft.includes('leheriya')) {
    return ['seedha-pallu', 'nivi', 'modern-cocktail', 'atpoure', 'nauvari-kashta'];
  }
  if (origin.includes('maharashtra') || craft.includes('paithani')) {
    return ['nauvari-kashta', 'nivi', 'modern-cocktail', 'seedha-pallu', 'atpoure'];
  }
  if (origin.includes('bengal') || origin.includes('odisha') || origin.includes('assam') || craft.includes('baluchari') || craft.includes('swarnachari') || craft.includes('jamdani')) {
    return ['atpoure', 'nivi', 'modern-cocktail', 'seedha-pallu', 'nauvari-kashta'];
  }
  if (reg === 'kanchipuram') {
    return ['nivi', 'modern-cocktail', 'seedha-pallu', 'nauvari-kashta', 'atpoure'];
  }
  return ['nivi', 'seedha-pallu', 'nauvari-kashta', 'atpoure', 'modern-cocktail'];
}

export function getSareePatternSet(saree: SareeProduct): SareePatternSet {
  if (saree.specs.patternSet) {
    return saree.specs.patternSet;
  }

  const reg = saree.region;
  const craft = saree.craft || '';
  const motifs = saree.specs.motifs && saree.specs.motifs.length > 0
    ? saree.specs.motifs
    : ['Geometrical Diamond', 'Paisley Kalka', 'Floral Vine'];

  switch (reg) {
    case 'banarasi':
      return {
        motifs,
        borderMotif: 'Jhallar architectural floral fringe with gold zari edging',
        palluMotif: 'Dense Kadwa brocade hunting forest scene with Konia corner paisleys',
        primaryTechnique: 'Kadwa & Tanchoi supplementary weft brocade',
        motifDensity: 'all-over-jaal',
        selvedgeStyle: '1.5-inch woven pure gold zari selvedge',
      };
    case 'kanchipuram':
      return {
        motifs,
        borderMotif: 'Stepped Gopuram Rekku temple spires with rudraksham bands',
        palluMotif: 'Solid beaten gold Seer Mundhi flanked by Annapakshi divine swans',
        primaryTechnique: 'Triple-shuttle Korvai interlocking with Petni pallu joint',
        motifDensity: 'geometric-grid',
        selvedgeStyle: 'Contrasting 12-inch heavy Korvai border',
      };
    case 'gujarati':
      return {
        motifs,
        borderMotif: 'Lagdi Patta solid pure gold ribbon with Vohra Gaji repeat crests',
        palluMotif: 'Intricate Navratna nine-gem grid and Ashavali enamelled peacocks',
        primaryTechnique: 'Double-ikat Patan Patola & 8-harness Gajji silk Bandhani',
        motifDensity: 'geometric-grid',
        selvedgeStyle: 'Hand-twisted silk selvedge with micro-knot fringe',
      };
    case 'rajasthani':
      return {
        motifs,
        borderMotif: 'Hammered gold Gota Kinari ribbon with scalloped fringe',
        palluMotif: 'Cascading diagonal multi-hue waves with gota patti rosettes',
        primaryTechnique: 'Diagonal resist wave-dyeing (Leheriya) & Kota Doria Khat weave',
        motifDensity: 'fluid-wave',
        selvedgeStyle: 'Stitched metallic kinari ribbon edging',
      };
    case 'jodhpuri':
      return {
        motifs,
        borderMotif: 'Sandstone jharokha arched lattice with antique copper badla',
        palluMotif: 'Mehrangarh geometric starburst jaal with metallic tassel fringe',
        primaryTechnique: 'Micro-knot Chaubandi resist dye & Marwar royal court brocade',
        motifDensity: 'delicate-sprig',
        selvedgeStyle: 'Burnished copper wire selvedge',
      };
    case 'heritage-states':
    default:
      return {
        motifs,
        borderMotif: craft.includes('Paithani')
          ? 'Narali coconut crest border with muniya green highlights'
          : 'Stepped Kumbha temple spires with extra-weft threadwork',
        palluMotif: craft.includes('Paithani')
          ? 'Heavy Padar tapestry with hand-woven Bangdi Mor peacock medallions'
          : 'Narrative miniature court durbar panels woven in wild muga silk',
        primaryTechnique: craft.includes('Paithani')
          ? 'Interlocking tapestry weave on two-tone changer silk'
          : 'Fine pit-loom supplementary weft weaving',
        motifDensity: 'all-over-jaal',
        selvedgeStyle: 'Handwoven raw tussar / kora selvedge',
      };
  }
}

export function getSareeColorways(saree: SareeProduct): SareeColorway[] {
  if (saree.colorways && saree.colorways.length > 0) {
    return saree.colorways;
  }
  const curated = regionalStudies[saree.region] || regionalStudies.banarasi;
  const colors = [...saree.palette, saree.colorHex].filter((color) => /^#[\da-f]{3,8}$/i.test(color));
  const baseMotif = inferMotifFromSaree(saree);
  const base: SareeColorway = {
    id: `${saree.id}-palette`,
    name: `${saree.color} · original study`,
    palette: [colors[0] || '#76283B', colors[1] || '#D7B56D', colors[2] || '#E9DCC6', colors[3] || '#345D58'],
    motif: baseMotif,
    note: `The source palette for this ${saree.originState} design study.`,
    pairing: {
      body: colors[0] || '#76283B',
      border: colors[1] || '#D7B56D',
      pallu: colors[2] || '#E9DCC6',
      zari: colors[3] || '#345D58',
    },
    inspiration: `${saree.craft} traditional loom study`,
  };
  const offset = [...saree.id].reduce((sum, char) => sum + char.charCodeAt(0), 0) % curated.length;
  return [base, curated[offset], curated[(offset + 1) % curated.length]];
}

/**
 * Authentic Couture Editorial Model Photography ("Priya")
 * Mapped to each of the 48 catalog sarees across all 6 regions.
 */
export const RELATABLE_SAREE_MODELS: Record<string, { model: string; hover: string }> = {
  // Gujarat Collection — Distinctive Couture Looks
  'guj-01': { model: '/collections/models/priya_gujarati_patola.jpg', hover: '/collections/gujarati/saree_01_editorial.jpg' },
  'guj-02': { model: '/collections/models/priya_jodhpuri_bandhani.jpg', hover: '/collections/gujarati/saree_02_editorial.jpg' },
  'guj-03': { model: '/collections/models/priya_gujarati_panetar.jpg', hover: '/collections/gujarati/saree_03_detail.jpg' },
  'guj-04': { model: '/collections/models/model_bengali_bridal.jpg', hover: '/collections/gujarati/saree_04_editorial.jpg' },
  'guj-05': { model: '/collections/models/model_royal_chandan.jpg', hover: '/collections/gujarati/saree_05_editorial.jpg' },
  'guj-06': { model: '/collections/models/priya_paithani_peacock.jpg', hover: '/collections/gujarati/saree_06_editorial.jpg' },
  'guj-07': { model: '/collections/models/priya_rajasthani_leheriya.jpg', hover: '/collections/gujarati/saree_07_editorial.jpg' },
  'guj-08': { model: '/collections/models/priya_kanchipuram_purple.jpg', hover: '/collections/gujarati/saree_08_editorial.jpg' },

  // Banarasi Collection — Distinctive Couture Looks
  'ban-01': { model: '/collections/models/priya_banarasi_red.jpg', hover: '/collections/banarasi/saree_01_editorial.jpg' },
  'ban-02': { model: '/collections/models/model_royal_chandan.jpg', hover: '/collections/banarasi/saree_02_editorial.jpg' },
  'ban-03': { model: '/collections/models/model_burgundy_zardozi.jpg', hover: '/collections/banarasi/saree_03_editorial.jpg' },
  'ban-04': { model: '/collections/models/model_saffron_yellow.jpg', hover: '/collections/banarasi/saree_04_editorial.jpg' },
  'ban-05': { model: '/collections/models/priya_kanchipuram_purple.jpg', hover: '/collections/banarasi/saree_05_editorial.jpg' },
  'ban-06': { model: '/collections/models/model_bengali_bridal.jpg', hover: '/collections/banarasi/saree_06_editorial.jpg' },
  'ban-07': { model: '/collections/models/priya_paithani_peacock.jpg', hover: '/collections/banarasi/saree_07_editorial.jpg' },
  'ban-08': { model: '/collections/models/priya_jodhpuri_bandhani.jpg', hover: '/collections/banarasi/saree_08_editorial.jpg' },

  // Kanchipuram Collection — Distinctive Couture Looks
  'kan-01': { model: '/collections/models/priya_kanchipuram_purple.jpg', hover: '/collections/kanchipuram/saree_01_editorial.jpg' },
  'kan-02': { model: '/collections/models/model_saffron_yellow.jpg', hover: '/collections/kanchipuram/saree_02_editorial.jpg' },
  'kan-03': { model: '/collections/models/priya_paithani_peacock.jpg', hover: '/collections/kanchipuram/saree_03_editorial.jpg' },
  'kan-04': { model: '/collections/models/priya_banarasi_red.jpg', hover: '/collections/kanchipuram/saree_04_editorial.jpg' },
  'kan-05': { model: '/collections/models/model_royal_chandan.jpg', hover: '/collections/kanchipuram/saree_05_editorial.jpg' },
  'kan-06': { model: '/collections/models/priya_gujarati_patola.jpg', hover: '/collections/kanchipuram/saree_06_editorial.jpg' },
  'kan-07': { model: '/collections/models/model_burgundy_zardozi.jpg', hover: '/collections/kanchipuram/saree_07_editorial.jpg' },
  'kan-08': { model: '/collections/models/priya_rajasthani_leheriya.jpg', hover: '/collections/kanchipuram/saree_08_editorial.jpg' },

  // Rajasthani Collection — Distinctive Couture Looks
  'raj-01': { model: '/collections/models/priya_rajasthani_leheriya.jpg', hover: '/collections/rajasthani/saree_01_editorial.jpg' },
  'raj-02': { model: '/collections/models/model_saffron_yellow.jpg', hover: '/collections/rajasthani/saree_02_editorial.jpg' },
  'raj-03': { model: '/collections/models/priya_banarasi_red.jpg', hover: '/collections/rajasthani/saree_03_editorial.jpg' },
  'raj-04': { model: '/collections/models/model_royal_chandan.jpg', hover: '/collections/rajasthani/saree_04_editorial.jpg' },
  'raj-05': { model: '/collections/models/priya_jodhpuri_bandhani.jpg', hover: '/collections/rajasthani/saree_05_editorial.jpg' },
  'raj-06': { model: '/collections/models/priya_paithani_peacock.jpg', hover: '/collections/rajasthani/saree_06_editorial.jpg' },
  'raj-07': { model: '/collections/models/priya_kanchipuram_purple.jpg', hover: '/collections/rajasthani/saree_07_editorial.jpg' },
  'raj-08': { model: '/collections/models/priya_gujarati_patola.jpg', hover: '/collections/rajasthani/saree_08_editorial.jpg' },

  // Jodhpuri Collection — Distinctive Couture Looks
  'jod-01': { model: '/collections/models/priya_jodhpuri_bandhani.jpg', hover: '/collections/jodhpuri/saree_01_editorial.jpg' },
  'jod-02': { model: '/collections/models/model_burgundy_zardozi.jpg', hover: '/collections/jodhpuri/saree_02_editorial.jpg' },
  'jod-03': { model: '/collections/models/model_royal_chandan.jpg', hover: '/collections/jodhpuri/saree_03_editorial.jpg' },
  'jod-04': { model: '/collections/models/priya_rajasthani_leheriya.jpg', hover: '/collections/jodhpuri/saree_04_editorial.jpg' },
  'jod-05': { model: '/collections/models/priya_banarasi_red.jpg', hover: '/collections/jodhpuri/saree_05_editorial.jpg' },
  'jod-06': { model: '/collections/models/priya_paithani_peacock.jpg', hover: '/collections/jodhpuri/saree_06_editorial.jpg' },
  'jod-07': { model: '/collections/models/model_saffron_yellow.jpg', hover: '/collections/jodhpuri/saree_07_editorial.jpg' },
  'jod-08': { model: '/collections/models/priya_kanchipuram_purple.jpg', hover: '/collections/jodhpuri/saree_08_editorial.jpg' },

  // Heritage States — Distinctive Couture Looks
  'her-01': { model: '/collections/models/priya_paithani_peacock.jpg', hover: '/collections/heritage-states/saree_01_editorial.jpg' },
  'her-02': { model: '/collections/models/model_nath_paithani.jpg', hover: '/collections/heritage-states/saree_02_editorial.jpg' },
  'her-03': { model: '/collections/models/model_bengali_bridal.jpg', hover: '/collections/heritage-states/saree_03_editorial.jpg' },
  'her-04': { model: '/collections/models/model_royal_chandan.jpg', hover: '/collections/heritage-states/saree_04_editorial.jpg' },
  'her-05': { model: '/collections/models/priya_kanchipuram_purple.jpg', hover: '/collections/heritage-states/saree_05_editorial.jpg' },
  'her-06': { model: '/collections/models/priya_banarasi_red.jpg', hover: '/collections/heritage-states/saree_06_editorial.jpg' },
  'her-07': { model: '/collections/models/priya_rajasthani_leheriya.jpg', hover: '/collections/heritage-states/saree_07_editorial.jpg' },
  'her-08': { model: '/collections/models/priya_gujarati_patola.jpg', hover: '/collections/heritage-states/saree_08_editorial.jpg' },
};
