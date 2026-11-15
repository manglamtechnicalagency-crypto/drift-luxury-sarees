'use client';

import React, { useState, useEffect } from 'react';
import { useShop, Currency } from '@/context/ShopContext';
import { StateSlug } from '@/data/collections/types';
import { ALL_STATE_METAS, ALL_SAREES } from '@/data/collections/registry';
import {
  ShoppingBag,
  Heart,
  Search,
  Volume2,
  VolumeX,
  Menu,
  X,
  Sparkles,
  ChevronDown,
} from 'lucide-react';

export default function Header() {
  const {
    cartCount,
    wishlist,
    currency,
    setCurrency,
    setIsCartDrawerOpen,
    setIsWishlistDrawerOpen,
    selectedRegion,
    setSelectedRegion,
    setQuickShopSaree,
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  // Scroll detection for backdrop styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Web Audio royal ambient sitar/tanpura harmonic generator
  const toggleAmbientSound = () => {
    if (!isPlayingMusic) {
      try {
        const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        
        // Root Sa note (C#3 ~ 138.59 Hz) and Pa (G#3 ~ 207.65 Hz)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const osc3 = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(138.59, ctx.currentTime); // C#3

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(207.65, ctx.currentTime); // G#3 (Pa)

        osc3.type = 'sine';
        osc3.frequency.setValueAtTime(277.18, ctx.currentTime); // C#4 (Octave)

        gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.045, ctx.currentTime + 3);

        osc1.connect(gainNode);
        osc2.connect(gainNode);
        osc3.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc1.start();
        osc2.start();
        osc3.start();

        setAudioCtx(ctx);
        setIsPlayingMusic(true);
      } catch (e) {
        console.warn('Audio not allowed', e);
      }
    } else {
      if (audioCtx) {
        audioCtx.close();
        setAudioCtx(null);
      }
      setIsPlayingMusic(false);
    }
  };

  // Search results
  const searchResults = searchQuery.trim()
    ? ALL_SAREES.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.craft.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.originState.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <>
      {/* Top Banner: Silk Mark Certified & Heritage Atelier */}
      <div className="w-full bg-gradient-to-r from-drift-dark via-drift-crimson-deep to-drift-dark border-b border-drift-gold/20 text-xs py-1.5 px-4 text-center tracking-widest text-drift-sand/90 flex items-center justify-center gap-3">
        <Sparkles className="w-3.5 h-3.5 text-drift-gold animate-pulse" />
        <span>
          DRIFT 2026 ROYAL HAUTE COUTURE EDIT • 100% PURE MULBERRY SILK MARK &amp; REAL GOLD ZARI
        </span>
        <span className="hidden md:inline">• CONCIERGE GLOBAL ATELIER DELIVERY</span>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-drift-dark/90 backdrop-blur-md border-b border-drift-gold/25 py-3 shadow-gold-subtle'
            : 'bg-gradient-to-b from-drift-dark/95 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-drift-sand hover:text-drift-gold"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Regional Collections Dropdown & Quick Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-6 text-xs uppercase tracking-widest font-serif">
            <button
              onClick={() => {
                setSelectedRegion('all');
                document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`transition-colors py-1 relative ${
                selectedRegion === 'all'
                  ? 'text-drift-gold font-semibold'
                  : 'text-drift-sand/80 hover:text-drift-gold-light'
              }`}
            >
              All Traditions
              {selectedRegion === 'all' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-drift-gold shadow-gold-glow" />
              )}
            </button>

            {ALL_STATE_METAS.map((state) => (
              <button
                key={state.slug}
                onClick={() => {
                  setSelectedRegion(state.slug);
                  document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`transition-colors py-1 relative ${
                  selectedRegion === state.slug
                    ? 'text-drift-gold font-semibold'
                    : 'text-drift-sand/80 hover:text-drift-gold-light'
                }`}
              >
                {state.name.split(' ')[0]}
                {selectedRegion === state.slug && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-drift-gold shadow-gold-glow" />
                )}
              </button>
            ))}
          </nav>

          {/* DRIFT Luxury Logo Centerpiece */}
          <div className="text-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl tracking-[0.25em] gold-gradient-text font-bold">
              DRIFT
            </h1>
            <p className="text-[9px] uppercase tracking-[0.45em] text-drift-sand/70 font-sans mt-0.5">
              HAUTE COUTURE SAREES
            </p>
          </div>

          {/* Right Action Icons & Utility */}
          <div className="flex items-center space-x-4 sm:space-x-5">
            {/* Ambient Soundscape Toggle */}
            <button
              onClick={toggleAmbientSound}
              title={isPlayingMusic ? 'Mute Royal Ambient Sitar' : 'Play Royal Ambient Sitar'}
              className="p-2 text-drift-sand/80 hover:text-drift-gold transition-colors hidden sm:block border border-drift-gold/20 rounded-full"
            >
              {isPlayingMusic ? (
                <Volume2 className="w-4 h-4 text-drift-gold animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            {/* Currency Switcher */}
            <div className="relative group">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="bg-transparent text-xs font-serif text-drift-gold border border-drift-gold/30 rounded-md px-2 py-1 outline-none cursor-pointer hover:border-drift-gold transition-colors"
              >
                <option value="INR" className="bg-drift-card text-white">INR (₹)</option>
                <option value="USD" className="bg-drift-card text-white">USD ($)</option>
                <option value="GBP" className="bg-drift-card text-white">GBP (£)</option>
                <option value="EUR" className="bg-drift-card text-white">EUR (€)</option>
                <option value="AED" className="bg-drift-card text-white">AED (د.إ)</option>
              </select>
            </div>

            {/* Live Search Icon */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-drift-sand/85 hover:text-drift-gold transition-colors"
              aria-label="Search Saree Archive"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistDrawerOpen(true)}
              className="p-2 text-drift-sand/85 hover:text-drift-crimson relative transition-colors"
              aria-label="View Heirloom Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-drift-crimson text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Royal Trunk (Cart) Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="p-2 text-drift-sand/85 hover:text-drift-gold relative transition-colors flex items-center gap-1.5"
              aria-label="View Royal Trunk"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-drift-gold" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-drift-gold text-drift-dark text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-gold-glow">
                    {cartCount}
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-drift-dark/95 border-b border-drift-gold/30 px-6 py-5 space-y-4">
            <p className="text-xs tracking-widest text-drift-gold font-serif uppercase">
              Curated Regional Traditions
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <button
                onClick={() => {
                  setSelectedRegion('all');
                  setMobileMenuOpen(false);
                  document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`text-left p-2 rounded border ${
                  selectedRegion === 'all'
                    ? 'border-drift-gold bg-drift-gold/10 text-drift-gold'
                    : 'border-drift-border text-drift-sand/80'
                }`}
              >
                All 6 Traditions (48 Sarees)
              </button>
              {ALL_STATE_METAS.map((s) => (
                <button
                  key={s.slug}
                  onClick={() => {
                    setSelectedRegion(s.slug);
                    setMobileMenuOpen(false);
                    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`text-left p-2 rounded border ${
                    selectedRegion === s.slug
                      ? 'border-drift-gold bg-drift-gold/10 text-drift-gold'
                      : 'border-drift-border text-drift-sand/80'
                  }`}
                >
                  <span className="block font-medium">{s.name}</span>
                  <span className="text-[10px] text-drift-sand/50">{s.hindiName}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="bg-drift-card border border-drift-gold/40 rounded-xl w-full max-w-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-4 right-4 text-drift-sand/70 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-lg text-drift-gold mb-3">
              Search DRIFT Royal Handloom Archives
            </h3>
            <div className="relative">
              <Search className="w-5 h-5 text-drift-sand/50 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by craft (Patola, Zari, Kadwa), state, fabric, or color..."
                className="w-full bg-drift-dark border border-drift-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-drift-sand/40 outline-none focus:border-drift-gold"
                autoFocus
              />
            </div>

            {/* Results */}
            <div className="mt-4 space-y-2 max-h-80 overflow-y-auto">
              {searchResults.length > 0 ? (
                searchResults.map((saree) => (
                  <div
                    key={saree.id}
                    onClick={() => {
                      setQuickShopSaree(saree);
                      setSearchOpen(false);
                    }}
                    className="flex items-center gap-3 p-2 rounded hover:bg-white/5 cursor-pointer transition-colors border border-transparent hover:border-drift-gold/30"
                  >
                    <img
                      src={saree.images.primary}
                      alt={`${saree.name} saree preview`}
                      className="w-12 h-14 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-serif text-white">{saree.name}</p>
                      <p className="text-xs text-drift-sand/60">{saree.craft} • {saree.originState}</p>
                    </div>
                    <p className="text-sm font-serif text-drift-gold">{saree.priceDisplay}</p>
                  </div>
                ))
              ) : searchQuery.trim() ? (
                <p className="text-xs text-drift-sand/50 text-center py-4">
                  No museum pieces match &quot;{searchQuery}&quot;
                </p>
              ) : (
                <div className="text-xs text-drift-sand/60 pt-2 flex flex-wrap gap-2">
                  <span>Popular:</span>
                  <button onClick={() => setSearchQuery('Patola')} className="text-drift-gold underline">Patola</button>
                  <button onClick={() => setSearchQuery('Shikargah')} className="text-drift-gold underline">Shikargah</button>
                  <button onClick={() => setSearchQuery('Korvai')} className="text-drift-gold underline">Korvai</button>
                  <button onClick={() => setSearchQuery('Bandhani')} className="text-drift-gold underline">Bandhani</button>
                  <button onClick={() => setSearchQuery('Muga')} className="text-drift-gold underline">Muga Silk</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
