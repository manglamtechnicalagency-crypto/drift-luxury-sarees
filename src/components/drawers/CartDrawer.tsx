'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import confetti from 'canvas-confetti';
import {
  X,
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle,
} from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    removeFromCart,
    updateCartQuantity,
    cartTotalInInr,
    formatPrice,
    clearCart,
  } = useShop();

  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [giftNote, setGiftNote] = useState('');

  if (!isCartDrawerOpen) return null;

  const handleCheckout = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#D4AF37', '#F5E6A3', '#800020', '#FFFFFF'],
      });
    } catch {
      // Confetti fallback
    }
    setCheckoutComplete(true);
    setTimeout(() => {
      clearCart();
      setCheckoutComplete(false);
      setIsCartDrawerOpen(false);
    }, 3500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-drift-card border-l border-drift-gold/30 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-drift-border flex items-center justify-between">
            <div className="flex items-center gap-2 text-drift-gold">
              <ShoppingBag className="w-5 h-5" />
              <h2 className="font-serif text-lg font-bold tracking-wider text-white">
                Your Royal Trunk
              </h2>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 rounded-full text-drift-sand hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {checkoutComplete ? (
              <div className="text-center py-16 space-y-4">
                <CheckCircle className="w-16 h-16 text-drift-gold mx-auto animate-bounce" />
                <h3 className="font-serif text-2xl text-white">Imperial Order Confirmed</h3>
                <p className="text-xs text-drift-sand/80 font-light max-w-xs mx-auto">
                  Your private concierge has reserved your museum-grade sarees. An artisan certificate of provenance is being drafted for delivery.
                </p>
              </div>
            ) : cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item.saree.id}
                  className="bg-drift-dark/80 rounded-xl p-3.5 border border-drift-border/70 flex gap-3.5 relative"
                >
                  <img
                    src={item.saree.images.primary}
                    alt={`${item.saree.name} in cart`}
                    className="w-20 h-24 object-cover rounded-lg flex-shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = item.saree.images.fallbackPrimary;
                    }}
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] text-drift-gold font-serif uppercase">
                        {item.saree.originState}
                      </p>
                      <h4 className="font-serif text-sm text-white font-medium line-clamp-1">
                        {item.saree.name}
                      </h4>
                      <p className="text-xs font-serif text-drift-gold font-bold mt-0.5">
                        {formatPrice(item.saree.price)}
                      </p>
                    </div>

                    {/* Inclusions Chips */}
                    <div className="flex flex-wrap gap-1 text-[9px] text-drift-sand/60 font-serif pt-1">
                      {item.blouseStitching && <span>• Tailored Blouse</span>}
                      {item.giftPackaging && <span>• Cedar Trunk</span>}
                    </div>

                    {/* Quantity & Delete */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2 border border-drift-border rounded px-2 py-0.5 text-xs text-drift-sand font-serif">
                        <button
                          onClick={() => updateCartQuantity(item.saree.id, item.quantity - 1)}
                          className="hover:text-white"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.saree.id, item.quantity + 1)}
                          className="hover:text-white"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.saree.id)}
                        className="text-drift-sand/50 hover:text-drift-crimson transition-colors p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-12 h-12 text-drift-sand/30 mx-auto" />
                <p className="font-serif text-sm text-drift-sand/70">
                  Your Royal Trunk is currently empty.
                </p>
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="text-xs font-serif text-drift-gold underline hover:text-drift-gold-light"
                >
                  Explore Sovereign Sarees
                </button>
              </div>
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && !checkoutComplete && (
            <div className="p-6 border-t border-drift-border bg-drift-dark/95 space-y-4">
              {/* Complimentary Gift Message */}
              <div className="space-y-1">
                <label className="text-[11px] font-serif uppercase tracking-wider text-drift-sand/70">
                  Complimentary Calligraphy Inscription Note:
                </label>
                <input
                  type="text"
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  placeholder="e.g. For our auspicious wedding celebration..."
                  className="w-full bg-drift-card border border-drift-border rounded-lg px-3 py-1.5 text-xs text-white placeholder-drift-sand/40 outline-none focus:border-drift-gold"
                />
              </div>

              {/* Total Summary */}
              <div className="space-y-1 pt-2 border-t border-drift-border">
                <div className="flex items-center justify-between text-xs text-drift-sand/70 font-serif">
                  <span>Insured Global Courier:</span>
                  <span className="text-emerald-400 font-bold uppercase">Complimentary</span>
                </div>
                <div className="flex items-center justify-between text-base font-serif font-bold text-white pt-1">
                  <span>Trunk Total:</span>
                  <span className="text-drift-gold text-lg">{formatPrice(cartTotalInInr)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-drift-gold via-drift-gold-light to-drift-gold text-drift-dark font-serif font-bold text-xs uppercase tracking-widest shadow-gold-glow hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Proceed to Sovereign Concierge</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
