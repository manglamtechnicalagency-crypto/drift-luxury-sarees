'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useReducedMotion } from 'framer-motion';

const PaisleyDustLayer = dynamic(() => import('./PaisleyDustLayer'), { ssr: false });

export default function PaisleyPreloader() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const reducedMotionPreference = useReducedMotion();
  const reduceMotion = mounted ? reducedMotionPreference === true : false;
  const outerTimerRef = useRef<NodeJS.Timeout | null>(null);
  const innerTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setMousePos({ x: 0, y: 0 });
      return;
    }
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [reduceMotion]);

  useEffect(() => {
    if (!mounted) return;

    if (reduceMotion) {
      outerTimerRef.current = setTimeout(() => {
        setExiting(true);
        innerTimerRef.current = setTimeout(() => setVisible(false), 50);
      }, 100);
    } else {
      outerTimerRef.current = setTimeout(() => {
        setExiting(true);
        innerTimerRef.current = setTimeout(() => setVisible(false), 850);
      }, 1800);
    }

    return () => {
      if (outerTimerRef.current) clearTimeout(outerTimerRef.current);
      if (innerTimerRef.current) clearTimeout(innerTimerRef.current);
    };
  }, [mounted, reduceMotion]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading DRIFT Sovereign Silks of Hindustan"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#A80F24] transition-all duration-700 ease-in-out select-none ${
        exiting ? 'pointer-events-none' : ''
      }`}
      style={{
        clipPath: exiting ? 'inset(0 0 100% 0)' : 'inset(0 0 0% 0)',
        transition: reduceMotion ? 'none' : 'clip-path 0.85s cubic-bezier(0.77, 0, 0.175, 1)',
      }}
    >
      {/* 3D Gold Mica Flakes / Paisley Dust Layer */}
      <PaisleyDustLayer />
      {/* Ornate Gold Kalka / Paisley Floral Medallion */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center p-6"
        style={{
          transform: reduceMotion
            ? undefined
            : `perspective(600px) rotateX(${mousePos.y * 6}deg) rotateY(${mousePos.x * 6}deg)`,
          transition: reduceMotion ? 'none' : 'transform 0.15s ease-out',
        }}
      >
        <div className="w-28 h-28 sm:w-36 sm:h-36 mb-6 relative flex items-center justify-center paisley-glow">
          {/* Detailed Paisley / Kalka SVG */}
          <svg
            viewBox="0 0 120 120"
            className="w-full h-full fill-none stroke-[#E6B83A]"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M60 15 C40 15, 25 35, 25 55 C25 78, 42 98, 60 105 C78 98, 95 78, 95 55 C95 40, 85 28, 72 25 C64 23, 62 10, 50 10 C42 10, 38 18, 45 25 C52 32, 60 38, 60 50 C60 65, 48 75, 48 75"
              stroke="#D4AF37"
              strokeWidth="2.5"
            />
            <circle cx="60" cy="55" r="8" stroke="#F7E096" strokeWidth="1.8" />
            <circle cx="60" cy="55" r="3" fill="#D4AF37" />
            <path
              d="M45 55 C45 42, 55 35, 65 35"
              stroke="#F7E096"
              strokeDasharray="2 3"
            />
            <path
              d="M75 55 C75 68, 65 75, 55 75"
              stroke="#F7E096"
              strokeDasharray="2 3"
            />
            {/* Surrounding radiating sunburst rays */}
            <line x1="60" y1="5" x2="60" y2="0" stroke="#D4AF37" strokeWidth="2" />
            <line x1="95" y1="20" x2="100" y2="15" stroke="#D4AF37" strokeWidth="2" />
            <line x1="108" y1="55" x2="115" y2="55" stroke="#D4AF37" strokeWidth="2" />
            <line x1="95" y1="90" x2="100" y2="95" stroke="#D4AF37" strokeWidth="2" />
            <line x1="25" y1="20" x2="20" y2="15" stroke="#D4AF37" strokeWidth="2" />
            <line x1="12" y1="55" x2="5" y2="55" stroke="#D4AF37" strokeWidth="2" />
            <line x1="25" y1="90" x2="20" y2="95" stroke="#D4AF37" strokeWidth="2" />
          </svg>
        </div>

        {/* DRIFT Wordmark in Cormorant Garamond */}
        <h1 className="font-serif text-4xl sm:text-5xl tracking-[0.3em] text-[#FAF7F2] font-semibold mb-2">
          DRIFT
        </h1>
        <p className="font-sans text-[10px] sm:text-xs tracking-[0.45em] text-[#E6B83A] uppercase font-medium">
          SOVEREIGN SILKS OF HINDUSTAN
        </p>

        {/* Loading Bar */}
        <div className="w-36 h-[2px] bg-[#2B070E] mt-6 rounded-full overflow-hidden relative">
          <div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#FAF7F2] animate-[shimmer_1.4s_infinite_linear] w-full" />
        </div>
      </div>
    </div>
  );
}
