import type { Metadata } from 'next';
import './globals.css';
import GlassNavbar from '@/components/navigation/GlassNavbar';
import SlideOverCartDrawer from '@/components/drawers/SlideOverCartDrawer';
import SearchAndFilmModals from '@/components/modals/SearchAndFilmModals';
import Toast from '@/components/ui/Toast';
import PaisleyPreloader from '@/components/preloader/PaisleyPreloader';
import CollectionsEdgeHydrator from '@/components/common/CollectionsEdgeHydrator';
import CookieConsentBanner from '@/components/analytics/CookieConsentBanner';

export const metadata: Metadata = {
  metadataBase: new URL('https://drift-luxury.pages.dev'),
  title: {
    default: 'Sovereign Indian Handloom Archive | DRIFT',
    template: '%s | DRIFT',
  },
  description:
    'Explore six documented Indian textile traditions—Patan Patola, Varanasi Katan, Kanchipuram silk, and Paithani brocades—catalogued as luxury design studies.',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://drift-luxury.pages.dev',
    siteName: 'DRIFT Indian Textile Archive',
    title: 'Sovereign Indian Handloom Archive | DRIFT',
    description:
      'Explore six documented Indian textile traditions—Patan Patola, Varanasi Katan, Kanchipuram silk, and Paithani brocades—catalogued as luxury design studies.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DRIFT Indian Luxury Textile Archive — Six Regional Weaving Traditions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sovereign Indian Handloom Archive | DRIFT',
    description:
      'Explore six documented Indian textile traditions—Patan Patola, Varanasi Katan, Kanchipuram silk, and Paithani brocades—catalogued as luxury design studies.',
    images: ['/og-image.jpg'],
    creator: '@drifttextiles',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#FAF7F2] text-[#1A1617] antialiased min-h-screen selection:bg-[#A80F24] selection:text-[#FAF7F2]">
        <CollectionsEdgeHydrator />
        <PaisleyPreloader />
        <GlassNavbar />
        <main>{children}</main>
        <SlideOverCartDrawer />
        <SearchAndFilmModals />
        <Toast />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
