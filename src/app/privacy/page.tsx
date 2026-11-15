import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Mail, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy | DRIFT',
  description: 'Information about data submitted through the DRIFT saree design archive.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#1A1617] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <article className="max-w-4xl mx-auto space-y-10">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-[#A80F24] hover:text-[#8A0C1D]">
          <ArrowLeft className="w-4 h-4" /> Return to the archive
        </Link>
        <header className="border-b border-[#E6DFD5] pb-8 space-y-3">
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#A80F24] font-bold">SITE INFORMATION</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight">Privacy</h1>
          <p className="text-sm text-[#1A1617]/70">Updated November 16, 2026</p>
        </header>
        <div className="space-y-8 text-sm text-[#1A1617]/85 leading-relaxed">
          <section className="p-5 rounded-2xl bg-[#F4EFE6] border border-[#E6DFD5] space-y-2">
            <h2 className="font-serif text-lg font-semibold flex items-center gap-2 text-[#2B070E]"><Shield className="w-4 h-4 text-[#A80F24]" /> Information submitted to DRIFT</h2>
            <p>When you submit a design request, the form sends the contact and selection details you provide to the site service. Requests are accepted only when the service is available. Newsletter signup works the same way. Do not submit sensitive personal information in these forms.</p>
          </section>
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold">Browser storage and analytics</h2>
            <p>The site may use browser storage to retain cart selections and your consent preference. Google Analytics is not configured unless the site operator supplies a valid measurement ID; without it, the analytics consent banner and analytics script are not enabled.</p>
          </section>
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold">Questions or requests</h2>
            <p>For questions about information you submitted, email <a href="mailto:concierge@drift-luxury.com" className="text-[#A80F24] font-semibold underline">concierge@drift-luxury.com</a>. Please include enough information for us to identify your request, and avoid sending payment details by email.</p>
          </section>
        </div>
      </article>
    </main>
  );
}
