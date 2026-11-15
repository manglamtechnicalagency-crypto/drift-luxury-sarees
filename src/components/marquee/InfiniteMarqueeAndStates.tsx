'use client';

import React, { useState } from 'react';
import { ALL_STATE_METAS } from '@/data/collections/registry';
import { useStore } from '@/store/useStore';
import { StateSlug } from '@/data/collections/types';
import { PRIYA_EDITORIAL_MODEL } from '@/data/collections/colorways';
import { ArrowUpRight, Pause, Play, Sparkles } from 'lucide-react';

const MARQUEE_ITEMS = [
  'Six regional textile archives',
  'Craft-inspired design studies',
  'Materials pending maker confirmation',
  'Prices on request',
  'Illustrative imagery',
  'Product availability not verified',
  'Explore craft references',
  'Made for the DRIFT editorial',
];

export default function InfiniteMarqueeAndStates() {
  const { states, setActiveStateFilter, activeStateFilter } = useStore();
  const [tiltCard, setTiltCard] = useState<{ id: string; x: number; y: number } | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const handleStateSelect = (slug: StateSlug) => {
    setActiveStateFilter(slug);
    document.getElementById('curated-curved-arc')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTiltCard({ id, x: y * -18, y: x * 18 });
  };

  const handleMouseLeave = () => {
    setTiltCard(null);
  };

  return (
    <section className="w-full bg-[#FAF7F2] overflow-hidden select-none">
      
      {/* 1. Deep Burgundy Dual-Track Hardware-Accelerated Marquee */}
      <div
        className="group/marquee relative w-full bg-[#4A0E17] text-[#FAF7F2] py-3.5 border-y border-[#D4AF37]/35 overflow-hidden"
        role="region"
        aria-label="Editorial announcement ticker"
      >
        {/* Ambient Vignette Gradients for Smooth In/Out Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#4A0E17] via-[#4A0E17]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#4A0E17] via-[#4A0E17]/80 to-transparent z-10 pointer-events-none" />

        {/* Accessible Pause / Resume Button */}
        <button
          type="button"
          onClick={() => setIsPaused(!isPaused)}
          aria-label={isPaused ? 'Resume ticker animation' : 'Pause ticker animation'}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-7 h-7 rounded-full bg-[#2B070E]/85 border border-[#D4AF37]/50 text-[#FAF7F2] opacity-0 group-hover/marquee:opacity-100 focus:opacity-100 transition-opacity hover:bg-[#D4AF37] hover:text-[#2B070E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
        >
          {isPaused ? <Play size={12} className="ml-0.5" /> : <Pause size={12} />}
        </button>

        {/* Continuous Seamless Double-Track Ticker */}
        <div
          className="flex w-max animate-marquee"
          style={{ animationPlayState: isPaused ? 'paused' : undefined }}
        >
          {/* Primary Track */}
          <div className="flex shrink-0 items-center gap-8 whitespace-nowrap font-sans text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold pr-8">
            {MARQUEE_ITEMS.map((item, idx) => (
              <div key={`track1-${idx}`} className="flex items-center gap-8">
                <span className="text-[#FAF7F2]/95 hover:text-[#E6B83A] transition-colors cursor-default">
                  {item}
                </span>
                <span className="text-[#D4AF37] text-xs font-bold select-none">◆</span>
              </div>
            ))}
          </div>

          {/* Duplicate Track for Seamless -50% Infinite Loop */}
          <div
            className="flex shrink-0 items-center gap-8 whitespace-nowrap font-sans text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold pr-8"
            aria-hidden="true"
          >
            {MARQUEE_ITEMS.map((item, idx) => (
              <div key={`track2-${idx}`} className="flex items-center gap-8">
                <span className="text-[#FAF7F2]/95 hover:text-[#E6B83A] transition-colors cursor-default">
                  {item}
                </span>
                <span className="text-[#D4AF37] text-xs font-bold select-none">◆</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Six Weaving Centres Grid Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4 border-b border-[#E6DFD5] pb-6">
          <div>
            <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.3em] text-[#A80F24] font-bold block mb-1">
              THE REGIONAL ARCHIVE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1617] font-bold tracking-tight">
              SIX WEAVING <span className="italic font-normal text-[#A80F24]">CENTRES.</span>
            </h2>
          </div>
          <p className="font-serif italic text-base sm:text-lg text-[#1A1617]/70 max-w-sm">
            Documenting Kanchipuram mulberry silk, Patan double ikat, and Varanasi kadhwa brocade.
          </p>
        </div>

        {/* 6-Column Portrait Card Grid with 3D Perspective Tilt */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 perspective-1000">
          {states.map((state, index) => {
            const isTilted = tiltCard?.id === state.slug;
            const isSelected = activeStateFilter === state.slug;

            return (
              <div
                key={state.slug}
                role="button"
                tabIndex={0}
                aria-label={`Explore ${state.name} weaving centre`}
                onClick={() => handleStateSelect(state.slug)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleStateSelect(state.slug);
                  }
                }}
                onMouseMove={(e) => handleMouseMove(e, state.slug)}
                onMouseLeave={handleMouseLeave}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-[#2B070E] transition-all duration-300 shadow-md hover:shadow-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37] ${
                  isSelected ? 'ring-2 ring-[#D4AF37] shadow-xl' : ''
                }`}
                style={{
                  transform: isTilted
                    ? `rotateX(${tiltCard.x}deg) rotateY(${tiltCard.y}deg) scale3d(1.04, 1.04, 1.04)`
                    : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                  transition: 'transform 0.18s ease-out, box-shadow 0.3s ease',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Portrait Aspect Container */}
                <div className="relative aspect-[3/4.6] overflow-hidden">
                  <img
                    src={PRIYA_EDITORIAL_MODEL.images[state.slug]}
                    alt={`Illustrative model reference for the ${state.name} textile design study`}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = PRIYA_EDITORIAL_MODEL.images[state.slug];
                    }}
                  />

                  {/* Gradient Vignette & Ambient Glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B070E] via-[#2B070E]/25 to-transparent opacity-90 group-hover:opacity-70 transition-opacity" />
                  <div className="absolute -inset-1 rounded-2xl bg-[#E6B83A]/10 opacity-0 group-hover:opacity-100 blur-md pointer-events-none transition-opacity duration-500" />

                  {/* Top State Index & Model Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="bg-[#FAF7F2]/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-sans font-bold text-[#1A1617] tracking-wider shadow-sm">
                      0{index + 1}
                    </span>
                    <span className="inline-flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full text-[8px] font-sans uppercase tracking-widest text-[#E6B83A] border border-[#E6B83A]/30">
                      <Sparkles size={8} className="text-[#E6B83A]" />
                      Priya
                    </span>
                  </div>

                  {/* Arrow Indicator on Hover */}
                  <div className="absolute top-3 right-3 p-1.5 rounded-full bg-[#FAF7F2]/80 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#A80F24]" />
                  </div>

                  {/* Bottom Text Stack */}
                  <div className="absolute bottom-4 left-3 right-3 text-left space-y-0.5">
                    <p className="text-[10px] uppercase font-sans tracking-widest text-[#E6B83A] font-semibold">
                      {state.hindiName}
                    </p>
                    <h3 className="font-serif text-lg sm:text-xl text-[#FAF7F2] font-semibold leading-tight group-hover:text-[#E6B83A] transition-colors">
                      {state.name.split(' ')[0]}
                    </h3>
                    <p className="text-[9px] text-[#FAF7F2]/70 font-sans line-clamp-1 font-light">
                      Model study · {state.keyWeaves?.[0] || 'Textile archive'}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
