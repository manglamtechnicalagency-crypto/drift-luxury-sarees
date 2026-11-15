'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function ToastNotification() {
  const { toastMessage } = useShop();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300 pointer-events-none">
      <div className="bg-drift-card/95 backdrop-blur-md border border-drift-gold/40 text-white px-4 py-3 rounded-2xl shadow-gold-glow flex items-center gap-3 text-xs font-serif">
        <Sparkles className="w-4 h-4 text-drift-gold animate-spin" />
        <span className="tracking-wide text-drift-gold-light">{toastMessage}</span>
      </div>
    </div>
  );
}
