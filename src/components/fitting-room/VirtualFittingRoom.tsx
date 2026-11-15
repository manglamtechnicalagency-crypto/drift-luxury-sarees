'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import {
  Sparkles,
  Sun,
  Flame,
  Palette,
  Check,
  RotateCcw,
  Info,
  Heart,
  ArrowRight,
  Sliders,
  X,
  Layers,
  ChevronRight,
  Eye,
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { ALL_SAREES, ALL_STATE_METAS } from '@/data/collections/registry';
import {
  DrapeStyleId,
  SareeProduct,
  StateSlug,
  TextileMotif,
  SareeColorway,
} from '@/data/collections/types';
import {
  DRAPE_STYLE_DEFINITIONS,
  getSareeColorways,
  inferMotifFromSaree,
  PRIYA_EDITORIAL_MODEL,
  RELATABLE_SAREE_MODELS,
} from '@/data/collections/colorways';

export interface DrapeModelAsset {
  id: DrapeStyleId;
  name: string;
  regionalOrigin: string;
  description: string;
  palluPlacement: string;
  image: string;
  fallbackImage: string;
}

export const DRAPE_MODELS: Record<DrapeStyleId, DrapeModelAsset> = {
  'nivi': {
    id: 'nivi',
    name: 'Regal Pleated Nivi Drape',
    regionalOrigin: 'Pan-Indian / Classical Ateliers',
    description: 'Classic frontal pleats tucked at the waist with decorative pallu draped gracefully over the left shoulder.',
    palluPlacement: 'Left Shoulder',
    image: PRIYA_EDITORIAL_MODEL.drapes['nivi'],
    fallbackImage: '/collections/models/model_royal_chandan.jpg',
  },
  'seedha-pallu': {
    id: 'seedha-pallu',
    name: 'Traditional Seedha Pallu Drape',
    regionalOrigin: 'Gujarat & Rajasthan',
    description: 'Pleats tucked at waist with the ornate pallu brought from back over the right shoulder and pinned across the bodice.',
    palluPlacement: 'Front Bodice',
    image: PRIYA_EDITORIAL_MODEL.drapes['seedha-pallu'],
    fallbackImage: '/collections/models/model_saffron_yellow.jpg',
  },
  'nauvari-kashta': {
    id: 'nauvari-kashta',
    name: 'Maharashtrian Nauvari Kashta Drape',
    regionalOrigin: 'Maharashtra (Paithan & Pune)',
    description: 'Athletic bifurcated dhoti drape with central pleats taken back between legs for sovereign poise and movement.',
    palluPlacement: 'Left Shoulder',
    image: PRIYA_EDITORIAL_MODEL.drapes['nauvari-kashta'],
    fallbackImage: '/collections/models/model_nath_paithani.jpg',
  },
  'atpoure': {
    id: 'atpoure',
    name: 'Bengali Atpoure Heritage Drape',
    regionalOrigin: 'West Bengal & Odisha',
    description: 'Box-pleated wrap with sweeping pallu draped over both shoulders, anchoring heirloom silver key-bunch ornaments.',
    palluPlacement: 'Double Drape',
    image: PRIYA_EDITORIAL_MODEL.drapes['atpoure'],
    fallbackImage: '/collections/models/model_bengali_bridal.jpg',
  },
  'modern-cocktail': {
    id: 'modern-cocktail',
    name: 'Modern Pre-Pleated Cocktail Drape',
    regionalOrigin: 'Contemporary Atelier / Red Carpet',
    description: 'Svelte pre-pleated silhouette with cinched metallic waist detailing and weightless fluid evening pallu.',
    palluPlacement: 'Belted & Cinched',
    image: PRIYA_EDITORIAL_MODEL.drapes['modern-cocktail'],
    fallbackImage: '/collections/models/model_burgundy_zardozi.jpg',
  },
};

const MOTIF_OPTIONS: { id: TextileMotif; name: string; heritageNote: string }[] = [
  { id: 'diamond', name: 'Ashrafi & Kadhwa Diamond', heritageNote: 'Imperial diamond grid with floating coin motifs.' },
  { id: 'dots', name: 'Bandhani & Shisha Butti', heritageNote: 'Auspicious tied resist dots with mirror accents.' },
  { id: 'checks', name: 'Khat & Pasapalli Checks', heritageNote: 'Architectural geometric lattice in fine gold wire.' },
  { id: 'waves', name: 'Leheriya & Tarang Waves', heritageNote: 'Kinetic ripple waves evoking monsoon river currents.' },
  { id: 'floral', name: 'Jangla & Kamal Jaal', heritageNote: 'Interlocking flora, lotus blooms and vine creepers.' },
  { id: 'chevron', name: 'Rekku & Gopuram Chevron', heritageNote: 'Stepped temple spires woven with rigid precision.' },
];

const LIGHTING_CONFIGS = {
  chandelier: {
    id: 'chandelier' as const,
    name: 'Palace Chandelier',
    subtitle: 'Warm Gold Evening',
    icon: Sparkles,
    ambientColor: '#FFE5B4',
    ambientIntensity: 1.25,
    keyLightColor: '#FFF8E7',
    keyLightIntensity: 2.6,
    pointColor: '#D4AF37',
    pointIntensity: 22,
    gradientStyle: 'radial-gradient(ellipse at 40% 25%, rgba(212, 175, 55, 0.22) 0%, rgba(26, 22, 23, 0) 75%)',
  },
  daylight: {
    id: 'daylight' as const,
    name: 'Atelier Daylight',
    subtitle: 'Crisp Studio Neutral',
    icon: Sun,
    ambientColor: '#FFFFFF',
    ambientIntensity: 1.35,
    keyLightColor: '#F5F7FA',
    keyLightIntensity: 2.8,
    pointColor: '#CBD5E1',
    pointIntensity: 14,
    gradientStyle: 'radial-gradient(ellipse at 50% 20%, rgba(240, 244, 248, 0.18) 0%, rgba(26, 22, 23, 0) 70%)',
  },
  candlelight: {
    id: 'candlelight' as const,
    name: 'Diwan Candlelight',
    subtitle: 'Intimate Amber Glow',
    icon: Flame,
    ambientColor: '#FF8833',
    ambientIntensity: 1.15,
    keyLightColor: '#FFA347',
    keyLightIntensity: 2.2,
    pointColor: '#A80F24',
    pointIntensity: 28,
    gradientStyle: 'radial-gradient(ellipse at 35% 35%, rgba(255, 140, 40, 0.28) 0%, rgba(168, 15, 36, 0.15) 50%, rgba(26, 22, 23, 0) 80%)',
  },
};

export interface VirtualFittingRoomProps {
  isModal?: boolean;
  onClose?: () => void;
  className?: string;
}

export default function VirtualFittingRoom({
  isModal = false,
  onClose,
  className = '',
}: VirtualFittingRoomProps) {
  const {
    sarees,
    fittingRoomSaree,
    fittingRoomDrape,
    fittingRoomColorwayIndex,
    fittingRoomMotif,
    fittingRoomLighting,
    setFittingRoomSaree,
    setFittingRoomDrape,
    setFittingRoomColorway,
    setFittingRoomMotif,
    setFittingRoomLighting,
    wishlist,
    toggleWishlist,
    isInWishlist,
    setSelectedProductForModal,
    setActiveModal,
  } = useStore();

  const reduceMotion = useReducedMotion();

  // Active Saree & Region Filtering
  const activeSaree: SareeProduct = fittingRoomSaree || sarees[0] || ALL_SAREES[0];
  const [selectedRegionTab, setSelectedRegionTab] = useState<StateSlug | 'all'>('all');
  const [viewMode, setViewMode] = useState<'model' | 'saree' | 'detail'>('model');
  const [lastUserAction, setLastUserAction] = useState<'saree' | 'drape'>('saree');

  // Filtered sarees by region tab
  const displayedSarees = useMemo(() => {
    if (selectedRegionTab === 'all') return sarees.length > 0 ? sarees : ALL_SAREES;
    return (sarees.length > 0 ? sarees : ALL_SAREES).filter((s) => s.region === selectedRegionTab);
  }, [sarees, selectedRegionTab]);

  // Curated colorways for current saree
  const colorways = useMemo(() => getSareeColorways(activeSaree), [activeSaree]);
  const activeColorway: SareeColorway =
    colorways[fittingRoomColorwayIndex] || colorways[0] || {
      id: 'default',
      name: 'Royal Heritage Classic',
      palette: ['#52101E', '#9E182B', '#E5A93C', '#F7E7C4'],
      motif: fittingRoomMotif,
      note: 'Imperial silk ground with antique gold accents.',
    };

  const pairing = activeColorway.pairing || {
    body: activeColorway.palette[0],
    border: activeColorway.palette[1],
    pallu: activeColorway.palette[2],
    zari: activeColorway.palette[3],
  };

  // Active Drape Model metadata
  const activeDrapeModel: DrapeModelAsset =
    DRAPE_MODELS[fittingRoomDrape] || DRAPE_MODELS['nivi'];

  // Supported drapes for active saree
  const supportedDrapes = activeSaree.supportedDrapes || ['nivi', 'seedha-pallu'];

  // Realism image resolution: seamlessly switch between model fitting drape, full saree photo, or weave detail
  const activeDisplayImage = useMemo(() => {
    if (viewMode === 'saree') {
      return activeSaree?.images?.primary || activeSaree?.images?.editorial || activeDrapeModel.image;
    }
    if (viewMode === 'detail') {
      return activeSaree?.images?.detail || activeSaree?.images?.primary || activeDrapeModel.image;
    }
    // viewMode === 'model'
    if (lastUserAction === 'drape') {
      return activeDrapeModel.image || activeSaree?.images?.editorial || activeSaree?.images?.primary;
    }
    return (
      activeSaree?.images?.editorial ||
      activeSaree?.images?.primary ||
      activeDrapeModel.image ||
      (activeSaree?.region ? PRIYA_EDITORIAL_MODEL.images[activeSaree.region] : null) ||
      '/collections/models/priya_banarasi_red.jpg'
    );
  }, [viewMode, activeSaree, activeDrapeModel, lastUserAction]);

  const activeLightingConfig = LIGHTING_CONFIGS[fittingRoomLighting] || LIGHTING_CONFIGS.chandelier;
  const isWishlisted = isInWishlist(activeSaree.id);

  const handleSelectSaree = (saree: SareeProduct) => {
    setFittingRoomSaree(saree);
    setLastUserAction('saree');
    // Align drape style to traditional regional drape
    if (saree.region === 'gujarati' || saree.region === 'rajasthani') {
      setFittingRoomDrape('seedha-pallu');
    } else if (saree.region === 'heritage-states') {
      setFittingRoomDrape('nauvari-kashta');
    } else if (saree.region === 'kanchipuram') {
      setFittingRoomDrape('nivi');
    } else if (saree.region === 'jodhpuri') {
      setFittingRoomDrape('modern-cocktail');
    } else {
      setFittingRoomDrape((saree.supportedDrapes?.[0] as DrapeStyleId) || 'nivi');
    }
  };

  const handleReset = () => {
    const firstSaree = ALL_SAREES[0];
    setSelectedRegionTab('all');
    setFittingRoomSaree(firstSaree);
    setFittingRoomDrape('nivi');
    setFittingRoomColorway(0);
    setFittingRoomMotif(inferMotifFromSaree(firstSaree));
    setFittingRoomLighting('chandelier');
    setViewMode('model');
    setLastUserAction('saree');
  };

  const handleOpenQuickShop = () => {
    setSelectedProductForModal(activeSaree);
    setActiveModal('quickshop');
  };

  return (
    <section
      role="region"
      aria-label="Interactive Model Virtual Fitting Room"
      className={`relative w-full text-left font-sans ${className}`}
    >
      {/* Background Decor */}
      <div className="relative rounded-3xl bg-[#FAF7F2] border border-[#E6DFD5] shadow-2xl p-4 sm:p-8 lg:p-10 overflow-hidden">
        
        {/* ============================================================ */}
        {/* HEADER: Luxury Editorial Title + Actions                     */}
        {/* ============================================================ */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#E6DFD5]/80">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-[0.25em] bg-[#A80F24]/10 text-[#A80F24] border border-[#A80F24]/20">
                <Sparkles className="w-3 h-3 text-[#A80F24]" />
                Virtual Atelier Simulation
              </span>
              <span className="hidden sm:inline-block text-[11px] font-serif italic text-[#1A1617]/60">
                Real-time 5-Drape Photographic &amp; Micro-Sheen Engine
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1617] font-semibold tracking-tight">
              Interactive Model <span className="italic font-normal text-[#A80F24]">Fitting Room</span>
            </h2>
            <p className="font-serif text-sm sm:text-base lg:text-lg xl:text-xl text-[#1A1617]/80 font-light mt-1 max-w-3xl leading-relaxed">
              Drape 48 regional handloom masterpieces across 5 authentic Indian silhouettes. Dynamically adjust 4-tone warp and weft palettes, weave motifs, and royal atmospheric lighting.
            </p>
          </div>

          {/* Quick Header Controls */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <button
              onClick={handleReset}
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#E6DFD5] bg-white hover:bg-[#F4EFE6] text-[#1A1617] text-xs font-medium transition shadow-sm"
              title="Reset to default royal fitting"
              aria-label="Reset fitting room settings"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#1A1617]/70" />
              <span>Reset</span>
            </button>
            {isModal && onClose && (
              <button
                onClick={onClose}
                type="button"
                className="p-2 rounded-full bg-[#1A1617] text-white hover:bg-[#A80F24] transition shadow-md"
                aria-label="Close fitting room modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* ============================================================ */}
        {/* MAIN WORKSPACE: Viewport (Left) + Control Rail (Right)       */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mt-8 items-start">
          
          {/* ---------------------------------------------------------- */}
          {/* LEFT: Multi-Pass Layered Composite Viewport (5 Cols)       */}
          {/* ---------------------------------------------------------- */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            {/* Viewport Frame */}
            <div
              className="relative w-full aspect-[3/4.2] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#D4AF37]/40 bg-[#1A1617] group select-none"
              style={{
                boxShadow: '0 25px 60px -15px rgba(43, 7, 14, 0.35), 0 0 0 1px rgba(212, 175, 55, 0.25)',
              }}
            >
              {/* Pass 1: Authentic High-Resolution Photographic Base Layer */}
              <div className="absolute inset-0 z-0 bg-[#2B070E]">
                <img
                  src={activeDisplayImage}
                  alt={
                    viewMode === 'saree'
                      ? `Full heirloom saree cloth drape of ${activeSaree.name}`
                      : viewMode === 'detail'
                      ? `Authentic handloom zari weave texture of ${activeSaree.name}`
                      : `${activeDrapeModel.name} on model Priya in ${activeSaree.name}`
                  }
                  className="w-full h-full object-cover transition-opacity duration-500 ease-out"
                  onError={(e) => {
                    const fallback = activeSaree?.images?.editorial || activeSaree?.images?.primary || activeDrapeModel.fallbackImage || '/collections/models/priya_banarasi_red.jpg';
                    if (!e.currentTarget.src.endsWith(fallback)) {
                      e.currentTarget.src = fallback;
                    }
                  }}
                />
              </div>

              {/* Atmospheric Ambient Lighting Tint Overlay */}
              <div
                className="absolute inset-0 z-10 pointer-events-none transition-all duration-700"
                style={{ background: activeLightingConfig.gradientStyle }}
                aria-hidden="true"
              />

              {/* Vignette Edge Shading for Editorial Depth */}
              <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-black/85 via-transparent to-black/35" />

              {/* Top Floating Badges: Ambience & Photographic View Switcher */}
              <div className="absolute top-4 inset-x-4 z-30 flex items-center justify-between gap-2">
                {/* Royal Ambient Lighting Controls */}
                <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/65 backdrop-blur-md border border-white/15">
                  {(['chandelier', 'daylight', 'candlelight'] as const).map((lightKey) => {
                    const lCfg = LIGHTING_CONFIGS[lightKey];
                    const Icon = lCfg.icon;
                    const isSelected = fittingRoomLighting === lightKey;
                    return (
                      <button
                        key={lightKey}
                        type="button"
                        onClick={() => setFittingRoomLighting(lightKey)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-sans font-bold transition-all ${
                          isSelected
                            ? 'bg-[#A80F24] text-white shadow-md ring-1 ring-white/30'
                            : 'text-white/70 hover:text-white hover:bg-white/10'
                        }`}
                        aria-pressed={isSelected}
                        aria-label={`Switch lighting to ${lCfg.name}`}
                      >
                        <Icon className="w-3 h-3" />
                        <span className="hidden sm:inline">{lCfg.name.split(' ')[1] || lCfg.name}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Real Photographic Perspective Switcher: Model Drape / Saree Cloth / Macro Weave */}
                <div
                  role="group"
                  aria-label="Perspective view selection"
                  className="flex items-center gap-1 p-1 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-white/90 text-[10px] font-sans font-semibold"
                >
                  <button
                    type="button"
                    onClick={() => setViewMode('model')}
                    aria-pressed={viewMode === 'model'}
                    aria-label="View royal model drape silhouette"
                    className={`px-2.5 py-1 rounded-full transition-all ${
                      viewMode === 'model'
                        ? 'bg-[#D4AF37] text-[#1A1617] font-bold shadow-sm'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                    title="View royal model drape silhouette"
                  >
                    Drape
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('saree')}
                    aria-pressed={viewMode === 'saree'}
                    aria-label="View full heirloom saree cloth drape"
                    className={`px-2.5 py-1 rounded-full transition-all ${
                      viewMode === 'saree'
                        ? 'bg-[#D4AF37] text-[#1A1617] font-bold shadow-sm'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                    title="View full heirloom saree cloth drape"
                  >
                    Saree
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('detail')}
                    aria-pressed={viewMode === 'detail'}
                    aria-label="Inspect authentic handloom zari weave texture"
                    className={`px-2.5 py-1 rounded-full transition-all ${
                      viewMode === 'detail'
                        ? 'bg-[#D4AF37] text-[#1A1617] font-bold shadow-sm'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                    title="Inspect authentic handloom zari weave texture"
                  >
                    Weave
                  </button>
                </div>
              </div>

              {/* Bottom Floating Info Pill */}
              <div className="absolute bottom-4 inset-x-4 z-30 flex items-end justify-between">
                <div className="bg-black/75 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/15 text-left max-w-[70%]">
                  <span className="text-[9px] font-sans uppercase tracking-widest text-[#E6B83A] font-bold block truncate">
                    MUSE: PRIYA • {activeDrapeModel.name}
                  </span>
                  <p className="font-serif text-sm font-semibold text-white truncate">
                    {activeSaree.name}
                  </p>
                  <span className="text-[10px] text-white/70 font-sans block mt-0.5">
                    {activeDrapeModel.palluPlacement} • {activeSaree.originState} Handloom
                  </span>
                </div>

                {/* Wishlist Button Overlay */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(activeSaree.id)}
                  aria-label={isWishlisted ? 'Remove from Heirloom Wishlist' : 'Add to Heirloom Wishlist'}
                  aria-pressed={isWishlisted}
                  className={`p-3 rounded-full backdrop-blur-md transition-all shadow-lg border ${
                    isWishlisted
                      ? 'bg-[#A80F24] border-[#A80F24] text-white scale-105'
                      : 'bg-black/65 border-white/20 text-white hover:bg-black/85'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

            </div>

            {/* Viewport Caption */}
            <div className="w-full mt-3 flex items-center justify-between text-[11px] text-[#1A1617]/65 px-1 font-serif italic">
              <span>Photo-silhouette &amp; micro-sheen composite</span>
              <span className="font-sans not-italic text-[10px] font-semibold uppercase text-[#A80F24]">
                GI Reg: {activeSaree.specs?.patternSet?.primaryTechnique || 'Handloom Authentic'}
              </span>
            </div>

          </div>

          {/* ---------------------------------------------------------- */}
          {/* RIGHT: Interactive Control Rail (7 Cols)                   */}
          {/* ---------------------------------------------------------- */}
          <div className="lg:col-span-7 space-y-6">

            {/* 1. Saree Catalog Selector (48 Sarees across 6 Regions) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E6DFD5] shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#A80F24]" />
                  <h3 className="text-xs font-sans uppercase tracking-widest text-[#1A1617] font-bold">
                    1. Select Catalog Saree (48 GI Masterpieces)
                  </h3>
                </div>
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#A80F24]">
                  {activeSaree.region.toUpperCase()} • {activeSaree.craft}
                </span>
              </div>

              {/* Regional Category Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none" role="tablist" aria-label="Saree regions">
                <button
                  type="button"
                  onClick={() => setSelectedRegionTab('all')}
                  className={`px-3 py-1 rounded-full text-[10px] font-sans uppercase font-bold tracking-wider transition-all flex-shrink-0 ${
                    selectedRegionTab === 'all'
                      ? 'bg-[#A80F24] text-white shadow-sm'
                      : 'bg-[#FAF7F2] text-[#1A1617]/70 hover:bg-[#E6DFD5]'
                  }`}
                  role="tab"
                  aria-selected={selectedRegionTab === 'all'}
                >
                  All ({sarees.length || ALL_SAREES.length})
                </button>
                {ALL_STATE_METAS.map((meta) => {
                  const isSelected = selectedRegionTab === meta.slug;
                  return (
                    <button
                      key={meta.slug}
                      type="button"
                      onClick={() => setSelectedRegionTab(meta.slug)}
                      className={`px-3 py-1 rounded-full text-[10px] font-sans uppercase font-bold tracking-wider transition-all flex-shrink-0 ${
                        isSelected
                          ? 'bg-[#A80F24] text-white shadow-sm'
                          : 'bg-[#FAF7F2] text-[#1A1617]/70 hover:bg-[#E6DFD5]'
                      }`}
                      role="tab"
                      aria-selected={isSelected}
                    >
                      {meta.name}
                    </button>
                  );
                })}
              </div>

              {/* Saree Horizontal Thumbnails Carousel */}
              <div
                className="flex items-center gap-3 overflow-x-auto py-2 scrollbar-thin"
                role="listbox"
                aria-label="Select saree to drape"
              >
                {displayedSarees.map((saree) => {
                  const isCurrent = activeSaree.id === saree.id;
                  return (
                    <button
                      key={saree.id}
                      type="button"
                      onClick={() => handleSelectSaree(saree)}
                      role="option"
                      aria-selected={isCurrent}
                      className={`group relative flex-shrink-0 w-20 sm:w-24 text-left rounded-xl overflow-hidden border-2 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A80F24] ${
                        isCurrent
                          ? 'border-[#A80F24] shadow-md ring-2 ring-[#A80F24]/30 scale-102 bg-white'
                          : 'border-[#E6DFD5] opacity-75 hover:opacity-100 bg-[#FAF7F2]'
                      }`}
                      title={saree.name}
                    >
                      <div className="aspect-[3/3.8] w-full overflow-hidden bg-black/5">
                        <img
                          src={
                            saree.images.editorial ||
                            saree.images.primary ||
                            RELATABLE_SAREE_MODELS[saree.id]?.model ||
                            PRIYA_EDITORIAL_MODEL.images[saree.region]
                          }
                          alt={`${saree.name}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            const fallback = saree.images.primary || saree.images.fallbackPrimary || '/collections/models/priya_banarasi_red.jpg';
                            if (!e.currentTarget.src.endsWith(fallback)) {
                              e.currentTarget.src = fallback;
                            }
                          }}
                        />
                      </div>
                      <div className="p-1.5 bg-white">
                        <p className="font-serif text-[10px] font-semibold text-[#1A1617] truncate leading-tight">
                          {saree.name.split(' ')[0]} {saree.name.split(' ')[1] || ''}
                        </p>
                        <span className="text-[8px] font-sans uppercase tracking-wider text-[#A80F24] block truncate">
                          {saree.originState.split(' ')[0]} • Priya
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Drape Silhouette Switcher (5 Authentic Drapes) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E6DFD5] shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#A80F24]" />
                  <h3 className="text-xs font-sans uppercase tracking-widest text-[#1A1617] font-bold">
                    2. Authentic Drape Silhouette (5 Classical Styles)
                  </h3>
                </div>
                <span className="text-[10px] font-serif italic text-[#1A1617]/70">
                  Select Silhouette Base
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                {(Object.keys(DRAPE_MODELS) as DrapeStyleId[]).map((drapeId) => {
                  const dMeta = DRAPE_MODELS[drapeId];
                  const isSelected = fittingRoomDrape === drapeId;
                  const isSupported = supportedDrapes.includes(drapeId);

                  return (
                    <button
                      key={drapeId}
                      type="button"
                      onClick={() => {
                        setFittingRoomDrape(drapeId);
                        setLastUserAction('drape');
                      }}
                      aria-pressed={isSelected}
                      className={`relative p-2.5 rounded-xl border text-left transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A80F24] flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#A80F24] bg-[#FAF7F2] shadow-md ring-2 ring-[#A80F24]/20 scale-102'
                          : 'border-[#E6DFD5] bg-white hover:bg-[#FAF7F2]/60 opacity-85'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-[8px] font-sans font-bold uppercase tracking-wider text-[#A80F24] truncate">
                            {dMeta.palluPlacement}
                          </span>
                          {isSupported && (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 flex-shrink-0" title="Authentic pairing for this saree" />
                          )}
                        </div>
                        <h4 className="font-serif text-xs font-semibold text-[#1A1617] leading-tight">
                          {dMeta.name.split(' ')[0]} {dMeta.name.split(' ')[1] || ''}
                        </h4>
                        <p className="text-[9px] text-[#1A1617]/65 mt-1 line-clamp-2 leading-snug">
                          {dMeta.regionalOrigin}
                        </p>
                      </div>

                      {isSelected && (
                        <div className="mt-2 flex items-center gap-1 text-[9px] font-sans font-bold text-[#A80F24]">
                          <Check className="w-3 h-3" />
                          <span>Active Drape</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="p-2.5 sm:p-3 rounded-xl bg-[#FAF7F2] border border-[#E6DFD5] text-[11px] sm:text-xs lg:text-sm text-[#1A1617]/85 flex items-start gap-2">
                <Info className="w-3.5 h-3.5 text-[#A80F24] flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="text-[#1A1617]">{activeDrapeModel.name}:</strong> {activeDrapeModel.description}
                </p>
              </div>
            </div>

            {/* 3. 4-Tone Colorway & Weave Palette Switcher */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E6DFD5] shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Palette className="w-3.5 h-3.5 text-[#A80F24]" />
                  <h3 className="text-xs font-sans uppercase tracking-widest text-[#1A1617] font-bold">
                    3. Regional Palette &amp; 4-Tone Chromatic Pairing
                  </h3>
                </div>
                <span className="text-[10px] text-[#A80F24] font-semibold uppercase tracking-wider">
                  {colorways.length} Curated Variations
                </span>
              </div>

              {/* Colorway Selection Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {colorways.map((cw, idx) => {
                  const isSelected = fittingRoomColorwayIndex === idx;
                  const cwPairing = cw.pairing || {
                    body: cw.palette[0],
                    border: cw.palette[1],
                    pallu: cw.palette[2],
                    zari: cw.palette[3],
                  };

                  return (
                    <button
                      key={cw.id}
                      type="button"
                      onClick={() => setFittingRoomColorway(idx)}
                      aria-pressed={isSelected}
                      className={`group relative p-2.5 rounded-xl border text-left transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A80F24] ${
                        isSelected
                          ? 'border-[#A80F24] bg-[#FAF7F2] shadow-md ring-2 ring-[#A80F24]/20 scale-102'
                          : 'border-[#E6DFD5] bg-white hover:bg-[#FAF7F2]/60'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="w-6 h-8 rounded-md overflow-hidden flex-shrink-0 border border-black/15 shadow-inner"
                          style={{
                            background: `linear-gradient(135deg, ${cwPairing.body} 0%, ${cwPairing.border} 55%, ${cwPairing.zari} 100%)`,
                          }}
                        />
                        <div className="min-w-0">
                          <h4 className="font-serif text-xs font-semibold text-[#1A1617] truncate">
                            {cw.name.split('·')[0]}
                          </h4>
                          <span className="text-[8px] font-sans uppercase tracking-wider text-[#A80F24] block capitalize">
                            {cw.motif} Weave
                          </span>
                        </div>
                      </div>

                      {/* 4-Tone Palette Swatches */}
                      <div className="flex items-center justify-between pt-1 border-t border-black/5">
                        <div className="flex items-center gap-1">
                          <span className="w-3 h-3 rounded-full border border-black/20" style={{ backgroundColor: cwPairing.body }} title={`Body: ${cwPairing.body}`} />
                          <span className="w-3 h-3 rounded-full border border-black/20" style={{ backgroundColor: cwPairing.border }} title={`Border: ${cwPairing.border}`} />
                          <span className="w-3 h-3 rounded-full border border-black/20" style={{ backgroundColor: cwPairing.pallu }} title={`Pallu: ${cwPairing.pallu}`} />
                          <span className="w-3 h-3 rounded-full border border-black/20" style={{ backgroundColor: cwPairing.zari }} title={`Zari: ${cwPairing.zari}`} />
                        </div>
                        {isSelected && <Check className="w-3 h-3 text-[#A80F24]" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Palette Breakdown Bar */}
              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E6DFD5] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-sm" style={{ backgroundColor: pairing.body }} />
                    <span className="text-[10px] font-mono uppercase text-[#1A1617]/70 font-semibold">Body ({pairing.body})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-sm" style={{ backgroundColor: pairing.border }} />
                    <span className="text-[10px] font-mono uppercase text-[#1A1617]/70 font-semibold">Border ({pairing.border})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-sm" style={{ backgroundColor: pairing.pallu }} />
                    <span className="text-[10px] font-mono uppercase text-[#1A1617]/70 font-semibold">Pallu ({pairing.pallu})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-sm" style={{ backgroundColor: pairing.zari }} />
                    <span className="text-[10px] font-mono uppercase text-[#1A1617]/70 font-semibold">Zari ({pairing.zari})</span>
                  </div>
                </div>
                <span className="text-[10px] font-serif italic text-[#A80F24]">
                  {activeColorway.note}
                </span>
              </div>
            </div>

            {/* 4. Textile Motif Switcher (6 Authentic Weave Patterns) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E6DFD5] shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-[#A80F24]" />
                  <h3 className="text-xs font-sans uppercase tracking-widest text-[#1A1617] font-bold">
                    4. Procedural Textile Motif Weave (6 Historic Motifs)
                  </h3>
                </div>
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#A80F24]">
                  Active: {fittingRoomMotif.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {MOTIF_OPTIONS.map((motifOpt) => {
                  const isSelected = fittingRoomMotif === motifOpt.id;

                  return (
                    <button
                      key={motifOpt.id}
                      type="button"
                      onClick={() => setFittingRoomMotif(motifOpt.id)}
                      aria-pressed={isSelected}
                      className={`group relative p-2 rounded-xl border text-center transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A80F24] ${
                        isSelected
                          ? 'border-[#A80F24] bg-[#FAF7F2] shadow-md ring-2 ring-[#A80F24]/20 scale-102'
                          : 'border-[#E6DFD5] bg-white hover:bg-[#FAF7F2]/60'
                      }`}
                    >
                      <div className="w-full aspect-square rounded-lg overflow-hidden border border-black/10 mb-1.5 relative bg-[#1A1617]">
                        <img
                          src={activeSaree.images?.detail || activeSaree.images?.primary}
                          alt={`${motifOpt.name} weave motif`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div
                          className="absolute inset-0 opacity-25 pointer-events-none"
                          style={{ backgroundColor: pairing.zari }}
                        />
                      </div>
                      <span className="font-serif text-[10px] font-semibold text-[#1A1617] block truncate capitalize">
                        {motifOpt.id}
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="text-[11px] font-serif text-[#1A1617]/70 italic">
                {MOTIF_OPTIONS.find((m) => m.id === fittingRoomMotif)?.heritageNote}
              </p>
            </div>

            {/* 5. Product Action & Integrity Verification Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-[#D4AF37]/40 shadow-md space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#A80F24] font-bold block">
                    DESIGN STUDY RECORD
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1617]">
                    {activeSaree.name}
                  </h4>
                  <p className="text-xs text-[#1A1617]/70 font-sans mt-0.5">
                    {activeSaree.fabric} • {activeSaree.zariType} • {activeSaree.weaveTime}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="font-sans text-xl sm:text-2xl font-bold text-[#1A1617] block">
                    {activeSaree.priceDisplay}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-[#A80F24] font-semibold">
                    Concept Valuation
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleOpenQuickShop}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#A80F24] hover:bg-[#7A0A19] text-[#FAF7F2] font-sans text-xs uppercase tracking-[0.18em] font-bold shadow-lg transition-all active:scale-95"
                >
                  <span>Explore Design Record</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(activeSaree.id)}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-full font-sans text-xs uppercase tracking-wider font-semibold border transition-all ${
                    isWishlisted
                      ? 'border-[#A80F24] bg-[#A80F24]/10 text-[#A80F24]'
                      : 'border-[#E6DFD5] bg-white hover:bg-[#F4EFE6] text-[#1A1617]'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-[#A80F24] text-[#A80F24]' : ''}`} />
                  <span>{isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                </button>
              </div>

              <p className="text-[10px] font-sans text-[#1A1617]/60 leading-relaxed pt-1 border-t border-[#E6DFD5]">
                Craft archive labeled as design studies in accordance with DRIFT AGENTS.md. Virtual model fitting is an illustrative simulation; seller listings, exact SKUs, image rights, prices, and stock remain unverified design concepts.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
