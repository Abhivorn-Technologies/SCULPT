import type { Metadata } from "next";
import Link from "next/link";
import { Cookie, Calendar, Phone, Mail, MapPin, ShieldCheck, CheckCircle2, Lock, Sliders } from "lucide-react";
import CookiePreferencesButton from "@/components/ui/CookiePreferencesButton";

export const metadata: Metadata = {
  title: "Cookie Policy — The Sculpt Aesthetics Hyderabad",
  description:
    "Learn about how The Sculpt Aesthetics uses cookies and tracking technologies in compliance with the Digital Personal Data Protection (DPDP) Act, 2023.",
  alternates: {
    canonical: "https://thesculptaesthetics.com/cookie-policy",
  },
  openGraph: {
    title: "Cookie Policy | The Sculpt Aesthetics",
    description:
      "Cookie Policy and user tracking preferences for The Sculpt Aesthetics website under DPDP Act 2023.",
    url: "https://thesculptaesthetics.com/cookie-policy",
    siteName: "The Sculpt Aesthetics",
    type: "website",
  },
};

export default function CookiePolicyPage() {
  const lastUpdated = "October 2026";

  return (
    <div className="pt-24 pb-20 bg-[#FDFBF7] min-h-screen">
      {/* Hero Header */}
      <section className="bg-[#151515] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#E6663A_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-[#F6B73C] text-xs font-bold uppercase tracking-[0.25em] bg-[#E6663A]/20 border border-[#E6663A]/40 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-sm">
            <Cookie className="w-3.5 h-3.5 text-[#F6B73C]" />
            DPDP Act 2023 Compliance
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Cookie <span className="text-[#E6663A]">Policy</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            How The Sculpt Aesthetics utilizes cookies and tracking technologies to ensure security, improve performance, and respect your privacy choices.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-white/50 pt-2">
            <Calendar className="w-3.5 h-3.5 text-[#E6663A]" />
            <span>Last Updated: {lastUpdated}</span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-[#EFE8E0] shadow-sm space-y-10 text-[#444444] text-base leading-relaxed">
          
          {/* Quick Action Box */}
          <div className="bg-[#FAF8F5] border border-[#EFE8E0] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-serif font-bold text-lg text-[#151515] flex items-center justify-center sm:justify-start gap-2">
                <Sliders className="w-4 h-4 text-[#E6663A]" />
                Manage Your Cookie Preferences
              </h3>
              <p className="text-xs text-[#666666]">
                You can review, modify, or withdraw your consent for non-essential cookies at any time.
              </p>
            </div>
            <CookiePreferencesButton className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E6663A] to-[#F6B73C] text-white font-bold text-xs uppercase tracking-wider hover:brightness-105 shadow-md shadow-[#E6663A]/20 transition-all inline-flex items-center gap-2" />
          </div>

          {/* 1. Introduction */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">01.</span> Introduction & Legal Context
            </h2>
            <p>
              This Cookie Policy explains how <strong>The Sculpt Aesthetics</strong> (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) uses cookies, web beacons, local storage, and similar technologies on our website <strong>https://thesculptaesthetics.com</strong>.
            </p>
            <p>
              We are committed to operating in full accordance with the <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong> of India and applicable Information Technology Rules. We ensure that you are clearly informed about any tracking technology deployed on our website and give you transparent control to accept or reject non-essential cookies.
            </p>
          </section>

          {/* 2. What are Cookies? */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">02.</span> What Are Cookies and Tracking Technologies?
            </h2>
            <p>
              Cookies are small data files placed on your browser or device when you visit websites. They are widely used by modern web platforms to make websites work efficiently, provide secure browsing sessions, remember user preferences, and generate aggregated analytics.
            </p>
            <p>
              In addition to cookies, we may use browser local storage (HTML5 Local Storage) solely to remember your chosen cookie consent preferences so that you are not repeatedly prompted on each page visit.
            </p>
          </section>

          {/* 3. Categories of Cookies We Use */}
          <section className="space-y-6 pt-6 border-t border-[#EFE8E0]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">03.</span> Categories of Cookies We Use
            </h2>
            <p>
              Under the DPDP Act 2023, personal data must only be processed for specific lawful purposes. We categorize all cookies into three clear tiers:
            </p>

            {/* Category A */}
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#EFE8E0] space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-[#151515] flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#25D366]" /> A. Strictly Necessary Cookies
                </h3>
                <span className="text-[11px] font-mono font-bold bg-[#25D366]/15 text-[#1b8841] px-2.5 py-0.5 rounded-full">
                  Mandatory
                </span>
              </div>
              <p className="text-sm text-[#555555]">
                These cookies are technically indispensable for the website to function securely and properly. Without these cookies, services like booking appointment consultations, CSRF security verification, and remembering your consent state cannot be provided.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#EFE8E0] text-[#151515]">
                      <th className="py-2 pr-4 font-bold">Cookie Name</th>
                      <th className="py-2 pr-4 font-bold">Purpose</th>
                      <th className="py-2 pr-4 font-bold">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFE8E0]/60 text-[#666666]">
                    <tr>
                      <td className="py-2 pr-4 font-mono text-[#E6663A]">sculpt_cookie_consent_v1</td>
                      <td className="py-2 pr-4">Stores your cookie consent preferences and choices</td>
                      <td className="py-2 pr-4">12 Months</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-mono text-[#E6663A]">next-auth.session-token</td>
                      <td className="py-2 pr-4">Secures administrative panel login (admin users only)</td>
                      <td className="py-2 pr-4">Session</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-mono text-[#E6663A]">__Host-csrf-token</td>
                      <td className="py-2 pr-4">Protects forms against cross-site request forgery attacks</td>
                      <td className="py-2 pr-4">Session</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Category B */}
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#EFE8E0] space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-[#151515] flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#E6663A]" /> B. Performance & Analytics Cookies
                </h3>
                <span className="text-[11px] font-mono font-bold bg-[#E6663A]/15 text-[#E6663A] px-2.5 py-0.5 rounded-full">
                  Consent Required
                </span>
              </div>
              <p className="text-sm text-[#555555]">
                These cookies help us understand how prospective patients interact with our clinical pages, which surgical procedures receive the most interest, and where navigation errors occur. All data is collected in aggregated or anonymized format.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#EFE8E0] text-[#151515]">
                      <th className="py-2 pr-4 font-bold">Cookie Name</th>
                      <th className="py-2 pr-4 font-bold">Purpose</th>
                      <th className="py-2 pr-4 font-bold">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFE8E0]/60 text-[#666666]">
                    <tr>
                      <td className="py-2 pr-4 font-mono text-[#E6663A]">_ga / _ga_*</td>
                      <td className="py-2 pr-4">Aggregated visitor counting and site engagement analysis</td>
                      <td className="py-2 pr-4">2 Years</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Category C */}
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#EFE8E0] space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-[#151515] flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#F6B73C]" /> C. Functional & Third-Party Embeds
                </h3>
                <span className="text-[11px] font-mono font-bold bg-[#F6B73C]/20 text-[#c28416] px-2.5 py-0.5 rounded-full">
                  Consent Required
                </span>
              </div>
              <p className="text-sm text-[#555555]">
                Our website integrates interactive features such as embedded Google Maps for clinic directions and YouTube video players for educational surgical explanations. These third parties may set cookies to enable their player or map features.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#EFE8E0] text-[#151515]">
                      <th className="py-2 pr-4 font-bold">Provider</th>
                      <th className="py-2 pr-4 font-bold">Purpose</th>
                      <th className="py-2 pr-4 font-bold">Privacy Policy</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFE8E0]/60 text-[#666666]">
                    <tr>
                      <td className="py-2 pr-4 font-medium text-[#151515]">Google Maps Embed</td>
                      <td className="py-2 pr-4">Interactive directions to Madhapur clinic</td>
                      <td className="py-2 pr-4">
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#E6663A] underline">
                          Google Privacy Policy
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-medium text-[#151515]">YouTube (youtube-nocookie)</td>
                      <td className="py-2 pr-4">Educational procedure videos in privacy-enhanced mode</td>
                      <td className="py-2 pr-4">
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#E6663A] underline">
                          Google Privacy Policy
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 4. How to Manage and Withdraw Cookie Consent */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">04.</span> Managing and Withdrawing Consent
            </h2>
            <p>
              Under Section 6 of the DPDP Act 2023, you have the right to withdraw consent as easily as it was given. You have multiple ways to control cookies:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                <strong>Website Consent Manager:</strong> Click the &ldquo;Cookie Preferences&rdquo; button in our website footer or the quick-action button at the top of this page to adjust your preferences or disable non-essential cookies immediately.
              </li>
              <li>
                <strong>Browser Settings:</strong> You can configure your browser (Google Chrome, Mozilla Firefox, Safari, Microsoft Edge) to reject all cookies or notify you whenever a cookie is set. Note that blocking necessary cookies may affect the ability to submit consultation bookings.
              </li>
            </ul>
          </section>

          {/* 5. Contact and Grievance Officer */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0] bg-[#FAF8F5] p-6 sm:p-8 rounded-2xl">
            <h2 className="font-serif text-2xl font-bold text-[#151515] flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#E6663A]" /> Grievance Redressal for Privacy & Cookies
            </h2>
            <p className="text-sm text-[#555555]">
              If you have any questions about our use of cookies or wish to lodge a grievance under the DPDP Act 2023, our designated Grievance Officer is available:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm pt-2">
              <div className="space-y-2">
                <p className="font-bold text-[#151515]">Grievance Redressal Officer</p>
                <p className="text-xs text-[#777777]">The Sculpt Aesthetics — Privacy & Compliance Desk</p>
                <div className="flex items-start gap-2 pt-1 text-xs text-[#555555]">
                  <MapPin className="w-4 h-4 text-[#E6663A] shrink-0 mt-0.5" />
                  <span>4th Floor, Boppana&apos;s Annapurna Arcade, near Metro Pillar no c1729, Phase 2, Kavuri Hills, Madhapur, Hyderabad, Telangana 500081</span>
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#E6663A] shrink-0" />
                  <a href="tel:+919639635454" className="hover:text-[#E6663A] font-medium transition-colors">
                    +91 96396 35454
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#E6663A] shrink-0" />
                  <a href="mailto:thesculptaesthetics@gmail.com" className="hover:text-[#E6663A] font-medium transition-colors">
                    thesculptaesthetics@gmail.com
                  </a>
                </div>

                <div className="text-xs text-[#777777] pt-1">
                  Response Commitment: All privacy inquiries are acknowledged and responded to within <strong>30 days</strong> as required by Indian law.
                </div>
              </div>
            </div>
          </section>

          {/* Related Links */}
          <div className="pt-4 flex flex-wrap items-center justify-between text-xs text-[#777777] gap-3 border-t border-[#EFE8E0]">
            <span>Related Documents:</span>
            <div className="flex items-center gap-4">
              <Link href="/privacy-policy" className="text-[#E6663A] hover:underline font-medium">Privacy Policy</Link>
              <Link href="/terms-of-service" className="text-[#E6663A] hover:underline font-medium">Terms of Service</Link>
              <Link href="/medical-disclaimer" className="text-[#E6663A] hover:underline font-medium">Medical Disclaimer</Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
