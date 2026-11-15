'use client';

import React, { useState } from 'react';
import { ALL_STATE_METAS } from '@/data/collections/registry';
import { StateCollection, StateSlug } from '@/data/collections/types';
import { useShop } from '@/context/ShopContext';
import { getRegionalModelImage } from '@/data/collections/colorways';
import { ArrowRight, Sparkles, Award, Clock } from 'lucide-react';

export default function RegionalExplorer() {
  const { setSelectedRegion, selectedRegion } = useShop();
  const [activeTab, setActiveTab] = useState<StateSlug>(
    selectedRegion !== 'all' ? selectedRegion : 'gujarati'
  );

  const activeMeta =
    ALL_STATE_METAS.find((m) => m.slug === activeTab) || ALL_STATE_METAS[0];

  const handleSelectState = (slug: StateSlug) => {
    setActiveTab(slug);
    setSelectedRegion(slug);
    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-drift-dark border-t border-b border-drift-gold/15 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div
        className="absolute -top-40 right-0 w-96 h-96 rounded-full blur-[140px] pointer-events-none transition-all duration-700"
        style={{ backgroundColor: activeMeta.glowColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <p className="text-xs font-serif uppercase tracking-[0.3em] gold-gradient-text">
            Regional Loom Lineages
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white">
            Six Sovereign Textile Dynasties
          </h2>
          <p className="text-sm text-drift-sand/70 font-light leading-relaxed">
            Every thread carries a geographical soul — mathematically calculated double ikats, 24K real gold kadwa brocades, and multi-generational resist dyes.
          </p>
        </div>

        {/* State Selection Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 gap-2 sm:gap-3 scrollbar-none mb-12">
          {ALL_STATE_METAS.map((state) => {
            const isSelected = activeTab === state.slug;
            return (
              <button
                key={state.slug}
                onClick={() => setActiveTab(state.slug)}
                className={`flex-shrink-0 px-4 sm:px-5 py-2.5 rounded-xl border text-left transition-all duration-300 ${
                  isSelected
                    ? 'border-drift-gold bg-drift-card text-white shadow-gold-subtle scale-105'
                    : 'border-drift-border bg-drift-card/40 text-drift-sand/70 hover:border-drift-gold/40 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: state.accentColor }}
                  />
                  <span className="font-serif text-xs font-semibold tracking-wider">
                    {state.name}
                  </span>
                </div>
                <span className="text-[10px] text-drift-sand/50 block font-serif mt-0.5">
                  {state.hindiName}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active State Deep-Dive Card */}
        <div className="bg-drift-card/80 border border-drift-gold/25 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 backdrop-blur-md">
          {/* Left Column: Visual Editorial Imagery */}
          <div className="lg:col-span-5 relative min-h-[360px] lg:min-h-[460px] overflow-hidden group">
            <img
              src={getRegionalModelImage(activeMeta.slug)}
              alt={`Female model wearing a saree inspired by ${activeMeta.name}`}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/collections/models/priya_gujarati_patola.jpg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-drift-dark via-drift-dark/40 to-transparent" />

            {/* Overlaid Badges */}
            <div className="absolute bottom-6 left-6 right-6 space-y-2">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] uppercase font-serif tracking-widest bg-drift-gold text-drift-dark font-bold">
                {activeMeta.historicalEra}
              </span>
              <p className="font-serif text-xl sm:text-2xl text-white font-medium">
                {activeMeta.tagline}
              </p>
            </div>
          </div>

          {/* Right Column: Craft Details & Specs */}
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-drift-border pb-4">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-drift-gold-light font-medium">
                    {activeMeta.name}
                  </h3>
                  <p className="text-xs text-drift-sand/60 font-serif mt-0.5">
                    {activeMeta.hindiName}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-drift-border text-xs text-drift-gold font-serif">
                  <Award className="w-4 h-4 text-drift-gold" />
                  <span>8 Flagship Masterpieces</span>
                </div>
              </div>

              {/* Craft Overview Prose */}
              <p className="text-sm text-drift-sand/85 font-light leading-relaxed">
                {activeMeta.craftOverview}
              </p>

              {/* Key Weaves Chips */}
              <div className="space-y-2">
                <p className="text-xs uppercase font-serif tracking-wider text-drift-gold/90">
                  Signature Weave Techniques:
                </p>
                <div className="flex flex-wrap gap-2">
                  {(activeMeta?.keyWeaves || []).map((weave, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-md text-xs bg-drift-dark/80 border border-drift-gold/20 text-drift-sand/90 font-serif"
                    >
                      {weave}
                    </span>
                  ))}
                </div>
              </div>

              {/* Numerical Metrics */}
              <div className="grid grid-cols-3 gap-3 pt-3">
                <div className="p-3 rounded-lg bg-black/40 border border-drift-border text-center">
                  <p className="font-serif text-lg font-bold text-drift-gold">
                    {activeMeta.stats.heritageCenturies}+
                  </p>
                  <p className="text-[10px] text-drift-sand/60 uppercase">Centuries Recorded</p>
                </div>
                <div className="p-3 rounded-lg bg-black/40 border border-drift-border text-center">
                  <p className="font-serif text-lg font-bold text-drift-gold">
                    {activeMeta.stats.artisanGuilds}
                  </p>
                  <p className="text-[10px] text-drift-sand/60 uppercase">Active Guilds</p>
                </div>
                <div className="p-3 rounded-lg bg-black/40 border border-drift-border text-center">
                  <p className="font-serif text-lg font-bold text-drift-gold">
                    {activeMeta.stats.flagshipPieces}
                  </p>
                  <p className="text-[10px] text-drift-sand/60 uppercase">2026 Archive Pieces</p>
                </div>
              </div>
            </div>

            {/* Action Trigger */}
            <div className="pt-4 border-t border-drift-border flex items-center justify-between">
              <button
                onClick={() => handleSelectState(activeMeta.slug)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-drift-gold text-drift-dark font-serif text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-gold-subtle group"
              >
                <span>Filter &amp; Explore {activeMeta.name.split(' ')[0]} Sarees</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <span className="text-xs text-drift-sand/50 font-serif hidden sm:inline">
                Pure Handloom Verified
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
