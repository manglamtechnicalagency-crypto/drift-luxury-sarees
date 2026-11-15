'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { PRIYA_EDITORIAL_MODEL } from '@/data/collections/colorways';
import { Play, Pause, ArrowRight, Volume2, VolumeX, Sparkles } from 'lucide-react';

interface Chapter {
  id: string;
  title: string;
  timecode: string;
  location: string;
  image: string;
  videoSrc: string;
}

export default function VideoChapterStage() {
  const { setActiveModal } = useStore();
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const reducedMotionPreference = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (reducedMotionPreference) {
      setIsPlaying(false);
      videoRef.current?.pause();
    }
  }, [reducedMotionPreference]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      void video.play().catch(() => setIsPlaying(false));
    } else {
      video.pause();
    }
  }, [isPlaying, activeChapterIndex]);

  const chapters: Chapter[] = [
    {
      id: 'first-light',
      title: 'First Light',
      timecode: '0:00',
      location: 'Patan Double-Ikat Loom',
      image: PRIYA_EDITORIAL_MODEL.images['gujarati'],
      videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-red-silk-fabric-waving-in-the-wind-41914-large.mp4',
    },
    {
      id: 'courtyard-air',
      title: 'Courtyard Air',
      timecode: '0:48',
      location: 'Mehrangarh Fort Courtyard',
      image: PRIYA_EDITORIAL_MODEL.images['jodhpuri'],
      videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-red-silk-fabric-waving-in-the-wind-41914-large.mp4',
    },
    {
      id: 'wedding-circle',
      title: 'Wedding Circle',
      timecode: '1:32',
      location: 'Varanasi Ghats Mandap',
      image: PRIYA_EDITORIAL_MODEL.images['banarasi'],
      videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-red-silk-fabric-waving-in-the-wind-41914-large.mp4',
    },
    {
      id: 'temple-steps',
      title: 'Temple Steps',
      timecode: '2:15',
      location: 'Kanchipuram Gopuram Sanctum',
      image: PRIYA_EDITORIAL_MODEL.images['kanchipuram'],
      videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-red-silk-fabric-waving-in-the-wind-41914-large.mp4',
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
      
      {/* Background Video Stream Layer with Poster */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          key={currentChapter.id}
          loop
          muted={isMuted}
          playsInline
          poster={currentChapter.image}
          className="w-full h-full object-cover scale-105 transition-all duration-1000 ease-out"
        >
          <source src={currentChapter.videoSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#2B070E]/70 backdrop-blur-[2px]" />
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

          {/* Mute/Unmute Toggle */}
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
            aria-pressed={!isMuted}
            className="p-2.5 rounded-full bg-[#FAF7F2]/20 hover:bg-[#FAF7F2] text-[#FAF7F2] hover:text-[#2B070E] backdrop-blur-md border border-[#FAF7F2]/30 font-sans transition-all active:scale-95 shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Watch Full Film Modal Trigger */}
          <button
            type="button"
            onClick={() => setActiveModal('film')}
            className="px-5 py-2.5 rounded-full bg-[#FAF7F2]/20 hover:bg-[#FAF7F2] text-[#FAF7F2] hover:text-[#2B070E] backdrop-blur-md border border-[#FAF7F2]/30 font-sans text-xs uppercase tracking-widest font-semibold transition-all flex items-center gap-2 active:scale-95 shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>WATCH FILM</span>
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
              <div
                key={ch.id}
                role="button"
                tabIndex={0}
                aria-label={`Select chapter ${ch.title} (${ch.location})`}
                aria-pressed={isActive}
                onClick={() => {
                  setActiveChapterIndex(idx);
                  setProgress(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveChapterIndex(idx);
                    setProgress(0);
                  }
                }}
                className={`p-2.5 rounded-xl backdrop-blur-md cursor-pointer transition-all border flex items-center gap-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37] ${
                  isActive
                    ? 'bg-[#FAF7F2]/25 border-[#D4AF37] shadow-lg'
                    : 'bg-black/30 border-[#FAF7F2]/15 hover:bg-black/40'
                }`}
              >
                <img
                  src={ch.image}
                  alt={`Muse Priya in artisan video chapter: ${ch.title}`}
                  className="w-10 h-10 object-cover object-top rounded-lg flex-shrink-0"
                />
                <div className="min-w-0 text-left">
                  <span className="text-[9px] font-sans font-bold text-[#E6B83A] block">
                    {ch.timecode}
                  </span>
                  <p className="font-serif text-xs text-[#FAF7F2] font-semibold truncate">
                    {ch.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
