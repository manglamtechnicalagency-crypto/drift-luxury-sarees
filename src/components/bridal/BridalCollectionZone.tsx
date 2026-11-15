'use client';

import React, { useState } from 'react';
import { ALL_SAREES } from '@/data/collections/registry';
import { useStore } from '@/store/useStore';
import { SareeProduct } from '@/data/collections/types';
import { getSareeModelImage } from '@/data/collections/colorways';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';

export default function BridalCollectionZone() {
  const { sarees, toggleWishlist, isInWishlist, setSelectedProductForModal, setActiveModal } =
    useStore();

  // Curate 4 flagship bridal sarees for the right grid
  const bridalSarees: SareeProduct[] = [
    sarees.find((s) => s.id === 'guj-04') || sarees[3] || ALL_SAREES[3],
    sarees.find((s) => s.id === 'jod-01') || sarees[16] || ALL_SAREES[16],
    sarees.find((s) => s.id === 'ban-05') || sarees[28] || ALL_SAREES[28],
    sarees.find((s) => s.id === 'kan-01') || sarees[32] || ALL_SAREES[32],
  ];

  // Spotlight Left Saree
  const spotlightSaree = sarees.find((s) => s.id === 'guj-03') || sarees[2] || ALL_SAREES[2];

  return (
    <section id="bridal-scalloped-zone" className="relative w-full bg-[#2B070E] py-20 select-none overflow-hidden">
      
      {/* 1. Top Custom Sinusoidal Scalloped Wave Divider with Gold 1px Stroke */}
      <div className="absolute top-0 inset-x-0 w-full overflow-hidden leading-none z-20">
        <svg
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          className="relative block w-full h-10 sm:h-14 fill-[#FAF7F2] stroke-[#D4AF37]"
          strokeWidth="1.5"
        >
          <path d="M0,0 C150,55 350,-20 500,35 C650,80 850,-10 1000,40 C1100,65 1180,20 1200,0 L1200,0 L0,0 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8 sm:pt-12 pb-12">
        
        {/* Asymmetric 2-Zone Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Spotlight Card (4 Cols) */}
          <div className="lg:col-span-4 relative rounded-3xl overflow-hidden border border-[#D4AF37]/50 shadow-2xl bg-[#4A0E17] group min-h-[520px] flex flex-col justify-end p-6 sm:p-8">
            <img
              src={getSareeModelImage(spotlightSaree)}
              alt={`Illustrative model image for ${spotlightSaree.name} bridal design study`}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              onError={(e) => {
                (e.target as HTMLImageElement).src = spotlightSaree.images.fallbackEditorial;
              }}
            />
            {/* Dark Burgundy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2B070E] via-[#2B070E]/50 to-transparent" />

            {/* Content at Bottom */}
            <div className="relative z-10 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-widest bg-[#D4AF37] text-[#2B070E]">
                  SPOTLIGHT EDIT
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#E6B83A]/30 text-[#E6B83A] text-[9px] font-sans uppercase tracking-widest font-semibold">
                  <Sparkles size={10} className="text-[#E6B83A]" />
                  Model reference · illustrative
                </span>
              </div>
              <p className="font-serif italic text-sm text-[#FAF7F2]/80">
                From the royal bridal collection
              </p>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#FAF7F2] font-semibold leading-tight">
                {spotlightSaree.name}
              </h3>
              <p className="font-sans text-xs text-[#FAF7F2]/70 line-clamp-2">
                {spotlightSaree.description}
              </p>
              <button
                onClick={() => {
                  setSelectedProductForModal(spotlightSaree);
                  setActiveModal('quickshop');
                }}
                className="inline-flex items-center gap-2 text-xs font-sans uppercase font-bold tracking-[0.2em] text-[#E6B83A] hover:text-[#FAF7F2] transition-colors pt-2 group"
              >
                <span>Explore design study</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Merchandising Grid (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
            
            {/* Header */}
            <div className="border-b border-[#D4AF37]/25 pb-4 space-y-2 text-left">
              <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.3em] text-[#E6B83A] font-bold block">
                CEREMONIAL SPLENDOR
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#FAF7F2] font-medium tracking-tight">
                Bridal design studies
              </h2>
              <p className="font-serif italic text-sm sm:text-base lg:text-lg xl:text-xl text-[#FAF7F2]/80 max-w-2xl leading-relaxed">
                Contemporary concepts inspired by ceremonial colour and regional textile traditions. Materials, makers, pricing and availability are not yet verified.
              </p>
            </div>

            {/* 4-Column Bridal Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {bridalSarees.map((saree) => {
                const inWish = isInWishlist(saree.id);

                return (
                  <div
                    key={saree.id}
                    className="bg-[#FAF7F2] rounded-2xl p-3 border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all flex flex-col justify-between group shadow-lg hover:shadow-[0_15px_35px_rgba(212,175,55,0.25)]"
                  >
                    {/* Portrait Thumbnail */}
                    <div
                      onClick={() => {
                        setSelectedProductForModal(saree);
                        setActiveModal('quickshop');
                      }}
                      className="relative aspect-[3/3.8] rounded-xl overflow-hidden bg-black/10 cursor-pointer mb-3"
                    >
                      <img
                        src={getSareeModelImage(saree)}
                        alt={`${saree.originState} ${saree.craft} bridal saree on model Priya`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = saree.images.fallbackPrimary;
                        }}
                      />
                      <div className="absolute bottom-2 left-2 z-10 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-[#E6B83A]/30 text-[#E6B83A] text-[8px] font-sans uppercase tracking-widest font-semibold">
                        <Sparkles className="w-2.5 h-2.5 text-[#E6B83A]" />
                        <span>Muse Priya</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(saree.id);
                        }}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 text-[#1A1617] hover:text-[#A80F24]"
                      >
                        <Heart
                          className={`w-3.5 h-3.5 ${
                            inWish ? 'fill-[#A80F24] text-[#A80F24]' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {/* Saree Info */}
                    <div className="space-y-1 text-left flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] uppercase font-sans tracking-widest text-[#A80F24] font-bold">
                          {saree.originState}
                        </span>
                        <h4
                          onClick={() => {
                            setSelectedProductForModal(saree);
                            setActiveModal('quickshop');
                          }}
                          className="font-serif text-sm font-semibold text-[#1A1617] hover:text-[#A80F24] line-clamp-1 cursor-pointer"
                        >
                          {saree.name}
                        </h4>
                      </div>

                      <div className="pt-2">
                        <p className="font-sans text-xs font-bold text-[#1A1617]">
                          {saree.priceDisplay}
                        </p>

                        {/* Browse the concept record */}
                        <button
                          onClick={() => {
                            setSelectedProductForModal(saree);
                            setActiveModal('quickshop');
                          }}
                          className="w-full mt-2 py-2 rounded-lg bg-[#D4AF37] hover:bg-[#E6B83A] text-[#2B070E] font-sans font-bold text-[11px] uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                          <span>View design study</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>

      {/* 2. Bottom Sinusoidal Scalloped Wave Divider with Gold 1px Stroke */}
      <div className="absolute bottom-0 inset-x-0 w-full overflow-hidden leading-none z-20 rotate-180">
        <svg
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          className="relative block w-full h-10 sm:h-14 fill-[#FAF7F2] stroke-[#D4AF37]"
          strokeWidth="1.5"
        >
          <path d="M0,0 C150,55 350,-20 500,35 C650,80 850,-10 1000,40 C1100,65 1180,20 1200,0 L1200,0 L0,0 Z" />
        </svg>
      </div>

    </section>
  );
}
