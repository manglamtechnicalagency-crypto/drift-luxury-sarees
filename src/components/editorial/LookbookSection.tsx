'use client';

import React, { useState } from 'react';
import { LOOKBOOK_PRESETS, getSareeById } from '@/data/collections/registry';
import { useShop } from '@/context/ShopContext';
import { SareeProduct } from '@/data/collections/types';
import { getSareeModelImage } from '@/data/collections/colorways';
import { Sparkles, ArrowRight, BookOpen, ShoppingBag } from 'lucide-react';

export default function LookbookSection() {
  const { setQuickShopSaree, addToCart, formatPrice } = useShop();
  const [activeLookbookId, setActiveLookbookId] = useState(LOOKBOOK_PRESETS[0].id);

  const activeLookbook =
    LOOKBOOK_PRESETS.find((l) => l.id === activeLookbookId) || LOOKBOOK_PRESETS[0];

  const lookbookSarees = activeLookbook.sareeIds
    .map((id) => getSareeById(id))
    .filter((s): s is SareeProduct => !!s);

  return (
    <section className="py-24 bg-gradient-to-b from-drift-dark via-drift-charcoal to-drift-dark border-b border-drift-gold/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-serif tracking-[0.3em] gold-gradient-text flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Couture Editorial Lookbooks</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white">
              The Curated Heirloom Arcs
            </h2>
            <p className="text-sm text-drift-sand/70 font-light max-w-xl">
              Editorial compositions mapping the artistic dialogues between royal courts across five centuries.
            </p>
          </div>

          {/* Lookbook Preset Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {LOOKBOOK_PRESETS.map((preset, idx) => (
              <button
                key={preset.id}
                onClick={() => setActiveLookbookId(preset.id)}
                className={`px-4 py-2 rounded-xl text-xs font-serif transition-all ${
                  activeLookbookId === preset.id
                    ? 'bg-drift-gold text-drift-dark font-bold shadow-gold-subtle'
                    : 'bg-drift-card border border-drift-border text-drift-sand/70 hover:text-white hover:border-drift-gold/40'
                }`}
              >
                Arc 0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Feature Spread */}
        <div className="bg-drift-card/90 border border-drift-gold/30 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Narrative Column (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] uppercase font-serif tracking-widest text-drift-gold block">
                  Editorial Curation
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-white font-medium">
                  {activeLookbook.title}
                </h3>
                <p className="text-sm font-serif text-drift-sand/80 italic">
                  {activeLookbook.subtitle}
                </p>
              </div>

              {/* Literary Quote */}
              <blockquote className="border-l-2 border-drift-gold pl-4 text-sm font-serif text-drift-sand italic leading-relaxed py-1">
                &ldquo;{activeLookbook.quote}&rdquo;
              </blockquote>

              {/* Aesthetic Atmosphere Note */}
              <div className="p-4 rounded-xl bg-black/40 border border-drift-border text-xs space-y-1">
                <p className="font-serif text-drift-gold uppercase tracking-wider text-[10px]">
                  Atmospheric Palette &amp; Mood:
                </p>
                <p className="text-drift-sand/80 font-light">
                  {activeLookbook.aestheticMood}
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  if (lookbookSarees[0]) setQuickShopSaree(lookbookSarees[0]);
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-drift-gold text-drift-dark font-serif text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-gold-subtle"
              >
                <span>Inspect Lookbook Hero Saree</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right Gallery Grid (7 Cols): 4 curated sarees in this lookbook */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-6">
              {lookbookSarees.map((saree) => (
                <div
                  key={saree.id}
                  className="group relative bg-drift-dark rounded-xl overflow-hidden border border-drift-border hover:border-drift-gold/50 transition-all p-3"
                >
                  <div
                    onClick={() => setQuickShopSaree(saree)}
                    className="relative aspect-[3/4] rounded-lg overflow-hidden bg-black/50 cursor-pointer mb-3"
                  >
                    <img
                      src={getSareeModelImage(saree)}
                      alt={`${saree.name} editorial lookbook drape on model Priya`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute bottom-2 left-2 text-[10px] text-drift-gold font-serif">
                      {saree.originState}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4
                      onClick={() => setQuickShopSaree(saree)}
                      className="font-serif text-xs sm:text-sm text-white font-medium hover:text-drift-gold transition-colors cursor-pointer line-clamp-1"
                    >
                      {saree.name}
                    </h4>
                    <p className="text-[11px] text-drift-sand/60 line-clamp-1 font-light">
                      {saree.craft}
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs font-serif text-drift-gold font-semibold">
                        {formatPrice(saree.price)}
                      </span>
                      <button
                        onClick={() => addToCart(saree)}
                        className="p-1.5 rounded-full bg-white/5 hover:bg-drift-gold hover:text-drift-dark text-drift-sand transition-colors"
                        title="Add to Royal Trunk"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
