'use client';

import React from 'react';
import { ALL_SAREES } from '@/data/collections/registry';
import { useStore } from '@/store/useStore';
import { SareeProduct } from '@/data/collections/types';
import { getSareeModelImage } from '@/data/collections/colorways';
import type { StateSlug } from '@/data/collections/types';

const STUDIO_REGION_LABELS: Record<StateSlug, string> = {
  gujarati: 'Gujarat',
  rajasthani: 'Rajasthan',
  jodhpuri: 'Marwar',
  banarasi: 'Varanasi',
  kanchipuram: 'Tamil Nadu',
  'heritage-states': 'Maharashtra & beyond',
};

export default function AutumnWinterStudio() {
  const {
    sarees,
    activeLookIndex,
    setActiveLookIndex,
  } = useStore();

  // Curated 4 Studio Looks across distinct state cultures
  const studioLooks: SareeProduct[] = [
    sarees.find((s) => s.id === 'jod-01') || sarees[16] || ALL_SAREES[16],
    sarees.find((s) => s.id === 'guj-01') || sarees[0] || ALL_SAREES[0],
    sarees.find((s) => s.id === 'raj-03') || sarees[10] || ALL_SAREES[10],
    sarees.find((s) => s.id === 'ban-01') || sarees[24] || ALL_SAREES[24],
  ];

  return (
    <section id="autumn-winter-studio" className="py-20 lg:py-24 bg-[#FAF7F2] border-b border-[#E6DFD5] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Block + 3 Rounded-Arch Portraits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Editorial Narrative */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#A80F24] font-bold block">
              SEASONAL EDIT
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#1A1617] font-semibold leading-tight">
              Autumn–Winter <span className="italic font-normal text-[#A80F24]">2026</span>
            </h2>
            <p className="font-serif text-base sm:text-lg lg:text-xl xl:text-2xl text-[#1A1617]/80 font-light leading-relaxed max-w-2xl">
              A seasonal palette study in deep reds, woven gold tones and layered drape. The concepts shown here are illustrative; fabric, weave and maker details are still to be confirmed.
            </p>
            <div className="pt-2">
              <a
                href="#curated-curved-arc"
                className="inline-block px-7 py-3 rounded-full bg-[#A80F24] hover:bg-[#7A0A19] text-[#FAF7F2] font-sans text-xs uppercase tracking-[0.2em] font-semibold shadow-md transition-all active:scale-95"
              >
                Explore the Edit
              </a>
            </div>
          </div>

          {/* Right 3 Rounded-Arch Portraits */}
          <div className="lg:col-span-7 grid grid-cols-3 gap-3 sm:gap-6">
            {[0, 1, 3].map((lookIndex) => {
              const saree = studioLooks[lookIndex];
              const isSelected = activeLookIndex === lookIndex;
              return (
                <button
                  key={saree.id}
                  type="button"
                  className={`relative overflow-hidden group shadow-lg cursor-pointer bg-[#2B070E] text-left transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37] ${
                    isSelected
                      ? 'ring-2 ring-[#D4AF37] shadow-[0_15px_40px_rgba(212,175,55,0.35)] scale-[1.02]'
                      : 'hover:opacity-95 hover:shadow-xl'
                  }`}
                  style={{
                    borderRadius: '999px 999px 16px 16px',
                    aspectRatio: '9/16',
                  }}
                  onClick={() => {
                    setActiveLookIndex(lookIndex);
                  }}
                  aria-label={`Switch studio to ${saree.name}`}
                  aria-pressed={isSelected}
                >
                  <img
                    src={getSareeModelImage(saree)}
                    alt={`Illustrative model look for the ${saree.name} design study`}
                    className="w-full h-full object-cover object-[center_24%] group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      const image = e.currentTarget;
                      image.onerror = null;
                      image.src = '/collections/models/model_saffron_yellow.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B070E] via-transparent to-transparent opacity-75" />
                  
                  <div className="absolute bottom-4 inset-x-2 text-center">
                    <span className="text-[10px] font-sans uppercase tracking-wider text-[#E6B83A] font-semibold block">
                      {STUDIO_REGION_LABELS[saree.region]}
                    </span>
                    <p className="font-serif text-xs sm:text-sm text-[#FAF7F2] font-medium truncate">
                      {saree.name.split(' ')[0]}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
