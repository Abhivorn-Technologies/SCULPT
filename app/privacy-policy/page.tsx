import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Calendar, Phone, Mail, MapPin, MessageCircle, Lock, Eye, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — The Sculpt Aesthetics Hyderabad",
  description:
    "Read the Privacy Policy of The Sculpt Aesthetics. Learn how we collect, safeguard, and handle your personal and consultation information in accordance with healthcare privacy standards.",
  alternates: {
    canonical: "https://thesculptaesthetics.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | The Sculpt Aesthetics",
    description:
      "Privacy Policy and patient data handling practices at The Sculpt Aesthetics in Madhapur, Hyderabad.",
    url: "https://thesculptaesthetics.com/privacy-policy",
    siteName: "The Sculpt Aesthetics",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "September 2024";

  return (
    <div className="pt-24 pb-20 bg-[#FDFBF7] min-h-screen">
      {/* Hero Header */}
      <section className="bg-[#151515] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#E6663A_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-[#F6B73C] text-xs font-bold uppercase tracking-[0.25em] bg-[#E6663A]/20 border border-[#E6663A]/40 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F6B73C]" />
            Legal & Compliance
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Privacy <span className="text-[#E6663A]">Policy</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            How The Sculpt Aesthetics collects, uses, protects, and respects your personal and consultation information.
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
          
          {/* 1. Introduction */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">01.</span> Introduction
            </h2>
            <p>
              Welcome to <strong>The Sculpt Aesthetics</strong> (&ldquo;Sculpt,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). We operate the website <strong>https://thesculptaesthetics.com</strong> and provide cosmetic surgery, plastic surgery, and clinical aesthetic treatments in Madhapur, Hyderabad, Telangana, India.
            </p>
            <p>
              We are committed to maintaining the privacy, confidentiality, and security of the personal and medical inquiries you share with us. This Privacy Policy describes the types of information we may collect from you when you visit our website, schedule a consultation, or contact our medical team, and how we safeguard and process that data.
            </p>
          </section>

          {/* 2. Information We Collect */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">02.</span> Information We Collect
            </h2>
            <p>
              Depending on how you interact with our website and clinic communication channels, we collect information in two primary ways:
            </p>

            <div className="space-y-4 pl-2 sm:pl-4">
              <h3 className="font-serif text-xl font-semibold text-[#151515] flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#E6663A]" /> Information You Provide Directly:
              </h3>
              <p>
                When you fill out a consultation booking form, reach out via WhatsApp, phone, or email, you may provide:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>Full name and contact details (phone number, WhatsApp number, email address).</li>
                <li>Preferred consultation date, time, and service/procedure of interest (e.g., Rhinoplasty, Liposuction, Gynecomastia, Breast Surgery).</li>
                <li>Any optional messages, questions, or preliminary medical context you choose to share in free-text inquiry fields.</li>
              </ul>
            </div>

            <div className="space-y-4 pl-2 sm:pl-4 pt-2">
              <h3 className="font-serif text-xl font-semibold text-[#151515] flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#E6663A]" /> Information Collected Automatically:
              </h3>
              <p>
                When you browse our website, standard web analytics and server logs may automatically record:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>Browser type, operating system, device screen resolution, and language preferences.</li>
                <li>Referring URL, pages visited on our website, time spent on pages, and navigation flows.</li>
                <li>Anonymized or truncated IP addresses used for general geolocation analysis and website performance optimization.</li>
              </ul>
            </div>
          </section>

          {/* 3. How We Use Your Information */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">03.</span> How We Use Your Information
            </h2>
            <p>
              We use collected information exclusively for legitimate medical practice and patient care purposes, including:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Scheduling, confirming, and coordinating in-person or virtual cosmetic consultations with our surgical team.</li>
              <li>Responding to your inquiries regarding procedure details, doctor availability, clinic timings, and general cost estimates.</li>
              <li>Providing appointment reminders, follow-up notifications, and post-procedure care guidance.</li>
              <li>Monitoring, improving, and optimizing our website responsiveness, speed, and usability across mobile and desktop devices.</li>
              <li>Complying with applicable legal, regulatory, and healthcare documentation obligations under Indian law.</li>
            </ul>
          </section>

          {/* 4. Appointment and Consultation Information */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">04.</span> Appointment & Medical Consultation Data
            </h2>
            <p>
              Information submitted through online appointment booking forms is treated as confidential healthcare inquiry data. It is accessed strictly by authorized medical staff and patient coordinators to facilitate your consultation. Online inquiries do not constitute an established doctor-patient relationship until an in-person clinical assessment is completed by our board-certified surgeons.
            </p>
          </section>

          {/* 5. WhatsApp & Direct Communication */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">05.</span> WhatsApp & Electronic Communication
            </h2>
            <p>
              If you initiate contact with us through our official clinic WhatsApp numbers (<strong>+91 96396 35454</strong> / <strong>+91 91337 33733</strong>) or email:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Your communication is encrypted end-to-end according to WhatsApp/Meta platform protocols.</li>
              <li>Our team uses this channel solely to answer your questions, assist with clinic navigation, share procedure brochures, and coordinate appointments.</li>
              <li>We will never send unsolicited promotional spam. You may request to cease communication at any time by messaging us.</li>
            </ul>
          </section>

          {/* 6. Website Cookies & Analytics */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">06.</span> Website Cookies & Analytics
            </h2>
            <p>
              Our website may utilize essential cookies and basic analytics cookies to recognize returning visits, save user display preferences, and understand which surgical resources are most helpful to patients. You can manage or disable cookies through your browser settings; however, certain website features may have slightly reduced functionality.
            </p>
          </section>

          {/* 7. How We Protect Your Information */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">07.</span> Data Security & Protection
            </h2>
            <p>
              We implement industry-standard administrative, physical, and technical safeguards to secure your personal data:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong>HTTPS / SSL Encryption:</strong> All data transmitted between your browser and our server is secured with high-grade Transport Layer Security (TLS) encryption.</li>
              <li><strong>Restricted Access:</strong> Only authorized clinic personnel with direct patient management responsibilities have access to consultation submissions.</li>
              <li><strong>Secure Hosting:</strong> Our web infrastructure is maintained on secure cloud servers adhering to standard modern security protocols.</li>
            </ul>
          </section>

          {/* 8. Information Sharing and Disclosure */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">08.</span> Information Sharing & Third Parties
            </h2>
            <p>
              <strong>We do NOT sell, trade, rent, or commercialize your personal information to third parties under any circumstances.</strong>
            </p>
            <p>
              We may disclose information only in the following limited circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong>Service Providers:</strong> Trusted technology partners who assist in hosting our website, sending confirmation emails/SMS, or maintaining our clinic records under strict confidentiality obligations.</li>
              <li><strong>Legal Requirements:</strong> If required by Indian law, court order, or authorized government authority to satisfy statutory obligations.</li>
              <li><strong>Patient Safety:</strong> In urgent situations where sharing information is strictly necessary to protect the life, health, or physical safety of a patient or individual.</li>
            </ul>
          </section>

          {/* 9. Data Retention */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">09.</span> Data Retention
            </h2>
            <p>
              We retain consultation inquiries and patient communications only for as long as necessary to fulfill the purposes outlined in this policy, manage clinical follow-ups, and satisfy statutory medical record-keeping requirements under the Clinical Establishments Act and Medical Council guidelines.
            </p>
          </section>

          {/* 10. Your Privacy Rights */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">10.</span> Your Privacy Rights
            </h2>
            <p>
              You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Inquire about the personal information we maintain regarding your consultation requests.</li>
              <li>Request correction of inaccurate or outdated contact information.</li>
              <li>Request deletion of non-essential contact data, subject to statutory healthcare record retention requirements.</li>
              <li>Opt out of non-essential communications at any time by notifying our clinic staff.</li>
            </ul>
          </section>

          {/* 11. Children's Privacy */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">11.</span> Children&rsquo;s Privacy
            </h2>
            <p>
              Our website is intended for adults seeking cosmetic and medical care. We do not knowingly collect personal information online from individuals under 18 years of age without explicit parental or legal guardian consent and direct involvement.
            </p>
          </section>

          {/* 12. External Links */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">12.</span> External Links
            </h2>
            <p>
              Our website may contain links to third-party platforms (such as Google Maps, YouTube, Facebook, or Instagram). We do not control and are not responsible for the privacy practices, content, or data collection policies of external third-party sites. We encourage you to review their respective privacy notices.
            </p>
          </section>

          {/* 13. Changes to This Policy */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">13.</span> Changes to This Privacy Policy
            </h2>
            <p>
              We may periodically update this Privacy Policy to reflect advancements in clinic operations, technological updates, or evolving legal frameworks. Any changes will be posted on this page with an updated &ldquo;Last Updated&rdquo; date. Continued use of the website following changes indicates acknowledgment of the revised terms.
            </p>
          </section>

          {/* 14. Contact Us */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0] bg-[#FAF8F5] p-6 sm:p-8 rounded-2xl">
            <h2 className="font-serif text-2xl font-bold text-[#151515] flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#E6663A]" /> Contact Our Privacy & Clinic Team
            </h2>
            <p className="text-sm text-[#555555]">
              If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us directly:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm pt-2">
              <div className="space-y-2">
                <p className="font-bold text-[#151515]">The Sculpt Aesthetics</p>
                <p className="text-xs text-[#777777]">Center for Plastic Surgery & Dermatology</p>
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
                  <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                  <a
                    href="https://wa.me/919639635454?text=Hello%2C%20I%20have%20a%20privacy%20question%20regarding%20The%20Sculpt%20Aesthetics."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#25D366] font-medium transition-colors"
                  >
                    WhatsApp: +91 96396 35454
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
