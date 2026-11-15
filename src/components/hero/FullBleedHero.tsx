'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ShieldCheck, Truck, RotateCcw, ArrowRight, Play, Pause, Sparkles } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { PRIYA_EDITORIAL_MODEL } from '@/data/collections/colorways';
import { StateSlug } from '@/data/collections/types';

const HERO_MUSE_EDITS: { slug: StateSlug; label: string; sareeTitle: string; craft: string }[] = [
  { slug: 'banarasi', label: 'Banarasi', sareeTitle: 'Kashi Kadwa Shikargah', craft: 'Pure Katan Zari Brocade' },
  { slug: 'kanchipuram', label: 'Kanchipuram', sareeTitle: 'Mayil Korvai Temple Silk', craft: 'Heavy Mulberry Korvai' },
  { slug: 'gujarati', label: 'Patan Patola', sareeTitle: 'Navratna Double-Ikat', craft: 'Resist Dyed Heritage Silk' },
  { slug: 'rajasthani', label: 'Rajasthani', sareeTitle: 'Mothra Wave Leheriya', craft: 'Diagonal Wave Resist Silk' },
  { slug: 'jodhpuri', label: 'Jodhpuri', sareeTitle: 'Marwar Shikar Bandhej', craft: 'Pinch-Dyed Georgette Zari' },
  { slug: 'heritage-states', label: 'Paithani', sareeTitle: 'Bangdi Mor Tapestry Silk', craft: 'Interlocking Gold Weave' },
];

export default function FullBleedHero() {
  const { setActiveModal } = useStore();
  const [scrollY, setScrollY] = useState(0);
  const [portraitMotion, setPortraitMotion] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [selectedMuseIndex, setSelectedMuseIndex] = useState(0);
  const reducedMotionPreference = useReducedMotion();
  const reduceMotion = mounted ? reducedMotionPreference === true : false;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setScrollY(0);
      return;
    }
    let rafId = 0;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        rafId = 0;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [reduceMotion]);

  const scrollToCurvedArc = () => {
    document.getElementById('curated-curved-arc')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const scrollToLookbook = () => {
    document.getElementById('autumn-winter-studio')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const activeMuse = HERO_MUSE_EDITS[selectedMuseIndex] || HERO_MUSE_EDITS[0];
  const activeImage = PRIYA_EDITORIAL_MODEL.images[activeMuse.slug] || '/collections/models/priya_banarasi_red.jpg';

  return (
    <section className="relative w-full min-h-[100dvh] flex items-center justify-between overflow-hidden bg-[#2B070E] select-none py-16 sm:py-24">
      
      {/* 1. Full-Bleed Saree Model Portrait */}
      <div className="absolute inset-0 z-0">
        <img
          src={activeImage}
          alt=""
          aria-hidden="true"
          className={`h-full w-full object-cover object-top transition-transform duration-1000 ease-out ${portraitMotion && !reduceMotion ? 'motion-safe:animate-[modelPortraitDrift_18s_ease-in-out_infinite_alternate]' : ''}`}
          style={{
            transform:
              mounted && !reduceMotion && scrollY !== 0
                ? `scale(${(portraitMotion ? 1.05 : 1) + scrollY * 0.0003}) translateY(${scrollY * 0.15}px)`
                : undefined,
          }}
        />

        {/* Dual Gradient Vignette (Editorial Shadow) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2B070E]/95 via-[#2B070E]/75 to-[#2B070E]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2B070E] via-transparent to-[#2B070E]/70" />
      </div>

      {/* Accessible portrait motion control */}
      <button
        type="button"
        onClick={() => setPortraitMotion((active) => !active)}
        aria-label={portraitMotion ? 'Pause model portrait motion' : 'Play model portrait motion'}
        aria-pressed={portraitMotion}
        className="absolute right-5 top-20 z-30 inline-flex items-center gap-2 rounded-full border border-[#FAF7F2]/35 bg-[#2B070E]/65 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#FAF7F2] backdrop-blur-md transition-colors hover:border-[#D4AF37] hover:text-[#E6B83A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E6B83A] sm:right-8"
      >
        {portraitMotion ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
        <span>{portraitMotion ? 'Pause' : 'Animate portrait'}</span>
      </button>

      {/* Main Editorial Dual-Stage Layout */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-between h-full pt-16 sm:pt-24 pb-8 pointer-events-none">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          
          {/* Left Column: Editorial Headline & Narrative */}
          <div className="lg:col-span-7 space-y-6 pointer-events-auto">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F2]/10 backdrop-blur-md border border-[#D4AF37]/40 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#E6B83A] animate-ping" />
              <span className="text-[10px] sm:text-xs font-sans tracking-[0.25em] text-[#E6B83A] uppercase font-bold">
                THE REGIONAL TEXTILE ARCHIVE
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl xl:text-7.5xl text-[#FAF7F2] font-normal tracking-tight leading-[1.08]">
              The Heirloom Looms <span className="italic text-[#E6B83A] font-serif">of India</span>.
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-xl xl:text-2xl text-[#FAF7F2]/90 font-light leading-relaxed lg:leading-relaxed xl:leading-relaxed max-w-2xl font-sans">
              Six regional textile archives, brought to life through illustrative model portraits and richly varied color studies.
            </p>

            {/* Action Pills */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={scrollToCurvedArc}
                className="px-7 py-3.5 rounded-full bg-[#D4AF37] hover:bg-[#E6B83A] text-[#2B070E] font-sans font-bold text-xs uppercase tracking-[0.2em] shadow-lg shadow-[#D4AF37]/25 hover:shadow-xl transition-all flex items-center gap-2 group active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E6B83A]"
              >
                <span>Explore the Edit</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={scrollToLookbook}
                className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-[#FAF7F2]/30 text-[#FAF7F2] font-sans font-semibold text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-2 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E6B83A]"
              >
                <span>View Lookbook</span>
              </button>
            </div>

            {/* Interactive Muse Saree Switcher Strip */}
            <div className="pt-3 border-t border-[#FAF7F2]/15">
              <div className="flex items-center gap-2 mb-2.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E6B83A]" />
                <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#E6B83A] font-semibold">
                  Illustrative Model Looks · Regional Design Studies:
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {HERO_MUSE_EDITS.map((item, idx) => {
                  const isActive = selectedMuseIndex === idx;
                  return (
                    <button
                      key={item.slug}
                      type="button"
                      onClick={() => setSelectedMuseIndex(idx)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-serif transition-all duration-300 ${
                        isActive
                          ? 'bg-[#E6B83A] text-[#2B070E] font-bold shadow-md shadow-[#E6B83A]/30 scale-105'
                          : 'bg-white/5 border border-white/15 text-[#FAF7F2]/80 hover:border-[#E6B83A]/50 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Stunning Couture Female Model Showcase Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end pointer-events-auto">
            <motion.div
              className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[3/4.2] rounded-[2.2rem] p-2 bg-gradient-to-b from-[#E6B83A]/40 via-white/10 to-[#2B070E] shadow-[0_25px_60px_rgba(0,0,0,0.7)] group"
              animate={reduceMotion ? {} : { y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Outer Gilded Aura */}
              <div className="absolute -inset-1 rounded-[2.4rem] bg-gradient-to-tr from-[#E6B83A]/25 via-transparent to-[#E6B83A]/20 blur-xl pointer-events-none" />

              {/* Arched Inner Container */}
              <div className="relative w-full h-full rounded-[1.8rem] overflow-hidden bg-[#1A060A] border border-[#E6B83A]/30">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeMuse.slug}
                    src={activeImage}
                    alt={`Illustrative model portrait for the ${activeMuse.label} saree design study`}
                    initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                    transition={{ duration: reduceMotion ? 0.01 : 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </AnimatePresence>

                {/* Ambient Bottom Gradient Vignette */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1A060A] via-[#1A060A]/60 to-transparent p-5 text-left">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E6B83A]/20 border border-[#E6B83A]/40 text-[#E6B83A] text-[9px] uppercase tracking-[0.2em] font-semibold mb-1">
                    <span>Editorial model reference</span>
                    <span>•</span>
                    <span>{activeMuse.label}</span>
                  </div>
                  <h3 className="font-serif text-lg text-white font-medium truncate">
                    {activeMuse.sareeTitle}
                  </h3>
                  <p className="text-[11px] text-[#FAF7F2]/70 font-sans mt-0.5">
                    {activeMuse.craft}
                  </p>
                </div>

                {/* Top Badge */}
                <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#FAF7F2] text-[10px] font-sans font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E6B83A]" />
                  <span>2026 Sovereign Drape</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* 4. Bottom Row: Trust Badges & Poetic Captions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pt-8 border-t border-[#FAF7F2]/15 gap-6 pointer-events-auto mt-8">
          
          {/* 3 Bottom-Left Trust Badges */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-[#FAF7F2]/80 text-xs font-sans">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#E6B83A]" />
              <span className="font-medium">Regional craft references</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#E6B83A]" />
              <span className="font-medium">Price on request</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#E6B83A]" />
              <span className="font-medium">Editorial design studies</span>
            </div>
          </div>

          {/* Bottom-Right Poetic Caption */}
          <div
            className="hidden lg:block font-serif text-sm italic text-[#FAF7F2]/70 max-w-xs transition-opacity duration-500 text-right"
            style={{
              opacity: Math.max(0, 1 - scrollY * 0.003),
            }}
          >
            &ldquo;six meters, one drape — months of patient hands.&rdquo;
          </div>

        </div>

      </div>

    </section>
  );
}
