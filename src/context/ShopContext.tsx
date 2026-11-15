'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SareeProduct, StateSlug } from '@/data/collections/types';
import { ALL_SAREES } from '@/data/collections/registry';

export type Currency = 'INR' | 'USD' | 'GBP' | 'EUR' | 'AED';

export interface CartItem {
  saree: SareeProduct;
  quantity: number;
  blouseStitching: boolean;
  fallPico: boolean;
  giftPackaging: boolean;
}

interface ShopContextType {
  cart: CartItem[];
  wishlist: string[]; // saree IDs
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountInInr: number) => string;
  addToCart: (saree: SareeProduct, options?: { blouseStitching?: boolean; fallPico?: boolean; giftPackaging?: boolean }) => void;
  removeFromCart: (sareeId: string) => void;
  updateCartQuantity: (sareeId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotalInInr: number;
  toggleWishlist: (sareeId: string) => void;
  isInWishlist: (sareeId: string) => boolean;
  quickShopSaree: SareeProduct | null;
  setQuickShopSaree: (s: SareeProduct | null) => void;
  selectedRegion: StateSlug | 'all';
  setSelectedRegion: (region: StateSlug | 'all') => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isWishlistDrawerOpen: boolean;
  setIsWishlistDrawerOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CURRENCY_RATES: Record<Currency, { rate: number; symbol: string; prefix: boolean }> = {
  INR: { rate: 1, symbol: '₹', prefix: true },
  USD: { rate: 0.012, symbol: '$', prefix: true },
  GBP: { rate: 0.0094, symbol: '£', prefix: true },
  EUR: { rate: 0.011, symbol: '€', prefix: true },
  AED: { rate: 0.044, symbol: 'AED ', prefix: true },
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [currency, setCurrency] = useState<Currency>('INR');
  const [quickShopSaree, setQuickShopSaree] = useState<SareeProduct | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<StateSlug | 'all'>('all');
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isWishlistDrawerOpen, setIsWishlistDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize from localStorage if client-side
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('drift_cart');
      if (savedCart) setCart(JSON.parse(savedCart));
      const savedWishlist = localStorage.getItem('drift_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Save changes
  useEffect(() => {
    try {
      localStorage.setItem('drift_cart', JSON.stringify(cart));
    } catch {
      // Ignore storage errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('drift_wishlist', JSON.stringify(wishlist));
    } catch {
      // Ignore storage errors
    }
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  const formatPrice = (amountInInr: number): string => {
    const config = CURRENCY_RATES[currency];
    const converted = amountInInr * config.rate;

    if (currency === 'INR') {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(amountInInr);
    }

    return `${config.symbol}${Math.round(converted).toLocaleString()}`;
  };

  const addToCart = (
    saree: SareeProduct,
    options?: { blouseStitching?: boolean; fallPico?: boolean; giftPackaging?: boolean }
  ) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.saree.id === saree.id);
      if (existing) {
        return prev.map((item) =>
          item.saree.id === saree.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          saree,
          quantity: 1,
          blouseStitching: options?.blouseStitching ?? true,
          fallPico: options?.fallPico ?? true,
          giftPackaging: options?.giftPackaging ?? true,
        },
      ];
    });
    showToast(`Added "${saree.name}" to your Royal Trunk`);
  };

  const removeFromCart = (sareeId: string) => {
    setCart((prev) => prev.filter((item) => item.saree.id !== sareeId));
    showToast('Item removed from Royal Trunk');
  };

  const updateCartQuantity = (sareeId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(sareeId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.saree.id === sareeId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  const cartTotalInInr = cart.reduce((acc, curr) => {
    let itemPrice = curr.saree.price;
    if (curr.blouseStitching) itemPrice += 4500;
    if (curr.giftPackaging) itemPrice += 1500;
    return acc + itemPrice * curr.quantity;
  }, 0);

  const toggleWishlist = (sareeId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(sareeId);
      if (exists) {
        showToast('Removed from Heirloom Wishlist');
        return prev.filter((id) => id !== sareeId);
      } else {
        showToast('Saved to Heirloom Wishlist');
        return [...prev, sareeId];
      }
    });
  };

  const isInWishlist = (sareeId: string) => wishlist.includes(sareeId);

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        currency,
        setCurrency,
        formatPrice,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartTotalInInr,
        toggleWishlist,
        isInWishlist,
        quickShopSaree,
        setQuickShopSaree,
        selectedRegion,
        setSelectedRegion,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isWishlistDrawerOpen,
        setIsWishlistDrawerOpen,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
