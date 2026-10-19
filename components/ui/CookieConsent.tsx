"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, ShieldCheck, Settings2, X, Check, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
  timestamp: string;
}

const STORAGE_KEY = "sculpt_cookie_consent_v1";

export default function CookieConsent() {
  const [hasConsented, setHasConsented] = useState<boolean>(true); // default true to avoid flash on SSR
  const [showPreferences, setShowPreferences] = useState<boolean>(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    functional: false,
    marketing: false,
    timestamp: "",
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setPreferences(JSON.parse(stored));
        setHasConsented(true);
      } else {
        setHasConsented(false);
      }
    } catch {
      setHasConsented(false);
    }

    const handleOpenPreferences = () => {
      setShowPreferences(true);
    };

    window.addEventListener("open-cookie-preferences", handleOpenPreferences);
    return () => {
      window.removeEventListener("open-cookie-preferences", handleOpenPreferences);
    };
  }, []);

  const saveConsent = (updated: CookiePreferences) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save cookie consent", e);
    }
    setPreferences(updated);
    setHasConsented(true);
    setShowPreferences(false);
  };

  const handleAcceptAll = () => {
    const updated: CookiePreferences = {
      essential: true,
      analytics: true,
      functional: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    saveConsent(updated);
  };

  const handleRejectNonEssential = () => {
    const updated: CookiePreferences = {
      essential: true,
      analytics: false,
      functional: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    saveConsent(updated);
  };

  const handleSavePreferences = () => {
    const updated: CookiePreferences = {
      ...preferences,
      essential: true,
      timestamp: new Date().toISOString(),
    };
    saveConsent(updated);
  };

  return (
    <>
      {/* 1. Bottom Floating Cookie Consent Banner */}
      <AnimatePresence>
        {!hasConsented && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-xl z-[90] bg-[#151515] text-white border border-[#E6663A]/30 rounded-2xl p-5 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl"
            role="region"
            aria-label="Cookie Consent Banner"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#E6663A]/20 text-[#F6B73C] flex items-center justify-center shrink-0 border border-[#E6663A]/30">
                <Cookie className="w-5 h-5" />
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-base text-white flex items-center gap-2">
                    We Respect Your Privacy
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider bg-[#E6663A]/20 text-[#F6B73C] px-2 py-0.5 rounded-full border border-[#E6663A]/40">
                      DPDP Act 2023
                    </span>
                  </h3>
                </div>
                <p className="text-xs text-white/70 leading-relaxed">
                  We use cookies and similar technologies to enhance your browsing experience, provide secure consultations, and analyze website traffic in compliance with India&apos;s Digital Personal Data Protection (DPDP) Act, 2023.
                </p>
                <div className="pt-0.5">
                  <Link
                    href="/cookie-policy"
                    className="text-[11px] text-[#F6B73C] hover:text-[#E6663A] underline underline-offset-2 transition-colors inline-flex items-center gap-1 font-medium"
                  >
                    Read our full Cookie Policy <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2.5 pt-4 mt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => setShowPreferences(true)}
                className="px-3.5 py-2 text-xs font-semibold text-white/80 hover:text-white rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 transition-all flex items-center gap-1.5"
              >
                <Settings2 className="w-3.5 h-3.5 text-[#F6B73C]" />
                Preferences
              </button>
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="px-4 py-2 text-xs font-semibold text-white/90 hover:text-white rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 transition-all"
              >
                Reject Non-Essential
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="px-5 py-2 text-xs font-bold text-white rounded-lg bg-gradient-to-r from-[#E6663A] to-[#F6B73C] hover:brightness-105 shadow-md shadow-[#E6663A]/30 transition-all"
              >
                Accept All
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Detailed Cookie Preferences Modal */}
      <AnimatePresence>
        {showPreferences && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPreferences(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="cookie-modal-title"
              className="relative w-full max-w-xl bg-[#151515] text-white rounded-3xl border border-white/15 p-6 sm:p-8 shadow-2xl z-10 my-auto max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-white/10">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-xs text-[#F6B73C] font-mono uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-[#E6663A]" />
                    Consent Manager
                  </div>
                  <h2 id="cookie-modal-title" className="font-serif text-2xl font-bold text-white">
                    Cookie & Tracking Preferences
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPreferences(false)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                  aria-label="Close cookie preferences"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="overflow-y-auto py-5 space-y-4 pr-1 text-xs sm:text-sm text-white/80">
                <p className="text-white/70 leading-relaxed">
                  In compliance with the <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong>, we provide you granular control over what categories of cookies and tracking tools we use during your visit.
                </p>

                {/* 1. Strictly Necessary */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white flex items-center gap-2">
                        1. Strictly Necessary Cookies
                        <span className="text-[10px] bg-[#25D366]/20 text-[#25D366] px-2 py-0.5 rounded-full font-mono uppercase">
                          Always Active
                        </span>
                      </h4>
                      <p className="text-xs text-white/60 mt-0.5">
                        Required for basic navigation, CSRF security, consultation form operation, and storing consent.
                      </p>
                    </div>
                    <div className="shrink-0 pl-3">
                      <span className="text-xs text-white/40 font-mono">Mandatory</span>
                    </div>
                  </div>
                </div>

                {/* 2. Analytics & Performance */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="pr-4">
                      <h4 className="font-bold text-white">2. Analytics & Performance</h4>
                      <p className="text-xs text-white/60 mt-0.5">
                        Helps us understand page visit counts, loading speeds, and popular medical procedures so we can optimize patient experience.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={(e) =>
                          setPreferences({ ...preferences, analytics: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E6663A]"></div>
                    </label>
                  </div>
                </div>

                {/* 3. Functional & Media Embeds */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="pr-4">
                      <h4 className="font-bold text-white">3. Functional & Third-Party Embeds</h4>
                      <p className="text-xs text-white/60 mt-0.5">
                        Enables interactive features like Google Maps location navigation and clinical video demonstrations via YouTube.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        checked={preferences.functional}
                        onChange={(e) =>
                          setPreferences({ ...preferences, functional: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E6663A]"></div>
                    </label>
                  </div>
                </div>

                <div className="text-[11px] text-white/50 pt-1">
                  You can withdraw or update your consent at any time via the &ldquo;Cookie Preferences&rdquo; link in our website footer or on our{" "}
                  <Link href="/cookie-policy" className="text-[#F6B73C] underline hover:text-[#E6663A]">
                    Cookie Policy
                  </Link>{" "}
                  page.
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleRejectNonEssential}
                  className="px-4 py-2 text-xs font-semibold text-white/80 hover:text-white rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 transition-all"
                >
                  Reject Non-Essential
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSavePreferences}
                    className="px-4 py-2 text-xs font-bold text-white rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 transition-all"
                  >
                    Save Preferences
                  </button>
                  <button
                    type="button"
                    onClick={handleAcceptAll}
                    className="px-5 py-2 text-xs font-bold text-white rounded-xl bg-gradient-to-r from-[#E6663A] to-[#F6B73C] hover:brightness-105 shadow-md shadow-[#E6663A]/30 transition-all flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Accept All
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
