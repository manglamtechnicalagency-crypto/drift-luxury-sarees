'use client';

import { HeartHandshake, BookOpen, CircleHelp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-drift-dark border-t border-drift-gold/25 text-drift-sand text-xs relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-drift-gold to-transparent" />

      {/* Weaver Guild Trust Banner */}
      <div className="bg-drift-crimson-deep/40 border-b border-drift-gold/15 py-8 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-2 text-drift-gold">
            <HeartHandshake className="w-5 h-5" />
            <span className="font-serif uppercase tracking-[0.2em] font-semibold text-xs">
              A living textile archive
            </span>
          </div>
          <p className="text-drift-sand/90 font-light text-xs sm:text-sm leading-relaxed">
            This editorial storefront presents design studies inspired by documented regional traditions. Seller, maker, product, price, inventory and image rights are not yet verified; sourcing notes are included with each region.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand & Atelier Lore (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-serif text-2xl tracking-[0.25em] gold-gradient-text font-bold">
              DRIFT
            </h3>
            <p className="text-drift-sand/70 font-light leading-relaxed max-w-sm">
              DRIFT is an editorial exploration of Indian textile traditions, presented as contemporary design studies rather than verified sale listings.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-1.5 text-drift-gold text-[11px] font-serif">
                <BookOpen className="w-4 h-4" />
                <span>Research notes included</span>
              </div>
              <div className="flex items-center gap-1.5 text-drift-gold text-[11px] font-serif">
                <CircleHelp className="w-4 h-4" />
                <span>Product facts pending confirmation</span>
              </div>
            </div>
          </div>

          {/* Col 2: Regional Traditions */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm uppercase tracking-wider text-white font-medium">
              Loom Traditions
            </h4>
            <ul className="space-y-2 text-drift-sand/70 font-serif">
              <li><a href="#loom-journey" className="hover:text-drift-gold transition-colors">Gujarat &amp; Kutch</a></li>
              <li><a href="#loom-journey" className="hover:text-drift-gold transition-colors">Rajasthan</a></li>
              <li><a href="#loom-journey" className="hover:text-drift-gold transition-colors">Jodhpur &amp; Marwar</a></li>
              <li><a href="#loom-journey" className="hover:text-drift-gold transition-colors">Varanasi</a></li>
              <li><a href="#loom-journey" className="hover:text-drift-gold transition-colors">Kanchipuram &amp; South India</a></li>
              <li><a href="#loom-journey" className="hover:text-drift-gold transition-colors">Heritage States</a></li>
            </ul>
          </div>

          {/* Col 3: Publication notes */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm uppercase tracking-wider text-white font-medium">
              Before a product launch
            </h4>
            <ul className="space-y-2 text-drift-sand/70 font-light">
              <li>Confirm seller and SKU</li>
              <li>Verify fibre, weave and origin</li>
              <li>Clear image usage rights</li>
              <li>Connect pricing and inventory</li>
            </ul>
          </div>

          {/* Col 4: Availability note */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm uppercase tracking-wider text-white font-medium">
              Availability
            </h4>
            <p className="text-drift-sand/70 font-light text-xs">
              These design studies are not for sale. Prices, materials, suppliers and current stock have not been confirmed.
            </p>
            <a href="#loom-journey" className="inline-block border-b border-drift-gold/50 pb-1 text-[10px] font-semibold uppercase tracking-wider text-drift-gold hover:text-white">Explore the archive</a>
          </div>

        </div>

        {/* Bottom Rights & Silk Mark Certification */}
        <div className="mt-14 pt-8 border-t border-drift-border flex flex-col sm:flex-row items-center justify-between text-[11px] text-drift-sand/50 gap-4">
          <p>© 2026 DRIFT HAUTE COUTURE SAREES. All Rights Reserved.</p>
          <div className="flex space-x-6 font-serif">
            <span className="hover:text-drift-sand cursor-pointer">Artisan Provenance Registry</span>
            <span className="hover:text-drift-sand cursor-pointer">Pure Silk Care Guide</span>
            <span className="hover:text-drift-sand cursor-pointer">Concierge Warranty</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
