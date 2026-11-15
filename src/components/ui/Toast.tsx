'use client';

import React from 'react';
import { useStore } from '@/store/useStore';
import { Sparkles } from 'lucide-react';

export default function Toast() {
  const { toastText } = useStore();

  if (!toastText) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#2B070E] text-[#FAF7F2] border border-[#D4AF37]/50 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-sans">
        <Sparkles className="w-4 h-4 text-[#E6B83A] animate-spin" />
        <span className="font-medium tracking-wide">{toastText}</span>
      </div>
    </div>
  );
}
