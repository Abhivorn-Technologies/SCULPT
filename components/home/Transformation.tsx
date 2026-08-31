"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";
import { Sparkles, ArrowRight, CheckCircle } from "lucide-react";

const transformations = [
  {
    category: "Face",
    beforeImage: "/assets/results/face/before.jpg",
    afterImage: "/assets/results/face/after.jpg",
    label: "FACIAL TRANSFORMATION",
    title: "Facial Harmonization & Contour Refinement",
    description:
      "Discover flawless contours, sculpted cheekbones, and refreshed youthful skin designed to enhance your natural facial architecture.",
    highlights: ["Symmetrical nose profile", "Natural lip enhancement", "Jawline definition", "Collagen restoration"],
    ctaText: "EXPLORE FACIAL TREATMENTS",
    ctaHref: "/our-services",
  },
  {
    category: "Body",
    beforeImage: "/assets/transformation/body/before.jpg",
    afterImage: "/assets/transformation/body/after.jpg",
    label: "BODY TRANSFORMATION",
    title: "A More Defined You.",
    description:
      "High-definition body sculpting and liposuction designed to accentuate natural muscularity, refine torso proportions, and eliminate stubborn abdominal fat.",
    highlights: [
      "Enhanced Body Contouring",
      "Refined Proportions",
      "Natural-Looking Results",
      "Improved Confidence",
    ],
    ctaText: "EXPLORE BODY TREATMENTS",
    ctaHref: "/our-services",
  },
];

export default function Transformation() {
  const [activeCategory, setActiveCategory] = useState(0);

  const current = transformations[activeCategory];

  return (
    <section id="transformation" className="py-24 bg-[#151515] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-[#F6B73C] text-xs font-bold uppercase tracking-[0.25em] bg-[#E6663A]/20 border border-[#E6663A]/40 px-3.5 py-1.5 rounded-full inline-block">
            Transformations
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            EVERY TRANSFORMATION <span className="text-[#E6663A]">TELLS A STORY.</span>
          </h2>
          <p className="text-white/70 text-base sm:text-lg">
            Explore authentic patient journeys and see how subtle, artful enhancements create life-changing confidence.
          </p>
        </div>

        {/* Category Tabs — Centered & Properly Aligned for FACE, BODY, BREAST */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
          {transformations.map((item, idx) => (
            <button
              key={item.category}
              onClick={() => setActiveCategory(idx)}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === idx
                  ? "bg-gradient-to-r from-[#E6663A] via-[#F28C28] to-[#F6B73C] text-white shadow-lg scale-105"
                  : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
              }`}
            >
              {item.category}
            </button>
          ))}
        </div>

        {/* Active Transformation Showcase Card */}
        <div className="bg-white/5 rounded-3xl border border-white/10 p-6 lg:p-12 backdrop-blur-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              {/* Interactive Before & After Slider */}
              <div className="lg:col-span-6">
                <BeforeAfterSlider
                  beforeImage={current.beforeImage}
                  afterImage={current.afterImage}
                  beforeAlt={`${current.category} Before Transformation`}
                  afterAlt={`${current.category} After Transformation`}
                />
              </div>

              {/* Text Content */}
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[#F6B73C] text-xs font-semibold uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    <span>{current.label}</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight">
                    {current.title}
                  </h3>

                  <p className="text-white/80 text-base leading-relaxed">
                    {current.description}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {current.highlights.map((point, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-sm text-white/90">
                      <CheckCircle className="w-4 h-4 text-[#E6663A] shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Link */}
                <div className="pt-4">
                  <Link
                    href={current.ctaHref}
                    className="btn-sculpt-gradient px-8 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase inline-flex items-center gap-2 shadow-xl hover:shadow-2xl transition-all"
                  >
                    <span>{current.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
