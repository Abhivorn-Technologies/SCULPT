"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Luxury cubic-bezier easing curve
const easePremium = [0.22, 1, 0.36, 1] as const;

// Exactly 9 verified Before & After results for the homepage gallery
const resultsData = [
  {
    id: 1,
    category: "Face",
    title: "Structural Rhinoplasty",
    description: "Dorsal bridge refinement and structural tip projection for enhanced facial harmony and symmetry.",
    beforeImage: "/assets/services results/Rhinoplasty.png",
    afterImage: "/assets/services results/Rhinoplasty.png",
  },
  {
    id: 2,
    category: "Body",
    title: "Liposuction & Fat Removal",
    description: "Targeted fat elimination and waistline refinement creating a flat, sculpted torso contour.",
    beforeImage: "/assets/services results/Liposuction.png",
    afterImage: "/assets/services results/Liposuction.png",
  },
  {
    id: 3,
    category: "Body",
    title: "Vaser Ultrasound Liposuction",
    description: "Selective ultrasound fat liquefaction preserving delicate connective tissues with superior skin retraction.",
    beforeImage: "/assets/services results/Vaser Liposuction.png",
    afterImage: "/assets/services results/Vaser Liposuction.png",
  },
  {
    id: 4,
    category: "Breast",
    title: "Breast Augmentation / Implant",
    description: "Enhanced breast volume, upper pole fullness, and balanced proportion with cohesive silicone implants.",
    beforeImage: "/assets/services results/Breast Augmentation _ Breast Implant.png",
    afterImage: "/assets/services results/Breast Augmentation _ Breast Implant.png",
  },
  {
    id: 5,
    category: "Breast",
    title: "Gynecomastia Surgery (Male Chest Reduction)",
    description: "Surgical removal of glandular male breast tissue combined with liposuction for a firm, masculine chest.",
    beforeImage: "/assets/services results/Gynecomastia Surgery.png",
    afterImage: "/assets/services results/Gynecomastia Surgery.png",
  },
  {
    id: 6,
    category: "Body",
    title: "Tummy Tuck (Abdominoplasty)",
    description: "Surgical removal of loose abdominal skin and repair of separated diastasis recti muscles.",
    beforeImage: "/assets/services results/Tummy Tuck.png",
    afterImage: "/assets/services results/Tummy Tuck.png",
  },
  {
    id: 7,
    category: "Body",
    title: "Mommy Makeover Restoration",
    description: "Combined surgical body contouring and breast elevation to restore pre-pregnancy contours.",
    beforeImage: "/assets/services results/Mommy Makeover.png",
    afterImage: "/assets/services results/Mommy Makeover.png",
  },
  {
    id: 8,
    category: "Face",
    title: "Facial Rejuvenation",
    description: "Multi-modal restoration combining dermal volumization, skin resurfacing, and tone refinement.",
    beforeImage: "/assets/services results/Facial Rejuvenation.png",
    afterImage: "/assets/services results/Facial Rejuvenation.png",
  },
  {
    id: 9,
    category: "Face",
    title: "Deep Plane / SMAS Facelift",
    description: "Elevation of deep facial muscular structures, smoothing jowls and restoring defined jawline contours.",
    beforeImage: "/assets/services results/Facelift Surgery.png",
    afterImage: "/assets/services results/Facelift Surgery.png",
  },
];

const filterCategories = ["All", "Face", "Body", "Breast"];

export default function Results() {
  const shouldReduceMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredResults =
    activeFilter === "All"
      ? resultsData
      : resultsData.filter((item) => item.category === activeFilter);

  return (
    <section id="results" className="py-24 bg-[#F8F6F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          whileInView={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: easePremium }}
          className="text-center max-w-3xl mx-auto mb-12 space-y-4"
        >
          <span className="text-[#E6663A] text-xs font-bold uppercase tracking-[0.25em] bg-[#E6663A]/10 px-3.5 py-1.5 rounded-full inline-block">
            Real Results
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#151515]">
            Real People. <span className="text-[#E6663A]">Real Results.</span>
          </h2>
          <p className="text-[#555555] text-base sm:text-lg">
            See the transformative power of our personalized cosmetic procedures. Authentic clinical outcomes tailored to natural proportions.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : 0.1, ease: easePremium }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12"
        >
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeFilter === cat
                  ? "bg-[#E6663A] text-white shadow-md scale-105"
                  : "bg-white text-[#555555] hover:bg-[#EFE8E0] hover:text-[#151515] border border-[#EFE8E0]"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Before & After 4:3 Cards Grid — Sequential One-By-One Float-Up Stagger */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          <AnimatePresence mode="popLayout">
            {filteredResults.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                whileInView={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1, margin: "0px 0px -40px 0px" }}
                exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.7,
                  delay: shouldReduceMotion ? 0 : (idx % 9) * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="h-full will-change-transform"
              >
                <BeforeAfterSlider
                  beforeImage={item.beforeImage}
                  afterImage={item.afterImage}
                  title={item.title}
                  description={item.description}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* VIEW ALL RESULTS CTA Button — Directly following the 9 cards */}
        <div className="mt-12 text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#151515] hover:bg-[#E6663A] text-white font-bold text-sm tracking-wider uppercase shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
          >
            <span>VIEW ALL RESULTS (36 PROCEDURES)</span>
            <ArrowRight className="w-4 h-4 text-[#F6B73C] group-hover:text-white group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>
    </section>
  );
}

