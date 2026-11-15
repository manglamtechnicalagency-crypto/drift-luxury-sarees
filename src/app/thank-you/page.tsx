import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, MailCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Thank You | DRIFT',
  description: 'Return to the DRIFT regional saree design archive.',
  robots: { index: false, follow: false, nocache: true },
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-[#2B070E] text-[#FAF7F2] flex items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full bg-[#FAF7F2] text-[#1A1617] rounded-3xl p-8 sm:p-12 shadow-2xl border border-[#D4AF37]/40 text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#2B070E] text-[#E6B83A] flex items-center justify-center">
          <MailCheck className="w-8 h-8" />
        </div>
        <div className="space-y-3">
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#A80F24] font-bold block">DRIFT STUDIO</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold">Thank you for your interest</h1>
          <p className="font-sans text-sm text-[#1A1617]/75 leading-relaxed">
            This page is a general acknowledgement. It does not confirm an order or a submitted enquiry. If you sent a design request, confirmation appears in the cart only after the studio system accepts it.
          </p>
        </div>
        <Link href="/" className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-[#A80F24] hover:bg-[#8A0C1D] text-[#FAF7F2] font-sans font-bold text-xs uppercase tracking-widest transition-colors">
          <ArrowLeft className="w-4 h-4" /> Return to the archive
        </Link>
      </div>
    </main>
  );
}
