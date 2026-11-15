'use client';

import React from 'react';
import SareeHeroCanvas from '../canvas/SareeHeroCanvas';
import { useShop } from '@/context/ShopContext';
import { ALL_STATE_METAS } from '@/data/collections/registry';
import { Sparkles, ArrowDown, ShieldCheck, Compass } from 'lucide-react';

export default function HeroSection() {
  const { setSelectedRegion, selectedRegion } = useShop();

  const scrollToCatalog = () => {
    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToInspector = () => {
    document.getElementById('fabric-inspector')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full min-h-[90vh] lg:min-h-[96vh] flex items-center justify-center overflow-hidden bg-radial-gradient">
      {/* Background Subtle Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-drift-crimson-deep/20 via-drift-dark to-drift-dark pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Heritage Narrative */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Season Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-drift-card/90 border border-drift-gold/30 shadow-gold-subtle">
              <span className="w-2 h-2 rounded-full bg-drift-gold animate-ping" />
              <span className="text-xs font-serif tracking-[0.25em] gold-gradient-text uppercase">
                Trending 2026 Sovereign Edition
              </span>
            </div>

            {/* Editorial Title */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.12]">
              Sovereign Silks &amp;{' '}
              <span className="gold-gradient-text italic font-normal">
                Imperial Drapes
              </span>{' '}
              of Hindustan.
            </h1>

            {/* Editorial Subtext */}
            <p className="text-sm sm:text-base text-drift-sand/80 font-light leading-relaxed max-w-xl">
              An unprecedented curation of 48 museum-grade handloom sarees: from the mathematically plotted double ikats of Patan and gold-embossed Shikargah brocades of Kashi, to the royal poshak silks of Mehrangarh and temple-border Korvai weaves of Kanchipuram.
            </p>

            {/* Quick Regional State Jump Pills */}
            <div className="space-y-2 pt-2">
              <p className="text-[11px] uppercase tracking-widest text-drift-gold/80 font-serif">
                Select Regional Provenance:
              </p>
              <div className="flex flex-wrap gap-2">
                {ALL_STATE_METAS.map((state) => {
                  const isActive = selectedRegion === state.slug;
                  return (
                    <button
                      key={state.slug}
                      onClick={() => {
                        setSelectedRegion(state.slug);
                        scrollToCatalog();
                      }}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-300 font-serif ${
                        isActive
                          ? 'border-drift-gold bg-drift-gold text-drift-dark font-semibold shadow-gold-glow scale-105'
                          : 'border-drift-border bg-drift-card/60 text-drift-sand/90 hover:border-drift-gold/50 hover:text-drift-gold-light'
                      }`}
                    >
                      {state.name.split(' ')[0]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={scrollToCatalog}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-drift-gold via-drift-gold-light to-drift-gold text-drift-dark font-serif font-bold tracking-widest text-xs uppercase shadow-gold-glow hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Curated 48 Sarees</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={scrollToInspector}
                className="px-6 py-3.5 rounded-full bg-drift-card/80 border border-drift-gold/40 text-drift-gold hover:text-white hover:border-drift-gold font-serif text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4" />
                <span>3D Fabric Inspector</span>
              </button>
            </div>

            {/* Handloom Credentials Trust Strip */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-drift-border/70 text-left">
              <div>
                <p className="font-serif text-lg font-bold text-drift-gold">210 Days</p>
                <p className="text-[11px] text-drift-sand/60">Single Saree Handcraft</p>
              </div>
              <div>
                <p className="font-serif text-lg font-bold text-drift-gold">24K Gold</p>
                <p className="text-[11px] text-drift-sand/60">Tested Pure Zari Wires</p>
              </div>
              <div>
                <p className="font-serif text-lg font-bold text-drift-gold">100% Pure</p>
                <p className="text-[11px] text-drift-sand/60">Mulberry Silk Mark Certified</p>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Three.js Interactive Billowing Silk Canvas */}
          <div className="lg:col-span-6 relative h-[480px] sm:h-[580px] lg:h-[680px] w-full rounded-2xl overflow-hidden border border-drift-gold/25 bg-drift-card/30 backdrop-blur-sm shadow-2xl">
            {/* 3D WebGL Canvas */}
            <SareeHeroCanvas />

            {/* Overlay Badge */}
            <div className="absolute top-5 left-5 z-20 bg-drift-dark/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-drift-gold/30 flex items-center gap-2 text-[11px] text-drift-sand/90 font-serif">
              <Sparkles className="w-3.5 h-3.5 text-drift-gold" />
              <span>Real-Time Cloth Physics &amp; Zari Shimmer</span>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <div
        onClick={scrollToCatalog}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 cursor-pointer group text-drift-sand/50 hover:text-drift-gold transition-colors"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] font-serif">Scroll to Curate</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce text-drift-gold" />
      </div>
    </section>
  );
}
