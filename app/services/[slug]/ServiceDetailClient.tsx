"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Plus,
  Minus,
  HelpCircle,
  Stethoscope,
  Clock,
  Activity,
  PhoneCall,
  Info,
  DollarSign,
  AlertCircle,
  FileCheck2,
  ChevronRight,
  Play,
  X
} from "lucide-react";
import {
  ServiceItem,
  ServiceVideo,
  getServiceBeforeAfterResults,
  getServiceVideos,
  getServiceRelatedBlogs,
} from "@/lib/servicesData";

interface ServiceDetailClientProps {
  service: ServiceItem;
  relatedServices: ServiceItem[];
}

export default function ServiceDetailClient({
  service,
  relatedServices,
}: ServiceDetailClientProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedVideo, setSelectedVideo] = useState<ServiceVideo | null>(null);

  const results = getServiceBeforeAfterResults(service.slug);
  const videos = getServiceVideos(service.slug);
  const relatedBlogs = getServiceRelatedBlogs(service.slug);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [service.slug]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="pt-24 pb-20 bg-[#F8F6F2] space-y-16 text-[#151515] selection:bg-[#E6663A] selection:text-white">
      {/* 1. SERVICE INTRO / HERO BANNER */}
      <section className="bg-[#151515] text-white py-16 sm:py-20 relative overflow-hidden border-b border-white/10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#E6663A]/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-medium text-white/60">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/our-services" className="hover:text-white transition-colors">
              Our Services
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#F6B73C] font-semibold">{service.name}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6663A]/20 border border-[#E6663A]/40 text-[#F6B73C] text-xs font-semibold uppercase tracking-[0.25em]"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{service.category} CLINICAL EXCELLENCE</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight"
              >
                {service.name}
              </motion.h1>

              {service.introHeadline && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-[#F6B73C] text-base sm:text-lg font-medium leading-relaxed"
                >
                  {service.introHeadline}
                </motion.p>
              )}

              {service.introParagraphs && service.introParagraphs.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="space-y-3 pt-2 text-white/80 text-sm sm:text-base font-light leading-relaxed"
                >
                  {service.introParagraphs.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="pt-4 flex flex-wrap items-center gap-6 text-xs text-white/80"
              >
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#E6663A]" /> Board-Certified Plastic Surgeons
                </span>
                <span className="flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-[#F6B73C]" /> US FDA & NABH Compliant Protocols
                </span>
              </motion.div>
            </div>

            {/* Quick Hero Image Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full md:w-80 h-64 sm:h-72 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 shrink-0 bg-[#252525]"
            >
              <Image
                src={service.image}
                alt={service.name}
                fill
                priority
                className="object-cover filter contrast-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <Link
                  href="/contact"
                  className="w-full btn-sculpt-gradient py-2.5 px-4 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>BOOK CONSULTATION</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MAIN BODY FLOW */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {service.isEmpty ? (
          /* CLEAN PLACEHOLDER FOR SERVICES WITHOUT DEDICATED PDF CONTENT */
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EFE8E0] shadow-sm space-y-8 text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E6663A]/10 text-[#E6663A] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CLINICAL OVERVIEW</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#151515]">
              {service.name} at The Sculpt Aesthetics
            </h2>

            <p className="text-sm sm:text-base text-[#555555] leading-relaxed font-light">
              {service.shortDescription}
            </p>

            <div className="p-6 rounded-2xl bg-[#F8F6F2] border border-[#EFE8E0] text-left space-y-3">
              <h3 className="font-serif font-bold text-base text-[#151515] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#E6663A]" />
                <span>Clinical Protocols Being Finalized</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
                Detailed procedural documentation and specialized treatment guidelines for <strong>{service.name}</strong> are currently being updated by our surgical and aesthetic board.
              </p>
              <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
                Our certified plastic surgeons and aesthetic specialists are available at our Madhapur, Hyderabad clinic for in-person evaluations and customized treatment planning.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="btn-sculpt-gradient py-3.5 px-8 rounded-full font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>SCHEDULE A CONSULTATION</span>
              </Link>
              <a
                href="tel:+919639635454"
                className="py-3.5 px-6 rounded-full border border-[#151515] text-[#151515] hover:bg-[#151515] hover:text-white font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-all"
              >
                <PhoneCall className="w-4 h-4 text-[#E6663A]" />
                <span>CALL 9639635454 / 9133733733</span>
              </a>
            </div>
          </motion.section>
        ) : (
          /* 2-COLUMN PREMIUM LAYOUT (LEFT: PDF CONTENT & FAQ, RIGHT: RESULTS & VIDEOS) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* LEFT COLUMN: All Existing Service Content + Steps + FAQs (col-span-7) */}
            <div className="lg:col-span-7 xl:col-span-7 space-y-10 sm:space-y-12">
              {/* 2. UNDERSTANDING THE SERVICE */}
              {service.understandingParagraphs && service.understandingParagraphs.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 0.5 }}
                  className="p-6 sm:p-8 md:p-10 rounded-3xl bg-white border border-[#EFE8E0] shadow-sm space-y-4"
                >
                  <div className="flex items-center gap-2.5">
                    <Info className="w-5 h-5 text-[#E6663A]" />
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515]">
                      {service.understandingHeadline || `Understanding ${service.name}`}
                    </h2>
                  </div>
                  <div className="space-y-4 text-sm sm:text-base text-[#555555] leading-relaxed font-light">
                    {service.understandingParagraphs.map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* 3. KEY BENEFITS / CLINICAL ADVANTAGES */}
              {service.benefits && service.benefits.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <span className="text-[#E6663A] text-xs font-bold uppercase tracking-widest">
                      PROVEN CLINICAL OUTCOMES
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515]">
                      Key Benefits & Clinical Advantages
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.benefits.map((benefit, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3.5 p-5 rounded-2xl bg-white border border-[#EFE8E0] shadow-xs hover:border-[#E6663A]/40 transition-colors"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[#E6663A] shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-[#333333] font-medium leading-relaxed">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* 4. IDEAL CANDIDATE */}
              {(service.candidateItems?.length || service.candidateIntro) && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 0.5 }}
                  className="p-6 sm:p-8 md:p-10 rounded-3xl bg-gradient-to-br from-[#151515] to-[#252525] text-white shadow-xl space-y-5"
                >
                  <div className="flex items-center gap-2.5">
                    <Activity className="w-5 h-5 text-[#F6B73C]" />
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                      Signs You May Be an Ideal Candidate
                    </h2>
                  </div>

                  {service.candidateIntro && (
                    <p className="text-white/80 text-sm sm:text-base font-light">
                      {service.candidateIntro}
                    </p>
                  )}

                  {service.candidateItems && service.candidateItems.length > 0 && (
                    <ul className="space-y-3 pt-2">
                      {service.candidateItems.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3.5 text-xs sm:text-sm text-white/95">
                          <span className="w-2 h-2 rounded-full bg-[#E6663A] mt-1.5 shrink-0" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {service.candidateSummary && (
                    <div className="pt-4 border-t border-white/10 text-xs sm:text-sm text-[#F6B73C] font-medium">
                      {service.candidateSummary}
                    </div>
                  )}
                </motion.section>
              )}

              {/* 5. PROCEDURE OVERVIEW (STEPS 1, 2, 3, 4, ...) */}
              {service.procedureSteps && service.procedureSteps.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <span className="text-[#E6663A] text-xs font-bold uppercase tracking-widest">
                      STEP-BY-STEP PROCESS
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515]">
                      Procedure Overview: How It Works
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {service.procedureSteps.map((step) => (
                      <div
                        key={step.stepNumber}
                        className="p-5 sm:p-6 rounded-3xl bg-white border border-[#EFE8E0] shadow-sm space-y-3 flex flex-col justify-start hover:border-[#E6663A]/40 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-gradient-to-br from-[#E6663A] to-[#F6B73C] text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-md shrink-0">
                            {step.stepNumber}
                          </div>
                          <h3 className="font-serif text-sm sm:text-base font-bold text-[#151515]">
                            Step {step.stepNumber}: {step.title}
                          </h3>
                        </div>
                        <p className="text-xs sm:text-sm text-[#555555] leading-relaxed font-light pt-1">
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* 5. OUR APPROACH / TECHNIQUES */}
              {(service.approachParagraphs?.length || service.approachSubSections?.length) && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 0.5 }}
                  className="p-6 sm:p-8 md:p-10 rounded-3xl bg-white border border-[#EFE8E0] shadow-sm space-y-6"
                >
                  <div className="flex items-center gap-2.5">
                    <Stethoscope className="w-5 h-5 text-[#E6663A]" />
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515]">
                      Our Approach & Advanced Techniques
                    </h2>
                  </div>

                  {service.approachParagraphs && service.approachParagraphs.length > 0 && (
                    <div className="space-y-4 text-sm sm:text-base text-[#555555] leading-relaxed font-light">
                      {service.approachParagraphs.map((para, idx) => (
                        <p key={idx}>{para}</p>
                      ))}
                    </div>
                  )}

                  {service.approachSubSections && service.approachSubSections.length > 0 && (
                    <div className="space-y-4 pt-4 border-t border-[#EFE8E0]">
                      {service.approachSubSections.map((sub, idx) => (
                        <div key={idx} className="p-5 rounded-2xl bg-[#F8F6F2] border border-[#EFE8E0] space-y-2">
                          <h3 className="font-serif text-base font-bold text-[#151515] flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#E6663A]" />
                            <span>{sub.title}</span>
                          </h3>
                          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed font-light">
                            {sub.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.section>
              )}

              {/* 6. RECOVERY & AFTERCARE TIMELINE */}
              {service.recoveryParagraphs && service.recoveryParagraphs.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 0.5 }}
                  className="p-6 sm:p-8 md:p-10 rounded-3xl bg-white border border-[#EFE8E0] shadow-sm space-y-4"
                >
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-5 h-5 text-[#F6B73C]" />
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515]">
                      Recovery & Aftercare Timeline
                    </h2>
                  </div>
                  <div className="space-y-4 text-sm sm:text-base text-[#555555] leading-relaxed font-light">
                    {service.recoveryParagraphs.map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* 7. FREQUENTLY ASKED QUESTIONS */}
              {service.faqs && service.faqs.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6 pt-2"
                >
                  <div className="flex items-center gap-2.5">
                    <HelpCircle className="w-5 h-5 text-[#E6663A]" />
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515]">
                      Frequently Asked Questions
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {service.faqs.map((faq, idx) => {
                      const isOpen = openFaqIndex === idx;
                      return (
                        <div
                          key={idx}
                          className="bg-white rounded-2xl border border-[#EFE8E0] overflow-hidden transition-all duration-200"
                        >
                          <button
                            onClick={() => toggleFaq(idx)}
                            className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#151515] hover:text-[#E6663A] transition-colors"
                          >
                            <span>{faq.question}</span>
                            <div className="w-7 h-7 rounded-full bg-[#F8F6F2] flex items-center justify-center shrink-0">
                              {isOpen ? (
                                <Minus className="w-4 h-4 text-[#E6663A]" />
                              ) : (
                                <Plus className="w-4 h-4 text-[#151515]" />
                              )}
                            </div>
                          </button>

                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden"
                              >
                                <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#555555] leading-relaxed border-t border-[#F8F6F2]">
                                  {faq.answer}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </motion.section>
              )}
            </div>

            {/* RIGHT COLUMN: Results + Videos + Pricing + Scars + Safety (col-span-5) */}
            <aside className="lg:col-span-5 xl:col-span-5 space-y-8">
              {/* 1. BEFORE & AFTER RESULTS */}
              {results && results.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#EFE8E0] pb-3">
                    <div>
                      <span className="text-[#E6663A] text-[11px] font-bold uppercase tracking-widest block">
                        CLINICAL TRANSFORMATIONS
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#151515]">
                        Before & After Results
                      </h3>
                    </div>
                    <span className="text-[11px] text-[#777777] font-medium">
                      Real Outcome
                    </span>
                  </div>

                  {results.map((res) => (
                    <div
                      key={res.id}
                      className="bg-white rounded-3xl p-4 sm:p-6 border border-[#EFE8E0] shadow-sm space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="font-serif text-base sm:text-lg font-bold text-[#151515]">
                          {res.title}
                        </h4>
                        <span
                          className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
                            res.isIllustrative
                              ? "bg-amber-500/10 text-amber-800 border border-amber-500/25"
                              : "bg-[#E6663A]/10 text-[#E6663A] border border-[#E6663A]/25"
                          }`}
                        >
                          {res.tag || (res.isIllustrative ? "Illustrative Example" : "Real Patient Outcome")}
                        </span>
                      </div>

                      {/* Unified Single Image Result Card */}
                      <div className="group relative rounded-2xl overflow-hidden bg-[#181818] border border-[#EFE8E0]/70 shadow-md">
                        {/* Glowing Accent Border / Under-glow at Bottom */}
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-gradient-to-r from-[#E6663A]/30 via-[#fa4c00]/30 to-[#F6B73C]/30 rounded-full blur-xl pointer-events-none" />

                        {/* Single 4:3 Image Container */}
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#151515]">
                          <Image
                            src={res.beforeImage}
                            alt={`${res.title} - Before and After Results`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 480px"
                            className="object-contain sm:object-cover w-full h-full group-hover:scale-[1.01] transition-transform duration-500"
                          />

                          {/* Subtle Bottom Overlay for Readability */}
                          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

                          {/* Bottom Subtle Overlay Badges: Left for BEFORE, Right for AFTER */}
                          <div className="absolute bottom-3 inset-x-3 sm:inset-x-4 flex items-center justify-between pointer-events-none z-10">
                            {/* BEFORE Badge on Left */}
                            <div className="relative flex items-center">
                              <div className="absolute -inset-1 bg-[#E6663A]/35 rounded-full blur-xs opacity-80" />
                              <div className="relative px-3 py-1 rounded-full bg-[#151515]/85 backdrop-blur-md border border-[#E6663A]/40 text-white shadow-sm flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#E6663A]" />
                                <span className="text-[10px] font-bold tracking-widest uppercase text-white/95 font-sans">
                                  BEFORE
                                </span>
                              </div>
                            </div>

                            {/* AFTER Badge on Right */}
                            <div className="relative flex items-center">
                              <div className="absolute -inset-1 bg-gradient-to-r from-[#E6663A]/60 via-[#fa4c00]/60 to-[#F6B73C]/60 rounded-full blur-xs opacity-90" />
                              <div className="relative px-3 py-1 rounded-full bg-gradient-to-r from-[#E6663A] to-[#F6B73C] text-white shadow-md flex items-center gap-1 border border-white/20">
                                <Sparkles className="w-2.5 h-2.5 text-white" />
                                <span className="text-[10px] font-bold tracking-widest uppercase text-white font-sans">
                                  AFTER
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {res.description && (
                        <p className="text-xs text-[#555555] leading-relaxed font-light">
                          {res.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* 2. RELATED VIDEOS (WATCH & LEARN) */}
              {videos && videos.length > 0 && (
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between border-b border-[#EFE8E0] pb-3">
                    <div>
                      <span className="text-[#E6663A] text-[11px] font-bold uppercase tracking-widest block">
                        PROCEDURAL INSIGHTS
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#151515]">
                        Watch & Learn
                      </h3>
                    </div>
                    <span className="text-[11px] text-[#777777] font-medium">
                      Official Sculpt Videos
                    </span>
                  </div>

                  <div className="space-y-4">
                    {videos.map((vid) => (
                      <div
                        key={vid.id}
                        onClick={() => setSelectedVideo(vid)}
                        className="bg-white rounded-2xl overflow-hidden border border-[#EFE8E0] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group cursor-pointer hover:-translate-y-0.5"
                      >
                        <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-[#151515]">
                          <Image
                            src={`https://i.ytimg.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                            alt={vid.title}
                            fill
                            unoptimized
                            className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                          />
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />

                          {/* Play Button Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-11 h-11 rounded-full bg-[#E6663A] text-white flex items-center justify-center shadow-[0_4px_16px_rgba(230,102,58,0.5)] group-hover:scale-110 group-hover:bg-[#d05328] transition-all duration-300">
                              <Play className="w-4 h-4 fill-white ml-0.5" />
                            </div>
                          </div>

                          {/* Duration Badge */}
                          {vid.duration && (
                            <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-white text-[10px] font-semibold">
                              {vid.duration}
                            </div>
                          )}
                        </div>

                        <div className="p-4 space-y-1.5">
                          <h4 className="font-serif text-sm sm:text-base font-bold text-[#151515] group-hover:text-[#E6663A] transition-colors leading-snug line-clamp-2">
                            {vid.title}
                          </h4>
                          {vid.description && (
                            <p className="text-xs text-[#666666] line-clamp-2 leading-relaxed font-light">
                              {vid.description}
                            </p>
                          )}
                          <div className="pt-2 flex items-center text-xs font-bold text-[#E6663A] uppercase tracking-wider gap-1 group-hover:underline">
                            <span>Watch Video</span>
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. PRICING & CONSULTATION ESTIMATES */}
              {service.pricingText && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 0.5 }}
                  className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EFE8E0] shadow-sm space-y-4"
                >
                  <div className="flex items-center gap-2.5">
                    <DollarSign className="w-5 h-5 text-[#E6663A]" />
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#151515]">
                      Pricing & Consultation Estimates
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#555555] leading-relaxed font-light">
                    {service.pricingText}
                  </p>
                  <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-semibold text-[#151515]">
                    <span className="flex items-center gap-2 bg-[#F8F6F2] px-3.5 py-2 rounded-full border border-[#EFE8E0]">
                      <PhoneCall className="w-3.5 h-3.5 text-[#E6663A]" /> 9639635454 / 9133733733
                    </span>
                    <Link
                      href="/contact"
                      className="text-[#E6663A] hover:underline flex items-center gap-1 font-bold"
                    >
                      <span>Request Custom Quote</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.section>
              )}

              {/* 4. SCARS & MARKS */}
              {service.scarsText && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 0.5 }}
                  className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EFE8E0] shadow-sm space-y-4"
                >
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-5 h-5 text-[#E6663A]" />
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#151515]">
                      Scars & Marks
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#555555] leading-relaxed font-light">
                    {service.scarsText}
                  </p>
                </motion.section>
              )}

              {/* 5. SAFETY & THINGS TO CONSIDER */}
              {service.safetyText && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 0.5 }}
                  className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EFE8E0] shadow-sm space-y-4"
                >
                  <div className="flex items-center gap-2.5">
                    <AlertCircle className="w-5 h-5 text-[#E6663A]" />
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#151515]">
                      Safety & Things to Consider
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#555555] leading-relaxed font-light">
                    {service.safetyText}
                  </p>
                </motion.section>
              )}
            </aside>
          </div>
        )}

        {/* RELATED BLOGS */}
        {relatedBlogs && relatedBlogs.length > 0 && (
          <section className="space-y-8 pt-4">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[#E6663A] text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#F6B73C]" />
                CLINICAL INSIGHTS & PATIENT GUIDES
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#151515]">
                RELATED BLOGS
              </h2>
              <p className="text-xs sm:text-sm text-[#666666]">
                Read comprehensive surgical guides, recovery timelines, and cost breakdowns from our specialist surgeons.
              </p>
            </div>

            <div
              className={`grid grid-cols-1 ${
                relatedBlogs.length === 1
                  ? "max-w-md mx-auto"
                  : relatedBlogs.length === 2
                  ? "md:grid-cols-2 max-w-4xl mx-auto"
                  : "sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto"
              } gap-6`}
            >
              {relatedBlogs.map((blog) => (
                <motion.article
                  key={blog.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.45 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 border border-[#EFE8E0] flex flex-col justify-between group hover:-translate-y-1 h-full"
                >
                  {/* Blog Image */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#151515] shrink-0">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute top-3 left-3 bg-[#E6663A] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-md">
                      {blog.category}
                    </div>
                  </div>

                  {/* Blog Meta & Excerpt */}
                  <div className="p-5 sm:p-6 space-y-2.5 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-xs text-[#777777]">
                        <span className="flex items-center gap-1 font-medium">
                          <Clock className="w-3.5 h-3.5 text-[#E6663A]" />
                          {blog.readTime}
                        </span>
                      </div>

                      <Link href={`/blog/${blog.slug}`} className="block group/title">
                        <h3 className="font-serif text-base sm:text-lg font-bold text-[#151515] group-hover/title:text-[#E6663A] transition-colors leading-snug">
                          {blog.title}
                        </h3>
                      </Link>

                      <p className="text-xs text-[#555555] leading-relaxed font-light line-clamp-2">
                        {blog.excerpt}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#EFE8E0] flex items-center justify-between mt-auto">
                      <Link
                        href={`/blog/${blog.slug}`}
                        className="w-full py-2.5 px-4 rounded-full border border-[#151515] text-[#151515] hover:border-transparent hover:bg-[#E6663A] hover:text-white transition-all duration-200 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs hover:shadow"
                      >
                        <span>READ MORE</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>
        )}

        {/* CTA: READY TO BEGIN YOUR AESTHETIC JOURNEY? */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="p-8 sm:p-12 rounded-3xl bg-[#151515] text-white text-center space-y-6 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#E6663A]/15 rounded-full blur-[100px] pointer-events-none" />

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold relative z-10">
            Ready to Begin Your Aesthetic Journey?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base font-light relative z-10 leading-relaxed">
            Consult directly with Hyderabad’s leading board-certified plastic surgeons and aesthetic specialists at our state-of-the-art clinic in Madhapur.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 pt-2">
            <Link
              href="/contact"
              className="w-full sm:w-auto btn-sculpt-gradient py-4 px-8 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>BOOK A CONSULTATION NOW</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/our-services"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-white/20 transition-all"
            >
              <span>BROWSE ALL SERVICES</span>
            </Link>
          </div>
        </motion.section>

        {/* EXPLORE MORE PROCEDURES (WEBSITE CONTENT ONLY) */}
        {relatedServices.length > 0 && (
          <section className="space-y-8 pt-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[#E6663A] text-xs font-bold uppercase tracking-widest">
                DISCOVER COMPLEMENTARY CARE
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#151515]">
                EXPLORE MORE PROCEDURES
              </h2>
              <p className="text-xs sm:text-sm text-[#666666]">
                Explore other specialized surgical and aesthetic solutions from our comprehensive catalog.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedServices.map((relService) => (
                <motion.div
                  key={relService.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.45 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 border border-[#EFE8E0] flex flex-col justify-between group h-full"
                >
                  <div className="flex flex-col flex-grow">
                    <div className="relative h-48 w-full overflow-hidden bg-[#EFE8E0] shrink-0">
                      <Image
                        src={relService.image}
                        alt={relService.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-[1.02]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#151515] uppercase tracking-wider">
                        {relService.category}
                      </div>
                    </div>

                    <div className="p-5 space-y-2 flex-grow flex flex-col justify-start">
                      <h3 className="font-serif text-base sm:text-lg font-bold text-[#151515] group-hover:text-[#E6663A] transition-colors leading-snug">
                        {relService.name}
                      </h3>
                      <p className="text-xs text-[#666666] line-clamp-3 leading-relaxed font-light">
                        {relService.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 mt-auto">
                    <Link
                      href={`/services/${relService.slug}`}
                      scroll={true}
                      className="w-full py-2.5 px-4 rounded-full border border-[#151515] text-[#151515] hover:border-transparent hover:bg-gradient-to-r hover:from-[#fa4c00] hover:to-[#ffbd59] hover:text-white transition-all duration-300 ease-in-out font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 group/btn shadow-xs hover:shadow-md"
                    >
                      <span>KNOW ABOUT</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-300 text-[#E6663A] group-hover/btn:text-white" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* EMBEDDED YOUTUBE VIDEO MODAL PLAYER */}
      <AnimatePresence>
        {selectedVideo && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedVideo(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Video Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              role="dialog"
              aria-modal="true"
              className="relative w-full max-w-4xl bg-[#151515] rounded-3xl border border-white/20 overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.9)] z-10 my-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 sm:p-5 bg-black/70 border-b border-white/10 text-white">
                <div className="flex items-center gap-2.5 truncate pr-4">
                  <Play className="w-4 h-4 text-[#E6663A] shrink-0 fill-[#E6663A]" />
                  <h3 className="font-serif text-sm sm:text-base font-bold truncate">
                    {selectedVideo.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedVideo(null)}
                  type="button"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0"
                  aria-label="Close video player"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 16:9 Responsive Video Iframe */}
              <div className="relative w-full pb-[56.25%] bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
