'use client';

import React, { useState } from 'react';
import { ALL_SAREES } from '@/data/collections/registry';
import { SareeProduct } from '@/data/collections/types';
import { useShop } from '@/context/ShopContext';
import {
  Sun,
  Flame,
  Sparkles,
  ZoomIn,
  CheckCircle,
  Eye,
  ShoppingBag,
  RotateCw,
} from 'lucide-react';

export default function FabricInspector() {
  const { formatPrice, addToCart, setQuickShopSaree } = useShop();

  // Curated sarees to inspect
  const inspectableSarees = [
    ALL_SAREES[0], // Patan Patola
    ALL_SAREES[24], // Varanasi Shikargah
    ALL_SAREES[32], // Kanchipuram Korvai
    ALL_SAREES[16], // Jodhpur Umaid Bhawan
    ALL_SAREES[40], // Paithani Asawali
    ALL_SAREES[46], // Assam Muga
  ];

  const [selectedSaree, setSelectedSaree] = useState<SareeProduct>(inspectableSarees[0]);
  const [activeLighting, setActiveLighting] = useState<'daylight' | 'chandelier' | 'candlelight'>('chandelier');
  const [zoomLevel, setZoomLevel] = useState<'1x' | '4x' | '12x'>('1x');
  const [selectedDrape, setSelectedDrape] = useState<'seedha' | 'nivi' | 'atpoure'>('nivi');

  // Lighting overlay styling
  const getLightingStyle = () => {
    switch (activeLighting) {
      case 'daylight':
        return 'brightness-105 contrast-100 saturate-105';
      case 'chandelier':
        return 'brightness-115 contrast-110 sepia-[0.18] shadow-[inset_0_0_80px_rgba(212,175,55,0.4)]';
      case 'candlelight':
        return 'brightness-95 contrast-125 sepia-[0.35] shadow-[inset_0_0_120px_rgba(230,81,0,0.6)]';
    }
  };

  // Zoom transform
  const getZoomStyle = () => {
    switch (zoomLevel) {
      case '1x':
        return 'scale-100 object-cover';
      case '4x':
        return 'scale-150 object-cover origin-center';
      case '12x':
        return 'scale-[2.4] object-cover origin-top-left';
    }
  };

  const currentImage =
    zoomLevel === '1x'
      ? selectedSaree.images.primary
      : zoomLevel === '4x'
      ? selectedSaree.images.detail
      : selectedSaree.images.pallu;

  return (
    <section id="fabric-inspector" className="py-20 bg-drift-charcoal/90 border-b border-drift-gold/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <p className="text-xs uppercase font-serif tracking-[0.3em] gold-gradient-text">
            Interactive Craft Laboratory
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white">
            Virtual Drape &amp; Zari Inspector
          </h2>
          <p className="text-sm text-drift-sand/75 font-light">
            Examine how genuine 24K gold zari threads react under changing royal palace luminaires, and simulate traditional drape architectures.
          </p>
        </div>

        {/* Inspector Workspace Grid */}
        <div className="bg-drift-dark border border-drift-gold/30 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">
          
          {/* Main Visual Display (8 Cols) */}
          <div className="lg:col-span-8 relative min-h-[480px] sm:min-h-[600px] overflow-hidden flex items-center justify-center bg-black/60">
            {/* Saree Image with dynamic lighting & zoom filters */}
            <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
              <img
                src={currentImage}
                alt={`Interactive fabric zoom and lighting study of ${selectedSaree.name}`}
                className={`w-full h-full transition-all duration-700 ease-out select-none ${getLightingStyle()} ${getZoomStyle()}`}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = selectedSaree.images.fallbackPrimary;
                }}
              />

              {/* Atmospheric lighting glow overlay */}
              {activeLighting === 'chandelier' && (
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-amber-500/10 via-transparent to-yellow-300/15 mix-blend-color-dodge animate-pulse" />
              )}
              {activeLighting === 'candlelight' && (
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-orange-600/15 via-transparent to-red-900/25 mix-blend-color-burn" />
              )}
            </div>

            {/* Microscopic Gold Zari Callout Tag */}
            <div className="absolute top-6 left-6 z-20 bg-drift-dark/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-drift-gold/30 text-xs font-serif text-white space-y-0.5">
              <div className="flex items-center gap-2 text-drift-gold">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="font-semibold uppercase tracking-wider">{selectedSaree.zariType}</span>
              </div>
              <p className="text-[10px] text-drift-sand/60">
                Weave Time: {selectedSaree.weaveTime}
              </p>
            </div>

            {/* Interactive Floating Zoom Controls Bar */}
            <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-wrap items-center justify-between gap-3 bg-drift-dark/90 backdrop-blur-md p-2.5 rounded-xl border border-drift-gold/30">
              {/* Zoom Level Switcher */}
              <div className="flex items-center gap-1.5 text-xs font-serif">
                <span className="text-drift-sand/60 hidden sm:inline px-1">Magnification:</span>
                <button
                  onClick={() => setZoomLevel('1x')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    zoomLevel === '1x'
                      ? 'bg-drift-gold text-drift-dark font-bold'
                      : 'text-drift-sand/70 hover:text-white'
                  }`}
                >
                  1X (Silhouette)
                </button>
                <button
                  onClick={() => setZoomLevel('4x')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    zoomLevel === '4x'
                      ? 'bg-drift-gold text-drift-dark font-bold'
                      : 'text-drift-sand/70 hover:text-white'
                  }`}
                >
                  4X (Border Zari)
                </button>
                <button
                  onClick={() => setZoomLevel('12x')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    zoomLevel === '12x'
                      ? 'bg-drift-gold text-drift-dark font-bold'
                      : 'text-drift-sand/70 hover:text-white'
                  }`}
                >
                  12X (Warp &amp; Weft)
                </button>
              </div>

              {/* Quick View Button */}
              <button
                onClick={() => setQuickShopSaree(selectedSaree)}
                className="flex items-center gap-1 text-xs text-drift-gold hover:text-drift-gold-light font-serif underline px-2"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Examine Full Specs</span>
              </button>
            </div>
          </div>

          {/* Controls Sidebar (4 Cols) */}
          <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-drift-card/95 border-t lg:border-t-0 lg:border-l border-drift-gold/20">
            <div className="space-y-6">
              {/* Saree Selector Header */}
              <div>
                <span className="text-[10px] uppercase font-serif tracking-widest text-drift-gold">
                  {selectedSaree.originState}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-white font-medium">
                  {selectedSaree.name}
                </h3>
                <p className="text-sm font-serif text-drift-gold font-bold mt-1">
                  {formatPrice(selectedSaree.price)}
                </p>
              </div>

              {/* Select Different Museum Saree */}
              <div className="space-y-2">
                <label className="text-xs uppercase font-serif tracking-wider text-drift-sand/70">
                  Switch Museum Saree:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {inspectableSarees.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSaree(s)}
                      className={`relative aspect-[3/4] rounded-lg overflow-hidden border transition-all ${
                        selectedSaree.id === s.id
                          ? 'border-drift-gold ring-2 ring-drift-gold/40 scale-105'
                          : 'border-drift-border hover:border-drift-gold/50 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={s.images.primary}
                        alt={`${s.name} textile preview`}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[8px] font-serif text-drift-sand p-0.5 text-center truncate">
                        {s.name.split(' ')[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Palace Lighting Engine */}
              <div className="space-y-2.5">
                <label className="text-xs uppercase font-serif tracking-wider text-drift-sand/70 flex items-center justify-between">
                  <span>Palace Lighting Luminaire:</span>
                  <span className="text-drift-gold font-serif capitalize">{activeLighting}</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setActiveLighting('daylight')}
                    className={`p-2.5 rounded-xl border text-xs flex flex-col items-center gap-1.5 transition-all ${
                      activeLighting === 'daylight'
                        ? 'border-drift-gold bg-drift-gold/15 text-white font-semibold'
                        : 'border-drift-border text-drift-sand/60 hover:text-white'
                    }`}
                  >
                    <Sun className="w-4 h-4 text-amber-300" />
                    <span>Mandap Dawn</span>
                  </button>

                  <button
                    onClick={() => setActiveLighting('chandelier')}
                    className={`p-2.5 rounded-xl border text-xs flex flex-col items-center gap-1.5 transition-all ${
                      activeLighting === 'chandelier'
                        ? 'border-drift-gold bg-drift-gold/15 text-white font-semibold'
                        : 'border-drift-border text-drift-sand/60 hover:text-white'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                    <span>Chandelier</span>
                  </button>

                  <button
                    onClick={() => setActiveLighting('candlelight')}
                    className={`p-2.5 rounded-xl border text-xs flex flex-col items-center gap-1.5 transition-all ${
                      activeLighting === 'candlelight'
                        ? 'border-drift-gold bg-drift-gold/15 text-white font-semibold'
                        : 'border-drift-border text-drift-sand/60 hover:text-white'
                    }`}
                  >
                    <Flame className="w-4 h-4 text-orange-400" />
                    <span>Candlelight</span>
                  </button>
                </div>
              </div>

              {/* Drape Architecture Selection */}
              <div className="space-y-2">
                <label className="text-xs uppercase font-serif tracking-wider text-drift-sand/70">
                  Drape Architecture Style:
                </label>
                <div className="space-y-1.5 text-xs font-serif">
                  <button
                    onClick={() => setSelectedDrape('nivi')}
                    className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between transition-colors ${
                      selectedDrape === 'nivi'
                        ? 'border-drift-gold bg-drift-gold/10 text-drift-gold font-medium'
                        : 'border-drift-border text-drift-sand/70 hover:text-white'
                    }`}
                  >
                    <span>Classical Nivi (Shoulder Pleats)</span>
                    {selectedDrape === 'nivi' && <CheckCircle className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => setSelectedDrape('seedha')}
                    className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between transition-colors ${
                      selectedDrape === 'seedha'
                        ? 'border-drift-gold bg-drift-gold/10 text-drift-gold font-medium'
                        : 'border-drift-border text-drift-sand/70 hover:text-white'
                    }`}
                  >
                    <span>Seedha Pallu (Gujarati Front Display)</span>
                    {selectedDrape === 'seedha' && <CheckCircle className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => setSelectedDrape('atpoure')}
                    className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between transition-colors ${
                      selectedDrape === 'atpoure'
                        ? 'border-drift-gold bg-drift-gold/10 text-drift-gold font-medium'
                        : 'border-drift-border text-drift-sand/70 hover:text-white'
                    }`}
                  >
                    <span>Bengali Atpoure (Noble Box Pleats)</span>
                    {selectedDrape === 'atpoure' && <CheckCircle className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Direct Add to Trunk CTA */}
            <div className="pt-4 border-t border-drift-border space-y-2.5">
              <button
                onClick={() => addToCart(selectedSaree)}
                className="w-full py-3.5 rounded-full bg-drift-gold text-drift-dark font-serif font-bold text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-gold-subtle flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Reserve in Royal Trunk</span>
              </button>

              <button
                onClick={() => setQuickShopSaree(selectedSaree)}
                className="w-full py-2.5 rounded-full border border-drift-gold/40 text-drift-sand hover:text-white hover:border-drift-gold text-xs font-serif tracking-wider transition-colors"
              >
                Inspect Provenance Certificate
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
