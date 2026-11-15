'use client';

import React from 'react';
import { Quote, MessageSquare } from 'lucide-react';

export default function ReviewsSection() {
  return (
    <section id="client-reviews" className="w-full bg-[#FAF7F2] py-20 border-b border-[#E6DFD5] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#A80F24] font-bold block">
            PATRONAGE & ATELIER EXPERIENCES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1617] font-semibold">
            Client Impressions
          </h2>
          <p className="font-sans text-xs sm:text-sm lg:text-base xl:text-lg text-[#1A1617]/75 font-light leading-relaxed max-w-2xl">
            Verified accounts from collectors, brides, and patrons who have commissioned regional weaves through our studio. Reviews are updated manually with client consent.
          </p>
        </div>

        {/* 3-Card Luxury Testimonial Grid - Strictly Uninvented Placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Review Card 1 */}
          <div className="p-8 rounded-3xl bg-[#F4EFE6]/70 border border-[#D4AF37]/30 flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-[#D4AF37] transition-all">
            <Quote className="w-8 h-8 text-[#D4AF37]/40" />
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-dashed border-[#D4AF37]/60 bg-[#FAF7F2]/60 text-left">
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#A80F24] block mb-1">
                  Verified Patron Placeholder 01
                </span>
                <p className="font-serif italic text-xs sm:text-sm text-[#1A1617]/80 leading-relaxed">
                  [CLIENT REVIEW PLACEHOLDER 01 — Paste verified customer review quote, client name, city, and commissioned saree SKU here with patron permission]
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-[#E6DFD5] text-left">
              <p className="font-serif font-semibold text-xs text-[#2B070E]">
                [Client Name / City Placeholder]
              </p>
              <p className="text-[10px] font-sans text-[#1A1617]/60 uppercase tracking-wider">
                [Commissioned Weave / SKU Placeholder]
              </p>
            </div>
          </div>

          {/* Review Card 2 */}
          <div className="p-8 rounded-3xl bg-[#F4EFE6]/70 border border-[#D4AF37]/30 flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-[#D4AF37] transition-all">
            <Quote className="w-8 h-8 text-[#D4AF37]/40" />
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-dashed border-[#D4AF37]/60 bg-[#FAF7F2]/60 text-left">
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#A80F24] block mb-1">
                  Verified Patron Placeholder 02
                </span>
                <p className="font-serif italic text-xs sm:text-sm text-[#1A1617]/80 leading-relaxed">
                  [CLIENT REVIEW PLACEHOLDER 02 — Paste verified customer review quote, client name, city, and commissioned saree SKU here with patron permission]
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-[#E6DFD5] text-left">
              <p className="font-serif font-semibold text-xs text-[#2B070E]">
                [Client Name / City Placeholder]
              </p>
              <p className="text-[10px] font-sans text-[#1A1617]/60 uppercase tracking-wider">
                [Commissioned Weave / SKU Placeholder]
              </p>
            </div>
          </div>

          {/* Review Card 3 */}
          <div className="p-8 rounded-3xl bg-[#F4EFE6]/70 border border-[#D4AF37]/30 flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-[#D4AF37] transition-all">
            <Quote className="w-8 h-8 text-[#D4AF37]/40" />
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-dashed border-[#D4AF37]/60 bg-[#FAF7F2]/60 text-left">
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#A80F24] block mb-1">
                  Verified Patron Placeholder 03
                </span>
                <p className="font-serif italic text-xs sm:text-sm text-[#1A1617]/80 leading-relaxed">
                  [CLIENT REVIEW PLACEHOLDER 03 — Paste verified customer review quote, client name, city, and commissioned saree SKU here with patron permission]
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-[#E6DFD5] text-left">
              <p className="font-serif font-semibold text-xs text-[#2B070E]">
                [Client Name / City Placeholder]
              </p>
              <p className="text-[10px] font-sans text-[#1A1617]/60 uppercase tracking-wider">
                [Commissioned Weave / SKU Placeholder]
              </p>
            </div>
          </div>

        </div>

        {/* Studio Policy Disclaimer Note */}
        <div className="mt-12 flex items-center justify-center gap-2 text-center text-xs font-sans text-[#1A1617]/60">
          <MessageSquare className="w-4 h-4 text-[#A80F24]" />
          <span>
            Studio Integrity Notice: In accordance with our editorial standards, DRIFT never fabricates client testimonials or ratings.
          </span>
        </div>

      </div>
    </section>
  );
}
