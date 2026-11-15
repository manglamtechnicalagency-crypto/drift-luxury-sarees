'use client';

import React, { useState } from 'react';
import { ALL_STATE_METAS } from '@/data/collections/registry';
import { useStore } from '@/store/useStore';
import { StateSlug } from '@/data/collections/types';
import { PRIYA_EDITORIAL_MODEL } from '@/data/collections/colorways';
import { ArrowRight, Sparkles } from 'lucide-react';

interface OccasionCard {
  title: string;
  tagline: string;
  image: string;
  stateSlug: StateSlug;
}

export default function OccasionsAndAccordion() {
  const { setActiveStateFilter } = useStore();
  const [expandedIndex, setExpandedIndex] = useState<number>(0);

  const occasions: OccasionCard[] = [
    {
      title: 'The Royal Wedding Edit',
      tagline: 'Ceremonial colour and brocade design references',
      image: PRIYA_EDITORIAL_MODEL.images['banarasi'],
      stateSlug: 'banarasi',
    },
    {
      title: 'Heritage State Weaves',
      tagline: 'Double-ikat and tapestry design references',
      image: PRIYA_EDITORIAL_MODEL.images['gujarati'],
      stateSlug: 'gujarati',
    },
    {
      title: 'The Modern Drape',
      tagline: 'Wave-dye and lightweight drape references',
      image: PRIYA_EDITORIAL_MODEL.images['rajasthani'],
      stateSlug: 'rajasthani',
    },
    {
      title: 'Festive Atelier',
      tagline: 'Kanchipuram Korvai & Kerala Kasavu',
      image: PRIYA_EDITORIAL_MODEL.images['kanchipuram'],
      stateSlug: 'kanchipuram',
    },
  ];

  const handleOccasionClick = (slug: StateSlug) => {
    setActiveStateFilter(slug);
    document.getElementById('curated-curved-arc')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-[#FAF7F2] border-b border-[#E6DFD5] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* ============================================================ */}
        {/* 1. EDITS FOR EVERY OCCASION (4 Cards Grid)                   */}
        {/* ============================================================ */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#A80F24] font-bold block">
              CURATED VIGNETTES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1617] font-normal">
              EDITS FOR <span className="italic font-normal text-[#A80F24]">every occasion</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {occasions.map((occ, idx) => (
              <div
                key={idx}
                onClick={() => handleOccasionClick(occ.stateSlug)}
                className="group relative aspect-[3/4.5] rounded-2xl overflow-hidden cursor-pointer shadow-lg bg-[#2B070E] flex flex-col justify-end p-6 border border-[#E6DFD5] hover:border-[#D4AF37] transition-all hover:shadow-2xl"
              >
                <img
                  src={occ.image}
                  alt={`Illustrative model image for the ${occ.title} design study`}
                  className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B070E] via-[#2B070E]/35 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />

                {/* Ambient Muse Pill */}
                <div className="absolute top-3.5 left-3.5 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#E6B83A]/30 text-[#E6B83A] text-[9px] uppercase tracking-widest font-semibold">
                  <Sparkles size={10} className="text-[#E6B83A]" />
                  <span>Illustrative model</span>
                </div>

                <div className="relative z-10 space-y-2 text-left">
                  <span className="text-[9px] font-sans uppercase tracking-widest text-[#E6B83A] font-semibold block">
                    {occ.tagline}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#FAF7F2] font-semibold leading-snug">
                    {occ.title}
                  </h3>
                  <div className="inline-flex items-center gap-1.5 text-xs font-sans font-bold tracking-widest text-[#E6B83A] uppercase pt-2 group-hover:translate-x-1 transition-transform">
                    <span>EXPLORE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. WORTH YOUR ATTENTION (6-Panel Expanding Flex Accordion)   */}
        {/* ============================================================ */}
        <div className="space-y-8">
          <div className="text-left space-y-1 border-b border-[#E6DFD5] pb-4">
            <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#A80F24] font-bold block">
              SIX PERSPECTIVES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1617] font-semibold">
              Worth your attention
            </h2>
          </div>

          {/* Flex Expanding Accordion Container */}
          <div className="flex flex-col md:flex-row h-[560px] md:h-[480px] w-full gap-2 sm:gap-3 overflow-hidden rounded-3xl">
            {ALL_STATE_METAS.map((state, idx) => {
              const isExpanded = expandedIndex === idx;

              return (
                <div
                  key={state.slug}
                  onMouseEnter={() => setExpandedIndex(idx)}
                  onClick={() => setExpandedIndex(idx)}
                  className={`relative rounded-2xl overflow-hidden cursor-pointer bg-[#2B070E] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isExpanded ? 'flex-[4.5]' : 'flex-1'
                  }`}
                >
                  {/* Background Saree/Editorial Image featuring Priya */}
                  <img
                    src={PRIYA_EDITORIAL_MODEL.images[state.slug]}
                    alt={`Illustrative model reference for ${state.name} design studies`}
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = PRIYA_EDITORIAL_MODEL.images[state.slug];
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      isExpanded
                        ? 'bg-gradient-to-t from-[#2B070E]/95 via-[#2B070E]/40 to-transparent'
                        : 'bg-[#2B070E]/75 hover:bg-[#2B070E]/50'
                    }`}
                  />

                  {/* Collapsed State: Rotated -90deg Vertical Title */}
                  {!isExpanded && (
                    <div className="absolute inset-0 flex items-center justify-center p-2">
                      <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#FAF7F2] font-bold md:-rotate-90 whitespace-nowrap">
                        0{idx + 1} • {state.name.split(' ')[0]}
                      </span>
                    </div>
                  )}

                  {/* Expanded State: Full Editorial Photography, Craft Story, Shop Link */}
                  {isExpanded && (
                    <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-left space-y-3 animate-in fade-in duration-500">
                      <span className="inline-block px-3 py-1 rounded-full text-[10px] uppercase font-sans font-bold tracking-widest bg-[#D4AF37] text-[#2B070E] w-max">
                        {state.historicalEra}
                      </span>
                      <h3 className="font-serif text-3xl sm:text-4xl text-[#FAF7F2] font-bold">
                        {state.name}
                      </h3>
                      <p className="font-sans text-xs text-[#FAF7F2]/80 max-w-md line-clamp-3 font-light">
                        {state.craftOverview}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOccasionClick(state.slug);
                        }}
                        className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#E6B83A] hover:text-[#FAF7F2] transition-colors pt-2"
                      >
                        <span>Explore Collection ({state.keyWeaves?.[0] || 'Handloom Study'})</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
