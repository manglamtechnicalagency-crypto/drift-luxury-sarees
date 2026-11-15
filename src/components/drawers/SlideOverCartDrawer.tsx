'use client';

import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import { PRIYA_EDITORIAL_MODEL } from '@/data/collections/colorways';
import {
  X,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  PackageCheck,
  Copy,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  botField?: string;
}

export default function SlideOverCartDrawer() {
  const {
    cart,
    isCartOpen,
    toggleCart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    clearCart,
    triggerToast,
  } = useStore();

  const [drawerMode, setDrawerMode] = useState<'cart' | 'checkout' | 'receipt'>('cart');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedOrder, setCopiedOrder] = useState(false);

  const [form, setForm] = useState<CheckoutForm>({
    name: '',
    email: '',
    phone: '',
    addressLine: '',
    city: '',
    state: '',
    pincode: '',
    botField: '',
  });

  const [confirmedReceipt, setConfirmedReceipt] = useState<{
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    subtotal: number;
    itemsCount: number;
    shippingAddress: CheckoutForm;
    createdAt: string;
  } | null>(null);

  if (!isCartOpen) return null;

  const total = cartTotal();
  const freeShippingThreshold = 50000;
  const progressPercent = Math.min(100, (total / freeShippingThreshold) * 100);

  const handleInputChange = (field: keyof CheckoutForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleProceedToCheckout = () => {
    setErrorMessage(null);
    setDrawerMode('checkout');
  };

  const handleBackToCart = () => {
    setErrorMessage(null);
    setDrawerMode('cart');
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (form.botField) {
      setErrorMessage('Submission rejected.');
      return;
    }

    if (!form.name.trim() || !form.email.trim() || !form.addressLine.trim() || !form.city.trim() || !form.pincode.trim()) {
      setErrorMessage('Please complete all delivery details.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        customerName: form.name.trim(),
        customerEmail: form.email.trim(),
        customerPhone: form.phone.trim() || undefined,
        shippingAddress: {
          addressLine: form.addressLine.trim(),
          city: form.city.trim(),
          state: form.state.trim() || 'India',
          pincode: form.pincode.trim(),
        },
        items: cart.map((item) => ({
          id: item.product.id,
          sku: item.product.slug || item.product.id,
          title: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          selectedBlouseSize: item.selectedBlouseSize,
          selectedColor: item.selectedColor,
        })),
        subtotal: total,
        website_url: form.botField || '',
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data: any = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to place order.');
      }

      // Celebrate success
      try {
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#D4AF37', '#E6B83A', '#A80F24', '#FAF7F2'],
        });
      } catch {
        // Confetti fallback
      }

      setConfirmedReceipt({
        orderNumber: data.orderNumber || `DRIFT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        customerName: form.name.trim(),
        customerEmail: form.email.trim(),
        subtotal: total,
        itemsCount: cart.length,
        shippingAddress: { ...form },
        createdAt: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
      });

      clearCart();
      setDrawerMode('receipt');
      triggerToast(`Order ${data.orderNumber} placed successfully`);
    } catch (err: any) {
      setErrorMessage(err.message || 'Unable to seal order right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyOrderNumber = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedOrder(true);
    setTimeout(() => setCopiedOrder(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#E6DFD5] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-[#E6DFD5] flex items-center justify-between bg-[#F4EFE6]">
            <div className="flex items-center gap-2.5">
              {drawerMode === 'checkout' ? (
                <button
                  onClick={handleBackToCart}
                  className="p-1 -ml-1 text-[#1A1617]/70 hover:text-[#A80F24] transition-colors"
                  aria-label="Back to Royal Trunk"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              ) : (
                <ShoppingBag className="w-5 h-5 text-[#A80F24]" />
              )}
              <h3 className="font-serif text-xl font-bold text-[#1A1617] tracking-wide">
                {drawerMode === 'checkout'
                  ? 'Atelier Checkout'
                  : drawerMode === 'receipt'
                  ? 'Order Receipt'
                  : `Royal Trunk (${cart.length})`}
              </h3>
            </div>
            <button
              onClick={() => toggleCart(false)}
              className="p-1.5 rounded-full text-[#1A1617]/70 hover:text-[#A80F24] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mode 1: Cart View */}
          {drawerMode === 'cart' && (
            <>
              {/* Shipping Progress Bar */}
              <div className="px-6 py-3 bg-[#FAF7F2] border-b border-[#E6DFD5] text-xs font-sans">
                <div className="flex items-center justify-between text-[#1A1617] mb-1.5">
                  <span className="font-medium">
                    {total >= freeShippingThreshold
                      ? 'Complimentary Insured Delivery Unlocked'
                      : `Add ₹${(freeShippingThreshold - total).toLocaleString('en-IN')} for Free Insured Transit`}
                  </span>
                  <span className="font-bold text-[#A80F24]">{Math.round(progressPercent)}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#E6DFD5] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#A80F24] transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length > 0 ? (
                  cart.map((item, idx) => (
                    <div
                      key={`${item.product.id}-${item.selectedBlouseSize}-${idx}`}
                      className="bg-white rounded-2xl p-4 border border-[#E6DFD5] flex gap-4 shadow-sm"
                    >
                      <img
                        src={PRIYA_EDITORIAL_MODEL.images[item.product.region] || item.product.images.primary}
                        alt={`Muse Priya draped in ${item.product.name} in ${item.selectedColor}`}
                        className="w-20 h-24 object-cover object-top rounded-xl flex-shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = item.product.images.fallbackPrimary;
                        }}
                      />

                      <div className="flex-1 flex flex-col justify-between text-left">
                        <div>
                          <span className="text-[9px] uppercase font-sans tracking-widest text-[#A80F24] font-bold block">
                            {item.product.originState}
                          </span>
                          <h4 className="font-serif text-sm font-semibold text-[#1A1617] line-clamp-1">
                            {item.product.name}
                          </h4>
                          <p className="text-xs font-sans text-[#1A1617]/60 mt-0.5">
                            Size: <span className="font-semibold text-[#1A1617]">{item.selectedBlouseSize}</span> • Color: {item.selectedColor.split(' ')[0]}
                          </p>
                          <p className="text-xs font-sans font-bold text-[#1A1617] mt-1">
                            ₹{item.product.price.toLocaleString('en-IN')}
                          </p>
                        </div>

                        {/* Quantity Stepper & Remove */}
                        <div className="flex items-center justify-between pt-2 border-t border-[#E6DFD5]/60">
                          <div className="flex items-center border border-[#E6DFD5] rounded-md px-2 py-0.5 text-xs text-[#1A1617]">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="hover:text-[#A80F24] px-1"
                            >
                              -
                            </button>
                            <span className="w-6 text-center font-bold text-xs">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="hover:text-[#A80F24] px-1"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-[#1A1617]/50 hover:text-[#A80F24] p-1"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-24 space-y-3">
                    <ShoppingBag className="w-12 h-12 text-[#1A1617]/25 mx-auto" />
                    <p className="font-serif text-base text-[#1A1617]/70">
                      Your Royal Trunk is currently empty.
                    </p>
                    <button
                      onClick={() => toggleCart(false)}
                      className="text-xs font-sans font-bold text-[#A80F24] underline hover:text-[#7A0A19]"
                    >
                      Explore Regional Archives
                    </button>
                  </div>
                )}
              </div>

              {/* Subtotal & Action */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-[#E6DFD5] bg-[#F4EFE6] space-y-4">
                  <div className="flex items-center justify-between text-base font-serif font-bold text-[#1A1617]">
                    <span>Trunk Subtotal:</span>
                    <span className="text-lg font-sans font-extrabold text-[#A80F24]">
                      ₹{total.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#1A1617]/60 font-sans text-left">
                    Includes insured delivery, authenticity provenance documentation, and bespoke blouse sizing coordination.
                  </p>

                  <button
                    onClick={handleProceedToCheckout}
                    className="w-full py-3.5 rounded-full bg-[#A80F24] hover:bg-[#7A0A19] text-[#FAF7F2] font-sans font-bold text-xs uppercase tracking-[0.2em] shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <span>Proceed to 1-Step Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}

          {/* Mode 2: 1-Step Checkout Form */}
          {drawerMode === 'checkout' && (
            <form onSubmit={handleSubmitOrder} className="flex-1 flex flex-col justify-between overflow-y-auto">
              <div className="p-6 space-y-4 text-left">
                <div className="border-b border-[#E6DFD5] pb-3">
                  <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#A80F24] font-bold block">
                    1-STEP ATELIER RESERVATION
                  </span>
                  <p className="font-serif text-sm text-[#1A1617]/75 mt-0.5">
                    Order confirmation &amp; concierge dispatch details.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-sans">
                    {errorMessage}
                  </div>
                )}

                {/* Honeypot field for bot suppression */}
                <input
                  type="text"
                  name="website_url"
                  value={form.botField || ''}
                  onChange={(e) => handleInputChange('botField', e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                {/* Full Name */}
                <div>
                  <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#1A1617]/80 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Maharani Gayatri Devi"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6DFD5] bg-white text-xs text-[#1A1617] outline-none focus:border-[#A80F24] focus:ring-1 focus:ring-[#A80F24]"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#1A1617]/80 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="atelier@sovereign-textiles.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6DFD5] bg-white text-xs text-[#1A1617] outline-none focus:border-[#A80F24] focus:ring-1 focus:ring-[#A80F24]"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#1A1617]/80 mb-1">
                    Phone (for Insured Delivery Concierge)
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6DFD5] bg-white text-xs text-[#1A1617] outline-none focus:border-[#A80F24] focus:ring-1 focus:ring-[#A80F24]"
                  />
                </div>

                {/* Address Line */}
                <div>
                  <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#1A1617]/80 mb-1">
                    Delivery Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.addressLine}
                    onChange={(e) => handleInputChange('addressLine', e.target.value)}
                    placeholder="Royal Residence, Nariman Point"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6DFD5] bg-white text-xs text-[#1A1617] outline-none focus:border-[#A80F24] focus:ring-1 focus:ring-[#A80F24]"
                  />
                </div>

                {/* City & State */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#1A1617]/80 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="Mumbai"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6DFD5] bg-white text-xs text-[#1A1617] outline-none focus:border-[#A80F24] focus:ring-1 focus:ring-[#A80F24]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#1A1617]/80 mb-1">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.pincode}
                      onChange={(e) => handleInputChange('pincode', e.target.value)}
                      placeholder="400021"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6DFD5] bg-white text-xs text-[#1A1617] outline-none focus:border-[#A80F24] focus:ring-1 focus:ring-[#A80F24]"
                    />
                  </div>
                </div>

                {/* Trust badge */}
                <div className="pt-2 flex items-center gap-2 text-[11px] text-[#1A1617]/60 font-sans">
                  <ShieldCheck className="w-4 h-4 text-[#A80F24]" />
                  <span>Insured edge dispatch backed by Cloudflare D1 atomic order logs.</span>
                </div>
              </div>

              {/* Bottom Submit Row */}
              <div className="p-6 border-t border-[#E6DFD5] bg-[#F4EFE6] space-y-3">
                <div className="flex items-center justify-between text-xs font-sans text-[#1A1617]">
                  <span>Total Amount Payable:</span>
                  <span className="font-bold text-sm text-[#A80F24]">₹{total.toLocaleString('en-IN')}</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full bg-[#A80F24] hover:bg-[#7A0A19] text-[#FAF7F2] font-sans font-bold text-xs uppercase tracking-[0.2em] shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95"
                >
                  {isSubmitting ? (
                    <span>Sealing Order on Edge...</span>
                  ) : (
                    <>
                      <span>Authorize Order (₹{total.toLocaleString('en-IN')})</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Mode 3: Editorial DRIFT Order Receipt Card */}
          {drawerMode === 'receipt' && confirmedReceipt && (
            <div className="flex-1 flex flex-col justify-between overflow-y-auto p-6 space-y-6">
              
              {/* Receipt Header Card */}
              <div className="bg-[#2B070E] text-[#FAF7F2] rounded-3xl p-6 border border-[#D4AF37]/50 shadow-xl space-y-4 text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#E6B83A] font-bold">
                    DRIFT OFFICIAL RECEIPT
                  </span>
                  <PackageCheck className="w-5 h-5 text-[#E6B83A]" />
                </div>

                <div>
                  <p className="text-[11px] text-[#FAF7F2]/60 font-sans">Order Identifier</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-serif text-2xl font-bold tracking-tight text-[#FAF7F2]">
                      {confirmedReceipt.orderNumber}
                    </span>
                    <button
                      onClick={() => handleCopyOrderNumber(confirmedReceipt.orderNumber)}
                      className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-[#E6B83A] transition-colors"
                      title="Copy order number"
                    >
                      {copiedOrder ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/15 text-xs font-sans">
                  <div>
                    <span className="text-[10px] text-[#FAF7F2]/60 block">Status</span>
                    <span className="font-semibold text-green-400">CONFIRMED (D1)</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#FAF7F2]/60 block">Date</span>
                    <span className="font-semibold text-[#FAF7F2]">{confirmedReceipt.createdAt}</span>
                  </div>
                </div>
              </div>

              {/* Order Manifest Summary */}
              <div className="bg-white rounded-2xl p-5 border border-[#E6DFD5] space-y-3 text-left">
                <h4 className="font-serif text-sm font-bold text-[#1A1617] border-b border-[#E6DFD5] pb-2">
                  Delivery Destination
                </h4>
                <div className="text-xs font-sans text-[#1A1617]/80 space-y-1">
                  <p className="font-semibold text-[#1A1617]">{confirmedReceipt.customerName}</p>
                  <p>{confirmedReceipt.customerEmail}</p>
                  <p>{confirmedReceipt.shippingAddress.addressLine}</p>
                  <p>
                    {confirmedReceipt.shippingAddress.city}, {confirmedReceipt.shippingAddress.state} -{' '}
                    {confirmedReceipt.shippingAddress.pincode}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E6DFD5] flex items-center justify-between text-xs font-sans">
                  <span className="text-[#1A1617]/70">Total Handloom Allocation:</span>
                  <span className="font-bold text-[#A80F24] text-sm">
                    ₹{confirmedReceipt.subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setDrawerMode('cart');
                    toggleCart(false);
                  }}
                  className="w-full py-3.5 rounded-full bg-[#A80F24] hover:bg-[#7A0A19] text-[#FAF7F2] font-sans font-bold text-xs uppercase tracking-[0.2em] shadow-lg transition-all"
                >
                  Return to Textile Archive
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
