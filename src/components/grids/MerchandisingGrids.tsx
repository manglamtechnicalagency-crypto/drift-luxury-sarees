'use client';

import React, { useMemo, useState } from 'react';
import { ALL_SAREES, ALL_STATE_METAS } from '@/data/collections/registry';
import { SareeProduct } from '@/data/collections/types';
import { useStore } from '@/store/useStore';
import { Heart, Eye, Sparkles, ArrowRight } from 'lucide-react';
import { getSareeColorways, getSareeModelImage, PRIYA_EDITORIAL_MODEL } from '@/data/collections/colorways';
import { TextilePattern } from '@/components/products/TextilePalette';

function ProductCard({ saree }: { saree: SareeProduct }) {
  const { toggleWishlist, isInWishlist, setSelectedProductForModal, setActiveModal } =
    useStore();
  const inWish = isInWishlist(saree.id);
  const colorways = useMemo(() => getSareeColorways(saree), [saree]);
  const [selectedColorway, setSelectedColorway] = useState(0);

  const activeColorway = colorways[selectedColorway] || colorways[0];
  const pairing = activeColorway.pairing || {
    body: activeColorway.palette[0],
    border: activeColorway.palette[1],
    pallu: activeColorway.palette[2],
    zari: activeColorway.palette[3],
  };

  const primaryDisplayImage = getSareeModelImage(saree);


  const displayCraft = (saree.craft || 'Handloom Silk')
    .replace(/^Craft inspiration:\s*/i, '')
    .split('·')[0]
    .trim();

  const cleanDisplayName = saree.name.replace(/^DRIFT Study\s*[-—]\s*/i, '');

  return (
    <div className="group relative bg-[#FAF7F2] rounded-2xl overflow-hidden border border-[#E6DFD5] hover:border-[#D4AF37]/60 transition-all duration-300 hover:shadow-2xl flex flex-col justify-between">
      
      {/* Visual Display Container: Photo Drape or Woven Textile View */}
      <div
        className="relative aspect-[3/4.2] overflow-hidden bg-[#2B070E]/10"
      >
        <>
            {/* Illustrative regional model image for this design study */}
            <img
              src={primaryDisplayImage}
              alt={`${cleanDisplayName} draped in ${displayCraft}`}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-[1.04]"
              onError={(e) => {
                const image = e.currentTarget;
                if (image.dataset.fallbackUsed) { image.hidden = true; return; }
                image.dataset.fallbackUsed = 'true';
                image.src = PRIYA_EDITORIAL_MODEL.images[saree.region] || '/collections/models/priya_banarasi_red.jpg';
              }}
            />
            <div className="pointer-events-none absolute right-3 top-14 rounded-full bg-black/60 px-2.5 py-1 text-[8px] font-medium uppercase tracking-[.14em] text-white/90 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">Model in saree</div>
            {/* Subtle Ambient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2B070E]/80 via-transparent to-black/20 opacity-70 group-hover:opacity-50 transition-opacity" />
            
            {/* Editorial model reference tag */}
            <div className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-[#E6B83A]/30 text-[#E6B83A] text-[9px] font-sans uppercase tracking-widest font-semibold">
              <Sparkles className="w-2.5 h-2.5 text-[#E6B83A]" />
              <span>Model reference</span>
            </div>
        </>

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
            <div className="absolute inset-x-4 bottom-3 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity z-20">
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
            <span className="text-[9px] font-semibold text-[#8E6F32] shrink-0 whitespace-nowrap bg-[#FAF7F2] border border-[#D4AF37]/40 px-2 py-0.5 rounded-full shadow-sm">
              {colorways.length} palette ideas
            </span>
          </div>

          {/* Saree Title */}
          <h3 className="mt-1 line-clamp-2 font-serif text-base font-semibold text-[#1A1617]">
            <button type="button" onClick={() => { setSelectedProductForModal(saree); setActiveModal('quickshop'); }} className="text-left transition-colors hover:text-[#A80F24] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A80F24]" title={cleanDisplayName}>
              {cleanDisplayName}
            </button>
          </h3>
        </div>

        {/* Indicative price and design palette */}
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

  const regionalSplit = Math.ceil(filteredItems.length / 2);
  const newArrivals = activeStateFilter === 'all'
    ? states.map((state) => sarees.find((item) => item.region === state.slug)).filter((item): item is SareeProduct => Boolean(item))
    : filteredItems.slice(0, regionalSplit);
  const bestSellers = activeStateFilter === 'all'
    ? states.flatMap((state) => sarees.filter((item) => item.region === state.slug).slice(1, 3))
    : filteredItems.slice(regionalSplit);

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

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
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

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {bestSellers.map((saree) => (
              <ProductCard key={`best-${saree.id}`} saree={saree} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
