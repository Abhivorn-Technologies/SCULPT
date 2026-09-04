"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView, Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ArrowRight,
  Calendar,
  Award,
  ShieldCheck,
  Sparkles,
  UserCheck,
  HeartHandshake,
  Cpu,
  CheckCircle2,
  Stethoscope,
  ChevronRight,
} from "lucide-react";

// Section animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: custom * 0.15, ease: "easeOut" },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// Doctors Data for Section 7
const doctorsData = [
  {
    id: "jagadish",
    name: "Dr. Jagadish Kiran (M.S., M.Ch)",
    title: "Senior Cosmetic & Plastic Surgeon",
    bio: "Dr. Jagadish Kiran, M.B.B.S., M.S. (General Surgery), M.Ch. (Plastic Surgery), is a board-certified cosmetic, plastic, and reconstructive surgeon with over 14 years of expertise. He completed fellowship training in cosmetic surgery, specializing in procedures such as gynecomastia, liposuction, breast augmentation and reduction, rhinoplasty, and non-surgical treatments like injectable dermal fillers. Renowned for his precision and premium treatments, his clinic is one of the premier plastic surgery centers in the state.",
    image: "/assets/doctors/doctor-1.jpg",
    areas: [
      "Gynecomastia",
      "Liposuction",
      "Breast Augmentation & Reduction",
      "Rhinoplasty",
      "Injectable Dermal Fillers",
    ],
  },
  {
    id: "suma",
    name: "Dr. Suma Sandhyala (M.S., M.Ch)",
    title: "Consultant Plastic, Cosmetic & Reconstructive Surgeon",
    bio: "Dr. S. Suma is a Consultant Plastic, Cosmetic, and Reconstructive Surgeon. She graduated from NTR University of Health Sciences with an MBBS degree, earning the Best Outgoing Student award. She completed her MS in General Surgery from the same university and received the Best Resident Award in Plastic Surgery while obtaining her M.Ch from Nizam Institute of Medical Sciences, Hyderabad. Dr. Suma also holds an Observership in Cosmetic Surgery from New York and a Certification in Laser Treatment.",
    image: "/assets/doctors/doctor-2.jpg",
    background: [
      "MBBS from NTR University of Health Sciences",
      "Best Outgoing Student Award",
      "MS in General Surgery",
      "Best Resident Award in Plastic Surgery",
      "M.Ch from Nizam Institute of Medical Sciences, Hyderabad",
      "Observership in Cosmetic Surgery from New York",
      "Certification in Laser Treatment",
    ],
  },
  {
    id: "madhusudhan",
    name: "Dr. M. Madhusudhan",
    title: "Cosmetic & Plastic Surgeon",
    bio: "Dr. M. Madhusudhan is a leading Cosmetic and Plastic Surgeon with extensive expertise in aesthetic and reconstructive procedures. With thousands of successful surgeries to his credit, he is known for delivering safe, natural, and long-lasting results. He specializes in a wide range of treatments, including tummy tuck, liposuction, breast augmentation, facelift, rhinoplasty, Botox, dermal fillers, mommy makeover, and body contouring. His approach focuses on personalized care, ensuring every treatment is tailored to the individual patient.",
    image: "/assets/doctors/doctor-3.jpg",
    areas: [
      "Tummy Tuck",
      "Liposuction",
      "Breast Augmentation",
      "Facelift",
      "Rhinoplasty",
      "Botox & Dermal Fillers",
      "Mommy Makeover",
      "Body Contouring",
    ],
  },
];

// Feature Cards for Section 4
const commitments = [
  {
    icon: UserCheck,
    title: "Personalised Care",
    desc: "Every treatment plan is designed around individual goals, needs and expectations.",
  },
  {
    icon: Cpu,
    title: "Advanced Techniques",
    desc: "Modern technology and advanced medical techniques focused on precision and quality.",
  },
  {
    icon: Sparkles,
    title: "Natural-Looking Results",
    desc: "Our approach focuses on enhancing your natural features while preserving your individuality.",
  },
  {
    icon: HeartHandshake,
    title: "Care Beyond Treatment",
    desc: "From consultation through recovery, our team provides guidance and support throughout your journey.",
  },
];

// Stats for Section 8
const stats = [
  { value: "20+", label: "Years of Experience" },
  { value: "ADVANCED", label: "Medical Technology" },
  { value: "PERSONALISED", label: "Treatment Plans" },
  { value: "DEDICATED", label: "Patient Support" },
];

export default function AboutPage() {
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: false, margin: "-100px" });
  const [activeDoctorId, setActiveDoctorId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const scrollWithOffset = (element: HTMLElement) => {
      const navOffset = 90;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: "smooth",
      });
    };

    const handleScroll = () => {
      const params = new URLSearchParams(window.location.search);
      const docParam = params.get("doctor");
      const hash = window.location.hash;

      if (docParam && ["jagadish", "suma", "madhusudhan"].includes(docParam)) {
        setActiveDoctorId(docParam);
        const targetEl = document.getElementById(`detailed-${docParam}`);
        if (targetEl) {
          scrollWithOffset(targetEl);
        }
      } else if (hash === "#medical-team" || hash === "#detailed-doctors") {
        const targetEl = document.getElementById("medical-team") || document.getElementById("detailed-doctors");
        if (targetEl) {
          scrollWithOffset(targetEl);
        }
      }
    };

    const timer1 = setTimeout(handleScroll, 50);
    const timer2 = setTimeout(handleScroll, 250);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="pb-16 space-y-16 bg-[#F8F6F2] text-[#151515] selection:bg-[#E6663A] selection:text-white overflow-hidden">
      {/* ==================================================
          SECTION 1 — ABOUT HERO (TWO-COLUMN WITH PUSHED DOWN TOP PADDING)
      ================================================== */}
      <section className="relative w-full flex items-center pt-32 sm:pt-36 lg:pt-40 pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#151515] text-white border-b border-white/10">
        {/* Full-Width Luxury Background Image */}
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.04 }}
            animate={{ scale: 1 }}
            transition={{ duration: 7, ease: "easeOut" }}
            className="relative w-full h-full"
          >
            <Image
              src="/assets/about/about-hero-banner.jpg"
              alt="SCULPT Aesthetics Luxury Wall"
              fill
              priority
              className="object-cover object-center opacity-40"
            />
          </motion.div>
          
          {/* Dark Overlays for Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#151515] via-[#151515]/90 to-[#151515]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-[#151515]/80" />
          
          {/* Warm Orange / Gold Ambient Glow Accent */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#E6663A]/15 rounded-full blur-[140px] pointer-events-none" />
        </div>

        {/* Hero Content (Two-Column Layout: Text Left, Image Card Right - Shifted Downwards) */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Side: Text Content */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              {/* Eyebrow Badge */}
              <motion.div
                custom={0}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/15 text-[#F6B73C] text-[11px] font-semibold uppercase tracking-[0.2em] backdrop-blur-md"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E6663A]" />
                <span>ABOUT SCULPT AESTHETICS</span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                custom={1}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="font-serif text-3xl sm:text-4xl lg:text-[54px] font-bold tracking-tight text-white leading-[1.12]"
              >
                Transforming Confidence. <br />
                <span className="bg-gradient-to-r from-[#E6663A] via-[#F28C28] to-[#F6B73C] bg-clip-text text-transparent">
                  Celebrating You.
                </span>
              </motion.h1>

              {/* Short Description */}
              <motion.p
                custom={2}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="text-white/85 text-xs sm:text-base font-light leading-relaxed max-w-xl"
              >
                We believe that everyone deserves to look and feel their best, and we&apos;re honoured to be a part of your journey towards self-discovery and empowerment.
              </motion.p>

              {/* CTA Button */}
              <motion.div
                custom={3}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="pt-2"
              >
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#E6663A] via-[#F28C28] to-[#F6B73C] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-[0_8px_25px_rgba(230,102,58,0.35)] hover:shadow-[0_12px_35px_rgba(230,102,58,0.5)] transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <span>BOOK A CONSULTATION</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>
            </div>

            {/* Right Side: Large Rounded Image Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-md h-[280px] sm:h-[320px] lg:h-[340px] rounded-3xl overflow-hidden border border-white/20 hover:border-[#E6663A]/60 shadow-[0_20px_40px_rgba(0,0,0,0.7)] transition-all duration-500">
                <Image
                  src="/assets/about/about-hero-card.jpg"
                  alt="Sculpt Aesthetics Experience"
                  fill
                  priority
                  className="object-cover object-center"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 2 — WHO WE ARE
      ================================================== */}
      <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative bg-[#F8F6F2]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Image with Floating Card */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative rounded-3xl overflow-hidden border border-[#EFE8E0] shadow-xl aspect-[4/5] bg-white">
                <Image
                  src="/assets/about/about2.png"
                  alt="Sculpt Cosmetic Surgery Center"
                  fill
                  className="object-cover filter contrast-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Floating Experience Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/90 backdrop-blur-xl border border-[#EFE8E0] shadow-2xl flex items-center gap-5"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E6663A] to-[#F6B73C] p-0.5 flex items-center justify-center shrink-0 shadow-lg">
                    <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                      <span className="font-serif text-2xl font-bold bg-gradient-to-r from-[#E6663A] to-[#F6B73C] bg-clip-text text-transparent">
                        20+
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-serif text-xl font-bold text-[#151515] tracking-wide">
                      20+ Years
                    </h4>
                    <p className="text-xs text-[#555555] font-medium uppercase tracking-wider mt-0.5">
                      Years of Experience
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Decorative Accent Glow */}
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-[#E6663A]/10 rounded-full blur-3xl -z-10" />
            </motion.div>

            {/* Right Column: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 space-y-8"
            >
              <div className="space-y-4">
                <span className="text-[#E6663A] text-xs font-bold uppercase tracking-[0.25em] bg-[#E6663A]/10 border border-[#E6663A]/20 px-4 py-1.5 rounded-full inline-block">
                  WHO WE ARE
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#151515] leading-tight">
                  We Are More Than <br />
                  <span className="text-[#E6663A]">Aesthetic Care.</span>
                </h2>
              </div>

              <div className="space-y-6 text-[#555555] text-base sm:text-lg font-light leading-relaxed">
                <p className="border-l-2 border-[#E6663A] pl-5 text-[#151515] font-normal">
                  With over 20 years of experience and a team of highly trained doctors, Sculpt Cosmetic Surgery Center is a premier destination for cosmetic and aesthetic care.
                </p>
                <p>
                  Our approach is inspired by the individuality of every patient. Using advanced medical-grade technology and modern techniques, we provide personalised treatments designed around your unique goals.
                </p>
                <p>
                  Our team is approachable, supportive and committed to guiding you through every stage of your journey — from your first consultation to treatment and recovery.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-6 items-center border-t border-[#EFE8E0]">
                <div className="flex items-center gap-3">
                  <Stethoscope className="w-5 h-5 text-[#E6663A]" />
                  <span className="text-sm text-[#151515] font-medium">Board-Certified Surgeons</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#E6663A]" />
                  <span className="text-sm text-[#151515] font-medium">NABH & FDA Compliant</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 3 — LOOK AND FEEL YOUR BEST
      ================================================== */}
      <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative bg-[#EFE8E0]/60 border-t border-[#EFE8E0]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Editorial Text Layout */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 space-y-8"
            >
              <div className="space-y-4">
                <div className="w-16 h-1 bg-gradient-to-r from-[#E6663A] to-[#F6B73C] rounded-full" />
                <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#151515] leading-tight">
                  Look and Feel <br />
                  <span className="bg-gradient-to-r from-[#E6663A] to-[#F6B73C] bg-clip-text text-transparent">
                    Your Absolute Best.
                  </span>
                </h2>
              </div>

              <div className="space-y-6 text-[#555555] text-base sm:text-lg font-light leading-relaxed">
                <p>
                  In a world where confidence matters, the desire to look and feel your best is universal. Whether enhancing natural features, correcting imperfections or restoring a more youthful appearance, every aesthetic journey begins with a personal decision.
                </p>
                <p>
                  At SCULPT, we understand the impact that physical appearance can have on confidence and overall well-being. Our mission is to help patients achieve their aesthetic goals with precision, care and expertise.
                </p>
                <p className="text-[#151515] font-normal italic border-l-2 border-[#E6663A] pl-4">
                  We believe aesthetic transformation is deeply personal. It is not simply about changing appearance — it is about helping individuals embrace their confidence while preserving their unique identity.
                </p>
              </div>
            </motion.div>

            {/* Right Column: Overlapping Editorial Images */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 relative pt-8 lg:pt-0"
            >
              <div className="relative w-full max-w-lg mx-auto pb-12 lg:pb-0">
                {/* Large Primary Image */}
                <div className="relative w-4/5 h-64 sm:h-80 lg:h-96 rounded-3xl overflow-hidden border border-[#EFE8E0] shadow-xl bg-white">
                  <Image
                    src="/assets/about/about3.png"
                    alt="Facial Aesthetic Harmony"
                    fill
                    className="object-cover filter contrast-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                {/* Smaller Overlapping Image */}
                <motion.div
                  initial={{ opacity: 0, x: 30, y: 30 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="absolute -bottom-10 right-0 w-3/5 h-64 sm:h-72 rounded-3xl overflow-hidden border-2 border-[#E6663A]/40 shadow-xl bg-white"
                >
                  <Image
                    src="/assets/about/about4.png"
                    alt="SCULPT Aesthetic Transformation"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#E6663A] bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#EFE8E0] shadow-sm inline-block">
                      Natural Harmonies
                    </span>
                  </div>
                </motion.div>

                {/* Subtle Decorative Lines */}
                <div className="absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2 border-[#E6663A]/40 rounded-tl-3xl pointer-events-none" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 4 — OUR COMMITMENT
      ================================================== */}
      <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative bg-[#F8F6F2] border-t border-[#EFE8E0]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[#E6663A] text-xs font-bold uppercase tracking-[0.25em] bg-[#E6663A]/10 border border-[#E6663A]/20 px-4 py-1.5 rounded-full inline-block">
              OUR STANDARDS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#151515]">
              Our Unwavering Commitment
            </h2>
            <p className="text-[#555555] text-base sm:text-lg font-light">
              Built upon medical integrity, individualised patient care, and artistic perfection.
            </p>
          </div>

          {/* 4 Feature Cards Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {commitments.map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="group relative p-8 rounded-3xl bg-white border border-[#EFE8E0] hover:border-[#E6663A]/50 transition-all duration-500 shadow-sm hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Small Premium Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-[#E6663A]/10 border border-[#E6663A]/20 flex items-center justify-center text-[#E6663A] mb-6 group-hover:bg-[#E6663A] group-hover:text-white transition-all duration-300 shadow-sm">
                    <item.icon className="w-7 h-7" />
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#151515] mb-3 group-hover:text-[#E6663A] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-[#555555] text-sm leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#EFE8E0] flex items-center justify-between text-xs text-[#E6663A] font-semibold tracking-wider">
                  <span>EXCELLENCE</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================================================
          SECTION 5 — OUR APPROACH
      ================================================== */}
      <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative bg-[#EFE8E0]/60 overflow-hidden border-t border-[#EFE8E0]">
        {/* Animated Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E6663A]/10 rounded-full blur-[180px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-8"
            >
              <span className="text-[#E6663A] text-xs font-bold uppercase tracking-[0.25em] bg-[#E6663A]/10 border border-[#E6663A]/20 px-4 py-1.5 rounded-full inline-block">
                OUR APPROACH
              </span>

              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#151515] leading-tight">
                Precision Meets <br />
                <span className="bg-gradient-to-r from-[#E6663A] via-[#F28C28] to-[#F6B73C] bg-clip-text text-transparent">
                  Compassion.
                </span>
              </h2>

              <div className="space-y-6 text-[#555555] text-base sm:text-lg font-light leading-relaxed">
                <p>
                  From body contouring and facial procedures to advanced skin rejuvenation and other aesthetic treatments, our approach combines medical expertise with an understanding of each patient&apos;s individual goals.
                </p>
                <p>
                  Safety and patient care remain at the center of everything we do. We follow high medical standards and use modern techniques designed to support quality outcomes and efficient recovery.
                </p>
                <p>
                  Beyond physical transformation, we aim to create an environment where patients feel understood, respected and supported throughout their journey.
                </p>
              </div>

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-[#EFE8E0] text-center shadow-sm">
                  <p className="font-serif text-2xl font-bold text-[#E6663A]">100%</p>
                  <p className="text-xs text-[#555555] mt-1">Personalised Protocol</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#EFE8E0] text-center shadow-sm">
                  <p className="font-serif text-2xl font-bold text-[#F28C28]">NABH</p>
                  <p className="text-xs text-[#555555] mt-1">Medical Standards</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#EFE8E0] text-center shadow-sm">
                  <p className="font-serif text-2xl font-bold text-[#151515]">Full Care</p>
                  <p className="text-xs text-[#555555] mt-1">Consultation to Recovery</p>
                </div>
              </div>
            </motion.div>

            {/* Right Showcase Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-3xl overflow-hidden border border-[#EFE8E0] shadow-xl aspect-[4/5] bg-white">
                <Image
                  src="/assets/about/about5.png"
                  alt="Precision Medical Care at SCULPT"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                
                <div className="absolute bottom-8 left-8 right-8 space-y-2">
                  <span className="text-xs font-semibold text-[#F6B73C] uppercase tracking-widest">
                    Medical Excellence
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    State-of-the-Art Suites
                  </h3>
                  <p className="text-xs text-white/80 font-light">
                    Designed according to rigorous medical protocols to provide optimal surgical outcomes and rapid healing.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 6 — OUR PHILOSOPHY
      ================================================== */}
      <section className="py-28 lg:py-36 px-4 sm:px-6 lg:px-8 relative bg-[#F8F6F2] overflow-hidden border-t border-[#EFE8E0]">
        {/* Transparent Logo Watermark in Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] pointer-events-none select-none">
          <Image
            src="/assets/logo/logo.png"
            alt="SCULPT Logo Watermark"
            width={700}
            height={300}
            className="w-[800px] h-auto object-contain"
          />
        </div>

        {/* Ambient Subtle Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#E6663A]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
          <span className="text-[#E6663A] text-xs font-bold uppercase tracking-[0.3em] bg-[#E6663A]/10 border border-[#E6663A]/20 px-4 py-1.5 rounded-full inline-block">
            OUR PHILOSOPHY
          </span>

          {/* Main Statement */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#151515] font-normal italic leading-snug tracking-tight"
          >
            “We’re not just in the business of changing appearances. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#E6663A] via-[#F28C28] to-[#F6B73C] bg-clip-text text-transparent font-semibold not-italic">
              We’re in the business of transforming lives.
            </span>”
          </motion.blockquote>

          {/* Orange Accent Line */}
          <div className="w-24 h-1 bg-gradient-to-r from-[#E6663A] via-[#F28C28] to-[#F6B73C] mx-auto rounded-full" />

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#555555] text-base sm:text-xl font-light leading-relaxed max-w-2xl mx-auto"
          >
            We believe confidence begins when you feel comfortable in your own skin. Whether you are considering a subtle enhancement or a more significant transformation, our team is here to support your journey towards renewed confidence and self-discovery.
          </motion.p>
        </div>
      </section>

      {/* ==================================================
          SECTION 7 — MEET OUR EXPERTS (DETAILED DOCTOR SECTION)
      ================================================== */}
      <section id="medical-team" className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative bg-[#EFE8E0]/60 border-t border-[#EFE8E0] scroll-mt-28">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[#E6663A] text-xs font-bold uppercase tracking-[0.25em] bg-[#E6663A]/10 border border-[#E6663A]/20 px-4 py-1.5 rounded-full inline-block">
              WORLD-CLASS SURGEONS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#151515]">
              Meet Our Experts
            </h2>
            <p className="text-[#555555] text-base sm:text-lg font-light">
              Internationally trained plastic, cosmetic, and reconstructive surgeons dedicated to precision and natural aesthetics.
            </p>
          </div>

          {/* 3 Premium Doctor Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-4">
            {doctorsData.map((doc) => {
              const isSelected = activeDoctorId === doc.id;
              const hasSelection = activeDoctorId !== null;

              return (
                <motion.div
                  key={doc.id}
                  id={`detailed-${doc.id}`}
                  onClick={() => setActiveDoctorId(doc.id)}
                  animate={{
                    scale: hasSelection ? (isSelected ? 1.04 : 0.97) : 1,
                    opacity: hasSelection ? (isSelected ? 1 : 0.45) : 1,
                    filter: hasSelection ? (isSelected ? "blur(0px)" : "blur(2.5px)") : "blur(0px)",
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={`group relative bg-white rounded-3xl overflow-hidden border transition-all duration-500 flex flex-col justify-between h-full cursor-pointer shadow-sm hover:shadow-xl ${
                    isSelected
                      ? "border-[#E6663A] ring-2 ring-[#E6663A]/80 shadow-[0_0_30px_rgba(230,102,58,0.25)] z-20"
                      : "border-[#EFE8E0] hover:border-[#E6663A]/40 z-10"
                  }`}
                >
                  <div>
                    {/* Doctor Image Header */}
                    <div className="relative h-80 sm:h-88 w-full overflow-hidden bg-[#EFE8E0] shrink-0">
                      <Image
                        src={doc.image}
                        alt={doc.name}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-700 filter contrast-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Badge Overlay */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/90 backdrop-blur-md border border-[#EFE8E0] text-[#151515] flex items-center gap-1.5 shadow-sm">
                          <Award className="w-3.5 h-3.5 text-[#E6663A]" />
                          <span>Board Certified</span>
                        </span>
                      </div>

                      {/* Focused Status Badge */}
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute top-4 right-4 bg-gradient-to-r from-[#E6663A] to-[#F6B73C] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>FOCUSED PROFILE</span>
                        </motion.div>
                      )}
                    </div>

                    {/* Doctor Info */}
                    <div className="p-7 space-y-5">
                      <div>
                        <h3 className="font-serif text-2xl font-bold text-[#151515] group-hover:text-[#E6663A] transition-colors leading-tight">
                          {doc.name}
                        </h3>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#E6663A] mt-1">
                          {doc.title}
                        </p>
                      </div>

                      <p className="text-xs text-[#555555] leading-relaxed font-light border-l-2 border-[#E6663A]/60 pl-3">
                        {doc.bio}
                      </p>

                      {/* Highlights / Background lists */}
                      {doc.areas && (
                        <div className="space-y-2 pt-2 border-t border-[#EFE8E0]">
                          <p className="text-xs font-semibold text-[#151515] uppercase tracking-wider">
                            Areas of Expertise:
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {doc.areas.map((area, aIdx) => (
                              <span
                                key={aIdx}
                                className="text-[11px] bg-[#F8F6F2] text-[#333333] px-2.5 py-1 rounded-md border border-[#EFE8E0]"
                              >
                                {area}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {doc.background && (
                        <div className="space-y-2 pt-2 border-t border-[#EFE8E0]">
                          <p className="text-xs font-semibold text-[#151515] uppercase tracking-wider">
                            Professional Background:
                          </p>
                          <ul className="space-y-1.5 text-xs text-[#555555]">
                            {doc.background.map((item, bIdx) => (
                              <li key={bIdx} className="flex items-start gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#E6663A] shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 8 — WHY CHOOSE SCULPT
      ================================================== */}
      <section ref={statsRef} className="py-24 lg:py-28 px-4 sm:px-6 lg:px-8 relative bg-[#F8F6F2] border-t border-[#EFE8E0]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, idx) => {
              const isLongText = stat.value.length > 4;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isStatsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EFE8E0] text-center space-y-2 hover:border-[#E6663A]/40 shadow-sm transition-colors flex flex-col justify-center items-center overflow-hidden"
                >
                  <div
                    className={`font-serif font-bold bg-gradient-to-r from-[#E6663A] via-[#F28C28] to-[#F6B73C] bg-clip-text text-transparent w-full ${
                      isLongText
                        ? "text-xl sm:text-2xl lg:text-3xl tracking-normal leading-snug"
                        : "text-4xl sm:text-5xl lg:text-6xl tracking-tight"
                    }`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#555555]">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 9 — FINAL CTA
      ================================================== */}
      <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative bg-[#151515] text-white overflow-hidden border-t border-white/10">
        {/* Glow Lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-[#E6663A]/15 to-[#F6B73C]/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10 text-center space-y-8 p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 backdrop-blur-xl shadow-2xl">
          <span className="text-[#E6663A] text-xs font-bold uppercase tracking-[0.3em] bg-[#E6663A]/10 border border-[#E6663A]/20 px-4 py-1.5 rounded-full inline-block">
            START YOUR JOURNEY
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Your Transformation <br />
            <span className="bg-gradient-to-r from-[#E6663A] via-[#F28C28] to-[#F6B73C] bg-clip-text text-transparent">
              Starts With A Conversation.
            </span>
          </h2>

          <p className="text-white/75 text-base sm:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            Take the first step towards discovering a more confident you. Connect with our experts and explore a treatment plan designed around your individual goals.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#E6663A] via-[#F28C28] to-[#F6B73C] text-white text-sm font-semibold uppercase tracking-wider shadow-[0_10px_30px_rgba(230,102,58,0.35)] hover:shadow-[0_15px_40px_rgba(230,102,58,0.55)] transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4" />
              <span>BOOK A CONSULTATION</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>

            <Link
              href="/our-services"
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/20 hover:bg-white/10 text-white text-sm font-semibold uppercase tracking-wider transition-all duration-300"
            >
              <span>EXPLORE SERVICES</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-[#F6B73C]" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
