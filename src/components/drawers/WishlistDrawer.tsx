'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import { getSareeById } from '@/data/collections/registry';
import { getSareeModelImage } from '@/data/collections/colorways';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export default function WishlistDrawer() {
  const {
    wishlist,
    isWishlistDrawerOpen,
    setIsWishlistDrawerOpen,
    toggleWishlist,
    addToCart,
    formatPrice,
    setQuickShopSaree,
  } = useShop();

  if (!isWishlistDrawerOpen) return null;

  const wishlistSarees = wishlist
    .map((id) => getSareeById(id))
    .filter((s) => !!s);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-drift-card border-l border-drift-gold/30 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-drift-border flex items-center justify-between">
            <div className="flex items-center gap-2 text-drift-crimson">
              <Heart className="w-5 h-5 fill-drift-crimson text-drift-crimson" />
              <h2 className="font-serif text-lg font-bold tracking-wider text-white">
                Heirloom Wishlist
              </h2>
            </div>
            <button
              onClick={() => setIsWishlistDrawerOpen(false)}
              className="p-1.5 rounded-full text-drift-sand hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistSarees.length > 0 ? (
              wishlistSarees.map((saree) => {
                if (!saree) return null;
                return (
                  <div
                    key={saree.id}
                    className="bg-drift-dark/80 rounded-xl p-3.5 border border-drift-border flex gap-3.5"
                  >
                    <img
                      src={getSareeModelImage(saree)}
                      alt={`Illustrative model reference for ${saree.name}`}
                      onClick={() => {
                        setQuickShopSaree(saree);
                        setIsWishlistDrawerOpen(false);
                      }}
                      className="w-20 h-24 object-cover rounded-lg flex-shrink-0 cursor-pointer"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-[10px] text-drift-gold font-serif uppercase">
                          {saree.originState}
                        </p>
                        <h4
                          onClick={() => {
                            setQuickShopSaree(saree);
                            setIsWishlistDrawerOpen(false);
                          }}
                          className="font-serif text-sm text-white font-medium hover:text-drift-gold cursor-pointer line-clamp-1"
                        >
                          {saree.name}
                        </h4>
                        <p className="text-xs font-serif text-drift-gold font-bold mt-0.5">
                          {formatPrice(saree.price)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <button
                          onClick={() => {
                            addToCart(saree);
                            toggleWishlist(saree.id);
                          }}
                          className="px-3 py-1 rounded bg-drift-gold text-drift-dark font-serif text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 hover:brightness-110"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Move to Trunk</span>
                        </button>

                        <button
                          onClick={() => toggleWishlist(saree.id)}
                          className="text-drift-sand/50 hover:text-drift-crimson p-1"
                          title="Remove from Wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-16 space-y-3">
                <Heart className="w-12 h-12 text-drift-sand/30 mx-auto" />
                <p className="font-serif text-sm text-drift-sand/70">
                  You have not saved any heirloom sarees yet.
                </p>
                <button
                  onClick={() => setIsWishlistDrawerOpen(false)}
                  className="text-xs font-serif text-drift-gold underline hover:text-drift-gold-light"
                >
                  Discover Masterpieces
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
