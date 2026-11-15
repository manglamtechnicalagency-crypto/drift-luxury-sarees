import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Thank You | DRIFT',
  description: 'Thank you for your order and interest in the DRIFT Regional Handloom Design Archive.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-[#2B070E] text-[#FAF7F2] flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#A80F24]/30 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-lg w-full bg-[#FAF7F2] text-[#1A1617] rounded-3xl p-8 sm:p-12 shadow-2xl border border-[#D4AF37]/40 text-center space-y-6">
        
        {/* Crest */}
        <div className="w-16 h-16 mx-auto rounded-full bg-[#2B070E] text-[#E6B83A] flex items-center justify-center shadow-lg">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        {/* Header */}
        <div className="space-y-2">
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#A80F24] font-bold block">
            ORDER & ENQUIRY CONFIRMED
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1617] font-semibold">
            Thank you for choosing DRIFT
          </h1>
          <p className="font-sans text-xs text-[#1A1617]/70 font-light leading-relaxed pt-1">
            Your selection from our regional Indian handloom study has been registered. Our atelier concierge will review details and coordinate insured dispatch.
          </p>
        </div>

        {/* Editorial Notice Box */}
        <div className="p-4 rounded-2xl bg-[#F4EFE6] border border-[#E6DFD5] text-left space-y-2">
          <div className="flex items-center gap-2 text-xs font-serif font-semibold text-[#2B070E]">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Design Study Record</span>
          </div>
          <p className="text-[11px] font-sans text-[#1A1617]/75 leading-relaxed">
            Every piece in the DRIFT archive is documented alongside regional weavers. You will receive an email confirmation with dispatch details and provenance notes.
          </p>
        </div>

        {/* Security badge */}
        <div className="flex items-center justify-center gap-2 text-[11px] text-[#1A1617]/60 font-sans">
          <ShieldCheck className="w-4 h-4 text-[#A80F24]" />
          <span>Cloudflare Edge verified • 100% Secure Transaction</span>
        </div>

        {/* Action Link */}
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-[#A80F24] hover:bg-[#8A0C1D] text-[#FAF7F2] font-sans font-bold text-xs uppercase tracking-widest transition-all shadow-md hover:shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Loom Archive</span>
          </Link>
        </div>

      </div>
    </main>
  );
}
