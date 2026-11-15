import { create } from 'zustand';
import { SareeProduct, StateCollection, StateSlug } from '@/data/collections/types';
import { ALL_SAREES, ALL_STATE_METAS } from '@/data/collections/registry';

export interface CartItem {
  product: SareeProduct;
  selectedBlouseSize: string;
  selectedColor: string;
  quantity: number;
}

export interface OrderConfirmation {
  orderId: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  subtotal: number;
  itemsCount: number;
  createdAt: string;
}

export type ModalType = 'none' | 'search' | 'film' | 'quickshop';

interface StoreState {
  // Collections Edge Hydration
  states: StateCollection[];
  sarees: SareeProduct[];
  isHydrating: boolean;
  hasHydratedEdge: boolean;
  fetchEdgeCollections: () => Promise<void>;

  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  lastOrderConfirmation: OrderConfirmation | null;
  setLastOrderConfirmation: (conf: OrderConfirmation | null) => void;
  addToCart: (
    product: SareeProduct,
    selectedBlouseSize?: string,
    selectedColor?: string,
    quantity?: number
  ) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: (open?: boolean) => void;
  cartCount: () => number;
  cartTotal: () => number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  hydrateLocalStorage: () => void;

  // State Filters
  activeStateFilter: StateSlug | 'all';
  setActiveStateFilter: (filter: StateSlug | 'all') => void;

  // Change Look Studio
  activeLookIndex: number;
  setActiveLookIndex: (index: number) => void;

  // Modals
  activeModal: ModalType;
  setActiveModal: (modal: ModalType) => void;
  selectedProductForModal: SareeProduct | null;
  setSelectedProductForModal: (product: SareeProduct | null) => void;

  // Toast
  toastText: string | null;
  triggerToast: (msg: string) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  // Collections Edge Hydration
  states: ALL_STATE_METAS,
  sarees: ALL_SAREES,
  isHydrating: false,
  hasHydratedEdge: false,
  fetchEdgeCollections: async () => {
    try {
      set({ isHydrating: true });
      const res = await fetch('/api/collections');
      if (res.ok) {
        const data: any = await res.json();
        if (Array.isArray(data.states) && Array.isArray(data.sarees) && data.sarees.length > 0) {
          const mergedStates = data.states.map((st: any) => {
            const staticMeta = ALL_STATE_METAS.find((m) => m.slug === st.slug);
            return {
              ...staticMeta,
              ...st,
              keyWeaves: st.keyWeaves?.length ? st.keyWeaves : (staticMeta?.keyWeaves || []),
              hindiName: st.hindiName || staticMeta?.hindiName || '',
              glowColor: st.glowColor || staticMeta?.glowColor || st.accentColor,
            };
          });

          const mergedSarees = data.sarees.map((s: any) => {
            const staticSaree = ALL_SAREES.find((item) => item.id === s.id || item.slug === s.slug);
            return {
              ...staticSaree,
              ...s,
              specs: {
                ...staticSaree?.specs,
                ...s.specs,
                motifs: s.specs?.motifs || staticSaree?.specs?.motifs || ['Geometrical Diamond', 'Paisley Kalka'],
                patternSet: s.specs?.patternSet || staticSaree?.specs?.patternSet,
              },
              images: {
                ...staticSaree?.images,
                ...s.images,
              },
            };
          });

          set({
            states: mergedStates,
            sarees: mergedSarees,
            hasHydratedEdge: true,
          });
        }
      }
    } catch {
      // Offline fallback: keep ALL_STATE_METAS and ALL_SAREES
    } finally {
      set({ isHydrating: false });
    }
  },

  cart: [],
  isCartOpen: false,
  lastOrderConfirmation: null,
  setLastOrderConfirmation: (conf) => set({ lastOrderConfirmation: conf }),

  addToCart: (product, selectedBlouseSize = 'M', selectedColor, quantity = 1) => {
    // Treat design study items with an indicative reservation value if unpriced
    const effectivePrice = product.price > 0 ? product.price : 45000;
    const effectiveProduct: SareeProduct = {
      ...product,
      price: effectivePrice,
      priceDisplay: product.price > 0 ? product.priceDisplay : `₹${effectivePrice.toLocaleString('en-IN')}`,
      isAvailable: true,
    };

    const color = selectedColor || product.color || 'Royal Classic';
    set((state) => {
      const existingIndex = state.cart.findIndex(
        (item) =>
          item.product.id === effectiveProduct.id &&
          item.selectedBlouseSize === selectedBlouseSize &&
          item.selectedColor === color
      );

      let newCart: CartItem[];
      if (existingIndex > -1) {
        newCart = state.cart.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newCart = [
          ...state.cart,
          {
            product: effectiveProduct,
            selectedBlouseSize,
            selectedColor: color,
            quantity,
          },
        ];
      }

      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem('drift_cart_items', JSON.stringify(newCart));
        }
      } catch {
        // Ignore
      }

      return { cart: newCart, isCartOpen: true };
    });

    get().triggerToast(`Added ${product.name} to Royal Trunk`);
  },

  removeFromCart: (productId) => {
    set((state) => {
      const newCart = state.cart.filter((item) => item.product.id !== productId);
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem('drift_cart_items', JSON.stringify(newCart));
        }
      } catch {
        // Ignore
      }
      return { cart: newCart };
    });
    get().triggerToast('Item removed from Royal Trunk');
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }
    set((state) => {
      const newCart = state.cart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem('drift_cart_items', JSON.stringify(newCart));
        }
      } catch {
        // Ignore
      }
      return { cart: newCart };
    });
  },

  clearCart: () => {
    set({ cart: [] });
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('drift_cart_items');
      }
    } catch {
      // Ignore
    }
  },

  toggleCart: (open) => {
    set((state) => ({
      isCartOpen: typeof open === 'boolean' ? open : !state.isCartOpen,
    }));
  },

  cartCount: () => {
    return get().cart.reduce((total, item) => total + item.quantity, 0);
  },

  cartTotal: () => {
    return get().cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  },

  // Wishlist
  wishlist: [],
  toggleWishlist: (productId) => {
    set((state) => {
      const exists = state.wishlist.includes(productId);
      const newWish = exists
        ? state.wishlist.filter((id) => id !== productId)
        : [...state.wishlist, productId];

      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem('drift_wishlist_items', JSON.stringify(newWish));
        }
      } catch {
        // Ignore
      }

      return { wishlist: newWish };
    });

    const isNow = get().wishlist.includes(productId);
    get().triggerToast(isNow ? 'Added to Heirloom Wishlist' : 'Removed from Wishlist');
  },

  isInWishlist: (productId) => {
    return get().wishlist.includes(productId);
  },

  hydrateLocalStorage: () => {
    if (typeof window === 'undefined') return;
    try {
      const savedWishlist = localStorage.getItem('drift_wishlist_items');
      if (savedWishlist) {
        const parsed = JSON.parse(savedWishlist);
        if (Array.isArray(parsed)) {
          set({ wishlist: parsed });
        }
      }
      const savedCart = localStorage.getItem('drift_cart_items');
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          set({ cart: parsed });
        }
      }
    } catch {
      // Ignore corrupted localStorage entries
    }
  },

  // Filters
  activeStateFilter: 'all',
  setActiveStateFilter: (filter) => {
    set({ activeStateFilter: filter });
  },

  // Look Studio
  activeLookIndex: 0,
  setActiveLookIndex: (index) => {
    set({ activeLookIndex: index });
  },

  // Modals
  activeModal: 'none',
  setActiveModal: (modal) => {
    set({ activeModal: modal });
  },
  selectedProductForModal: null,
  setSelectedProductForModal: (product) => {
    set({ selectedProductForModal: product });
  },

  // Toast
  toastText: null,
  triggerToast: (msg) => {
    set({ toastText: msg });
    setTimeout(() => {
      set({ toastText: null });
    }, 3800);
  },
}));

if (typeof window !== 'undefined') {
  // Safe client-side hydration: defer to next tick to preserve SSR markup
  setTimeout(() => {
    useStore.getState().hydrateLocalStorage();
  }, 0);

  // Sync state if localStorage changes in another tab
  window.addEventListener('storage', (e) => {
    if (e.key === 'drift_wishlist_items' || e.key === 'drift_cart_items') {
      useStore.getState().hydrateLocalStorage();
    }
  });
}
