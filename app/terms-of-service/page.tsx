import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Calendar, Phone, Mail, MapPin, MessageCircle, AlertCircle, Scale, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service — The Sculpt Aesthetics Hyderabad",
  description:
    "Review the Terms of Service for The Sculpt Aesthetics website. Understand the conditions governing website use, appointment bookings, intellectual property, and medical informational content.",
  alternates: {
    canonical: "https://thesculptaesthetics.com/terms-of-service",
  },
  openGraph: {
    title: "Terms of Service | The Sculpt Aesthetics",
    description:
      "Terms of Service and conditions of website use for The Sculpt Aesthetics in Madhapur, Hyderabad.",
    url: "https://thesculptaesthetics.com/terms-of-service",
    siteName: "The Sculpt Aesthetics",
    type: "website",
  },
};

export default function TermsOfServicePage() {
  const lastUpdated = "September 2024";

  return (
    <div className="pt-24 pb-20 bg-[#FDFBF7] min-h-screen">
      {/* Hero Header */}
      <section className="bg-[#151515] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#E6663A_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-[#F6B73C] text-xs font-bold uppercase tracking-[0.25em] bg-[#E6663A]/20 border border-[#E6663A]/40 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-sm">
            <Scale className="w-3.5 h-3.5 text-[#F6B73C]" />
            Legal Agreement
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Terms of <span className="text-[#E6663A]">Service</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            The terms and conditions governing the use of The Sculpt Aesthetics website and online consultation services.
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

          {/* 1. Introduction & Acceptance */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">01.</span> Introduction & Acceptance of Terms
            </h2>
            <p>
              These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement between you (&ldquo;User,&rdquo; &ldquo;you,&rdquo; or &ldquo;your&rdquo;) and <strong>The Sculpt Aesthetics</strong> (&ldquo;Sculpt,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), governing your access to and use of our website located at <strong>https://thesculptaesthetics.com</strong> (the &ldquo;Website&rdquo;).
            </p>
            <p>
              By accessing, browsing, submitting inquiries, or booking consultations through this Website, you acknowledge that you have read, understood, and agreed to be bound by these Terms and our <Link href="/privacy-policy" className="text-[#E6663A] font-semibold hover:underline">Privacy Policy</Link>. If you do not agree to these Terms, please discontinue use of the Website immediately.
            </p>
          </section>

          {/* 2. Medical Information & Content */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">02.</span> Medical Information & Educational Purpose
            </h2>
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border-l-4 border-[#E6663A] space-y-2">
              <p className="font-bold text-[#151515] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#E6663A]" /> Website Information Does Not Constitute Medical Advice
              </p>
              <p className="text-sm text-[#555555]">
                All text, procedure descriptions, graphics, images, video content, and blog guides published on this Website are provided strictly for general educational and informational purposes.
              </p>
            </div>
            <p>
              Nothing on this Website creates a doctor-patient relationship, nor should it be used as a substitute for professional in-person medical diagnosis, physical examination, or treatment by a qualified board-certified plastic surgeon or dermatologist. Always consult directly with our surgical specialists regarding any medical condition or cosmetic procedure.
            </p>
          </section>

          {/* 3. Website Use & User Responsibilities */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">03.</span> Permitted Website Use & User Conduct
            </h2>
            <p>
              You agree to use this Website solely for lawful, personal, and non-commercial purposes. Specifically, you agree that you will not:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Submit false, misleading, impersonated, or fraudulent information in consultation or appointment forms.</li>
              <li>Attempt to compromise, disrupt, probe, or breach the security of the Website or associated server infrastructure.</li>
              <li>Use automated scrapers, bots, or data-extraction tools to scrape website images, text, or patient outcome assets without written consent.</li>
              <li>Introduce malicious software, viruses, trojans, or corrupt data to the Website.</li>
            </ul>
          </section>

          {/* 4. Appointments & Consultations */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">04.</span> Appointments & Clinic Consultations
            </h2>
            <p>
              Booking an appointment or submitting a consultation request through this Website represents an expression of interest and scheduling request:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Appointment dates and times requested online are subject to surgeon operating schedules and clinic confirmation.</li>
              <li>Our patient coordination team will confirm or reschedule your consultation via phone call or WhatsApp message.</li>
              <li>Consultation fees (if applicable for specialized diagnostic evaluation) and surgical treatment estimates are discussed transparently during or following your initial clinical assessment.</li>
            </ul>
          </section>

          {/* 5. Communication */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">05.</span> Clinic Communications & Messaging
            </h2>
            <p>
              By providing your contact details (phone number, email address, WhatsApp number), you consent to receiving communications from The Sculpt Aesthetics regarding your consultation inquiries, appointment confirmations, clinic directions, and requested treatment information. You may opt out of non-transactional messages at any time.
            </p>
          </section>

          {/* 6. Intellectual Property */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">06.</span> Intellectual Property Rights
            </h2>
            <p>
              All content on this Website—including clinic logos, branding, trademarks, original medical copy, blog articles, procedure illustrations, photography, Before &amp; After result imagery, and software code—is the exclusive intellectual property of The Sculpt Aesthetics or licensed for our authorized use.
            </p>
            <p>
              Unauthorized reproduction, copying, distribution, modification, public display, or commercial exploitation of any patient imagery, branding, or clinical text without prior written permission from The Sculpt Aesthetics is strictly prohibited and subject to legal action under Indian copyright and trademark laws.
            </p>
          </section>

          {/* 7. Third-Party Links */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">07.</span> Third-Party Links & Platforms
            </h2>
            <p>
              This Website may provide hyperlinks to external third-party services, including Google Maps location services, social media networks, and video platforms. These links are provided solely for patient convenience. The Sculpt Aesthetics does not endorse, control, or assume liability for the content, privacy practices, or operations of external third-party websites.
            </p>
          </section>

          {/* 8. Accuracy of Information */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">08.</span> Accuracy of Website Information
            </h2>
            <p>
              While we strive to keep medical descriptions, doctor credentials, and procedural guidelines accurate and current, medical science and clinical techniques continually advance. The Website is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind, whether express or implied.
            </p>
          </section>

          {/* 9. No Guarantee of Results */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">09.</span> No Guarantee of Medical or Surgical Results
            </h2>
            <p>
              Human anatomy, skin elasticity, biological healing processes, and lifestyle habits vary between individuals. <strong>No cosmetic surgical, non-surgical, or dermatological procedure guarantees uniform or specific individual results.</strong> Before &amp; After photographs on this Website represent actual individual outcomes achieved for specific patients and do not constitute a promise or warranty of identical results for other patients.
            </p>
          </section>

          {/* 10. Limitation of Liability */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">10.</span> Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by applicable Indian law, The Sculpt Aesthetics, its directors, surgeons, medical practitioners, employees, and developers shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your access to, use of, or inability to use this Website, or any reliance placed on general informational content published herein.
            </p>
          </section>

          {/* 11. Changes to Services / Terms */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">11.</span> Modifications to Website & Terms
            </h2>
            <p>
              We reserve the right to modify, suspend, update, or discontinue any aspect of the Website or these Terms at any time without prior notice. Changes become effective immediately upon posting to this page. Your continued use of the Website after modifications constitutes acceptance of the updated Terms.
            </p>
          </section>

          {/* 12. Governing Law & Jurisdiction */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">12.</span> Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms of Service and any disputes arising out of or related to the use of this Website shall be governed by and construed in accordance with the laws of the Republic of India. The courts of <strong>Hyderabad, Telangana, India</strong> shall have exclusive jurisdiction over all claims and legal proceedings.
            </p>
          </section>

          {/* 13. Contact Information */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0] bg-[#FAF8F5] p-6 sm:p-8 rounded-2xl">
            <h2 className="font-serif text-2xl font-bold text-[#151515] flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-[#E6663A]" /> Inquiries Regarding Terms of Service
            </h2>
            <p className="text-sm text-[#555555]">
              If you have any questions or require clarification regarding these Terms of Service, please contact our administrative office:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm pt-2">
              <div className="space-y-2">
                <p className="font-bold text-[#151515]">The Sculpt Aesthetics</p>
                <div className="flex items-start gap-2 pt-1 text-xs text-[#555555]">
                  <MapPin className="w-4 h-4 text-[#E6663A] shrink-0 mt-0.5" />
                  <span>4th Floor, H.No.279, Boppana&apos;s Annapurna Arcade, Near Metro Pillar No 1729 Phase-2, Madhapur Main Road, Kavuri Hills, Hyderabad, Telangana 500081</span>
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#E6663A] shrink-0" />
                  <a href="tel:+919639635454" className="hover:text-[#E6663A] font-medium transition-colors">
                    +91 96396 35454
                  </a>
                  <span className="text-xs text-[#999999]">/</span>
                  <a href="tel:+919133733733" className="hover:text-[#E6663A] font-medium transition-colors">
                    +91 91337 33733
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#E6663A] shrink-0" />
                  <a href="mailto:contact@thesculpt.co.in" className="hover:text-[#E6663A] font-medium transition-colors">
                    contact@thesculpt.co.in
                  </a>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
