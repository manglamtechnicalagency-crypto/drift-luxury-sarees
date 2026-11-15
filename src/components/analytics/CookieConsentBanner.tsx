'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, X } from 'lucide-react';

const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';
const CONSENT_STORAGE_KEY = 'drift_cookie_consent';

export default function CookieConsentBanner() {
  const [consentStatus, setConsentStatus] = useState<'pending' | 'accepted' | 'declined'>('pending');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (saved === 'accepted') {
      setConsentStatus('accepted');
      loadGoogleAnalytics();
    } else if (saved === 'declined') {
      setConsentStatus('declined');
    }
  }, []);

  const loadGoogleAnalytics = () => {
    if (typeof window === 'undefined') return;
    if (document.getElementById('drift-ga4-script')) return;

    // 1. Load gtag.js
    const script = document.createElement('script');
    script.id = 'drift-ga4-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // 2. Initialize dataLayer
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(args);
    }
    (window as any).gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure',
    });
  };

  const handleAccept = () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, 'accepted');
    setConsentStatus('accepted');
    loadGoogleAnalytics();
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, 'declined');
    setConsentStatus('declined');
  };

  if (!mounted || consentStatus !== 'pending') {
    return null;
  }

  return (
    <aside
      role="region"
      aria-label="Cookie Preferences"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-[#2B070E]/95 backdrop-blur-xl border border-[#D4AF37]/40 rounded-2xl p-5 shadow-2xl text-[#FAF7F2] animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-[#E6B83A] flex-shrink-0" />
          <h2 className="font-serif text-sm font-semibold text-[#FAF7F2]">
            Privacy & Analytics Consent
          </h2>
        </div>
        <button
          onClick={handleDecline}
          aria-label="Close cookie banner"
          className="text-[#FAF7F2]/60 hover:text-[#FAF7F2] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="mt-2 text-xs font-sans text-[#FAF7F2]/75 font-light leading-relaxed">
        We use anonymous Google Analytics cookies (ID: {GA_MEASUREMENT_ID}) for EU/UK/Swiss and global visitors strictly to assess page performance and traffic. We never sell personal data. Read our{' '}
        <Link href="/privacy" className="underline text-[#E6B83A] hover:text-[#FAF7F2] transition-colors">
          Privacy Policy
        </Link>
        .
      </p>

      <div className="mt-4 flex items-center gap-2.5">
        <button
          type="button"
          onClick={handleAccept}
          className="flex-1 py-2 px-3.5 rounded-lg bg-[#D4AF37] hover:bg-[#E6B83A] text-[#2B070E] font-sans font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={handleDecline}
          className="flex-1 py-2 px-3.5 rounded-lg bg-white/10 hover:bg-white/15 border border-[#FAF7F2]/20 text-[#FAF7F2] font-sans font-medium text-xs uppercase tracking-wider transition-colors"
        >
          Decline
        </button>
      </div>
    </aside>
  );
}
