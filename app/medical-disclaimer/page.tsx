import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Calendar, Phone, Mail, MapPin, MessageCircle, Stethoscope, HeartPulse, HelpCircle, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Medical Disclaimer — The Sculpt Aesthetics Hyderabad",
  description:
    "Read the Medical Disclaimer of The Sculpt Aesthetics. Understand that website content is educational, individual results vary, and in-person medical evaluation is required for all surgical procedures.",
  alternates: {
    canonical: "https://thesculptaesthetics.com/medical-disclaimer",
  },
  openGraph: {
    title: "Medical Disclaimer | The Sculpt Aesthetics",
    description:
      "Important medical disclaimer and clinical information policy for patients of The Sculpt Aesthetics in Hyderabad.",
    url: "https://thesculptaesthetics.com/medical-disclaimer",
    siteName: "The Sculpt Aesthetics",
    type: "website",
  },
};

export default function MedicalDisclaimerPage() {
  const lastUpdated = "September 2024";

  return (
    <div className="pt-24 pb-20 bg-[#FDFBF7] min-h-screen">
      {/* Hero Header */}
      <section className="bg-[#151515] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#E6663A_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-[#F6B73C] text-xs font-bold uppercase tracking-[0.25em] bg-[#E6663A]/20 border border-[#E6663A]/40 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-sm">
            <AlertTriangle className="w-3.5 h-3.5 text-[#F6B73C]" />
            Clinical Advisory
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Medical <span className="text-[#E6663A]">Disclaimer</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Essential clinical information regarding website content, surgical candidacy, individualized outcomes, and medical consultations.
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

          {/* Primary Alert Banner */}
          <div className="bg-[#FAF8F5] p-6 rounded-2xl border-l-4 border-[#E6663A] space-y-3">
            <div className="flex items-center gap-2 text-[#E6663A] font-bold text-lg font-serif">
              <Stethoscope className="w-5 h-5" />
              <span>General Informational &amp; Educational Purpose Only</span>
            </div>
            <p className="text-sm text-[#444444] leading-relaxed">
              The content published on <strong>https://thesculptaesthetics.com</strong>—including text, procedure overviews, surgical techniques, recovery guidelines, pricing estimates, FAQs, and Before &amp; After imagery—is provided solely for general educational and informational orientation. It does not constitute medical advice, diagnosis, or a formal treatment recommendation.
            </p>
          </div>

          {/* 1. Not a Substitute for Medical Advice */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">01.</span> Not a Substitute for Professional Medical Advice
            </h2>
            <p>
              Information on this website cannot replace an in-person clinical consultation, physical examination, and diagnostic evaluation by our senior board-certified plastic and cosmetic surgeons (<strong>Dr. Jagadish Kiran, M.S., M.Ch</strong> and <strong>Dr. Suma Sandhyala, M.S., M.Ch</strong>).
            </p>
            <p>
              You must not rely on the information on this website as an alternative to medical advice from your physician or other professional healthcare provider. If you have specific questions about any medical matter or surgical procedure, you should consult our clinic specialists or seek immediate professional medical attention.
            </p>
          </section>

          {/* 2. Individual Results May Vary */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">02.</span> Individual Results May Vary
            </h2>
            <p>
              Every human body is anatomically and biologically unique. Outcome results from aesthetic surgery, body contouring, facial rejuvenation, and dermatological procedures depend on numerous individual factors, including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Age, genetics, and baseline anatomical proportions.</li>
              <li>Skin tone, elasticity, thickness, and underlying tissue architecture.</li>
              <li>Individual metabolic rate, biological healing capacity, and immune response.</li>
              <li>Pre-existing medical conditions, medications, and surgical history.</li>
              <li>Strict adherence to pre-operative preparation and post-operative aftercare instructions.</li>
              <li>Lifestyle choices such as nutrition, hydration, smoking, sun exposure, and physical exercise.</li>
            </ul>
            <p>
              <strong>The Sculpt Aesthetics does not guarantee specific or identical surgical outcomes for any patient.</strong>
            </p>
          </section>

          {/* 3. Surgical Risks & Complications */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">03.</span> Potential Risks &amp; Complications
            </h2>
            <p>
              All surgical and non-surgical cosmetic interventions carry inherent medical considerations and risks. While our hospital adheres to stringent sterility protocols, US FDA-approved technologies, and board-certified surgical standards, potential considerations associated with invasive procedures may include:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Temporary post-operative swelling, bruising, edema, or local tenderness.</li>
              <li>Transient numbness or altered sensory nerve sensations around incision zones.</li>
              <li>Normal surgical scarring (which our surgeons carefully conceal in natural skin creases).</li>
              <li>Rare risks such as infection, hematoma, seroma, delayed healing, or reaction to anesthesia.</li>
            </ul>
            <p>
              Comprehensive, procedure-specific risks, benefits, and alternative treatment options are thoroughly discussed with each patient during an in-depth in-person consultation prior to obtaining informed written consent.
            </p>
          </section>

          {/* 4. Consultation & Diagnosis */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">04.</span> Clinical Candidacy &amp; Diagnosis
            </h2>
            <p>
              Submitting an appointment request or medical inquiry online does not establish a formal doctor-patient relationship. Surgical candidacy, procedure selection (e.g., open vs. closed rhinoplasty, liposuction vs. tummy tuck), and surgical feasibility can only be finalized following a physical clinical evaluation, review of medical records, and necessary pre-operative lab assessments.
            </p>
          </section>

          {/* 5. Before & After Photographs */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">05.</span> Before &amp; After Results Imagery
            </h2>
            <p>
              The Before &amp; After photographs and clinical outcome galleries presented on this website depict actual, authentic patients treated by our surgical team with explicit patient consent.
            </p>
            <div className="bg-[#F8F6F2] p-4 rounded-xl text-sm space-y-1.5 border border-[#EFE8E0]">
              <p className="font-semibold text-[#151515]">Important Photographic Notice:</p>
              <p className="text-[#555555]">
                These images illustrate individual surgical and clinical outcomes. They are provided solely for educational demonstration of surgical technique and anatomical improvement. They do not represent a warranty, guarantee, or promise that every patient will achieve identical aesthetic contours.
              </p>
            </div>
          </section>

          {/* 6. Testimonials & Patient Experiences */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">06.</span> Testimonials &amp; Patient Reviews
            </h2>
            <p>
              Patient testimonials and feedback published on our website or linked from verified review platforms reflect the real-life personal experiences and opinions of individual patients. These experiences are specific to each individual patient&rsquo;s care journey and may not necessarily be representative of all patients undergoing similar treatments.
            </p>
          </section>

          {/* 7. Emergency Situations */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3 text-[#E6663A]">
              <HeartPulse className="w-6 h-6 text-[#E6663A]" /> 07. Emergency Medical Situations
            </h2>
            <div className="bg-red-50 p-5 rounded-2xl border border-red-200 space-y-2">
              <p className="font-bold text-red-900">
                Do NOT use this website, WhatsApp, or contact forms for emergency medical situations.
              </p>
              <p className="text-sm text-red-800 leading-relaxed">
                If you are experiencing a severe medical emergency, acute chest pain, uncontrolled bleeding, severe shortness of breath, or any life-threatening symptoms, please call your local emergency emergency helpline (<strong>108 / 112</strong> in India) immediately or proceed to the nearest hospital emergency department.
              </p>
            </div>
          </section>

          {/* 8. Content Accuracy & External Information */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] flex items-center gap-3">
              <span className="text-[#E6663A] text-lg font-mono">08.</span> Website Information &amp; External References
            </h2>
            <p>
              While our clinical team takes diligent care to ensure that all procedure descriptions, medical explanations, recovery timelines, and surgical information on this website are accurate and reflective of modern clinical guidelines at the time of publication, medical standards continually evolve. The Sculpt Aesthetics assumes no liability for errors, omissions, or outdated medical information.
            </p>
          </section>

          {/* 9. Contact / In-Person Consultation */}
          <section className="space-y-4 pt-6 border-t border-[#EFE8E0] bg-[#FAF8F5] p-6 sm:p-8 rounded-2xl">
            <h2 className="font-serif text-2xl font-bold text-[#151515] flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#E6663A]" /> Schedule a Professional Consultation
            </h2>
            <p className="text-sm text-[#555555]">
              To discuss your personal aesthetic goals, evaluate your candidacy, and receive a customized treatment plan from our senior plastic surgeons, please contact our clinic directly:
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
                    href="https://wa.me/919639635454?text=Hello%2C%20I%20would%20like%20to%20book%20a%20consultation%20at%20The%20Sculpt%20Aesthetics."
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
