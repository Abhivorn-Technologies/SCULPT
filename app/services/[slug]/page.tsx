"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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
  HeartHandshake
} from "lucide-react";
import { getServiceBySlug, getRelatedServices } from "@/lib/servicesData";

interface ServiceDetailProps {
  params: Promise<{ slug: string }>;
}

export default function ServiceDetailPage({ params }: ServiceDetailProps) {
  const resolvedParams = use(params);
  const service = getServiceBySlug(resolvedParams.slug);

  if (!service) {
    notFound();
  }

  const relatedServices = getRelatedServices(service.relatedServiceSlugs);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="pt-24 pb-20 bg-[#F8F6F2] space-y-16 text-[#151515] selection:bg-[#E6663A] selection:text-white">
      {/* 1. Subpage Luxury Banner */}
      <section className="bg-[#151515] text-white py-20 relative overflow-hidden border-b border-white/10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#E6663A]/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E6663A]/20 border border-[#E6663A]/40 text-[#F6B73C] text-xs font-semibold uppercase tracking-[0.25em]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{service.category} PROCEDURE</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight max-w-4xl mx-auto"
          >
            {service.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/80 max-w-2xl mx-auto text-base sm:text-xl font-light leading-relaxed italic"
          >
            &ldquo;{service.heroHeadline}&rdquo;
          </motion.p>
        </div>
      </section>

      {/* 2. Main Service Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Hero Image & Key Specs Card */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="relative h-64 sm:h-80 lg:h-[420px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#151515]"
            >
              <Image
                src={service.image}
                alt={service.name}
                fill
                priority
                className="object-cover filter contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#F6B73C] bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 inline-block shadow-lg">
                  SCULPT AESTHETICS CLINICAL EXCELLENCE
                </span>
              </div>
            </motion.div>

            {/* Quick Specs Card */}
            <div className="p-6 rounded-3xl bg-white border border-[#EFE8E0] shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-lg text-[#151515] flex items-center gap-2 border-b border-[#EFE8E0] pb-3">
                <Stethoscope className="w-5 h-5 text-[#E6663A]" />
                <span>Procedure Highlights</span>
              </h3>
              
              <div className="space-y-3 text-xs sm:text-sm text-[#555555]">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[#777777] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#E6663A]" /> Medical Standards:
                  </span>
                  <span className="font-semibold text-[#151515]">US FDA & NABH Compliant</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[#777777] flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#F6B73C]" /> Recovery Horizon:
                  </span>
                  <span className="font-semibold text-[#151515]">Personalized Care</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[#777777] flex items-center gap-1.5">
                    <HeartHandshake className="w-4 h-4 text-[#E6663A]" /> Anesthesia:
                  </span>
                  <span className="font-semibold text-[#151515]">Local / General</span>
                </div>
              </div>

              {/* Consultation CTA */}
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="w-full btn-sculpt-gradient py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>BOOK A CONSULTATION</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Clinical Information */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515]">
                Overview & Procedure Introduction
              </h2>
              <p className="text-[#555555] text-base sm:text-lg leading-relaxed font-light border-l-4 border-[#E6663A] pl-5 bg-white/60 p-4 rounded-r-2xl border-y border-r border-[#EFE8E0]">
                {service.introduction}
              </p>
            </motion.div>

            {/* Primary BOOK CONSULTATION CTA */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="p-6 rounded-2xl bg-gradient-to-r from-[#151515] to-[#222222] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl border border-white/10"
            >
              <div>
                <h4 className="font-serif text-lg font-bold text-white">
                  Interested in {service.name}?
                </h4>
                <p className="text-xs text-white/70">
                  Schedule a confidential 1-on-1 consultation with our senior surgeon.
                </p>
              </div>
              <Link
                href="/contact"
                className="btn-sculpt-gradient px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 shrink-0 shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>BOOK CONSULTATION</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>

            {/* What Is It */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="space-y-4 bg-white p-7 rounded-3xl border border-[#EFE8E0] shadow-sm"
            >
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#151515]">
                What is {service.name}?
              </h3>
              <p className="text-[#555555] text-sm sm:text-base leading-relaxed">
                {service.whatIsIt}
              </p>
            </motion.div>

            {/* Key Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#151515]">
                Key Clinical & Aesthetic Benefits
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {service.benefits.map((benefit, bIdx) => (
                  <div
                    key={bIdx}
                    className="p-4 rounded-2xl bg-white border border-[#EFE8E0] shadow-sm flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#E6663A]/15 text-[#E6663A] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-xs sm:text-sm text-[#151515] font-medium leading-relaxed">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Ideal Candidate Criteria */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="space-y-4 bg-white p-7 rounded-3xl border border-[#EFE8E0] shadow-sm"
            >
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#151515]">
                Who is a Good Candidate?
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-[#555555]">
                {service.candidateCriteria.map((criterion, cIdx) => (
                  <li key={cIdx} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#E6663A] shrink-0 mt-2" />
                    <span className="leading-relaxed">{criterion}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Procedure & Recovery Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className="p-6 rounded-3xl bg-white border border-[#EFE8E0] shadow-sm space-y-3"
              >
                <div className="w-10 h-10 rounded-2xl bg-[#E6663A]/10 text-[#E6663A] flex items-center justify-center">
                  <Activity className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#151515]">Procedure Overview</h4>
                <p className="text-xs text-[#555555] leading-relaxed font-light">
                  {service.procedureOverview}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="p-6 rounded-3xl bg-white border border-[#EFE8E0] shadow-sm space-y-3"
              >
                <div className="w-10 h-10 rounded-2xl bg-[#F6B73C]/20 text-[#E6663A] flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#151515]">Recovery & Aftercare</h4>
                <p className="text-xs text-[#555555] leading-relaxed font-light">
                  {service.recoveryInfo}
                </p>
              </motion.div>
            </div>

            {/* FAQs Accordion */}
            {service.faqs && service.faqs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className="space-y-6 pt-4"
              >
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#151515]">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-3">
                  {service.faqs.map((faq, fIdx) => {
                    const isOpen = openFaqIndex === fIdx;
                    return (
                      <div
                        key={fIdx}
                        className="bg-white rounded-2xl border border-[#EFE8E0] overflow-hidden shadow-sm transition-shadow"
                      >
                        <button
                          onClick={() => toggleFaq(fIdx)}
                          className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-base font-bold text-[#151515] hover:text-[#E6663A] transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <HelpCircle className="w-4 h-4 text-[#E6663A] shrink-0" />
                            <span>{faq.question}</span>
                          </div>
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                              isOpen ? "bg-[#E6663A] text-white" : "bg-[#EFE8E0] text-[#151515]"
                            }`}
                          >
                            {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                          </div>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                              <div className="px-5 pb-5 pt-0 text-[#555555] text-xs sm:text-sm leading-relaxed border-t border-[#EFE8E0]/60 mt-1 pt-3 pl-12">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Bottom Prominent BOOK A CONSULTATION CTA Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#151515] via-[#1A1A1A] to-[#0D0D0D] text-white space-y-6 shadow-2xl border border-white/10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#E6663A]/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 space-y-3 text-center sm:text-left">
                <span className="text-[#F6B73C] text-xs font-bold uppercase tracking-[0.2em] bg-white/10 px-3.5 py-1 rounded-full inline-block">
                  START YOUR CONFIDENCE JOURNEY
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white">
                  Schedule Your Confidential Consultation
                </h3>
                <p className="text-white/75 text-sm sm:text-base font-light max-w-xl">
                  Connect with our plastic surgery specialists at Sculpt Aesthetics for a personalized diagnostic evaluation.
                </p>
              </div>

              <div className="relative z-10 pt-2 flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto btn-sculpt-gradient px-8 py-4 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>BOOK A CONSULTATION NOW</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/our-services"
                  className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-white/20 transition-all"
                >
                  <span>BROWSE ALL SERVICES</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Related Services Section */}
      {relatedServices.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="space-y-8 border-t border-[#EFE8E0] pt-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[#E6663A] text-xs font-bold uppercase tracking-widest">
                EXPLORE MORE PROCEDURES
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#151515]">
                Related Surgical & Aesthetic Services
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedServices.map((relService) => (
                <motion.div
                  key={relService.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#EFE8E0] flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-48 w-full overflow-hidden bg-[#EFE8E0]">
                      <Image
                        src={relService.image}
                        alt={relService.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>

                    <div className="p-6 space-y-2">
                      <h3 className="font-serif text-lg font-bold text-[#151515] group-hover:text-[#E6663A] transition-colors">
                        {relService.name}
                      </h3>
                      <p className="text-xs text-[#555555] line-clamp-2 leading-relaxed">
                        {relService.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <Link
                      href={`/services/${relService.slug}`}
                      className="w-full py-2.5 px-4 rounded-full border border-[#151515] text-[#151515] hover:border-transparent hover:bg-gradient-to-r hover:from-[#fa4c00] hover:to-[#ffbd59] hover:text-white transition-all duration-300 ease-in-out font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 group/btn"
                    >
                      <span>KNOW ABOUT</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-300 text-[#E6663A] group-hover/btn:text-white" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
