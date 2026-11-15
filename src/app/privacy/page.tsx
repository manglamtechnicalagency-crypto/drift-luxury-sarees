import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, FileText, Mail, Eye } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Transparent privacy policy detailing how DRIFT collects, uses, and safeguards customer delivery details, newsletter subscriptions, and consented analytics.',
  openGraph: {
    title: 'Privacy Policy | DRIFT',
    description: 'Transparent privacy policy detailing how DRIFT collects, uses, and safeguards customer data.',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1A1617] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-[#A80F24] hover:text-[#8A0C1D] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Loom Archive</span>
          </Link>
        </div>

        {/* Header */}
        <div className="border-b border-[#E6DFD5] pb-8 space-y-3 text-left">
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#A80F24] font-bold block">
            DATA INTEGRITY & USER RIGHTS
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1A1617] font-semibold tracking-tight">
            Privacy Policy
          </h1>
          <p className="font-sans text-xs text-[#1A1617]/70 font-light">
            Effective Date: November 2026 • Last Updated: November 15, 2026
          </p>
        </div>

        {/* Intro */}
        <div className="prose prose-stone max-w-none space-y-8 font-sans text-xs sm:text-sm text-[#1A1617]/85 leading-relaxed text-left">
          
          <div className="p-5 rounded-2xl bg-[#F4EFE6] border border-[#E6DFD5] space-y-2">
            <div className="flex items-center gap-2 font-serif text-sm font-semibold text-[#2B070E]">
              <Shield className="w-4 h-4 text-[#A80F24]" />
              <span>Our Privacy Pledge</span>
            </div>
            <p className="text-xs text-[#1A1617]/80">
              DRIFT operates as an editorial luxury handloom archive and design studio. We collect only what is strictly necessary to fulfill your orders, send requested textile dispatches, and protect the site against automated abuse. We never sell, lease, or monetize your personal information.
            </p>
          </div>

          {/* Section 1: Data We Collect */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-[#1A1617] font-semibold flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#A80F24]" />
              <span>1. Information We Collect</span>
            </h2>
            <p>We collect information in three specific scenarios on this website:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Order & Atelier Inquiries:</strong> When you complete a checkout or reservation request, we collect your full name, email address, optional phone number, delivery address, and postal PIN code. This data is used solely to record your selected saree specifications and facilitate delivery logistics.
              </li>
              <li>
                <strong>Textile Journal Newsletter:</strong> When you submit your email in our newsletter form, we store your email address in our database to send occasional updates on seasonal collections and artisan loom drops.
              </li>
              <li>
                <strong>Anonymous Analytics (Consented Only):</strong> If you click &quot;Accept&quot; on our cookie consent banner, Google Analytics (ID: G-XXXXXXXXXX) collects anonymized telemetry (device category, general geographic country/region, visited pages, and session duration) to help us understand site performance.
              </li>
              <li>
                <strong>Security Logs:</strong> For edge rate-limiting and anti-bot suppression, our Cloudflare edge infrastructure transiently logs client IP addresses (e.g. limiting newsletter requests to 5 per minute and orders to 10 per hour per IP).
              </li>
            </ul>
          </section>

          {/* Section 2: Storage & Database */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-[#1A1617] font-semibold flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#A80F24]" />
              <span>2. How Your Data is Stored</span>
            </h2>
            <p>
              Your order records and newsletter subscriptions are stored within an encrypted Cloudflare D1 relational database hosted across Cloudflare&apos;s global edge network. Access to the underlying database is restricted to authenticated studio administrators via secure API tokens.
            </p>
          </section>

          {/* Section 3: Cookies & Tracking Technologies */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-[#1A1617] font-semibold flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#A80F24]" />
              <span>3. Cookies & Tracking</span>
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Essential Local Storage:</strong> We use your browser&apos;s local storage to preserve your cart items, selected colorways, and your cookie consent preference (<code>drift_cookie_consent</code>). These are strictly necessary for the digital storefront to function.
              </li>
              <li>
                <strong>Analytics Cookies:</strong> We do not load or execute Google Analytics scripts for visitors in the EU, UK, Switzerland, or worldwide until explicit consent is given via the banner. If you choose &quot;Decline&quot;, no analytics scripts or third-party cookies are set.
              </li>
            </ul>
          </section>

          {/* Section 4: Data Retention & User Rights */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-[#1A1617] font-semibold flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#A80F24]" />
              <span>4. Your Rights & Contact Details</span>
            </h2>
            <p>
              Under applicable data protection laws (including GDPR and Indian Digital Personal Data Protection Act principles), you have the right to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Request a complete copy of the personal data we hold about you.</li>
              <li>Request immediate correction or total erasure of your order history or newsletter subscription.</li>
              <li>Unsubscribe from our newsletter at any time with a single click or notice.</li>
            </ul>
            <p className="pt-2">
              To exercise any of these rights, contact our studio concierge at{' '}
              <a href="mailto:concierge@drift-luxury.com" className="text-[#A80F24] font-semibold underline">
                concierge@drift-luxury.com
              </a>
              . Requests are processed within 48 business hours.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
