import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Calendar, Phone, Mail, MapPin, MessageCircle, Lock, Eye, FileText, CheckCircle2, UserCheck, AlertCircle, Scale, Database } from "lucide-react";
import CookiePreferencesButton from "@/components/ui/CookiePreferencesButton";

export const metadata: Metadata = {
  title: "Privacy Policy (DPDP Act 2023) — The Sculpt Aesthetics Hyderabad",
  description:
    "Read the Privacy Policy of The Sculpt Aesthetics. Learn how we collect, safeguard, and process your personal and consultation data in compliance with the Digital Personal Data Protection (DPDP) Act, 2023.",
  alternates: {
    canonical: "https://thesculptaesthetics.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | The Sculpt Aesthetics",
    description:
      "DPDP Act 2023 compliant Privacy Policy and patient data handling practices at The Sculpt Aesthetics in Madhapur, Hyderabad.",
    url: "https://thesculptaesthetics.com/privacy-policy",
    siteName: "The Sculpt Aesthetics",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "October 2026";

  return (
    <div className="pt-24 pb-20 bg-[#FDFBF7] min-h-screen">
      {/* Hero Header */}
      <section className="bg-[#151515] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#E6663A_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-[#F6B73C] text-xs font-bold uppercase tracking-[0.25em] bg-[#E6663A]/20 border border-[#E6663A]/40 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F6B73C]" />
            DPDP Act 2023 & Healthcare Compliance
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Privacy <span className="text-[#E6663A]">Policy</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            How The Sculpt Aesthetics processes, protects, and respects your personal data in accordance with India&apos;s Digital Personal Data Protection Act, 2023.
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
          
          {/* Statutory Notice Banner */}
          <div className="bg-[#FAF8F5] border-l-4 border-[#E6663A] p-5 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-[#151515] font-serif font-bold text-base">
              <Scale className="w-5 h-5 text-[#E6663A]" /> Notice Under Digital Personal Data Protection (DPDP) Act, 2023
            </div>
            <p className="text-xs sm:text-sm text-[#555555]">
              This policy constitutes a statutory privacy notice under Section 5 of the Digital Personal Data Protection Act, 2023. When you submit personal information through this website, you are informed of the specified purposes for processing, the manner in which you may exercise your rights, and how you may lodge a complaint with our Grievance Officer or the Data Protection Board of India.
            </p>
          </div>

          {/* 1. Entity Disclosures */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">01.</span> Data Fiduciary & Technical Processor
            </h2>
            <p>
              In accordance with Indian data protection laws:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EFE8E0] space-y-2">
                <span className="text-xs font-mono font-bold text-[#E6663A] uppercase tracking-wider block">
                  Data Fiduciary (Controller)
                </span>
                <p className="font-bold text-[#151515]">The Sculpt Aesthetics</p>
                <p className="text-xs text-[#666666]">
                  Center for Plastic Surgery & Advanced Dermatology<br />
                  Madhapur, Hyderabad, Telangana, India.<br />
                  Responsible for determining the purpose and means of processing your clinical inquiries.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EFE8E0] space-y-2">
                <span className="text-xs font-mono font-bold text-[#F6B73C] uppercase tracking-wider block">
                  Data Processor (Technical Infrastructure)
                </span>
                <p className="font-bold text-[#151515]">Authorized Technical Infrastructure Partner</p>
                <p className="text-xs text-[#666666]">
                  Cloud hosting management, web engineering, and technical compliance infrastructure providers for The Sculpt Aesthetics platform under strict contractual confidentiality obligations.
                </p>
              </div>
            </div>
          </section>

          {/* 2. Personal Data We Collect */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">02.</span> Personal Data We Collect
            </h2>
            <p>
              We collect only the minimum necessary digital personal data required to respond to your consultation inquiries and facilitate aesthetic care:
            </p>

            <div className="space-y-4 pl-2 sm:pl-4">
              <h3 className="font-serif text-xl font-semibold text-[#151515] flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#E6663A]" /> A. Data Provided Voluntarily by You:
              </h3>
              <ul className="list-disc list-inside space-y-2 pl-2 text-sm">
                <li><strong>Identity & Contact Information:</strong> Full name, mobile/WhatsApp telephone number, and email address.</li>
                <li><strong>Clinical Inquiry Context:</strong> Primary procedure or surgical service of interest (e.g. Rhinoplasty, Gynecomastia, Liposuction, Breast Surgery, Hair Restoration, Dermatology).</li>
                <li><strong>Consultation Requests:</strong> Preferred appointment timing, questions, or optional notes provided in form fields.</li>
              </ul>
            </div>

            <div className="space-y-4 pl-2 sm:pl-4 pt-2">
              <h3 className="font-serif text-xl font-semibold text-[#151515] flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#E6663A]" /> B. Technical & Device Data (Collected Automatically):
              </h3>
              <ul className="list-disc list-inside space-y-2 pl-2 text-sm">
                <li>Technical parameters: Browser type, operating system, device screen resolution, and language settings.</li>
                <li>Browsing activity: Pages visited, time spent on procedure overviews, and referring website sources.</li>
                <li>Network logs: Truncated or anonymized IP addresses used for website security and server traffic monitoring.</li>
              </ul>
            </div>
          </section>

          {/* 3. Lawful Basis & Specified Purposes */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">03.</span> Lawful Grounds & Purposes of Processing
            </h2>
            <p>
              Under Sections 4, 5, and 6 of the DPDP Act 2023, personal data is processed solely for specific, clear, and lawful purposes:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-[#EFE8E0] text-[#151515]">
                    <th className="py-2.5 pr-4 font-bold">Purpose of Processing</th>
                    <th className="py-2.5 pr-4 font-bold">Lawful Ground (DPDP Act)</th>
                    <th className="py-2.5 pr-4 font-bold">Data Elements</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFE8E0]/60 text-[#555555]">
                  <tr>
                    <td className="py-2.5 pr-4 font-medium text-[#151515]">Scheduling & coordinating clinical consultations</td>
                    <td className="py-2.5 pr-4">Explicit Consent (Sec. 6)</td>
                    <td className="py-2.5 pr-4">Name, Phone, Service, Date</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-medium text-[#151515]">Responding to WhatsApp or phone inquiries</td>
                    <td className="py-2.5 pr-4">Voluntary Provision & Consent (Sec. 6)</td>
                    <td className="py-2.5 pr-4">Contact number, Inquiry notes</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-medium text-[#151515]">Website security, anti-spam & CSRF protection</td>
                    <td className="py-2.5 pr-4">Legitimate Uses (Sec. 7)</td>
                    <td className="py-2.5 pr-4">IP, Timestamp, Browser headers</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-medium text-[#151515]">Compliance with Clinical Establishments Act & medical rules</td>
                    <td className="py-2.5 pr-4">Legal Obligation (Sec. 7)</td>
                    <td className="py-2.5 pr-4">Patient communication logs</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 4. Third-Party Service Providers */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">04.</span> Third-Party Data Processors & Sub-Processors
            </h2>
            <p>
              <strong>We do NOT sell, rent, monetize, or trade your personal data to advertisers or data brokers under any circumstances.</strong>
            </p>
            <p>
              We engage only trusted third-party service providers bound by strict confidentiality and data protection contracts:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EFE8E0] space-y-1">
                <span className="font-bold text-[#151515] block">MongoDB Atlas Cloud</span>
                <p className="text-[#666666]">Encrypted database storage for consultation inquiry records with role-based access controls.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EFE8E0] space-y-1">
                <span className="font-bold text-[#151515] block">SMTP & Email Infrastructure</span>
                <p className="text-[#666666]">Secure transactional email relays for transmitting appointment notifications to clinic coordinators.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EFE8E0] space-y-1">
                <span className="font-bold text-[#151515] block">WhatsApp / Meta Business API</span>
                <p className="text-[#666666]">End-to-end encrypted direct messaging when you initiate communication with our official clinic numbers.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EFE8E0] space-y-1">
                <span className="font-bold text-[#151515] block">Cloudflare / Hosting CDN</span>
                <p className="text-[#666666]">Edge caching, SSL/TLS encryption, and distributed denial-of-service (DDoS) security protection.</p>
              </div>
            </div>
          </section>

          {/* 5. Data Security Measures */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">05.</span> Technical & Organizational Security Measures
            </h2>
            <p>
              In accordance with Section 8(5) of the DPDP Act 2023, we implement reasonable security safeguards to prevent personal data breaches:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2 text-sm">
              <li><strong>Encryption in Transit:</strong> 256-bit Transport Layer Security (TLS 1.3 / HTTPS) encryption for all incoming web requests and form transmissions.</li>
              <li><strong>Role-Based Access Control (RBAC):</strong> Administrative access to consultation inquiries is restricted strictly to authenticated medical coordination personnel via secure credentials.</li>
              <li><strong>Least-Privilege Principle:</strong> Technical team members have access only to what is strictly required for server maintenance.</li>
              <li><strong>Input Validation & Sanitization:</strong> All form inputs are sanitized on the server side to protect against SQL/NoSQL injection, cross-site scripting (XSS), and malicious payloads.</li>
              <li><strong>Breach Notification:</strong> In the unlikely event of a personal data breach affecting your records, we will notify both the Data Protection Board of India and affected individuals in accordance with prescribed statutory rules.</li>
            </ul>
          </section>

          {/* 6. Data Retention & Deletion */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">06.</span> Data Retention & Erasure
            </h2>
            <p>
              We retain consultation leads only for as long as is necessary to fulfill the initial consultation request, coordinate clinic visits, and comply with clinical documentation requirements under Indian healthcare statutes:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2 text-sm">
              <li><strong>Online Consultation Inquiries:</strong> Retained for up to 12 months from the date of submission if no clinical procedure is scheduled, after which the lead is permanently erased.</li>
              <li><strong>Registered Clinic Patients:</strong> Once an in-person clinical relationship is established, records are maintained in compliance with the National Medical Commission (NMC) regulations and the Clinical Establishments Act.</li>
            </ul>
          </section>

          {/* 7. Rights of Data Principals */}
          <section className="space-y-5 pt-6 border-t border-[#EFE8E0]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">07.</span> Your Statutory Rights (DPDP Act, 2023)
            </h2>
            <p>
              As a Data Principal under Indian law, you are entitled to exercise the following rights free of charge:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EFE8E0] space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-[#151515]">
                  <CheckCircle2 className="w-4 h-4 text-[#E6663A]" />
                  1. Right to Access Information (Sec. 11)
                </div>
                <p className="text-xs text-[#666666]">
                  You have the right to request a summary of the personal data we process about you, the identities of all third parties with whom it has been shared, and related processing details.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EFE8E0] space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-[#151515]">
                  <CheckCircle2 className="w-4 h-4 text-[#E6663A]" />
                  2. Right to Correction & Erasure (Sec. 12)
                </div>
                <p className="text-xs text-[#666666]">
                  You may request correction of inaccurate data, completion of incomplete information, or erasure of personal data that is no longer necessary for the original purpose.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EFE8E0] space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-[#151515]">
                  <CheckCircle2 className="w-4 h-4 text-[#E6663A]" />
                  3. Right to Withdraw Consent (Sec. 6)
                </div>
                <p className="text-xs text-[#666666]">
                  Where processing is based on consent, you may withdraw your consent at any time. The withdrawal process is as easy as providing consent, and processing will cease upon withdrawal.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EFE8E0] space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-[#151515]">
                  <UserCheck className="w-4 h-4 text-[#E6663A]" />
                  4. Right to Nominate (Sec. 14)
                </div>
                <p className="text-xs text-[#666666]">
                  You have the right to designate another individual who shall exercise your data rights on your behalf in the event of your death or incapacity.
                </p>
              </div>
            </div>

            <p className="text-xs text-[#777777] pt-2">
              To exercise any of these rights, please submit a written request to our Grievance Redressal Officer using the contact details below. We will authenticate your request and respond within 30 days.
            </p>
          </section>

          {/* 8. Cookies & Preferences */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">08.</span> Cookies & Tracking Technologies
            </h2>
            <p>
              We utilize essential cookies for security and site navigation, as well as optional analytics cookies to improve our informational resources. You can review detailed cookie specifications or modify your preferences at any time:
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/cookie-policy"
                className="text-xs font-semibold px-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#EFE8E0] text-[#151515] hover:text-[#E6663A] hover:border-[#E6663A] transition-colors"
              >
                View Full Cookie Policy →
              </Link>
              <CookiePreferencesButton className="text-xs font-bold px-4 py-2 rounded-xl bg-gradient-to-r from-[#E6663A] to-[#F6B73C] text-white hover:brightness-105 shadow-sm inline-flex items-center gap-1.5" />
            </div>
          </section>

          {/* 9. Children's Privacy */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">09.</span> Processing Children&apos;s Personal Data (Sec. 9)
            </h2>
            <p>
              In strict adherence to Section 9 of the DPDP Act 2023, our website is intended exclusively for individuals aged 18 and above. We do not knowingly collect personal data from minors online, nor do we engage in tracking, behavioral monitoring, or targeted advertising directed at children. Any pediatric consultations must be requested directly by a verifiable parent or legal guardian.
            </p>
          </section>

          {/* 10. Grievance Redressal Mechanism & Escalation */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0] bg-[#FAF8F5] p-6 sm:p-8 rounded-2xl">
            <h2 className="font-serif text-2xl font-bold text-[#151515] flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#E6663A]" /> Grievance Redressal Mechanism (Sec. 13)
            </h2>
            <p className="text-sm text-[#555555]">
              If you have any questions, concerns, or grievances regarding the processing of your personal data or wish to exercise your statutory rights, please contact our designated Grievance Officer:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm pt-2">
              <div className="space-y-2">
                <p className="font-bold text-[#151515]">Grievance Redressal Officer</p>
                <p className="text-xs text-[#777777]">The Sculpt Aesthetics</p>
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
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#E6663A] shrink-0" />
                  <a href="mailto:thesculptaesthetics@gmail.com" className="hover:text-[#E6663A] font-medium transition-colors">
                    thesculptaesthetics@gmail.com
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
                    WhatsApp Support: +91 96396 35454
                  </a>
                </div>

                <p className="text-xs text-[#777777] pt-1">
                  <strong>Response Timeline:</strong> All grievances are acknowledged within 48 hours and resolved within <strong>30 days</strong> from receipt.
                </p>
              </div>
            </div>

            {/* Escalation to Data Protection Board of India */}
            <div className="mt-4 pt-4 border-t border-[#EFE8E0] space-y-1">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#151515] flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-[#E6663A]" /> Escalation to the Data Protection Board of India (DPBI)
              </h4>
              <p className="text-xs text-[#666666]">
                If your grievance is not resolved by our Grievance Officer within 30 days, or if you are dissatisfied with the resolution, you have the statutory right under Section 13(3) of the DPDP Act 2023 to file an appeal before the <strong>Data Protection Board of India</strong>.
              </p>
            </div>
          </section>

          {/* Related Links */}
          <div className="pt-4 flex flex-wrap items-center justify-between text-xs text-[#777777] gap-3 border-t border-[#EFE8E0]">
            <span>Related Documents:</span>
            <div className="flex items-center gap-4">
              <Link href="/cookie-policy" className="text-[#E6663A] hover:underline font-medium">Cookie Policy</Link>
              <Link href="/terms-of-service" className="text-[#E6663A] hover:underline font-medium">Terms of Service</Link>
              <Link href="/medical-disclaimer" className="text-[#E6663A] hover:underline font-medium">Medical Disclaimer</Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
