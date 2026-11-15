'use client';

import { useMemo, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Sparkles, Layers, Sliders, Palette } from 'lucide-react';
import { TREND_EDIT, TrendConcept } from '@/data/collections/trendEdit';
import { StateSlug } from '@/data/collections/types';
import { ALL_STATE_METAS, ALL_SAREES } from '@/data/collections/registry';
import { SareeColorway, TextileMotif, PRIYA_EDITORIAL_MODEL } from '@/data/collections/colorways';
import { useStore } from '@/store/useStore';

const MOTIF_OPTIONS: { id: TextileMotif; label: string }[] = [
  { id: 'diamond', label: 'Diamond Butta' },
  { id: 'dots', label: 'Bandhej Dots' },
  { id: 'checks', label: 'Khat Checks' },
  { id: 'waves', label: 'Leheriya Waves' },
  { id: 'floral', label: 'Jangla Flora' },
  { id: 'chevron', label: 'Vanki Chevron' },
];

const TREND_LOOK_MODELS: Record<string, { model: string; detail: string; primary: string }> = {
  // Banarasi
  'ban-tissue-jamun': {
    model: '/collections/banarasi/saree_03_editorial.jpg',
    detail: '/collections/banarasi/saree_03_detail.jpg',
    primary: '/collections/banarasi/saree_03_primary.jpg',
  },
  'ban-ivory-champagne-jaal': {
    model: '/collections/banarasi/saree_04_editorial.jpg',
    detail: '/collections/banarasi/saree_04_detail.jpg',
    primary: '/collections/banarasi/saree_04_primary.jpg',
  },
  'ban-vermilion-shikargah': {
    model: '/collections/models/priya_banarasi_red.jpg',
    detail: '/collections/banarasi/saree_01_detail.jpg',
    primary: '/collections/banarasi/saree_01_primary.jpg',
  },

  // Gujarati
  'guj-navratna-malachite': {
    model: '/collections/models/priya_gujarati_patola.jpg',
    detail: '/collections/gujarati/saree_01_detail.jpg',
    primary: '/collections/gujarati/saree_01_primary.jpg',
  },
  'guj-ashavali-rosegold': {
    model: '/collections/gujarati/saree_05_editorial.jpg',
    detail: '/collections/gujarati/saree_05_detail.jpg',
    primary: '/collections/gujarati/saree_05_primary.jpg',
  },
  'guj-sindoori-bandhej': {
    model: '/collections/gujarati/saree_02_editorial.jpg',
    detail: '/collections/gujarati/saree_02_detail.jpg',
    primary: '/collections/gujarati/saree_02_primary.jpg',
  },
  'guj-ivory-shisha': {
    model: '/collections/models/priya_gujarati_panetar.jpg',
    detail: '/collections/gujarati/saree_03_detail.jpg',
    primary: '/collections/gujarati/saree_03_primary.jpg',
  },
  'guj-raw-silk-panetar': {
    model: '/collections/models/priya_gujarati_panetar.jpg',
    detail: '/collections/gujarati/saree_03_detail.jpg',
    primary: '/collections/gujarati/saree_03_primary.jpg',
  },

  // Rajasthani
  'raj-dune-wave': {
    model: '/collections/models/priya_rajasthani_leheriya.jpg',
    detail: '/collections/rajasthani/saree_01_detail.jpg',
    primary: '/collections/rajasthani/saree_01_primary.jpg',
  },
  'raj-sunset-ombre-leheriya': {
    model: '/collections/models/priya_rajasthani_leheriya.jpg',
    detail: '/collections/rajasthani/saree_01_detail.jpg',
    primary: '/collections/rajasthani/saree_01_primary.jpg',
  },
  'raj-rani-gota': {
    model: '/collections/rajasthani/saree_03_editorial.jpg',
    detail: '/collections/rajasthani/saree_03_detail.jpg',
    primary: '/collections/rajasthani/saree_03_primary.jpg',
  },
  'raj-kota-doria-gold-checks': {
    model: '/collections/rajasthani/saree_02_editorial.jpg',
    detail: '/collections/rajasthani/saree_02_detail.jpg',
    primary: '/collections/rajasthani/saree_02_primary.jpg',
  },
  'raj-kota-amber': {
    model: '/collections/rajasthani/saree_02_editorial.jpg',
    detail: '/collections/rajasthani/saree_02_detail.jpg',
    primary: '/collections/rajasthani/saree_02_primary.jpg',
  },
  'raj-marwar-lac-bandhani': {
    model: '/collections/rajasthani/saree_07_editorial.jpg',
    detail: '/collections/rajasthani/saree_07_detail.jpg',
    primary: '/collections/rajasthani/saree_07_primary.jpg',
  },

  // Jodhpuri
  'jod-indigo-saffron': {
    model: '/collections/models/priya_jodhpuri_bandhani.jpg',
    detail: '/collections/jodhpuri/saree_01_detail.jpg',
    primary: '/collections/jodhpuri/saree_01_primary.jpg',
  },
  'jod-indigo-gold-shikargah': {
    model: '/collections/jodhpuri/saree_05_editorial.jpg',
    detail: '/collections/jodhpuri/saree_05_detail.jpg',
    primary: '/collections/jodhpuri/saree_05_primary.jpg',
  },
  'jod-crimson-sandstone': {
    model: '/collections/jodhpuri/saree_02_editorial.jpg',
    detail: '/collections/jodhpuri/saree_02_detail.jpg',
    primary: '/collections/jodhpuri/saree_02_primary.jpg',
  },
  'jod-rani-haldi-bandhej': {
    model: '/collections/jodhpuri/saree_02_editorial.jpg',
    detail: '/collections/jodhpuri/saree_02_detail.jpg',
    primary: '/collections/jodhpuri/saree_02_primary.jpg',
  },
  'jod-twilight-mirror': {
    model: '/collections/jodhpuri/saree_07_editorial.jpg',
    detail: '/collections/jodhpuri/saree_07_detail.jpg',
    primary: '/collections/jodhpuri/saree_07_primary.jpg',
  },
  'jod-gota-patti-pistachio': {
    model: '/collections/jodhpuri/saree_06_editorial.jpg',
    detail: '/collections/jodhpuri/saree_06_detail.jpg',
    primary: '/collections/jodhpuri/saree_06_primary.jpg',
  },

  // Kanchipuram
  'kan-peacock-copper': {
    model: '/collections/models/priya_kanchipuram_purple.jpg',
    detail: '/collections/kanchipuram/saree_01_detail.jpg',
    primary: '/collections/kanchipuram/saree_01_primary.jpg',
  },
  'kan-aubergine-gopuram': {
    model: '/collections/models/priya_kanchipuram_purple.jpg',
    detail: '/collections/kanchipuram/saree_01_detail.jpg',
    primary: '/collections/kanchipuram/saree_01_primary.jpg',
  },
  'kan-temple-red': {
    model: '/collections/kanchipuram/saree_06_editorial.jpg',
    detail: '/collections/kanchipuram/saree_06_detail.jpg',
    primary: '/collections/kanchipuram/saree_06_primary.jpg',
  },
  'kan-peacock-emerald-ruby': {
    model: '/collections/kanchipuram/saree_06_editorial.jpg',
    detail: '/collections/kanchipuram/saree_06_detail.jpg',
    primary: '/collections/kanchipuram/saree_06_primary.jpg',
  },
  'kan-viridian-amethyst': {
    model: '/collections/kanchipuram/saree_02_editorial.jpg',
    detail: '/collections/kanchipuram/saree_02_detail.jpg',
    primary: '/collections/kanchipuram/saree_02_primary.jpg',
  },
  'kan-copper-rose-tissue': {
    model: '/collections/kanchipuram/saree_03_editorial.jpg',
    detail: '/collections/kanchipuram/saree_03_detail.jpg',
    primary: '/collections/kanchipuram/saree_03_primary.jpg',
  },

  // Heritage States
  'heritage-paithani-peacock': {
    model: '/collections/models/priya_paithani_peacock.jpg',
    detail: '/collections/heritage-states/saree_01_detail.jpg',
    primary: '/collections/heritage-states/saree_01_primary.jpg',
  },
  'her-paithani-tissue-peacock': {
    model: '/collections/models/priya_paithani_peacock.jpg',
    detail: '/collections/heritage-states/saree_01_detail.jpg',
    primary: '/collections/heritage-states/saree_01_primary.jpg',
  },
  'heritage-chanderi-silver': {
    model: '/collections/heritage-states/saree_03_editorial.jpg',
    detail: '/collections/heritage-states/saree_03_detail.jpg',
    primary: '/collections/heritage-states/saree_03_primary.jpg',
  },
  'her-chanderi-black-gold': {
    model: '/collections/heritage-states/saree_02_editorial.jpg',
    detail: '/collections/heritage-states/saree_02_detail.jpg',
    primary: '/collections/heritage-states/saree_02_primary.jpg',
  },
  'heritage-baluchari-narrative': {
    model: '/collections/heritage-states/saree_08_editorial.jpg',
    detail: '/collections/heritage-states/saree_08_detail.jpg',
    primary: '/collections/heritage-states/saree_08_primary.jpg',
  },
  'her-sambalpuri-crimson-ikat': {
    model: '/collections/heritage-states/saree_05_editorial.jpg',
    detail: '/collections/heritage-states/saree_05_detail.jpg',
    primary: '/collections/heritage-states/saree_05_primary.jpg',
  },
};

export default function TrendAtelier() {
  const { setActiveStateFilter } = useStore();
  const [region, setRegion] = useState<StateSlug>('banarasi');
  const [activeIndex, setActiveIndex] = useState(0);
  const [customMotif, setCustomMotif] = useState<TextileMotif | null>(null);
  const [activeTab, setActiveTab] = useState<'weave' | 'architecture'>('weave');
  const [clothView, setClothView] = useState<'model' | 'detail' | 'primary'>('model');

  const concepts = TREND_EDIT[region] || [];
  const active: TrendConcept = concepts[Math.min(activeIndex, concepts.length - 1)] || concepts[0];
  const meta = ALL_STATE_METAS.find((item) => item.slug === region) || ALL_STATE_METAS[0];

  // Real Saree photography corresponding to region and active index
  const regionalSarees = useMemo(() => ALL_SAREES.filter((s) => s.region === region), [region]);
  const activeSaree = regionalSarees[activeIndex % regionalSarees.length] || regionalSarees[0];
  const activeClothImage = useMemo(() => {
    const lookAsset = TREND_LOOK_MODELS[active?.id];
    if (clothView === 'model') {
      return lookAsset?.model || PRIYA_EDITORIAL_MODEL.images[region] || activeSaree?.images?.primary;
    }
    if (clothView === 'detail') {
      return lookAsset?.detail || activeSaree?.images?.detail || activeSaree?.images?.primary;
    }
    return lookAsset?.primary || activeSaree?.images?.primary || activeSaree?.images?.editorial;
  }, [clothView, region, active, activeSaree]);

  // Selected motif (defaults to active concept's curated motif, or overridden by interactive user customizer)
  const effectiveMotif = customMotif || active?.motif || 'diamond';

  const textile = useMemo<SareeColorway>(() => {
    if (!active) {
      return {
        id: 'default',
        name: 'Curated Textile Study',
        palette: ['#4A1D34', '#C9A84E', '#7E3659', '#F4E7CA'],
        motif: 'diamond',
        note: 'Default luxury textile study.',
      };
    }
    return {
      id: `${active.id}-${effectiveMotif}`,
      name: active.title,
      palette: active.palette,
      motif: effectiveMotif,
      note: active.direction,
      pairing: active.pairing,
    };
  }, [active, effectiveMotif]);

  const chooseRegion = (slug: StateSlug) => {
    setRegion(slug);
    setActiveIndex(0);
    setCustomMotif(null);
  };

  if (!active) return null;

  const pairing = active.pairing || {
    body: active.palette[0],
    border: active.palette[1],
    pallu: active.palette[2],
    zari: active.palette[3],
  };

  return (
    <section id="trend-atelier" className="relative overflow-hidden bg-[#1E0F14] py-20 sm:py-28 text-[#F8F1E7]">
      {/* Opulent Ambient Ambient Background Glow */}
      <div
        className="pointer-events-none absolute -top-44 right-[-8rem] h-[38rem] w-[38rem] rounded-full blur-[160px] opacity-25 transition-all duration-1000"
        style={{ backgroundColor: meta.accentColor }}
      />
      <div
        className="pointer-events-none absolute -bottom-48 left-[-10rem] h-[32rem] w-[32rem] rounded-full blur-[140px] opacity-15"
        style={{ backgroundColor: active.palette[1] }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <header className="mb-10 flex flex-col gap-5 border-b border-white/10 pb-8 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[.28em] text-[#E6C98D]">
              <Sparkles className="h-3.5 w-3.5" /> 2026/2027 Couture Colourways &amp; Variants
            </div>
            <h2 className="font-serif text-4xl font-normal leading-tight sm:text-5xl lg:text-6xl text-white">
              A new era, <span className="italic font-serif text-[#E6C98D]">woven in harmony.</span>
            </h2>
            <p className="mt-3.5 max-w-2xl text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed text-white/80">
              Explore 18 hand-curated couture trend concepts across India’s six legendary loom geographies.
              Interact with custom weave motifs, dual-tone wefts, and bespoke warp-to-zari color architectures.
            </p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-1.5 text-[10px] uppercase tracking-[.18em] text-white/40">
            <div className="flex items-center gap-2">
              <span className="h-px w-8 bg-[#C4A46C]/60" />
              <span className="text-[#E6C98D]">Editorial Atelier Edition</span>
            </div>
            <span>Curated across 6 Regional Traditions</span>
          </div>
        </header>

        {/* Regional Filter Navigation Tabs */}
        <nav aria-label="Choose a regional trend edit" className="mb-10 flex gap-2.5 overflow-x-auto pb-3 scrollbar-none">
          {ALL_STATE_METAS.map((item) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => chooseRegion(item.slug)}
              aria-pressed={region === item.slug}
              className={`shrink-0 rounded-full border px-5 py-2.5 text-[11px] font-sans font-medium uppercase tracking-[.16em] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E6C98D] ${
                region === item.slug
                  ? 'border-[#D2B273] bg-gradient-to-r from-[#D2B273] to-[#F3DFB0] text-[#211116] font-semibold shadow-lg shadow-[#D2B273]/20 scale-105'
                  : 'border-white/15 bg-white/[0.03] text-white/70 hover:border-[#D2B273]/60 hover:text-white'
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Main Interactive Stage Grid */}
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 items-start">
          
          {/* Left Stage: Textile Weave Simulation & Swatch Viewer */}
          <div className="space-y-4">
            <div className="relative mx-auto w-full overflow-hidden rounded-[2rem] border border-[#E6C98D]/30 bg-gradient-to-b from-[#2F1720] to-[#1C0D12] p-4 shadow-[0_30px_100px_rgba(0,0,0,.6)]">
              
              {/* Real Saree Cloth Display Area */}
              <div className="relative aspect-[3/3.8] overflow-hidden rounded-[1.4rem] bg-[#1C0D12] border border-white/10 shadow-inner group">
                <img
                  src={activeClothImage}
                  alt={`${active.title} - ${meta.name} authentic handloom saree on model Priya`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = PRIYA_EDITORIAL_MODEL.images[region] || activeSaree?.images?.fallbackPrimary || '/collections/models/priya_banarasi_red.jpg';
                  }}
                />
                
                {/* Gradient Ambient Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#160B0E]/95 via-[#160B0E]/50 to-transparent px-6 pb-6 pt-24">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[.25em] text-[#E6C98D] font-medium">
                    <span>{meta.name}</span>
                    <span>•</span>
                    <span className="capitalize">{clothView === 'detail' ? 'Macro Weave Texture' : 'Full Drape Presentation'}</span>
                    <span>•</span>
                    <span className="text-[#E6C98D] capitalize">Motif: {effectiveMotif}</span>
                  </div>
                  <h3 className="mt-1.5 font-serif text-2xl sm:text-3xl text-white font-normal leading-snug">
                    {active.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm lg:text-base text-white/75 line-clamp-2 max-w-lg font-light leading-relaxed">
                    {active.direction}
                  </p>
                </div>

                {/* Perspective View Switcher */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[9px] uppercase tracking-[.18em] text-[#E6C98D] backdrop-blur-md">
                    Look 0{activeIndex + 1}
                  </span>
                  <div
                    role="group"
                    aria-label="Perspective view selection"
                    className="flex items-center gap-1 p-0.5 rounded-full bg-black/75 border border-[#D4AF37]/40 backdrop-blur-md"
                  >
                    <button
                      type="button"
                      onClick={() => setClothView('model')}
                      aria-pressed={clothView === 'model'}
                      aria-label="View look on Model Priya"
                      className={`rounded-full px-2.5 py-1 text-[9px] uppercase tracking-wider transition-all ${
                        clothView === 'model'
                          ? 'bg-[#D4AF37] text-[#1A1617] font-bold shadow-sm'
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      👤 Model Priya
                    </button>
                    <button
                      type="button"
                      onClick={() => setClothView('primary')}
                      aria-pressed={clothView === 'primary'}
                      aria-label="View full Saree Drape"
                      className={`rounded-full px-2.5 py-1 text-[9px] uppercase tracking-wider transition-all ${
                        clothView === 'primary'
                          ? 'bg-[#D4AF37] text-[#1A1617] font-bold shadow-sm'
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      👗 Saree Drape
                    </button>
                    <button
                      type="button"
                      onClick={() => setClothView('detail')}
                      aria-pressed={clothView === 'detail'}
                      aria-label="Inspect Macro Weave texture"
                      className={`rounded-full px-2.5 py-1 text-[9px] uppercase tracking-wider transition-all ${
                        clothView === 'detail'
                          ? 'bg-[#D4AF37] text-[#1A1617] font-bold shadow-sm'
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      🔍 Macro Weave
                    </button>
                  </div>
                </div>

                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <span className="rounded-full border border-[#D4AF37]/50 bg-black/75 px-3 py-1 text-[9px] uppercase tracking-[.15em] text-[#E6C98D] backdrop-blur-md">
                    Motif: {effectiveMotif}
                  </span>
                  <span className="hidden sm:inline-block rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[9px] uppercase tracking-[.15em] text-white/80 backdrop-blur-md">
                    2026/2027 Couture
                  </span>
                </div>
              </div>

              {/* View Mode Tabs: Weave Motif Customizer vs Color Architecture */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('weave')}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-wider transition-colors ${
                      activeTab === 'weave'
                        ? 'bg-[#D2B273] text-[#211116] font-semibold'
                        : 'bg-white/5 text-white/60 hover:text-white'
                    }`}
                  >
                    <Sliders className="w-3 h-3" />
                    <span>Motif Switcher</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('architecture')}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-wider transition-colors ${
                      activeTab === 'architecture'
                        ? 'bg-[#D2B273] text-[#211116] font-semibold'
                        : 'bg-white/5 text-white/60 hover:text-white'
                    }`}
                  >
                    <Palette className="w-3 h-3" />
                    <span>Warp &amp; Weft Palette</span>
                  </button>
                </div>
                {customMotif && (
                  <button
                    type="button"
                    onClick={() => setCustomMotif(null)}
                    className="text-[9px] text-[#E6C98D]/80 hover:text-white underline underline-offset-2"
                  >
                    Reset to Curated
                  </button>
                )}
              </div>

              {/* Tab Content: Motif Switcher */}
              {activeTab === 'weave' && (
                <div className="mt-3.5 pt-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] uppercase tracking-[.18em] text-white/50">
                      Live Motif Simulator (Preview Palette in 6 Weave Structures):
                    </span>
                    <span className="text-[9px] font-mono text-[#E6C98D] uppercase tracking-wider">
                      Selected: {effectiveMotif} ({textile.name})
                    </span>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                    {MOTIF_OPTIONS.map((motifOpt) => {
                      const isSelected = effectiveMotif === motifOpt.id;
                      return (
                        <button
                          key={motifOpt.id}
                          type="button"
                          onClick={() => setCustomMotif(motifOpt.id)}
                          aria-pressed={isSelected}
                          aria-label={`Select ${motifOpt.label} weave motif`}
                          className={`px-2 py-2 rounded-lg border text-center transition-all ${
                            isSelected
                              ? 'border-[#D2B273] bg-[#D2B273]/20 text-[#E6C98D] shadow-sm font-semibold'
                              : 'border-white/10 bg-white/[0.02] text-white/60 hover:border-white/20 hover:text-white'
                          }`}
                        >
                          <span className="block text-[10px] tracking-wide truncate">{motifOpt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tab Content: Warp & Weft Palette Architecture */}
              {activeTab === 'architecture' && (
                <div className="mt-3.5 pt-1">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full border border-white/20 shadow-inner flex-shrink-0" style={{ backgroundColor: pairing.body }} />
                      <div className="min-w-0">
                        <span className="block text-[8px] uppercase tracking-wider text-[#E6C98D]">Body Silk</span>
                        <span className="block text-[10px] font-mono text-white/80 truncate">{pairing.body}</span>
                      </div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full border border-white/20 shadow-inner flex-shrink-0" style={{ backgroundColor: pairing.border }} />
                      <div className="min-w-0">
                        <span className="block text-[8px] uppercase tracking-wider text-[#E6C98D]">Korvai Border</span>
                        <span className="block text-[10px] font-mono text-white/80 truncate">{pairing.border}</span>
                      </div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full border border-white/20 shadow-inner flex-shrink-0" style={{ backgroundColor: pairing.pallu }} />
                      <div className="min-w-0">
                        <span className="block text-[8px] uppercase tracking-wider text-[#E6C98D]">Pallu Weft</span>
                        <span className="block text-[10px] font-mono text-white/80 truncate">{pairing.pallu}</span>
                      </div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full border border-white/20 shadow-inner flex-shrink-0" style={{ backgroundColor: pairing.zari }} />
                      <div className="min-w-0">
                        <span className="block text-[8px] uppercase tracking-wider text-[#E6C98D]">Zari Filament</span>
                        <span className="block text-[10px] font-mono text-white/80 truncate">{pairing.zari}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: 3 Curated Variants List & Editorial Dossier */}
          <div className="flex flex-col justify-start space-y-6">
            
            {/* Top Navigation Row */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-[.25em] text-[#E6C98D] font-semibold">
                  Curated Loom Edit
                </span>
                <p className="mt-0.5 font-serif text-2xl text-white font-medium">
                  {meta.name} <span className="text-white/40 font-light text-lg">({concepts.length} Couture Looks)</span>
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveIndex((activeIndex + concepts.length - 1) % concepts.length);
                    setCustomMotif(null);
                  }}
                  aria-label="Previous design concept"
                  className="rounded-full border border-white/20 p-2.5 text-white/80 hover:border-[#D2B273] hover:text-[#E6C98D] hover:bg-white/5 transition-all"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveIndex((activeIndex + 1) % concepts.length);
                    setCustomMotif(null);
                  }}
                  aria-label="Next design concept"
                  className="rounded-full border border-white/20 p-2.5 text-white/80 hover:border-[#D2B273] hover:text-[#E6C98D] hover:bg-white/5 transition-all"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* List of 3 Regional Variants */}
            <div className="space-y-3" role="list" aria-label="Curated variants for this region">
              {concepts.map((concept, index) => {
                const isCurrent = activeIndex === index;
                return (
                  <button
                    key={concept.id}
                    type="button"
                    onClick={() => {
                      setActiveIndex(index);
                      setCustomMotif(null);
                    }}
                    aria-pressed={isCurrent}
                    className={`group grid w-full grid-cols-[3.8rem_1fr_auto] items-center gap-4 rounded-2xl border p-3.5 text-left transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E6C98D] ${
                      isCurrent
                        ? 'border-[#D2B273] bg-gradient-to-r from-white/[0.12] to-white/[0.04] shadow-lg shadow-black/40 scale-[1.01]'
                        : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]'
                    }`}
                  >
                    {/* Real Model / Cloth Thumbnail Swatch */}
                    <span className="relative h-14 w-12 overflow-hidden rounded-xl border border-white/20 shadow-md flex-shrink-0 bg-black/40">
                      <img
                        src={TREND_LOOK_MODELS[concept.id]?.model || regionalSarees[index % regionalSarees.length]?.images?.primary || PRIYA_EDITORIAL_MODEL.images[region] || '/collections/models/priya_banarasi_red.jpg'}
                        alt={`${concept.title} worn by Priya`}
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </span>

                    {/* Meta Text */}
                    <span className="min-w-0 pr-2">
                      <span className="block font-serif text-lg text-white font-medium group-hover:text-[#F3DFB0] transition-colors truncate">
                        {concept.title}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-white/55 font-light">
                        {concept.direction}
                      </span>
                      <span className="mt-1 flex items-center gap-1.5">
                        {concept.palette.map((color, i) => (
                          <span
                            key={i}
                            className="h-2.5 w-2.5 rounded-full border border-white/20"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </span>
                    </span>

                    {/* Look Number & Badge */}
                    <span className="flex flex-col items-end gap-1">
                      <span className={`text-[10px] font-sans font-bold tracking-[.15em] ${isCurrent ? 'text-[#E6C98D]' : 'text-white/35'}`}>
                        0{index + 1}
                      </span>
                      <span className={`text-[8px] uppercase tracking-wider ${isCurrent && customMotif ? 'text-[#E6C98D] font-bold' : 'text-white/40'}`}>
                        {isCurrent ? effectiveMotif : concept.motif}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Couture Rationale & Citation Dossier */}
            <div className="rounded-2xl bg-black/30 border border-white/10 p-5 space-y-4">
              <div>
                <span className="text-[9px] uppercase tracking-[.22em] text-[#E6C98D] font-bold block mb-1">
                  Couture Rationale &amp; Styling Direction
                </span>
                <p className="text-xs sm:text-sm lg:text-base leading-relaxed text-white/85 font-light">
                  {active.rationale}
                </p>
              </div>

              {/* Verified Editorial & Handloom Sources */}
              <div className="pt-3 border-t border-white/10">
                <span className="text-[9px] uppercase tracking-[.18em] text-white/40 block mb-2">
                  Verified Research Signals:
                </span>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {active.sources.map((source) => (
                    <a
                      key={source.url}
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[.12em] text-[#E6C98D]/85 hover:text-[#F7E7C5] transition-colors"
                    >
                      <span>{source.label}</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Disclaimer & Regional Anchor Link */}
              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-white/10">
                <p className="text-[9px] uppercase tracking-[.12em] text-white/35">
                  Editorial interpretation · not a purchasable commercial SKU
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveStateFilter(region);
                    document.getElementById('new-arrivals-grid')?.scrollIntoView({
                      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
                    });
                  }}
                  className="inline-flex items-center gap-2 border-b border-[#D2B273]/60 pb-1 text-[10px] font-bold uppercase tracking-[.18em] text-[#E6C98D] transition-colors hover:border-[#F7E7C5] hover:text-[#F7E7C5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E6C98D]"
                >
                  <span>Explore {meta.name.split(' ')[0]} Catalog</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
