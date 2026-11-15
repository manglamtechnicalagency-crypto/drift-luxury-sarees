'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useStore } from '@/store/useStore';
import { ALL_SAREES } from '@/data/collections/registry';
import { X, Search, Play, ShieldCheck, ArrowRight, Sparkles, Maximize2 } from 'lucide-react';
import { getSareeColorways, getSareeModelImage, PRIYA_EDITORIAL_MODEL } from '@/data/collections/colorways';
import { TextilePattern } from '@/components/products/TextilePalette';
import { GUJARATI_CRAFT_NOTES } from '@/data/collections/gujarati/context';

export default function SearchAndFilmModals() {
  const {
    activeModal,
    setActiveModal,
    selectedProductForModal,
    setSelectedProductForModal,
    setActiveStateFilter,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColorway, setSelectedColorway] = useState(0);
  const [activeGalleryImage, setActiveGalleryImage] = useState<string | null>(null);
  const activeColorways = useMemo(
    () => selectedProductForModal ? getSareeColorways(selectedProductForModal) : [],
    [selectedProductForModal],
  );

  useEffect(() => {
    setSelectedColorway(0);
    if (selectedProductForModal) {
      setActiveGalleryImage(getSareeModelImage(selectedProductForModal));
    }
  }, [selectedProductForModal?.id, selectedProductForModal]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModal('none');
    };
    if (activeModal !== 'none') {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [activeModal, setActiveModal]);

  // Search filter
  const searchResults = searchQuery.trim()
    ? ALL_SAREES.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.craft.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.originState.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.fabric.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
    : [];

  const handleOpenProduct = (saree: typeof ALL_SAREES[0]) => {
    setSelectedProductForModal(saree);
    setActiveModal('quickshop');
  };

  if (activeModal === 'none') return null;

  return (
    <>
      {/* 1. SEARCH MODAL */}
      {activeModal === 'search' && (
        <div role="dialog" aria-modal="true" aria-label="Search design studies" className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-24 px-4 animate-in fade-in">
          <div className="bg-[#FAF7F2] border border-[#E6DFD5] rounded-3xl w-full max-w-2xl p-6 shadow-2xl relative">
            <button
              onClick={() => setActiveModal('none')}
              aria-label="Close search modal"
              className="absolute top-5 right-5 p-2 rounded-full text-[#1A1617]/70 hover:text-[#A80F24] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A80F24]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl font-bold text-[#1A1617] mb-4 text-left">
              Search DRIFT Handloom Design Archives
            </h3>

            <div className="relative">
              <Search className="w-5 h-5 text-[#1A1617]/40 absolute left-4 top-3.5" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Patola, Kadwa, Bandhej, Kanchipuram, Zari..."
                className="w-full bg-white border border-[#E6DFD5] rounded-xl pl-12 pr-4 py-3 text-sm text-[#1A1617] placeholder-[#1A1617]/40 outline-none focus:border-[#A80F24] shadow-inner font-sans"
              />
            </div>

            {/* Results Grid */}
            <div className="mt-6 space-y-2 max-h-80 overflow-y-auto">
              {searchResults.length > 0 ? (
                searchResults.map((saree) => (
                  <button
                    key={saree.id}
                    type="button"
                    onClick={() => handleOpenProduct(saree)}
                    className="w-full flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-[#F4EFE6] cursor-pointer transition-colors border border-transparent hover:border-[#D4AF37]/30 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A80F24]"
                  >
                    <img
                      src={getSareeModelImage(saree)}
                      alt={`Illustrative model reference for ${saree.name}`}
                      className="w-12 h-14 object-cover object-top rounded-lg flex-shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = PRIYA_EDITORIAL_MODEL.images[saree.region];
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] uppercase font-sans tracking-widest text-[#A80F24] font-bold block">
                        {saree.originState}
                      </span>
                      <p className="font-serif text-sm font-semibold text-[#1A1617] truncate">
                        {saree.name}
                      </p>
                      <p className="text-xs text-[#1A1617]/60 truncate font-light">
                        {saree.craft}
                      </p>
                    </div>
                    <span className="font-sans text-xs font-bold text-[#A80F24]">
                      {saree.priceDisplay}
                    </span>
                  </button>
                ))
              ) : searchQuery.trim() ? (
                <p className="text-xs text-[#1A1617]/50 text-center py-6 font-serif italic">
                  No matching handloom sarees found for &quot;{searchQuery}&quot;
                </p>
              ) : (
                <div className="text-xs text-[#1A1617]/60 pt-2 flex items-center gap-2">
                  <span className="font-bold">Trending Searches:</span>
                  <button onClick={() => setSearchQuery('Patan Patola')} className="text-[#A80F24] underline">Patan Patola</button>
                  <button onClick={() => setSearchQuery('Shikargah')} className="text-[#A80F24] underline">Shikargah</button>
                  <button onClick={() => setSearchQuery('Korvai')} className="text-[#A80F24] underline">Korvai</button>
                  <button onClick={() => setSearchQuery('Bandhani')} className="text-[#A80F24] underline">Bandhani</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. FILM MODAL */}
      {activeModal === 'film' && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8 animate-in fade-in">
          <div className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden border border-[#D4AF37]/50 shadow-2xl bg-black">
            <button
              onClick={() => setActiveModal('none')}
              className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-black/70 text-white hover:text-[#D4AF37] border border-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={PRIYA_EDITORIAL_MODEL.images.banarasi}
              alt="Female model wearing a Banarasi-inspired saree"
              className="h-full w-full object-cover object-top motion-safe:animate-[modelPortraitDrift_18s_ease-in-out_infinite_alternate]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2B070E]/70 via-transparent to-black/20" />
            <p className="absolute bottom-6 left-6 rounded-full border border-[#D4AF37]/40 bg-black/50 px-4 py-2 text-[10px] uppercase tracking-[.2em] text-[#F6E5B5]">DRIFT model portrait · illustrative reference</p>
          </div>
        </div>
      )}

      {/* 3. QUICKSHOP MODAL */}
      {activeModal === 'quickshop' && selectedProductForModal && (
        <div role="dialog" aria-modal="true" aria-label={`${selectedProductForModal.name} design study`} className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 overflow-y-auto animate-in fade-in">
          <div className="relative bg-[#FAF7F2] border border-[#E6DFD5] rounded-3xl max-w-4xl w-full p-6 sm:p-10 shadow-2xl max-h-[92vh] overflow-y-auto my-auto text-left">
            <button
              onClick={() => setActiveModal('none')}
              aria-label="Close design study modal"
              className="absolute top-5 right-5 p-2 rounded-full bg-[#F4EFE6] text-[#1A1617] hover:text-[#A80F24] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A80F24] z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                {/* Product Gallery (5 Cols) */}
                <div className="md:col-span-5 space-y-3">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#2B070E] border border-[#E6DFD5] shadow-lg group">
                    <img
                      src={activeGalleryImage || getSareeModelImage(selectedProductForModal)}
                      alt={`Illustrative model styling reference for ${selectedProductForModal.name}`}
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = PRIYA_EDITORIAL_MODEL.images[selectedProductForModal.region];
                      }}
                    />
                    <div className="absolute top-2.5 left-2.5 z-10 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#E6B83A]/30 text-[#E6B83A] text-[9px] font-sans uppercase tracking-widest font-semibold">
                      <Sparkles className="w-3 h-3 text-[#E6B83A]" />
                      <span>Model image · illustrative reference</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveGalleryImage(getSareeModelImage(selectedProductForModal))}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        activeGalleryImage === getSareeModelImage(selectedProductForModal) ? 'border-[#A80F24] ring-2 ring-[#A80F24]/30' : 'border-[#E6DFD5] opacity-75 hover:opacity-100'
                      }`}
                      title="Illustrative model reference"
                    >
                      <img
                        src={activeGalleryImage || getSareeModelImage(selectedProductForModal)}
                        alt="Illustrative model reference"
                        className="w-full h-full object-cover object-top"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveGalleryImage(PRIYA_EDITORIAL_MODEL.images[selectedProductForModal.region])}
                      className="relative aspect-square rounded-lg overflow-hidden border-2 border-[#E6DFD5] opacity-75 hover:opacity-100 transition-all"
                      title="Regional model reference"
                    >
                      <img
                        src={PRIYA_EDITORIAL_MODEL.images[selectedProductForModal.region]}
                        alt="Model wearing a saree"
                        className="w-full h-full object-cover object-top"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveGalleryImage('/collections/models/model_royal_chandan.jpg')}
                      className="relative aspect-square rounded-lg overflow-hidden border-2 border-[#E6DFD5] opacity-75 hover:opacity-100 transition-all"
                      title="Saree model portrait"
                    >
                      <img
                        src="/collections/models/model_royal_chandan.jpg"
                        alt="Female model wearing a saree"
                        className="w-full h-full object-cover object-top"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveGalleryImage('/collections/models/model_saffron_yellow.jpg')}
                      className="relative aspect-square rounded-lg overflow-hidden border-2 border-[#E6DFD5] opacity-75 hover:opacity-100 transition-all"
                      title="Saree model portrait"
                    >
                      <img
                        src="/collections/models/model_saffron_yellow.jpg"
                        alt="Female model wearing a saree"
                        className="w-full h-full object-cover object-top"
                      />
                    </button>
                  </div>
                </div>

                {/* Product Details (7 Cols) */}
                <div className="md:col-span-7 space-y-4">
                  <div>
                    <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#A80F24] font-bold block">
                      {selectedProductForModal.originState} • {selectedProductForModal.craft}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1617] mt-1">
                      {selectedProductForModal.name}
                    </h3>
                    <p className="font-sans text-2xl font-bold text-[#A80F24] mt-2">
                      {selectedProductForModal.priceDisplay}
                    </p>
                  </div>

                  {/* Specs Box */}
                  <div className="p-3.5 bg-[#F4EFE6] rounded-xl border border-[#E6DFD5] text-xs font-sans space-y-1.5">
                    <p><span className="font-semibold text-[#1A1617]">Weave Duration:</span> {selectedProductForModal.weaveTime}</p>
                    <p><span className="font-semibold text-[#1A1617]">Fabric:</span> {selectedProductForModal.fabric}</p>
                    <p><span className="font-semibold text-[#1A1617]">Zari Testing:</span> {selectedProductForModal.zariType}</p>
                    <p><span className="font-semibold text-[#1A1617]">Provenance:</span> {selectedProductForModal.provenance}</p>
                  </div>

                  {activeColorways[selectedColorway] && (
                    <div className="grid grid-cols-[86px_1fr] gap-4 p-3.5 rounded-2xl border border-[#D4AF37]/35 bg-white/80 shadow-sm">
                      <TextilePattern colorway={activeColorways[selectedColorway]} className="w-full aspect-[3/4] rounded-xl border border-black/10 shadow-sm object-cover" />
                      <div className="min-w-0 py-0.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] uppercase tracking-[0.2em] text-[#A80F24] font-bold">Color &amp; motif atelier</span>
                          <span className="text-[8px] uppercase tracking-wider text-[#D4AF37] font-semibold capitalize">{activeColorways[selectedColorway].motif} weave</span>
                        </div>
                        <h4 className="font-serif text-lg text-[#1A1617] mt-0.5 font-medium">{activeColorways[selectedColorway].name}</h4>
                        <p className="text-[11px] text-[#1A1617]/65 mt-0.5 leading-relaxed">{activeColorways[selectedColorway].note}</p>
                        
                        {/* 4-Way Palette Chips */}
                        {activeColorways[selectedColorway].pairing && (
                          <div className="flex items-center gap-2 mt-2 pt-1.5 border-t border-black/5">
                            <span className="text-[9px] uppercase tracking-wider text-[#1A1617]/60 font-medium">Palette:</span>
                            <span className="w-3 h-3 rounded-full border border-black/20" style={{ backgroundColor: activeColorways[selectedColorway].pairing?.body }} title="Body" />
                            <span className="w-3 h-3 rounded-full border border-black/20" style={{ backgroundColor: activeColorways[selectedColorway].pairing?.border }} title="Border" />
                            <span className="w-3 h-3 rounded-full border border-black/20" style={{ backgroundColor: activeColorways[selectedColorway].pairing?.pallu }} title="Pallu" />
                            <span className="w-3 h-3 rounded-full border border-black/20" style={{ backgroundColor: activeColorways[selectedColorway].pairing?.zari }} title="Zari" />
                          </div>
                        )}

                        <div className="flex gap-2 mt-2.5" role="group" aria-label="Choose a visual palette concept">
                          {activeColorways.map((colorway, index) => (
                            <button key={colorway.id} type="button" onClick={() => setSelectedColorway(index)} aria-label={`Show ${colorway.name}`} aria-pressed={selectedColorway === index} className={`w-9 h-11 overflow-hidden rounded-lg border-2 transition-all ${selectedColorway === index ? 'border-[#A80F24] shadow-md scale-105' : 'border-transparent opacity-70 hover:opacity-100'}`}>
                              <TextilePattern colorway={colorway} className="w-full h-full object-cover" />
                            </button>
                          ))}
                        </div>
                        <p className="text-[9px] text-[#1A1617]/50 mt-1.5">Illustrative colorway concepts · not inventory variants</p>
                      </div>
                    </div>
                  )}

                  <p className="text-xs font-sans text-[#1A1617]/80 font-light leading-relaxed">
                    {selectedProductForModal.description}
                  </p>

                  {(GUJARATI_CRAFT_NOTES[selectedProductForModal.id] || selectedProductForModal.culturalContext) && (
                    <section className="rounded-2xl border border-[#D4AF37]/35 bg-[#F4EFE6] p-4" aria-labelledby="cultural-context-heading">
                      <p className="text-[9px] font-bold uppercase tracking-[.2em] text-[#A80F24]">Regional textile notes</p>
                      <h4 id="cultural-context-heading" className="mt-1 font-serif text-lg text-[#1A1617]">{GUJARATI_CRAFT_NOTES[selectedProductForModal.id]?.title || selectedProductForModal.craft}</h4>
                      <p className="mt-1.5 text-xs leading-relaxed text-[#1A1617]/70">{selectedProductForModal.culturalContext || GUJARATI_CRAFT_NOTES[selectedProductForModal.id]?.body}</p>
                      {GUJARATI_CRAFT_NOTES[selectedProductForModal.id]?.source && (
                        <a href={GUJARATI_CRAFT_NOTES[selectedProductForModal.id].source.url} target="_blank" rel="noreferrer" className="mt-2 inline-flex text-[10px] font-semibold uppercase tracking-[.12em] text-[#8E1B31] underline decoration-[#8E1B31]/35 underline-offset-4 hover:decoration-[#8E1B31]">
                          Read craft reference · {GUJARATI_CRAFT_NOTES[selectedProductForModal.id].source.label}
                        </a>
                      )}
                    </section>
                  )}

                  <p className="rounded-xl border border-[#D4AF37]/40 bg-[#F4EFE6] px-4 py-3 text-xs leading-relaxed text-[#1A1617]/75">
                    Editorial design study only. This is not a verified seller listing; product imagery, materials, price and availability need confirmation.
                  </p>

                  {/* Browse regional edit */}
                  <div className="pt-1 space-y-2">
                    <button
                      onClick={() => {
                        setActiveStateFilter(selectedProductForModal.region);
                        setActiveModal('none');
                        window.setTimeout(() => {
                          const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                          document.getElementById('curated-curved-arc')?.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
                        }, 80);
                      }}
                      className="w-full py-3.5 rounded-full bg-[#A80F24] hover:bg-[#7A0A19] text-[#FAF7F2] font-sans font-bold text-xs uppercase tracking-[0.2em] shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                      <span>Browse this regional edit</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
          </div>
        </div>
      )}

    </>
  );
}
