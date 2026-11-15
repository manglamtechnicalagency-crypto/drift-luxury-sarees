'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What handloom weaving traditions are catalogued in the DRIFT archive?',
    answer:
      'The archive presents design studies inspired by regional textile traditions, including Patola and Bandhani references from Gujarat, Banarasi brocade from Uttar Pradesh, Kanchipuram from Tamil Nadu, Paithani from Maharashtra, and Leheriya and Bandhej references from Rajasthan. A design study does not verify the pictured textile, maker, or production method.',
  },
  {
    id: 'faq-2',
    question: 'Are these sarees available for direct acquisition or bespoke weaving?',
    answer:
      'Archive listings are design studies, not verified inventory. You can submit a design enquiry; availability, pricing, and any possible commission details require confirmation from the studio before an order can be placed.',
  },
  {
    id: 'faq-3',
    question: 'How are authentic handloom materials and zari verified?',
    answer:
      'Material and zari details have not been independently verified for the design studies. Ask the studio to confirm fibre content, technique, and any available documentation for a specific item.',
  },
  {
    id: 'faq-4',
    question: 'What blouse stitching and custom sizing options are available?',
    answer:
      'Blouse fabric and stitching options are not confirmed for the design studies. Please ask the studio about availability and measurements for a specific piece.',
  },
  {
    id: 'faq-5',
    question: 'How are delivery details arranged?',
    answer:
      'Delivery availability, cost, carrier, and timing have not been confirmed for the design studies. The studio must provide those details before any purchase is agreed.',
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
