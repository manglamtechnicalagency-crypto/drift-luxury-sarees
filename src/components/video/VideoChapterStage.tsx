'use client';

import React, { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { PRIYA_EDITORIAL_MODEL } from '@/data/collections/colorways';
import { Play, Pause, ArrowRight, Sparkles } from 'lucide-react';

interface Chapter {
  id: string;
  title: string;
  timecode: string;
  location: string;
  image: string;
  imagePosition: string;
}

export default function VideoChapterStage() {
  const { setActiveModal } = useStore();
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const reducedMotionPreference = useReducedMotion();

  useEffect(() => {
    if (reducedMotionPreference !== null) setIsPlaying(!reducedMotionPreference);
  }, [reducedMotionPreference]);

  const chapters: Chapter[] = [
    {
      id: 'first-light',
      title: 'First Light',
      timecode: '0:00',
      location: 'Patan Double-Ikat Loom',
      image: '/collections/models/regional-model-02.jpg',
      imagePosition: 'center 24%',
    },
    {
      id: 'courtyard-air',
      title: 'Courtyard Air',
      timecode: '0:48',
      location: 'Mehrangarh Fort Courtyard',
      image: '/collections/models/regional-model-03.jpg',
      imagePosition: 'center 28%',
    },
    {
      id: 'wedding-circle',
      title: 'Wedding Circle',
      timecode: '1:32',
      location: 'Varanasi Ghats Mandap',
      image: '/collections/models/regional-model-07.jpg',
      imagePosition: 'center 20%',
    },
    {
      id: 'temple-steps',
      title: 'Temple Steps',
      timecode: '2:15',
      location: 'Kanchipuram Gopuram Sanctum',
      image: '/collections/models/regional-model-09.jpg',
      imagePosition: 'center 24%',
    },
  ];

  // Automatic progress timer cycling through chapters
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveChapterIndex((c) => (c + 1) % chapters.length);
          return 0;
        }
        return prev + 1.2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, chapters.length]);

  const currentChapter = chapters[activeChapterIndex];

  return (
    <section id="video-chapter-stage" className="relative w-full h-[85vh] min-h-[560px] bg-[#2B070E] overflow-hidden select-none flex flex-col justify-between p-6 sm:p-12">
      
      {/* Animated model portrait */}
      <div className="absolute inset-0 z-0">
        <img
          key={currentChapter.id}
          src={currentChapter.image}
          alt=""
          aria-hidden="true"
          className="h-full w-full scale-105 object-cover transition-opacity duration-700"
          style={{ objectPosition: currentChapter.imagePosition }}
          onError={(e) => {
            const image = e.currentTarget;
            image.onerror = null;
            image.src = '/collections/models/model_saffron_yellow.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#210C12]/70 via-[#2B070E]/30 to-[#210C12]/75" />
      </div>

      {/* Top Header Row */}
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#E6B83A] font-bold block mb-1">
            CINEMATIC DOCUMENTARY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#FAF7F2] font-semibold">
            Woven silks, in motion
          </h2>
          <a
            href="#curated-curved-arc"
            className="inline-flex items-center gap-1.5 text-xs font-sans text-[#FAF7F2]/80 hover:text-[#E6B83A] transition-colors mt-2"
          >
            <span>Explore the collection</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Media Controls & Watch Full Film Modal Trigger */}
        <div className="flex items-center gap-2">
          {/* Play/Pause Toggle */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause chapter video' : 'Play chapter video'}
            aria-pressed={isPlaying}
            className="p-2.5 rounded-full bg-[#FAF7F2]/20 hover:bg-[#FAF7F2] text-[#FAF7F2] hover:text-[#2B070E] backdrop-blur-md border border-[#FAF7F2]/30 font-sans transition-all active:scale-95 shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          </button>

          {/* Watch Full Film Modal Trigger */}
          <button
            type="button"
            onClick={() => setActiveModal('film')}
            className="px-5 py-2.5 rounded-full bg-[#FAF7F2]/20 hover:bg-[#FAF7F2] text-[#FAF7F2] hover:text-[#2B070E] backdrop-blur-md border border-[#FAF7F2]/30 font-sans text-xs uppercase tracking-widest font-semibold transition-all flex items-center gap-2 active:scale-95 shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>MODEL PORTRAIT</span>
          </button>
        </div>
      </div>

      {/* Center Atmospheric Title */}
      <div className="relative z-10 text-center max-w-xl mx-auto space-y-2 pointer-events-none">
        <span className="font-sans text-[11px] uppercase tracking-[0.4em] text-[#E6B83A]">
          {currentChapter.location}
        </span>
        <h3 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#FAF7F2] italic">
          &ldquo;{currentChapter.title}&rdquo;
        </h3>
      </div>

      {/* Bottom Floating Glassmorphic Chapter Switcher */}
      <div className="relative z-10 flex flex-col items-center space-y-4 max-w-4xl mx-auto w-full">
        
        {/* Animated Progress Bar */}
        <div className="w-full h-1 bg-[#FAF7F2]/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#D4AF37] transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* 4 Chapter Thumbnail Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
          {chapters.map((ch, idx) => {
            const isActive = activeChapterIndex === idx;

            return (
              <button
                key={ch.id}
                type="button"
                aria-label={`Select chapter ${ch.title} (${ch.location})`}
                aria-pressed={isActive}
                onClick={() => {
                  setActiveChapterIndex(idx);
                  setProgress(0);
                }}
                className={`min-h-11 p-2.5 rounded-xl backdrop-blur-md cursor-pointer transition-all border flex items-center gap-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37] ${
                  isActive
                    ? 'bg-[#FAF7F2]/25 border-[#D4AF37] shadow-lg'
                    : 'bg-black/30 border-[#FAF7F2]/15 hover:bg-black/40'
                }`}
              >
                <img
                  src={ch.image}
                  alt={`Illustrative model reference for ${ch.title}`}
                  className="w-10 h-10 object-cover object-top rounded-lg flex-shrink-0"
                  onError={(e) => {
                    const image = e.currentTarget;
                    image.onerror = null;
                    image.src = '/collections/models/model_saffron_yellow.jpg';
                  }}
                />
                <div className="min-w-0 text-left">
                  <span className="text-[9px] font-sans font-bold text-[#E6B83A] block">
                    {ch.timecode}
                  </span>
                  <p className="font-serif text-xs text-[#FAF7F2] font-semibold truncate">
                    {ch.title}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

      </div>

    </section>
  );
}
