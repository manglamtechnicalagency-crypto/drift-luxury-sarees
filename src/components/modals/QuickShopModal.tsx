'use client';

import React, { useMemo, useState } from 'react';
import { useShop } from '@/context/ShopContext';
import confetti from 'canvas-confetti';
import {
  X,
  ShieldCheck,
  Award,
  Sparkles,
  ShoppingBag,
  Heart,
  Clock,
  Layers,
  Scissors,
  Gift,
  CheckCircle,
  Palette,
} from 'lucide-react';
import { getSareeColorways, getSareeModelImage, SareeColorway, PRIYA_EDITORIAL_MODEL } from '@/data/collections/colorways';
import { TextilePattern } from '@/components/products/TextilePalette';

export default function QuickShopModal() {
  const {
    quickShopSaree,
    setQuickShopSaree,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useShop();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [includeBlouse, setIncludeBlouse] = useState(true);
  const [includeFallPico, setIncludeFallPico] = useState(true);
  const [includeGiftTrunk, setIncludeGiftTrunk] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const colorways = useMemo(() => quickShopSaree ? getSareeColorways(quickShopSaree) : [], [quickShopSaree]);
  if (!quickShopSaree) return null;

  const saree = quickShopSaree;
  const inWish = isInWishlist(saree.id);
  const activeColorway = colorways[selectedVariant] || colorways[0];
  const pairing = activeColorway.pairing || {
    body: activeColorway.palette[0],
    border: activeColorway.palette[1],
    pallu: activeColorway.palette[2],
    zari: activeColorway.palette[3],
  };

  const galleryImages = [
    { label: 'Model in saree', url: getSareeModelImage(saree), fallback: PRIYA_EDITORIAL_MODEL.images[saree.region] },
    { label: 'Regional model look', url: PRIYA_EDITORIAL_MODEL.images[saree.region], fallback: PRIYA_EDITORIAL_MODEL.images[saree.region] },
    { label: 'Editorial model portrait', url: '/collections/models/model_royal_chandan.jpg', fallback: '/collections/models/model_royal_chandan.jpg' },
    { label: 'Saree model portrait', url: '/collections/models/model_saffron_yellow.jpg', fallback: '/collections/models/model_saffron_yellow.jpg' },
  ];

  const handleAddToCartWithConfetti = () => {
    addToCart(saree, {
      blouseStitching: includeBlouse,
      fallPico: includeFallPico,
      giftPackaging: includeGiftTrunk,
    });

    setIsSuccess(true);
    // Royal Gold Confetti Explosion
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#F5E6A3', '#800020', '#C5A059'],
      });
    } catch {
      // Confetti fallback
    }

    setTimeout(() => {
      setIsSuccess(false);
      setQuickShopSaree(null);
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 lg:p-8 animate-in fade-in duration-300">
      <div className="relative bg-drift-card border border-drift-gold/40 rounded-3xl max-w-5xl w-full shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={() => setQuickShopSaree(null)}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-drift-dark/80 text-drift-sand hover:text-white border border-drift-gold/30 hover:border-drift-gold transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Multi-Angle Interactive Gallery (6 Cols) */}
            <div className="lg:col-span-6 space-y-4">
              {/* Active Large Image Display */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-black/60 border border-drift-border shadow-inner">
                {selectedImageIndex < 4 ? (
                  <img
                    src={galleryImages[selectedImageIndex].url}
                    alt={`${saree.name} drape study: ${galleryImages[selectedImageIndex].label}`}
                    className="w-full h-full object-cover transition-all duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = galleryImages[selectedImageIndex].fallback;
                    }}
                  />
                ) : (
                  <div className="relative w-full h-full bg-[#180B0F] p-4 flex flex-col justify-between">
                    <TextilePattern colorway={activeColorway} className="w-full h-full object-cover rounded-xl" />
                    <div className="absolute bottom-4 inset-x-4 bg-black/90 backdrop-blur-md p-3 rounded-xl border border-drift-gold/30 text-center">
                      <span className="text-[10px] uppercase tracking-widest text-drift-gold block font-semibold">
                        {activeColorway.name}
                      </span>
                      <span className="text-[9px] text-drift-sand/70 block capitalize mt-0.5">
                        {activeColorway.motif} Weave Motif • Architectural Weft Swatch
                      </span>
                    </div>
                  </div>
                )}
                <div className="absolute bottom-3 left-3 bg-drift-dark/85 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase font-serif text-drift-gold tracking-widest border border-drift-gold/20">
                  {selectedImageIndex < 4 ? galleryImages[selectedImageIndex].label : 'Woven Weave Swatch'}
                </div>
              </div>

              {/* Thumbnails Row: 4 Drapes + 1 Woven Swatch */}
              <div className="grid grid-cols-5 gap-2">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative aspect-square rounded-xl overflow-hidden border transition-all ${
                      selectedImageIndex === idx
                        ? 'border-drift-gold ring-2 ring-drift-gold/40 scale-105'
                        : 'border-drift-border hover:border-drift-gold/40 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={`${saree.name} - ${img.label} thumbnail`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = img.fallback;
                      }}
                    />
                  </button>
                ))}

                {/* 5th Swatch Thumbnail */}
                <button
                  type="button"
                  onClick={() => setSelectedImageIndex(4)}
                  className={`relative aspect-square rounded-xl overflow-hidden border transition-all ${
                    selectedImageIndex === 4
                      ? 'border-drift-gold ring-2 ring-drift-gold/40 scale-105'
                      : 'border-drift-border hover:border-drift-gold/40 opacity-70 hover:opacity-100'
                  }`}
                  title="Inspect Woven Textile Swatch"
                >
                  <TextilePattern colorway={activeColorway} className="w-full h-full object-cover" />
                  <span className="absolute inset-x-0 bottom-0 bg-black/80 text-[7px] text-drift-gold font-bold uppercase tracking-wider text-center py-0.5">
                    Weave
                  </span>
                </button>
              </div>

              {/* Design Study Label Strip */}
              <div className="p-3.5 rounded-xl bg-drift-dark/60 border border-drift-gold/20 flex items-center justify-between text-xs font-serif text-drift-sand/80">
                <div className="flex items-center gap-2 text-drift-gold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Design Study · Textile Archive Concept</span>
                </div>
                <span className="text-[10px] text-drift-sand/50">Illustrative Prototype</span>
              </div>
            </div>

            {/* Right Column: Saree Details, Craft Lineage & Atelier Options (6 Cols) */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-[10px] uppercase font-serif tracking-widest bg-drift-gold/15 text-drift-gold border border-drift-gold/30 font-semibold">
                    {saree.originState}
                  </span>
                  <button
                    onClick={() => toggleWishlist(saree.id)}
                    className="flex items-center gap-1.5 text-xs text-drift-sand/70 hover:text-drift-crimson transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 ${inWish ? 'fill-drift-crimson text-drift-crimson' : ''}`}
                    />
                    <span>{inWish ? 'In Wishlist' : 'Save to Wishlist'}</span>
                  </button>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl text-white font-medium">
                  {saree.name}
                </h2>
                <p className="text-xs font-serif text-drift-sand/70 mt-1 italic">
                  {saree.title}
                </p>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 mt-4">
                  <span className="font-serif text-3xl font-bold text-drift-gold">
                    {formatPrice(saree.price)}
                  </span>
                  {saree.originalPrice && (
                    <span className="text-sm font-serif text-drift-sand/50 line-through">
                      {formatPrice(saree.originalPrice)}
                    </span>
                  )}
                  <span className="text-xs text-drift-gold font-serif">
                    Conceptual Design Study
                  </span>
                </div>
              </div>

              {/* Couture Colourways & Weave Variants Selector */}
              <div className="p-4 rounded-2xl bg-black/50 border border-drift-gold/30 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs uppercase font-serif tracking-widest text-drift-gold flex items-center gap-1.5 font-semibold">
                    <Palette className="w-3.5 h-3.5" />
                    <span>Couture Variant &amp; Palette Study</span>
                  </label>
                  <span className="text-[10px] text-drift-sand/60 uppercase tracking-wider">
                    Variant 0{selectedVariant + 1} of 0{colorways.length}
                  </span>
                </div>

                {/* 3 Variant Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {colorways.map((cw, idx) => {
                    const isSelected = selectedVariant === idx;
                    return (
                      <button
                        key={cw.id}
                        type="button"
                        onClick={() => {
                          setSelectedVariant(idx);
                          setSelectedImageIndex(4); // Switch gallery to weave swatch
                        }}
                        className={`p-2 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                          isSelected
                            ? 'border-drift-gold bg-drift-gold/15 shadow-md ring-1 ring-drift-gold/50'
                            : 'border-drift-border bg-black/30 hover:border-drift-gold/30 opacity-75 hover:opacity-100'
                        }`}
                      >
                        <span className="w-8 h-10 rounded-md overflow-hidden flex-shrink-0 border border-white/20">
                          <TextilePattern colorway={cw} className="w-full h-full object-cover" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-serif text-xs text-white truncate font-medium">
                            {cw.name.split('·')[0].split('&')[0]}
                          </span>
                          <span className="block text-[8px] uppercase tracking-wider text-drift-gold truncate">
                            {cw.motif} weave
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Active Variant 4-Way Color Pairing Breakdown */}
                <div className="pt-2 border-t border-drift-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] uppercase tracking-wider text-drift-sand/70 font-medium">
                      Active: {activeColorway.name}
                    </span>
                    <span className="text-[9px] text-drift-gold italic">
                      Tap weave to inspect
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-1.5">
                    <div className="p-1.5 rounded-lg bg-black/40 border border-white/10 flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded-full border border-white/30 flex-shrink-0" style={{ backgroundColor: pairing.body }} />
                      <span className="text-[8px] uppercase text-drift-sand/80 truncate">Body</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-black/40 border border-white/10 flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded-full border border-white/30 flex-shrink-0" style={{ backgroundColor: pairing.border }} />
                      <span className="text-[8px] uppercase text-drift-sand/80 truncate">Border</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-black/40 border border-white/10 flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded-full border border-white/30 flex-shrink-0" style={{ backgroundColor: pairing.pallu }} />
                      <span className="text-[8px] uppercase text-drift-sand/80 truncate">Pallu</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-black/40 border border-white/10 flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded-full border border-white/30 flex-shrink-0" style={{ backgroundColor: pairing.zari }} />
                      <span className="text-[8px] uppercase text-drift-sand/80 truncate">Zari</span>
                    </div>
                  </div>

                  <p className="mt-2 text-[10px] text-drift-sand/60 font-light leading-relaxed">
                    {activeColorway.note}
                  </p>
                </div>
              </div>

              {/* Lead Artisan & Provenance */}
              <div className="p-4 rounded-xl bg-black/40 border border-drift-border space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-drift-sand/60 font-serif">Master Weaver Guild:</span>
                  <span className="font-serif text-drift-gold font-medium">
                    {saree.leadArtisan || saree.provenance}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-drift-sand/60 font-serif">Weave Duration:</span>
                  <span className="font-serif text-white">{saree.weaveTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-drift-sand/60 font-serif">Zari Wire Standard:</span>
                  <span className="font-serif text-white">{saree.zariType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-drift-sand/60 font-serif">Fabric Grade:</span>
                  <span className="font-serif text-white">{saree.fabric}</span>
                </div>
              </div>

              {/* Historical Narrative Prose */}
              <div className="space-y-2 text-xs sm:text-sm lg:text-base text-drift-sand/90 font-light leading-relaxed">
                <p>{saree.description}</p>
                <p className="text-drift-gold/90 font-serif italic pt-1.5 border-t border-drift-border/50">
                  Historical Lore: {saree.story}
                </p>
              </div>

              {/* Bespoke Atelier Inclusions & Services */}
              <div className="space-y-2.5 pt-2">
                <label className="text-xs uppercase font-serif tracking-wider text-drift-gold block">
                  Bespoke Atelier Inclusions:
                </label>

                {/* Fall & Pico */}
                <div
                  onClick={() => setIncludeFallPico(!includeFallPico)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors text-xs font-serif ${
                    includeFallPico
                      ? 'border-drift-gold bg-drift-gold/10 text-white'
                      : 'border-drift-border text-drift-sand/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Layers className="w-4 h-4 text-drift-gold" />
                    <div>
                      <p className="font-semibold">Complimentary Fall &amp; Hand-Rolled Pico</p>
                      <p className="text-[10px] text-drift-sand/60">
                        Preserves saree hemline with unbleached organic cotton ribbon
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase">Included</span>
                </div>

                {/* Tailored Blouse Stitching */}
                <div
                  onClick={() => setIncludeBlouse(!includeBlouse)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors text-xs font-serif ${
                    includeBlouse
                      ? 'border-drift-gold bg-drift-gold/10 text-white'
                      : 'border-drift-border text-drift-sand/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Scissors className="w-4 h-4 text-drift-gold" />
                    <div>
                      <p className="font-semibold">Bespoke Couture Blouse Tailoring</p>
                      <p className="text-[10px] text-drift-sand/60">
                        Custom measurement concierge call via WhatsApp within 24h
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-drift-gold font-bold">+₹4,500</span>
                </div>

                {/* Velvet Lined Cedar Trunk */}
                <div
                  onClick={() => setIncludeGiftTrunk(!includeGiftTrunk)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors text-xs font-serif ${
                    includeGiftTrunk
                      ? 'border-drift-gold bg-drift-gold/10 text-white'
                      : 'border-drift-border text-drift-sand/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Gift className="w-4 h-4 text-drift-gold" />
                    <div>
                      <p className="font-semibold">Royal Velvet-Lined Cedar Preservation Trunk</p>
                      <p className="text-[10px] text-drift-sand/60">
                        Natural moth-repellent cedar trunk with brass latches
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-drift-gold font-bold">+₹1,500</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 space-y-3">
                <button
                  onClick={handleAddToCartWithConfetti}
                  disabled={isSuccess}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-drift-gold via-drift-gold-light to-drift-gold text-drift-dark font-serif font-bold tracking-widest text-xs uppercase shadow-gold-glow hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  {isSuccess ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-drift-dark" />
                      <span>Reserved in Royal Trunk!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Reserve in Royal Trunk</span>
                    </>
                  )}
                </button>

                <p className="text-[10px] text-drift-sand/60 text-center font-serif">
                  Editorial design study only • Not a verified commercial listing; materials, pricing, and availability require confirmation.
                </p>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
