'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ALL_SAREES, ALL_STATE_METAS } from '@/data/collections/registry';
import { SareeProduct, StateSlug } from '@/data/collections/types';
import { PRIYA_EDITORIAL_MODEL, RELATABLE_SAREE_MODELS } from '@/data/collections/colorways';
import { useStore } from '@/store/useStore';
import { ChevronLeft, ChevronRight, Eye, Sparkles } from 'lucide-react';

export default function CurvedArcCarousel() {
  const {
    states,
    sarees,
    activeStateFilter,
    setActiveStateFilter,
    setSelectedProductForModal,
    setActiveModal,
  } = useStore();

  const [currentIndex, setCurrentIndex] = useState(3);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  // Filter sarees according to activeStateFilter
  const displaySarees = useMemo(() => {
    if (activeStateFilter === 'all') {
      // One representative design study from each regional archive.
      return states.map((state) => sarees.find((s) => s.region === state.slug)).filter(
        (s): s is SareeProduct => Boolean(s)
      );
    }
    return sarees.filter((s) => s.region === activeStateFilter);
  }, [activeStateFilter, states, sarees]);

  // Clamp index when list changes
  useEffect(() => {
    setCurrentIndex(Math.floor(displaySarees.length / 2));
  }, [displaySarees]);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(displaySarees.length - 1, prev + 1));
  };

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    if (diff > 50) {
      handlePrev();
      setStartX(e.clientX);
    } else if (diff < -50) {
      handleNext();
      setStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const openQuickShop = (saree: SareeProduct) => {
    setSelectedProductForModal(saree);
    setActiveModal('quickshop');
  };

  return (
    <section
      id="curated-curved-arc"
      className="py-24 bg-[#FAF7F2] border-b border-[#E6DFD5] relative overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.3em] text-[#A80F24] font-bold block">
            ARCHIVAL WEAVE REPERTORY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1617] font-normal tracking-tight">
            The Regional <span className="italic font-normal text-[#A80F24]">Loom Archive</span>
          </h2>
          <p className="font-serif text-sm sm:text-base lg:text-lg xl:text-xl text-[#1A1617]/75 font-light leading-relaxed max-w-2xl mx-auto">
            Six regional centers documented by weave density, loom mechanics, and traditional border motifs. Drag or select a region below.
          </p>

          {/* Interactive State Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <button
              type="button"
              onClick={() => setActiveStateFilter('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-sans tracking-wider uppercase transition-all ${
                activeStateFilter === 'all'
                  ? 'bg-[#A80F24] text-[#FAF7F2] font-semibold shadow-sm'
                  : 'bg-[#F4EFE6] text-[#1A1617]/75 hover:bg-[#E6DFD5]'
              }`}
            >
              All States
            </button>
            {states.map((state) => {
              const isSelected = activeStateFilter === state.slug;
              return (
                <button
                  key={state.slug}
                  type="button"
                  onClick={() => setActiveStateFilter(state.slug)}
                  className={`px-4 py-1.5 rounded-full text-xs font-sans tracking-wider uppercase transition-all ${
                    isSelected
                      ? 'bg-[#A80F24] text-[#FAF7F2] font-semibold shadow-sm'
                      : 'bg-[#F4EFE6] text-[#1A1617]/75 hover:bg-[#E6DFD5]'
                  }`}
                >
                  {state.name.split(' ')[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Cylindrical Curved Arc Stage */}
        <div
          className="relative min-h-[490px] sm:min-h-[580px] w-full flex items-center justify-center perspective-stage cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {displaySarees.map((saree, index) => {
            const offset = index - currentIndex;
            const isVisible = Math.abs(offset) <= 3;
            if (!isVisible) return null;

            const isCenter = offset === 0;

            // 3D Arc Physics Calculations:
            const rotateZ = offset * 4.2;
            const rotateY = offset * -6.5;
            const translateZ = isCenter ? 45 : -Math.abs(offset) * 85;
            const translateY = Math.pow(offset, 2) * 14;
            const translateX = offset * 240;
            const opacity = Math.max(0.2, 1 - Math.abs(offset) * 0.28);
            const zIndex = 30 - Math.abs(offset) * 5;

            return (
              <div
                key={saree.id}
                role="button"
                tabIndex={0}
                aria-label={isCenter ? `View details for ${saree.name}` : `Select ${saree.name}`}
                onClick={() => {
                  if (isCenter) openQuickShop(saree);
                  else setCurrentIndex(index);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (isCenter) openQuickShop(saree);
                    else setCurrentIndex(index);
                  }
                }}
                className={`group absolute w-[240px] sm:w-[280px] aspect-[3/4.6] rounded-2xl overflow-hidden bg-[#2B070E] shadow-2xl transition-all duration-500 ease-out border focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37] ${
                  isCenter
                    ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/60 shadow-[0_25px_60px_rgba(212,175,55,0.35)]'
                    : 'border-[#E6DFD5]/40 hover:border-[#D4AF37]/50 hover:shadow-xl'
                }`}
                style={{
                  transform: `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateZ(${rotateZ}deg) rotateY(${rotateY}deg)`,
                  transformOrigin: '50% 340%',
                  zIndex,
                  opacity,
                }}
              >
                {/* Ambient Aura Glow for Center Card */}
                {isCenter && (
                  <div className="absolute -inset-1 rounded-2xl bg-[#E6B83A]/15 blur-lg pointer-events-none" />
                )}

                <img
                  src={
                    saree.images.editorial ||
                    saree.images.primary ||
                    RELATABLE_SAREE_MODELS[saree.id]?.model ||
                    PRIYA_EDITORIAL_MODEL.images[saree.region]
                  }
                  alt={`${saree.originState} ${saree.craft} saree`}
                  className="w-full h-full object-cover select-none group-hover:scale-105 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    const fallback = saree.images.primary || saree.images.fallbackPrimary || '/collections/models/priya_banarasi_red.jpg';
                    if (!e.currentTarget.src.endsWith(fallback)) {
                      e.currentTarget.src = fallback;
                    }
                  }}
                />

                {/* Dark bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B070E] via-[#2B070E]/30 to-transparent" />

                {/* Saree Info Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-left space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-sans tracking-widest text-[#E6B83A] font-semibold truncate pr-2">
                      {(saree.craft || '').replace(/^Craft inspiration:\s*/i, '').split('·')[0].trim()}
                    </span>
                    <span className="text-[8px] uppercase tracking-wider text-[#FAF7F2]/60 shrink-0">
                      GI Heritage
                    </span>
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl text-[#FAF7F2] font-semibold line-clamp-1 group-hover:text-[#E6B83A] transition-colors">
                    {saree.name.replace(/^DRIFT Study\s*[-—]\s*/i, '')}
                  </h3>
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-sans text-xs font-bold text-[#E6B83A]">
                      {saree.priceDisplay}
                    </span>
                    <span className="text-[8px] uppercase tracking-wider text-[#FAF7F2]/70 bg-white/10 px-2 py-0.5 rounded-full">
                      Design Study
                    </span>
                  </div>
                </div>

                {/* Center Badge with Muse Priya */}
                {isCenter ? (
                  <div className="absolute top-3 left-3 bg-[#FAF7F2]/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] font-sans font-bold text-[#2B070E] tracking-wider border border-[#D4AF37]/40 shadow-sm flex items-center gap-1.5">
                    <Sparkles size={10} className="text-[#A80F24]" />
                    <span>Muse Priya · Illustrative reference</span>
                  </div>
                ) : (
                  <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full text-[8px] font-sans uppercase tracking-widest text-[#E6B83A] border border-[#E6B83A]/30 flex items-center gap-1">
                    <Sparkles size={8} className="text-[#E6B83A]" />
                    <span>Muse Priya</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex items-center justify-center gap-4 pt-6">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="p-3 rounded-full bg-[#FAF7F2] border border-[#E6DFD5] text-[#1A1617] hover:bg-[#A80F24] hover:text-white disabled:opacity-30 transition-colors shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
            aria-label="Previous saree"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="text-xs font-sans font-semibold text-[#1A1617]/70">
            {currentIndex + 1} / {displaySarees.length}
          </span>

          <button
            type="button"
            onClick={handleNext}
            disabled={currentIndex === displaySarees.length - 1}
            className="p-3 rounded-full bg-[#FAF7F2] border border-[#E6DFD5] text-[#1A1617] hover:bg-[#A80F24] hover:text-white disabled:opacity-30 transition-colors shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
            aria-label="Next saree"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
