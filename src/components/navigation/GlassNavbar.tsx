'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { ALL_STATE_METAS, SAREES_BY_REGION } from '@/data/collections/registry';
import { PRIYA_EDITORIAL_MODEL } from '@/data/collections/colorways';
import { StateSlug } from '@/data/collections/types';
import {
  Search,
  Heart,
  ShoppingBag,
  ChevronDown,
  Sparkles,
  Menu,
  X,
} from 'lucide-react';

export default function GlassNavbar() {
  const {
    cartCount,
    wishlist,
    toggleCart,
    setActiveModal,
    setActiveStateFilter,
    activeStateFilter,
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 35);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStateClick = (slug: StateSlug | 'all') => {
    setActiveStateFilter(slug);
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
    document.getElementById('curated-curved-arc')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* 1. Top Announcement Strip */}
      <div className="w-full bg-[#A80F24] text-[#FAF7F2] text-[11px] sm:text-xs font-sans tracking-[0.2em] uppercase py-2 px-4 text-center font-medium flex items-center justify-center gap-2 border-b border-[#D4AF37]/30 z-50 relative">
        <Sparkles className="w-3.5 h-3.5 text-[#E6B83A] animate-pulse" />
        <span>DRIFT REGIONAL ARCHIVE • SIX TRADITIONS • DESIGN STUDIES · DETAILS PENDING VERIFICATION</span>
      </div>

      {/* 2. Sticky Glass Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'glass-header py-3.5 shadow-sm'
            : 'bg-[#FAF7F2]/90 backdrop-blur-md py-4 sm:py-5 border-b border-[#E6DFD5]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between relative">
          
          {/* Left: DRIFT Serif Wordmark */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer group select-none"
          >
            <h1 className="font-serif text-3xl sm:text-4xl tracking-[0.25em] text-[#1A1617] group-hover:text-[#A80F24] transition-colors font-semibold">
              DRIFT
            </h1>
            <p className="font-sans text-[8px] uppercase tracking-[0.45em] text-[#A80F24] font-bold">
              HERITAGE COUTURE
            </p>
          </div>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-sans uppercase tracking-[0.2em] font-medium text-[#1A1617]">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-[#A80F24] transition-colors"
            >
              Home
            </button>

            {/* Interactive Mega-Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <button
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                className="flex items-center gap-1 hover:text-[#A80F24] transition-colors py-2"
              >
                <span>State Collections</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {/* Mega Dropdown Panel */}
              {megaMenuOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[540px] bg-[#FAF7F2] border border-[#E6DFD5] shadow-2xl rounded-2xl p-6 grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  <div className="col-span-2 pb-2 border-b border-[#E6DFD5] flex items-center justify-between">
                    <span className="font-serif text-sm font-semibold text-[#2B070E]">
                      Explore Six Loom Traditions
                    </span>
                    <button
                      onClick={() => handleStateClick('all')}
                      className="text-[10px] text-[#A80F24] font-bold underline hover:text-[#2B070E]"
                    >
                      View All 48 Studies
                    </button>
                  </div>

                  {ALL_STATE_METAS.map((state) => {
                    const count = SAREES_BY_REGION[state.slug]?.length || 8;
                    return (
                      <div
                        key={state.slug}
                        onClick={() => handleStateClick(state.slug)}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F4EFE6] cursor-pointer transition-all border border-transparent hover:border-[#D4AF37]/40 group"
                      >
                        <img
                          src={PRIYA_EDITORIAL_MODEL.images[state.slug]}
                          alt={`Editorial muse Priya in ${state.name} authentic handloom saree`}
                          className="w-12 h-14 object-cover object-top rounded-lg group-hover:scale-105 transition-transform"
                        />
                        <div className="flex-1">
                          <p className="font-serif text-sm font-semibold text-[#1A1617] group-hover:text-[#A80F24]">
                            {state.name.split(' ')[0]}
                          </p>
                          <p className="text-[10px] text-[#A80F24] font-sans">
                            {state.hindiName}
                          </p>
                          <span className="text-[9px] text-[#1A1617]/50 block mt-0.5">
                            {count} Flagship Sarees
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              onClick={() => scrollToSection('bridal-scalloped-zone')}
              className="hover:text-[#A80F24] transition-colors"
            >
              Bridal
            </button>

            <button
              onClick={() => scrollToSection('autumn-winter-studio')}
              className="hover:text-[#A80F24] transition-colors"
            >
              Lookbook Studio
            </button>

            <button
              onClick={() => scrollToSection('fanned-card-journal')}
              className="hover:text-[#A80F24] transition-colors"
            >
              Journal
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4 sm:space-x-6 text-[#1A1617]">
            {/* Search Trigger */}
            <button
              onClick={() => setActiveModal('search')}
              className="hover:text-[#A80F24] transition-colors p-1"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Indicator */}
            <button
              onClick={() => scrollToSection('new-arrivals-grid')}
              className="hover:text-[#A80F24] transition-colors relative p-1"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-[#A80F24] text-[#FAF7F2] text-[9px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Royal Trunk Cart Trigger */}
            <button
              onClick={() => toggleCart(true)}
              className="flex items-center gap-2 hover:text-[#A80F24] transition-colors p-1 group"
              aria-label="Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
                {cartCount() > 0 && (
                  <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-[#D4AF37] text-[#2B070E] text-[9px] font-bold flex items-center justify-center shadow-sm">
                    {cartCount()}
                  </span>
                )}
              </div>
              <span className="text-xs font-sans font-semibold hidden lg:inline tracking-wider">
                Cart ({cartCount()})
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1 text-[#1A1617]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FAF7F2] border-t border-[#E6DFD5] px-6 py-6 space-y-4 animate-in slide-in-from-top-2">
            <p className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#A80F24] font-bold">
              State Traditions
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-serif">
              {ALL_STATE_METAS.map((state) => (
                <button
                  key={state.slug}
                  onClick={() => handleStateClick(state.slug)}
                  className="text-left p-2.5 rounded-lg bg-[#F4EFE6] hover:bg-[#E6DFD5] text-[#1A1617] font-medium"
                >
                  <span>{state.name.split(' ')[0]}</span>
                  <span className="text-[9px] text-[#A80F24] block">{state.hindiName}</span>
                </button>
              ))}
            </div>
            <div className="pt-2 border-t border-[#E6DFD5] space-y-2 text-xs font-sans uppercase tracking-wider">
              <button
                onClick={() => scrollToSection('bridal-scalloped-zone')}
                className="block w-full text-left py-1 text-[#A80F24] font-semibold"
              >
                The Bridal Collection
              </button>
              <button
                onClick={() => scrollToSection('autumn-winter-studio')}
                className="block w-full text-left py-1 text-[#1A1617]"
              >
                Change Look 3D Studio
              </button>
              <button
                onClick={() => scrollToSection('video-chapter-stage')}
                className="block w-full text-left py-1 text-[#1A1617]"
              >
                Woven Silks in Motion
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
