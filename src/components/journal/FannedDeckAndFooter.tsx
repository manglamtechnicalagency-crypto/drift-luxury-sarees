'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ALL_SAREES, ALL_STATE_METAS } from '@/data/collections/registry';
import { getSareeModelImage, PRIYA_EDITORIAL_MODEL } from '@/data/collections/colorways';
import { useStore } from '@/store/useStore';
import { ArrowRight, Sparkles, Instagram, Facebook, Twitter, ShieldCheck } from 'lucide-react';

export default function FannedDeckAndFooter() {
  const { states, setActiveStateFilter, setSelectedProductForModal, setActiveModal, triggerToast } = useStore();
  const [deckOffset, setDeckOffset] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [botField, setBotField] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    if (botField) {
      triggerToast('Submission rejected.');
      return;
    }
    setIsSubscribing(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: newsletterEmail.trim(),
          website_url: botField,
        }),
      });
      const data: any = await res.json();
      if (res.ok) {
        triggerToast(data.message || 'Subscribed to DRIFT Regional Textile Journal.');
        setNewsletterEmail('');
      } else {
        triggerToast(data.error || 'Subscription failed.');
      }
    } catch {
      triggerToast('Network error. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  // 3 flagships for fanned cards
  const fannedCards = [
    ALL_SAREES[0], // Patola
    ALL_SAREES[16], // Jodhpuri
    ALL_SAREES[24], // Banarasi
  ];

  const handleCycleDeck = () => {
    setDeckOffset((prev) => (prev + 1) % fannedCards.length);
  };

  return (
    <section id="fanned-card-journal" className="w-full bg-[#FAF7F2] select-none pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ============================================================ */}
        {/* 1. LATEST TRENDS (3-Column Layout with 3D Fanned Card Deck)  */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-[#E6DFD5] pb-12">
          
          {/* Left Column (4 Cols) */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#A80F24] font-bold block">
              EDITORIAL JOURNAL
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#1A1617] font-semibold tracking-tight leading-none">
              LATEST<br />TRENDS
            </h2>
            <p className="font-serif italic text-base text-[#1A1617]/75">
              Stories Behind The Drape — exploring how 14th-century Solanki weave equations shape 2026 international couture runways.
            </p>
            <div className="pt-2">
              <a
                href="#curated-curved-arc"
                className="inline-block px-7 py-3 rounded-full bg-[#A80F24] hover:bg-[#7A0A19] text-[#FAF7F2] font-sans text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-md"
              >
                Discover More
              </a>
            </div>
            <div className="pt-2">
              <a
                href="#curated-curved-arc"
                className="text-xs font-sans font-bold text-[#A80F24] hover:underline flex items-center gap-1.5"
              >
                <span>Read the Journal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Center Column: 3D Fanned Card Deck (4 Cols) */}
          <div
            onClick={handleCycleDeck}
            className="lg:col-span-4 relative h-[380px] sm:h-[440px] flex items-center justify-center cursor-pointer perspective-1000 group"
            title="Click to cycle cards"
          >
            {fannedCards.map((saree, idx) => {
              const relIndex = (idx - deckOffset + fannedCards.length) % fannedCards.length;

              // Fanned geometry offsets:
              let rotateZ = -14 + relIndex * 14;
              let translateX = -45 + relIndex * 45;
              let translateZ = relIndex === 1 ? 30 : 0;
              let scale = relIndex === 1 ? 1.05 : 0.95;

              return (
                <div
                  key={saree.id}
                  className="absolute w-[210px] sm:w-[240px] aspect-[3/4.4] rounded-2xl overflow-hidden bg-[#2B070E] shadow-2xl border border-[#D4AF37]/50 transition-all duration-500 ease-out group-hover:scale-105"
                  style={{
                    transform: `translateX(${translateX}px) rotateZ(${rotateZ}deg) translateZ(${translateZ}px) scale(${scale})`,
                    zIndex: relIndex === 1 ? 20 : 10,
                  }}
                >
                  <img
                    src={getSareeModelImage(saree)}
                    alt={`Illustrative model reference for ${saree.name}`}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = getSareeModelImage(saree);
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B070E] via-[#2B070E]/20 to-transparent" />
                  
                  {/* Model Tag */}
                  <div className="absolute top-2.5 left-2.5 z-10 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-[#E6B83A]/30 text-[#E6B83A] text-[8px] font-sans uppercase tracking-widest font-semibold">
                    <Sparkles className="w-2.5 h-2.5 text-[#E6B83A]" />
                    <span>Illustrative model reference</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-left">
                    <span className="text-[9px] uppercase font-sans tracking-widest text-[#E6B83A] font-bold block">
                      {saree.originState}
                    </span>
                    <p className="font-serif text-sm text-[#FAF7F2] font-semibold truncate">
                      {saree.name}
                    </p>
                  </div>
                </div>
              );
            })}
            <span className="absolute bottom-2 text-[10px] font-sans tracking-widest text-[#1A1617]/50 uppercase">
              Click to cycle deck
            </span>
          </div>

          {/* Right Column (4 Cols) */}
          <div className="lg:col-span-4 space-y-4 text-left lg:pl-8">
            <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#D4AF37] font-bold block">
              REGIONAL ARCHIVE
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1617] font-semibold">
              Explore All States
            </h3>
            <p className="font-sans text-xs text-[#1A1617]/70 leading-relaxed font-light">
              From the craft clusters of Kutch to the weaving traditions of Kanchipuram, explore regional design studies with distinct color stories and textile references.
            </p>
            <div className="pt-2">
              <a
                href="#curated-curved-arc"
                className="text-xs font-sans font-bold text-[#A80F24] hover:underline flex items-center gap-1.5"
              >
                <span>View All Regional Studies</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* ============================================================ */}
      {/* 2. EDITORIAL MODEL PORTRAIT BANNER                          */}
      {/* ============================================================ */}
      <div className="group relative isolate w-full min-h-[40rem] sm:min-h-[34rem] lg:min-h-[32rem] overflow-hidden bg-drift-dark">
        <img
          src={PRIYA_EDITORIAL_MODEL.images['banarasi']}
          alt="Illustrative model portrait in a heritage-inspired saree design study"
          className="absolute inset-0 h-full w-full object-cover object-[center_30%] transition-transform duration-1000 ease-out motion-safe:group-hover:scale-[1.02] sm:left-auto sm:right-0 sm:w-[min(42%,560px)] sm:object-contain sm:object-bottom"
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-drift-dark via-drift-dark/25 to-drift-dark/10 sm:bg-gradient-to-r sm:from-drift-dark sm:via-drift-dark/90 sm:to-transparent" />
        <div className="absolute inset-y-0 right-0 z-0 hidden w-[min(44%,580px)] bg-gradient-to-l from-drift-dark/10 to-transparent sm:block" />
        
        {/* Illustrative model reference badge */}
        <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-drift-gold/40 text-drift-gold-light text-[9px] uppercase tracking-widest font-semibold">
          <Sparkles size={10} className="text-drift-gold" />
          <span>Illustrative model · DRIFT editorial study</span>
        </div>

        <div className="relative z-10 mx-auto flex min-h-[40rem] max-w-7xl items-end px-5 pb-12 sm:min-h-[34rem] sm:items-center sm:px-8 sm:pb-0 lg:min-h-[32rem] lg:px-12">
          <div className="max-w-2xl text-center sm:text-left">
            <p className="font-serif text-4xl font-semibold italic leading-tight text-drift-sand drop-shadow-lg sm:text-5xl lg:text-6xl">
              Threads of <span className="text-drift-gold">Sovereign Hindustan</span>
            </p>
            <span className="mt-3 block text-[10px] font-sans uppercase tracking-[0.32em] text-drift-gold-light sm:text-xs">
              A portrait-led study of India’s regional saree traditions
            </span>
            <a
              href="#curated-curved-arc"
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-drift-gold/60 bg-drift-dark/55 px-5 text-[10px] font-sans font-semibold uppercase tracking-[0.18em] text-drift-sand backdrop-blur-sm transition-colors hover:bg-drift-crimson focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-drift-gold"
            >
              Explore the regional edits <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. EDITORIAL FOOTER (5-Column Directory)                     */}
      {/* ============================================================ */}
      <footer className="w-full bg-[#2B070E] text-[#FAF7F2] pt-16 pb-12 border-t border-[#D4AF37]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#FAF7F2]/15 text-left">
            
            {/* Col 1: Brand & Socials (2 Cols) */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="font-serif text-3xl tracking-[0.25em] text-[#FAF7F2] font-bold">
                DRIFT
              </h4>
              <p className="font-sans text-xs text-[#FAF7F2]/75 font-light leading-relaxed max-w-sm">
                An editorial design archive inspired by six regional Indian textile traditions. Product materials, makers and sourcing remain under review.
              </p>
              <div className="flex items-center gap-4 text-[#E6B83A] pt-2">
                <span className="p-2 rounded-full bg-white/10 hover:bg-white/20 cursor-pointer transition-colors">
                  <Instagram className="w-4 h-4" />
                </span>
                <span className="p-2 rounded-full bg-white/10 hover:bg-white/20 cursor-pointer transition-colors">
                  <Facebook className="w-4 h-4" />
                </span>
                <span className="p-2 rounded-full bg-white/10 hover:bg-white/20 cursor-pointer transition-colors">
                  <Twitter className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* Col 2: State Collections */}
            <div className="space-y-3">
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#E6B83A] font-bold">
                State Collections
              </p>
              <ul className="space-y-2 text-xs font-serif text-[#FAF7F2]/80">
                {states.map((state) => (
                  <li key={state.slug}>
                    <button
                      onClick={() => {
                        setActiveStateFilter(state.slug);
                        document.getElementById('curated-curved-arc')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="hover:text-[#E6B83A] transition-colors"
                    >
                      {state.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Explore */}
            <div className="space-y-3">
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#E6B83A] font-bold">
                Explore
              </p>
              <ul className="space-y-2 text-xs font-serif text-[#FAF7F2]/80">
                <li><a href="#bridal-scalloped-zone" className="hover:text-[#E6B83A]">Bridal Collection</a></li>
                <li><a href="#autumn-winter-studio" className="hover:text-[#E6B83A]">Autumn–Winter 2026</a></li>
                <li><a href="#video-chapter-stage" className="hover:text-[#E6B83A]">Silks in Motion Film</a></li>
                <li><a href="#fanned-card-journal" className="hover:text-[#E6B83A]">Editorial Journal</a></li>
              </ul>
            </div>

            {/* Col 4: Stay Updated Newsletter */}
            <div className="space-y-3">
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#E6B83A] font-bold">
                Stay updated
              </p>
              <p className="text-xs text-[#FAF7F2]/75 font-light">
                Receive private notices on 2026 limited loom drops and bridal atelier slots.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                {/* Honeypot field for bot suppression */}
                <input
                  type="text"
                  name="website_url"
                  value={botField}
                  onChange={(e) => setBotField(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-white/10 border border-[#FAF7F2]/25 rounded-lg px-3 py-2 text-xs text-[#FAF7F2] placeholder-[#FAF7F2]/40 outline-none focus:border-[#D4AF37]"
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="w-full py-2 rounded-lg bg-[#D4AF37] hover:bg-[#E6B83A] text-[#2B070E] font-sans font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-50"
                >
                  {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            </div>

          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#FAF7F2]/60 gap-4">
            <p>© 2026 DRIFT HAUTE COUTURE SAREES. All Rights Reserved.</p>
            <div className="flex space-x-6 font-serif">
              <span>Authentic Handloom Certified</span>
              <Link href="/privacy" className="hover:text-[#E6B83A] transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>

    </section>
  );
}
