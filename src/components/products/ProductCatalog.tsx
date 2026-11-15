'use client';

import React, { useState, useMemo } from 'react';
import { ALL_SAREES, ALL_STATE_METAS } from '@/data/collections/registry';
import { SareeProduct, StateSlug } from '@/data/collections/types';
import { useShop } from '@/context/ShopContext';
import {
  Heart,
  Eye,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Check,
  Star,
  Clock,
} from 'lucide-react';

export default function ProductCatalog() {
  const {
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickShopSaree,
    selectedRegion,
    setSelectedRegion,
  } = useShop();

  const [sortOption, setSortOption] = useState<'trending' | 'price-desc' | 'price-asc' | 'weave-time'>('trending');
  const [selectedCraft, setSelectedCraft] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number>(300000);
  const [onlyBridal, setOnlyBridal] = useState<boolean>(false);

  // Extract unique crafts for filter
  const allCrafts = useMemo(() => {
    const crafts = new Set<string>();
    ALL_SAREES.forEach((s) => {
      // Shorten craft name for chip display
      const shortCraft = s.craft.split(' ')[0];
      crafts.add(shortCraft);
    });
    return Array.from(crafts);
  }, []);

  // Filtered & Sorted Sarees
  const filteredSarees = useMemo(() => {
    let list = ALL_SAREES.filter((saree) => {
      if (selectedRegion !== 'all' && saree.region !== selectedRegion) return false;
      if (selectedCraft !== 'all' && !saree.craft.includes(selectedCraft)) return false;
      if (saree.price > priceRange) return false;
      if (onlyBridal && !saree.trendingBadge?.toLowerCase().includes('bridal')) return false;
      return true;
    });

    switch (sortOption) {
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'weave-time':
        return list.sort((a, b) => {
          const daysA = parseInt(a.weaveTime) || 50;
          const daysB = parseInt(b.weaveTime) || 50;
          return daysB - daysA;
        });
      case 'trending':
      default:
        return list.sort((a, b) => b.rating - a.rating || b.price - a.price);
    }
  }, [selectedRegion, selectedCraft, priceRange, onlyBridal, sortOption]);

  return (
    <section id="catalog-section" className="py-20 bg-drift-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-drift-gold/20 pb-8 mb-10 gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-serif tracking-[0.25em] gold-gradient-text">
              The Sovereign Collection 2026
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-white">
              Curated Handloom Sarees
            </h2>
            <p className="text-sm text-drift-sand/70 font-light">
              Displaying {filteredSarees.length} of 48 Sovereign Heirloom Pieces
            </p>
          </div>

          {/* Sorter Dropdown */}
          <div className="flex items-center gap-3">
            <label className="text-xs font-serif uppercase tracking-wider text-drift-sand/60">
              Sort By:
            </label>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as typeof sortOption)}
              className="bg-drift-card border border-drift-gold/30 rounded-lg px-3 py-2 text-xs font-serif text-drift-gold outline-none cursor-pointer hover:border-drift-gold"
            >
              <option value="trending">Trending 2026 Sovereign</option>
              <option value="price-desc">Price: Sovereign High to Low</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="weave-time">Longest Artisan Weave Days</option>
            </select>
          </div>
        </div>

        {/* Filter Bars & Regional Switcher */}
        <div className="space-y-6 mb-12">
          {/* Regional Traditional Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedRegion('all')}
              className={`px-4 py-2 rounded-full text-xs font-serif tracking-wider whitespace-nowrap transition-all ${
                selectedRegion === 'all'
                  ? 'bg-drift-gold text-drift-dark font-bold shadow-gold-subtle'
                  : 'bg-drift-card/70 border border-drift-border text-drift-sand/80 hover:border-drift-gold/40'
              }`}
            >
              All Regions (48)
            </button>
            {ALL_STATE_METAS.map((state) => {
              const isSelected = selectedRegion === state.slug;
              return (
                <button
                  key={state.slug}
                  onClick={() => setSelectedRegion(state.slug)}
                  className={`px-4 py-2 rounded-full text-xs font-serif tracking-wider whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-drift-gold text-drift-dark font-bold shadow-gold-subtle'
                      : 'bg-drift-card/70 border border-drift-border text-drift-sand/80 hover:border-drift-gold/40'
                  }`}
                >
                  {state.name}
                </button>
              );
            })}
          </div>

          {/* Sub-Filters: Craft Chips & Bridal Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-drift-card/40 border border-drift-border">
            {/* Craft Chips */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-drift-sand/60 font-serif mr-1">Craft:</span>
              <button
                onClick={() => setSelectedCraft('all')}
                className={`text-[11px] px-3 py-1 rounded-md font-serif transition-colors ${
                  selectedCraft === 'all'
                    ? 'bg-white/20 text-white font-semibold'
                    : 'text-drift-sand/70 hover:text-white'
                }`}
              >
                All Crafts
              </button>
              {allCrafts.map((craft) => (
                <button
                  key={craft}
                  onClick={() => setSelectedCraft(craft)}
                  className={`text-[11px] px-3 py-1 rounded-md font-serif transition-colors ${
                    selectedCraft === craft
                      ? 'bg-drift-crimson text-white font-semibold'
                      : 'text-drift-sand/70 hover:text-white'
                  }`}
                >
                  {craft}
                </button>
              ))}
            </div>

            {/* Bridal Only Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setOnlyBridal(!onlyBridal)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-serif transition-all ${
                  onlyBridal
                    ? 'border-drift-crimson bg-drift-crimson/20 text-drift-gold-light'
                    : 'border-drift-border text-drift-sand/70 hover:border-drift-gold/40'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-drift-gold" />
                <span>2026 Bridal Edits Only</span>
              </button>
            </div>
          </div>
        </div>

        {/* Product Cards Grid (3 Cols on Desktop, 2 on Tablet, 1 on Mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredSarees.map((saree) => {
            const inWish = isInWishlist(saree.id);
            return (
              <div
                key={saree.id}
                className="group relative bg-drift-card/85 rounded-2xl overflow-hidden border border-drift-border hover:border-drift-gold/45 transition-all duration-500 shadow-xl flex flex-col justify-between"
              >
                {/* Image Container with Dual Image Hover Flip */}
                <div className="relative aspect-[3/4] overflow-hidden bg-black/40 cursor-pointer">
                  {/* Primary Image */}
                  <img
                    src={saree.images.primary}
                    alt={`${saree.name} full drape study`}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = saree.images.fallbackPrimary;
                    }}
                  />
                  {/* Detail Zoom Image on Hover */}
                  <img
                    src={saree.images.detail}
                    alt={`Weave structure and motif detail of ${saree.name}`}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = saree.images.fallbackDetail;
                    }}
                  />

                  {/* Gradient Shadow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-drift-dark via-transparent to-transparent opacity-80" />

                  {/* Badges Overlay */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    {saree.trendingBadge && (
                      <span className="px-2.5 py-1 rounded-full text-[9px] uppercase font-serif tracking-wider bg-drift-dark/85 backdrop-blur-md border border-drift-gold/30 text-drift-gold-light">
                        {saree.trendingBadge}
                      </span>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(saree.id);
                      }}
                      className="pointer-events-auto p-2 rounded-full bg-drift-dark/70 backdrop-blur-md text-drift-sand hover:text-drift-crimson transition-colors"
                      aria-label="Save to Wishlist"
                    >
                      <Heart
                        className={`w-4 h-4 transition-transform active:scale-125 ${
                          inWish ? 'fill-drift-crimson text-drift-crimson' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Weave Time Badge at bottom of image */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-[10px] text-drift-sand/90 bg-drift-dark/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-drift-gold/20 font-serif">
                    <Clock className="w-3 h-3 text-drift-gold" />
                    <span>{saree.weaveTime}</span>
                  </div>

                  {/* Floating Action Overlay on Hover */}
                  <div className="absolute inset-x-3 bottom-12 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => setQuickShopSaree(saree)}
                      className="flex-1 py-2.5 rounded-xl bg-drift-dark/95 backdrop-blur-md border border-drift-gold/40 text-drift-gold text-xs font-serif hover:bg-drift-gold hover:text-drift-dark transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>

                {/* Saree Info & Price */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-drift-sand/60 font-serif uppercase tracking-wider mb-1">
                      <span>{saree.originState}</span>
                      <div className="flex items-center gap-1 text-drift-gold">
                        <Star className="w-3 h-3 fill-drift-gold" />
                        <span>{saree.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    <h3
                      onClick={() => setQuickShopSaree(saree)}
                      className="font-serif text-base text-white font-medium hover:text-drift-gold transition-colors cursor-pointer line-clamp-1"
                    >
                      {saree.name}
                    </h3>
                    <p className="text-xs text-drift-sand/70 font-light line-clamp-1 mt-0.5">
                      {saree.craft}
                    </p>
                  </div>

                  {/* Color Swatch Dots & Price */}
                  <div className="pt-2 border-t border-drift-border flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {saree.palette.slice(0, 3).map((col, idx) => (
                        <span
                          key={idx}
                          className="w-3 h-3 rounded-full border border-black/40"
                          style={{ backgroundColor: col }}
                          title={saree.color}
                        />
                      ))}
                    </div>

                    <div className="text-right">
                      <span className="font-serif text-sm sm:text-base font-bold text-drift-gold">
                        {formatPrice(saree.price)}
                      </span>
                    </div>
                  </div>

                  {/* Direct Add to Royal Trunk Button */}
                  <button
                    onClick={() => addToCart(saree)}
                    className="w-full py-2.5 rounded-xl bg-drift-card hover:bg-drift-gold border border-drift-gold/30 hover:border-drift-gold text-drift-sand hover:text-drift-dark text-xs font-serif font-semibold tracking-wider transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Royal Trunk</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
