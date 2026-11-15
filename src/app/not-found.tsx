import Link from 'next/link';
import { ArrowLeft, Compass, Sparkles, Home, Eye } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Archive Entry Not Found | DRIFT',
  description: 'The requested textile design study could not be located. Explore our documented regional Indian handloom collections.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#2B070E] text-[#FAF7F2] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24 select-none relative overflow-hidden">
      {/* Ambient Gold Radial Vignette */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl w-full text-center space-y-8">
        
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F2]/10 backdrop-blur-md border border-[#D4AF37]/40 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#E6B83A]" />
          <span className="text-[10px] sm:text-xs font-sans tracking-[0.25em] text-[#E6B83A] uppercase font-bold">
            404 · ARCHIVE DIRECTORY
          </span>
        </div>

        {/* Main Title Stack */}
        <div className="space-y-3">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#FAF7F2] font-normal tracking-tight">
            Archive Entry <span className="italic text-[#E6B83A] font-serif">Not Found</span>
          </h1>
          <p className="text-sm sm:text-base text-[#FAF7F2]/75 font-light max-w-lg mx-auto font-sans leading-relaxed">
            The requested textile design study or loom catalog does not exist or has been relocated within our regional archive.
          </p>
        </div>

        {/* Navigational Recovery Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-4">
          <Link
            href="/"
            className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/60 hover:bg-white/10 transition-all group flex items-start gap-3.5"
          >
            <div className="p-2.5 rounded-xl bg-[#D4AF37]/15 text-[#E6B83A] group-hover:bg-[#D4AF37] group-hover:text-[#2B070E] transition-colors">
              <Home className="w-4 h-4" />
            </div>
            <div>
              <p className="font-serif text-sm font-semibold text-[#FAF7F2] group-hover:text-[#E6B83A] transition-colors">
                Return to Storefront
              </p>
              <p className="text-xs text-[#FAF7F2]/60 font-sans mt-0.5">
                Full bleed hero, silk waving visual, and regional highlights.
              </p>
            </div>
          </Link>

          <Link
            href="/#curated-curved-arc"
            className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/60 hover:bg-white/10 transition-all group flex items-start gap-3.5"
          >
            <div className="p-2.5 rounded-xl bg-[#D4AF37]/15 text-[#E6B83A] group-hover:bg-[#D4AF37] group-hover:text-[#2B070E] transition-colors">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <p className="font-serif text-sm font-semibold text-[#FAF7F2] group-hover:text-[#E6B83A] transition-colors">
                Regional Loom Archive
              </p>
              <p className="text-xs text-[#FAF7F2]/60 font-sans mt-0.5">
                3D curved-arc stage with Patan, Banaras, and Kanchi weaves.
              </p>
            </div>
          </Link>

          <Link
            href="/#bridal-scalloped-zone"
            className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/60 hover:bg-white/10 transition-all group flex items-start gap-3.5"
          >
            <div className="p-2.5 rounded-xl bg-[#D4AF37]/15 text-[#E6B83A] group-hover:bg-[#D4AF37] group-hover:text-[#2B070E] transition-colors">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <p className="font-serif text-sm font-semibold text-[#FAF7F2] group-hover:text-[#E6B83A] transition-colors">
                Bridal Collection
              </p>
              <p className="text-xs text-[#FAF7F2]/60 font-sans mt-0.5">
                Scalloped crimson zone featuring ceremonial handloom drapes.
              </p>
            </div>
          </Link>

          <Link
            href="/#autumn-winter-studio"
            className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/60 hover:bg-white/10 transition-all group flex items-start gap-3.5"
          >
            <div className="p-2.5 rounded-xl bg-[#D4AF37]/15 text-[#E6B83A] group-hover:bg-[#D4AF37] group-hover:text-[#2B070E] transition-colors">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="font-serif text-sm font-semibold text-[#FAF7F2] group-hover:text-[#E6B83A] transition-colors">
                Autumn–Winter Studio
              </p>
              <p className="text-xs text-[#FAF7F2]/60 font-sans mt-0.5">
                Arch trio lookbook and interactive Change Look 3D studio.
              </p>
            </div>
          </Link>
        </div>

        {/* Primary Action Button */}
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#D4AF37] hover:bg-[#E6B83A] text-[#2B070E] font-sans font-bold text-xs uppercase tracking-[0.2em] shadow-lg transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Explore All Regional Sarees</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
