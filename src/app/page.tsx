'use client';

import React from 'react';
import FullBleedHero from '@/components/hero/FullBleedHero';
import LoomJourney from '@/components/editorial/LoomJourney';
import InfiniteMarqueeAndStates from '@/components/marquee/InfiniteMarqueeAndStates';
import CurvedArcCarousel from '@/components/carousel/CurvedArcCarousel';
import MerchandisingGrids from '@/components/grids/MerchandisingGrids';
import BridalCollectionZone from '@/components/bridal/BridalCollectionZone';
import QuickAddRows from '@/components/quickadd/QuickAddRows';
import AutumnWinterStudio from '@/components/studio/AutumnWinterStudio';
import OccasionsAndAccordion from '@/components/occasions/OccasionsAndAccordion';
import VideoChapterStage from '@/components/video/VideoChapterStage';
import ReviewsSection from '@/components/reviews/ReviewsSection';
import FAQSection from '@/components/faq/FAQSection';
import FannedDeckAndFooter from '@/components/journal/FannedDeckAndFooter';
import TrendAtelier from '@/components/editorial/TrendAtelier';

export default function HomePage() {
  return (
    <div className="w-full overflow-x-hidden bg-[#FAF7F2]">
      {/* 1. Full-bleed video hero with a vanilla Three.js dust field */}
      <FullBleedHero />

      {/* Scroll-scrubbed passage through the six regional design archives */}
      <LoomJourney />

      {/* 2. Infinite Burgundy USP Marquee & Six Weaving Centres 3D Tilt Grid */}
      <InfiniteMarqueeAndStates />

      {/* 3. Regional Loom Archive 3D Cylindrical Curved-Arc Carousel */}
      <CurvedArcCarousel />

      {/* 4. State-filtered regional design studies */}
      <MerchandisingGrids />

      {/* 5. "The Bridal Collection" Scalloped Burgundy Zone with Spotlight Card */}
      <BridalCollectionZone />

      {/* 6. Editorial picks drawn from the regional collections */}
      <QuickAddRows />

      {/* 2026 regional trend signals interpreted as premium textile color studies */}
      <TrendAtelier />

      {/* 7. "Autumn–Winter 2026" Arch Trio & Interactive "Change Look" 3D Studio */}
      <AutumnWinterStudio />

      {/* 8. "EDITS FOR every occasion" & "Worth your attention" Expanding Accordion */}
      <OccasionsAndAccordion />

      {/* 9. "Woven silks, in motion" Video Chapter Switcher */}
      <VideoChapterStage />

      {/* Client reviews with verified patron placeholders only */}
      <ReviewsSection />

      {/* Sourced FAQ Section with confirmation tags */}
      <FAQSection />

      {/* 10. "LATEST TRENDS" 3D Fanned Card Deck & Panoramic Group Footer */}
      <FannedDeckAndFooter />
    </div>
  );
}
