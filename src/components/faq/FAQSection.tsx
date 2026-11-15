'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, AlertCircle } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  confirmNote?: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What handloom weaving traditions are catalogued in the DRIFT archive?',
    answer:
      'DRIFT documents six distinguished Indian handloom traditions: Patan Patola (double-ikat silk from Gujarat), Varanasi Katan (fine mulberry silk brocades from Uttar Pradesh), Kanchipuram Korvai (heavy mulberry silk with interlocking temple borders from Tamil Nadu), Heritage Paithani (tapestry-woven oblique borders and peacocks from Maharashtra), Jodhpuri Bandhej (fine tie-dye on pure georgette from Rajasthan), and Rajasthani Leheriya (diagonal wave-resist dyeing from Jaipur).',
  },
  {
    id: 'faq-2',
    question: 'Are these sarees available for direct acquisition or bespoke weaving?',
    answer:
      'Each piece in the archive is presented as an authentic regional design study. Submitting an order through our digital checkout registers a direct inquiry with our studio concierge, who coordinates stock availability and loom scheduling.',
    confirmNote:
      '[CONFIRM: Specify exact lead times for custom bespoke commissions (e.g., 4–8 weeks for Korvai/Patola) and whether a 50% studio deposit is required].',
  },
  {
    id: 'faq-3',
    question: 'How are authentic handloom materials and zari verified?',
    answer:
      'All textiles featured in our studies utilize natural mulberry silk, organza, or georgette bases, woven with silver and gold electroplated zari threads.',
    confirmNote:
      '[CONFIRM: Clarify whether physical government Silk Mark tags or lab metallurgy test certificates are provided with every dispatched shipment].',
  },
  {
    id: 'faq-4',
    question: 'What blouse stitching and custom sizing options are available?',
    answer:
      'Each saree is supplied with unstitched matching blouse fabric (0.8m to 1.0m) featuring coordinating border motifs. During checkout, clients may also specify bespoke stitched blouse sizing across standard dimensions (sizes 32 through 44).',
    confirmNote:
      '[CONFIRM: Provide exact measurement submission instructions or form link if custom neckline and sleeve tailoring is requested].',
  },
  {
    id: 'faq-5',
    question: 'How does DRIFT handle insured shipping and delivery?',
    answer:
      'All studio dispatches are fully insured during transit and require an authorized signature upon delivery. Orders are tracked via edge confirmation emails.',
    confirmNote:
      '[CONFIRM: Name primary domestic and international courier partners (e.g. Blue Dart / DHL Express) and standard delivery windows (e.g. 3–5 business days domestically)].',
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq-section" className="w-full bg-[#FAF7F2] py-20 border-b border-[#E6DFD5] select-none">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-14">
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#A80F24] font-bold block">
            ATELIER & PROVENANCE INQUIRIES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1617] font-semibold">
            Frequently Asked Questions
          </h2>
          <p className="font-sans text-xs sm:text-sm lg:text-base xl:text-lg text-[#1A1617]/75 font-light leading-relaxed max-w-2xl mx-auto">
            Essential information regarding regional handloom archives, material authenticity, sizing, and concierge fulfillment.
          </p>
        </div>

        {/* Expandable Accordion */}
        <div className="space-y-4">
          {FAQ_DATA.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className="rounded-2xl border border-[#E6DFD5] bg-[#F4EFE6]/60 transition-all overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer hover:bg-[#F4EFE6] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A80F24]"
                >
                  <span className="font-serif text-base sm:text-lg font-medium text-[#1A1617] pr-4">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#A80F24] flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${item.id}`}
                    className="px-5 pb-6 sm:px-6 sm:pb-6 space-y-3 font-sans text-xs sm:text-sm text-[#1A1617]/80 leading-relaxed border-t border-[#E6DFD5]/60 pt-4"
                  >
                    <p className="text-xs sm:text-sm lg:text-base leading-relaxed text-[#1A1617]/85">{item.answer}</p>
                    {item.confirmNote && (
                      <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#D4AF37]/50 flex items-start gap-2.5 text-xs text-[#2B070E]">
                        <AlertCircle className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                        <span className="font-medium">{item.confirmNote}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Additional Concierge Notice */}
        <div className="mt-12 text-center">
          <p className="text-xs font-sans text-[#1A1617]/70">
            Have an unlisted question about bespoke drapes or wedding trousseau curations?{' '}
            <a
              href="mailto:concierge@drift-luxury.com"
              className="text-[#A80F24] font-semibold underline hover:text-[#8A0C1D] transition-colors"
            >
              Contact our Studio Concierge
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
