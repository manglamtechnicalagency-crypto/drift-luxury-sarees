'use client';

import React, { useMemo, useState } from 'react';
import { ALL_SAREES, ALL_STATE_METAS } from '@/data/collections/registry';
import { SareeProduct } from '@/data/collections/types';
import { useStore } from '@/store/useStore';
import { Heart, Eye, Sparkles, ArrowRight } from 'lucide-react';
import { getSareeColorways, PRIYA_EDITORIAL_MODEL, RELATABLE_SAREE_MODELS } from '@/data/collections/colorways';
import { TextilePattern } from '@/components/products/TextilePalette';

function ProductCard({ saree }: { saree: SareeProduct }) {
  const { toggleWishlist, isInWishlist, setSelectedProductForModal, setActiveModal } =
    useStore();
  const inWish = isInWishlist(saree.id);
  const colorways = useMemo(() => getSareeColorways(saree), [saree]);
  const [selectedColorway, setSelectedColorway] = useState(0);
  const [viewMode, setViewMode] = useState<'photo' | 'textile'>('photo');

  const activeColorway = colorways[selectedColorway] || colorways[0];
  const pairing = activeColorway.pairing || {
    body: activeColorway.palette[0],
    border: activeColorway.palette[1],
    pallu: activeColorway.palette[2],
    zari: activeColorway.palette[3],
  };

  const primaryDisplayImage =
    saree.images.editorial ||
    saree.images.primary ||
    RELATABLE_SAREE_MODELS[saree.id]?.model ||
    PRIYA_EDITORIAL_MODEL.images[saree.region];

  const hoverDisplayImage =
    saree.images.detail ||
    saree.images.pallu ||
    saree.images.primary;

  const displayCraft = (saree.craft || 'Handloom Silk')
    .replace(/^Craft inspiration:\s*/i, '')
    .split('·')[0]
    .trim();

  const cleanDisplayName = saree.name.replace(/^DRIFT Study\s*[-—]\s*/i, '');

  return (
    <div className="group relative bg-[#FAF7F2] rounded-2xl overflow-hidden border border-[#E6DFD5] hover:border-[#D4AF37]/60 transition-all duration-300 hover:shadow-2xl flex flex-col justify-between">
      
      {/* Visual Display Container: Photo Drape or Woven Textile View */}
      <div
        onClick={() => {
          setSelectedProductForModal(saree);
          setActiveModal('quickshop');
        }}
        className="relative aspect-[3/4.2] overflow-hidden bg-[#2B070E]/10 cursor-pointer"
      >
        {viewMode === 'photo' ? (
          <>
            {/* Primary Model Image: Relatable model wearing this specific saree */}
            <img
              src={primaryDisplayImage}
              alt={`${cleanDisplayName} draped in ${displayCraft}`}
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              onError={(e) => {
                const fb = saree.images.primary || saree.images.fallbackPrimary || '/collections/models/priya_banarasi_red.jpg';
                if (!e.currentTarget.src.endsWith(fb)) {
                  e.currentTarget.src = fb;
                }
              }}
            />
            {/* Secondary Editorial / Weave Drape on Hover with smooth cross-fade */}
            <img
              src={hoverDisplayImage}
              alt={`${cleanDisplayName} authentic weave and border detail`}
              className="absolute inset-0 w-full h-full object-cover object-top opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              onError={(e) => {
                if (!e.currentTarget.src.endsWith(primaryDisplayImage)) {
                  e.currentTarget.src = primaryDisplayImage;
                }
              }}
            />
            {/* Subtle Ambient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2B070E]/80 via-transparent to-black/20 opacity-70 group-hover:opacity-50 transition-opacity" />
            
            {/* Muse Priya Tag */}
            <div className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-[#E6B83A]/30 text-[#E6B83A] text-[9px] font-sans uppercase tracking-widest font-semibold">
              <Sparkles className="w-2.5 h-2.5 text-[#E6B83A]" />
              <span>Muse Priya</span>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 w-full h-full bg-[#1C0D12] p-2 flex flex-col justify-between">
            <TextilePattern colorway={activeColorway} className="w-full h-full object-cover rounded-xl" />
            <div className="absolute bottom-3 inset-x-3 bg-black/85 backdrop-blur-md p-2 rounded-xl border border-[#D4AF37]/30 text-center">
              <span className="text-[9px] uppercase tracking-widest text-[#E6C98D] block font-semibold truncate">
                {activeColorway.name}
              </span>
              <span className="text-[8px] text-white/70 block capitalize">
                {activeColorway.motif} Weave • 4-Tone Harmony
              </span>
            </div>
          </div>
        )}

        {/* Top-Left Badge: Clean Editorial Study Label */}
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] font-sans font-semibold text-[#E6C98D] tracking-wider uppercase border border-white/10">
          Design Study
        </div>

        {/* Top-Right Circular Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(saree.id);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-[#FAF7F2] hover:text-[#E6B83A] border border-white/10 shadow-sm transition-colors"
          aria-label="Toggle Wishlist"
        >
          <Heart
            className={`w-3.5 h-3.5 transition-transform active:scale-125 ${
              inWish ? 'fill-[#E6B83A] text-[#E6B83A]' : ''
            }`}
          />
        </button>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-4 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProductForModal(saree);
              setActiveModal('quickshop');
            }}
            className="w-full py-2.5 rounded-xl bg-[#FAF7F2]/95 hover:bg-[#D4AF37] text-[#2B070E] font-sans text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 shadow-lg border border-[#D4AF37]/40"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View &amp; Palette</span>
          </button>
        </div>
      </div>

      {/* Info Body */}
      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
        <div>
          {/* Craft Origin Line & Variants Pill */}
          <div className="flex items-center justify-between gap-2 text-[10px] font-sans uppercase tracking-widest text-[#A80F24] font-bold">
            <span className="truncate min-w-0" title={saree.craft}>
              {displayCraft}
            </span>
            <span className="text-[9px] font-semibold text-[#D4AF37] shrink-0 whitespace-nowrap bg-[#FAF7F2] border border-[#D4AF37]/40 px-2 py-0.5 rounded-full shadow-sm">
              {colorways.length} Variants
            </span>
          </div>

          {/* Saree Title */}
          <h3
            onClick={() => {
              setSelectedProductForModal(saree);
              setActiveModal('quickshop');
            }}
            className="font-serif text-base text-[#1A1617] font-semibold line-clamp-1 hover:text-[#A80F24] transition-colors cursor-pointer mt-1"
            title={cleanDisplayName}
          >
            {cleanDisplayName}
          </h3>
        </div>

        {/* Price & 4-Tone Harmony Circles */}
        <div className="pt-2.5 border-t border-[#E6DFD5] flex items-center justify-between">
          <span className="font-sans text-xs font-semibold text-[#1A1617]">
            {saree.priceDisplay}
          </span>
          <div className="flex items-center gap-1" title="Body, Border, Pallu, Zari pairing">
            <span className="w-2.5 h-2.5 rounded-full border border-black/20" style={{ backgroundColor: pairing.body }} title={`Body: ${pairing.body}`} />
            <span className="w-2.5 h-2.5 rounded-full border border-black/20" style={{ backgroundColor: pairing.border }} title={`Border: ${pairing.border}`} />
            <span className="w-2.5 h-2.5 rounded-full border border-black/20" style={{ backgroundColor: pairing.pallu }} title={`Pallu: ${pairing.pallu}`} />
            <span className="w-2.5 h-2.5 rounded-full border border-black/20" style={{ backgroundColor: pairing.zari }} title={`Zari: ${pairing.zari}`} />
          </div>
        </div>

        {/* Interactive Colorways Palette Preview */}
        <div className="bg-[#F6F2EC] p-2.5 rounded-xl border border-[#EBE4D8] space-y-1.5">
          <div className="flex items-center justify-between">
            <p className="text-[9px] uppercase tracking-[0.16em] text-[#1A1617]/70 font-semibold truncate">
              {activeColorway.name}
            </p>
            <span className="text-[8px] uppercase tracking-wider text-[#A80F24] font-bold">
              0{selectedColorway + 1}/0{colorways.length}
            </span>
          </div>
          
          <div className="flex items-center gap-1.5" role="group" aria-label={`Color palette concepts for ${saree.name}`}>
            {colorways.map((colorway, index) => (
              <button
                key={colorway.id}
                type="button"
                onClick={() => {
                  setSelectedColorway(index);
                  setViewMode('textile');
                }}
                aria-label={`Preview ${colorway.name}`}
                aria-pressed={selectedColorway === index}
                className={`w-9 h-10 rounded-lg overflow-hidden border-2 transition-all shadow-sm ${
                  selectedColorway === index
                    ? 'border-[#A80F24] ring-2 ring-[#A80F24]/30 scale-105'
                    : 'border-transparent opacity-75 hover:opacity-100 hover:scale-100'
                }`}
              >
                <TextilePattern colorway={colorway} className="w-full h-full object-cover" />
              </button>
            ))}
            <span className="ml-1 text-[8px] leading-tight text-[#1A1617]/50 max-w-[5rem]">
              Tap swatch to preview
            </span>
          </div>
        </div>

        {/* Direct Action Link */}
        <button
          onClick={() => {
            setSelectedProductForModal(saree);
            setActiveModal('quickshop');
          }}
          className="w-full py-2.5 rounded-xl bg-[#FAF7F2] border border-[#D4AF37]/50 hover:bg-[#D4AF37] hover:text-[#2B070E] text-[#1A1617] text-xs font-sans font-semibold tracking-wider transition-all flex items-center justify-center gap-2 group/btn"
        >
          <span>Explore Design Study</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
        </button>

      </div>

    </div>
  );
}

export default function MerchandisingGrids() {
  const { sarees, states, activeStateFilter, setActiveStateFilter } = useStore();

  const filteredItems = useMemo(() => {
    if (activeStateFilter === 'all') return sarees;
    return sarees.filter((s) => s.region === activeStateFilter);
  }, [activeStateFilter, sarees]);

  const newArrivals = filteredItems.slice(0, 5);
  const bestSellers = filteredItems.slice(3, 8);

  return (
    <section id="new-arrivals-grid" className="py-20 bg-[#FAF7F2] border-b border-[#E6DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* State Filter Tabs Bar */}
        <div className="flex items-center justify-between border-b border-[#E6DFD5] pb-4 overflow-x-auto gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-sans uppercase tracking-widest text-[#1A1617]/60 mr-2 font-bold">
              Filter By State:
            </span>
            <button
              onClick={() => setActiveStateFilter('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-sans tracking-wider uppercase transition-colors ${
                activeStateFilter === 'all'
                  ? 'bg-[#2B070E] text-[#FAF7F2] font-semibold'
                  : 'bg-[#F4EFE6] text-[#1A1617]/70 hover:bg-[#E6DFD5]'
              }`}
            >
              All Regions ({sarees.length})
            </button>
            {states.map((state) => (
              <button
                key={state.slug}
                onClick={() => setActiveStateFilter(state.slug)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-sans tracking-wider uppercase transition-colors whitespace-nowrap ${
                  activeStateFilter === state.slug
                    ? 'bg-[#2B070E] text-[#FAF7F2] font-semibold'
                    : 'bg-[#F4EFE6] text-[#1A1617]/70 hover:bg-[#E6DFD5]'
                }`}
              >
                {state.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* 1. CURATED FOR YOU — Regional Design Studies */}
        <div className="space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#A80F24] font-bold block">
                CURATED FOR YOU
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#1A1617] font-semibold">
                Regional design studies
              </h2>
            </div>
            <button
              onClick={() => setActiveStateFilter('all')}
              className="text-xs font-sans font-bold text-[#A80F24] hover:underline"
            >
              Explore all regions →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {newArrivals.map((saree) => (
              <ProductCard key={`new-${saree.id}`} saree={saree} />
            ))}
          </div>
        </div>

        {/* 2. Additional Regional Studies */}
        <div className="space-y-6 pt-6 border-t border-[#E6DFD5]">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#A80F24] font-bold block">
                FROM THE ARCHIVE
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#1A1617] font-semibold">
                Craft references
              </h2>
            </div>
            <button
              onClick={() => setActiveStateFilter('all')}
              className="text-xs font-sans font-bold text-[#A80F24] hover:underline"
            >
              Browse the archive →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {bestSellers.map((saree) => (
              <ProductCard key={`best-${saree.id}`} saree={saree} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}