'use client';

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ALL_SAREES } from '@/data/collections/registry';
import { getSareeModelImage } from '@/data/collections/colorways';
import { useStore } from '@/store/useStore';
import type { SareeProduct } from '@/data/collections/types';

interface CuratedStudyConfig {
  sareeId: string;
  regionLabel: string;
  craftLabel: string;
}

const FEATURED_STUDIES_CONFIG: CuratedStudyConfig[] = [
  {
    sareeId: 'guj-01',
    regionLabel: 'Gujarat (Patan)',
    craftLabel: 'Double Ikat Silk',
  },
  {
    sareeId: 'raj-01',
    regionLabel: 'Rajasthan (Jaipur)',
    craftLabel: 'Diagonal Wave Resist',
  },
  {
    sareeId: 'ban-01',
    regionLabel: 'Uttar Pradesh (Varanasi)',
    craftLabel: 'Kadwa Brocade Weave',
  },
];

const REGIONAL_STUDIES_CONFIG: CuratedStudyConfig[] = [
  {
    sareeId: 'kan-01',
    regionLabel: 'Tamil Nadu (Kanchipuram)',
    craftLabel: 'Three-Shuttle Interlocking',
  },
  {
    sareeId: 'her-01',
    regionLabel: 'Maharashtra (Paithan)',
    craftLabel: 'Asavali Tapestry Brocade',
  },
  {
    sareeId: 'jod-01',
    regionLabel: 'Rajasthan (Jodhpur)',
    craftLabel: 'Royal Bandhej Tie-Dye',
  },
];

function StudyCard({
  saree,
  config,
}: {
  saree: SareeProduct;
  config: CuratedStudyConfig;
}) {
  const { setSelectedProductForModal, setActiveModal } = useStore();
  const open = () => {
    setSelectedProductForModal(saree);
    setActiveModal('quickshop');
  };

  const palette = saree.palette || ['#8E1818', '#14213D', '#D4AF37', '#2A4736'];

  return (
    <article className="group relative flex flex-col rounded-3xl border border-[#E6DFD5] bg-[#FAF7F2] overflow-hidden shadow-sm transition-all duration-500 hover:border-[#D4AF37] hover:shadow-[0_20px_50px_rgba(212,175,55,0.22)] hover:-translate-y-1.5">
      {/* Visual Header with Curated Image & Floating Glass Badges */}
      <div
        className="relative aspect-[4/5] w-full overflow-hidden bg-[#2B070E] cursor-pointer"
        onClick={open}
      >
        <img
          src={getSareeModelImage(saree)}
          alt={`Illustrative model reference for ${saree.name} design study`}
          className="h-full w-full object-cover object-[center_12%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          onError={(e) => {
            const image = e.currentTarget;
            image.onerror = null;
            image.src = '/collections/models/model_saffron_yellow.jpg';
          }}
        />

        {/* Ambient Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2B070E]/85 via-[#2B070E]/20 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />

        {/* Top Floating Glass Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2B070E]/85 backdrop-blur-md px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-[#FAF7F2] border border-[#FAF7F2]/20 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E6B83A]" />
            {config.regionLabel}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest text-[#E6B83A] border border-[#E6B83A]/30">
              <Sparkles size={8} className="text-[#E6B83A]" /> Priya
            </span>
            <span className="rounded-full bg-[#FAF7F2]/95 backdrop-blur-md px-2.5 py-1 text-[8px] font-bold uppercase tracking-widest text-[#A80F24] border border-[#E6DFD5] shadow-sm">
              DESIGN STUDY
            </span>
          </div>
        </div>

        {/* Bottom Weave Info & 4-Tone Warp/Weft Palette Bar */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl bg-[#2B070E]/75 backdrop-blur-md px-3 py-1.5 border border-[#FAF7F2]/15 pointer-events-none">
          <span className="text-[9px] font-semibold tracking-wider text-[#FAF7F2] uppercase flex items-center gap-1">
            <Sparkles size={11} className="text-[#E6B83A]" />
            {config.craftLabel}
          </span>
          <div className="flex items-center gap-1.5" title="Authentic Warp & Weft Dye Palette">
            {palette.slice(0, 4).map((color, idx) => (
              <span
                key={idx}
                className="w-2.5 h-2.5 rounded-full border border-white/40 shadow-sm"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Card Body with Clean Typography */}
      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6 space-y-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.2em] text-[#A80F24] mb-1.5">
            <span>{saree.drapeStyle || 'Heritage Drape'}</span>
            <span className="text-[#D4AF37]">·</span>
            <span className="truncate text-[#1A1617]/70 font-medium normal-case tracking-normal">
              {saree.color}
            </span>
          </div>
          <h3
            onClick={open}
            className="cursor-pointer font-serif text-lg sm:text-xl font-semibold text-[#1A1617] group-hover:text-[#A80F24] transition-colors leading-snug line-clamp-1"
          >
            {saree.name}
          </h3>
          <p className="mt-2 text-xs text-[#1A1617]/75 line-clamp-2 leading-relaxed">
            {saree.description || saree.story}
          </p>
        </div>

        {/* Dedicated Bottom Action Bar — Zero Overlap Architecture */}
        <div className="flex items-center justify-between pt-4 border-t border-[#E6DFD5]/80">
          <div>
            <span className="block text-[9px] uppercase tracking-wider text-[#1A1617]/50 font-bold">
              Indicative Context
            </span>
            <span className="text-xs font-semibold text-[#1A1617]">
              {saree.priceDisplay}
            </span>
          </div>
          <button
            type="button"
            onClick={open}
            className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37] bg-[#D4AF37]/15 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-[#4A0E17] transition-all duration-300 group-hover:bg-[#D4AF37] group-hover:text-[#2B070E] shadow-sm hover:shadow"
            aria-label={`Explore ${saree.name}`}
          >
            <span>Explore</span>
            <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function QuickAddRows() {
  const getSaree = (id: string, fallbackIndex: number) => {
    return ALL_SAREES.find((s) => s.id === id) || ALL_SAREES[fallbackIndex] || ALL_SAREES[0];
  };

  return (
    <section className="border-b border-[#E6DFD5] bg-[#FAF7F2] py-20">
      <div className="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
        
        {/* Row 1: Featured Design Studies */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E6DFD5] pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#A80F24]">
                A CLOSER LOOK
              </span>
              <h2 className="font-serif text-2xl font-semibold text-[#1A1617] sm:text-3xl">
                Featured design studies
              </h2>
              <p className="mt-1 text-xs text-[#1A1617]/60">
                Heirloom weave structures interpreted through contemporary drape geometries.
              </p>
            </div>
            <a
              href="#curated-curved-arc"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A80F24] hover:text-[#4A0E17] transition-colors"
            >
              <span>The archive</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {FEATURED_STUDIES_CONFIG.map((cfg, idx) => (
              <StudyCard
                key={cfg.sareeId}
                saree={getSaree(cfg.sareeId, idx)}
                config={cfg}
              />
            ))}
          </div>
        </div>

        {/* Row 2: Threads Across the Map */}
        <div className="space-y-6 border-t border-[#E6DFD5] pt-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E6DFD5] pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#A80F24]">
                REGIONAL NOTES
              </span>
              <h2 className="font-serif text-2xl font-semibold text-[#1A1617] sm:text-3xl">
                Threads across the map
              </h2>
              <p className="mt-1 text-xs text-[#1A1617]/60">
                Preserving distinctive regional weaving identities across six historic textile capitals.
              </p>
            </div>
            <a
              href="#curated-curved-arc"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A80F24] hover:text-[#4A0E17] transition-colors"
            >
              <span>Browse regions</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {REGIONAL_STUDIES_CONFIG.map((cfg, idx) => (
              <StudyCard
                key={cfg.sareeId}
                saree={getSaree(cfg.sareeId, idx + 3)}
                config={cfg}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
