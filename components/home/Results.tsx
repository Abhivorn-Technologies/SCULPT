"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";

const easePremium = [0.25, 0.1, 0.25, 1.0] as const;

const resultsData = [
  {
    id: 1,
    category: "Face",
    title: "Rhinoplasty",
    description: "Natural-looking structural refinement designed to improve facial harmony and nasal appearance.",
    beforeImage: "/assets/results/BEFORE AFTER/RESULTS-1.png",
    afterImage: "/assets/results/BEFORE AFTER/RESULTS-1.png",
  },
  {
    id: 2,
    category: "Body",
    title: "Liposuction & Fat Removal",
    description: "Targeted body sculpting and fat elimination to refine stubborn localized deposits and waistline.",
    beforeImage: "/assets/results/BEFORE AFTER/RESULTS-2.png",
    afterImage: "/assets/results/BEFORE AFTER/RESULTS-2.png",
  },
  {
    id: 3,
    category: "Breast",
    title: "Breast Augmentation & Lift",
    description: "Enhanced breast volume, lift, and symmetry tailored to natural body proportions.",
    beforeImage: "/assets/results/BEFORE AFTER/RESULTS-3.png",
    afterImage: "/assets/results/BEFORE AFTER/RESULTS-3.png",
  },
  {
    id: 4,
    category: "Body",
    title: "High-Definition Body Contouring",
    description: "Comprehensive body shaping highlighting underlying athletic muscular definition.",
    beforeImage: "/assets/results/BEFORE AFTER/RESULTS-4.png",
    afterImage: "/assets/results/BEFORE AFTER/RESULTS-4.png",
  },
  {
    id: 5,
    category: "Breast",
    title: "Gynecomastia Surgery (Male Chest Reduction)",
    description: "Surgical removal of male glandular breast tissue for a firm, flat, and masculine chest contour.",
    beforeImage: "/assets/results/BEFORE AFTER/RESULTS-5.jpg",
    afterImage: "/assets/results/BEFORE AFTER/RESULTS-5.jpg",
  },
  {
    id: 6,
    category: "Body",
    title: "Tummy Tuck (Abdominoplasty)",
    description: "Surgical removal of loose abdominal skin and repair of underlying core muscles for a flat waist.",
    beforeImage: "/assets/results/BEFORE AFTER/RESULTS-6.jpg",
    afterImage: "/assets/results/BEFORE AFTER/RESULTS-6.jpg",
  },
  {
    id: 7,
    category: "Face",
    title: "Dermal Fillers",
    description: "Precision dermal volumizing and facial contouring for balanced, youthful facial aesthetics.",
    beforeImage: "/assets/results/BEFORE AFTER/RESULTS-7.jpg",
    afterImage: "/assets/results/BEFORE AFTER/RESULTS-7.jpg",
  },
  {
    id: 8,
    category: "Face",
    title: "Facial Rejuvenation",
    description: "Comprehensive anti-aging treatment restoring youthful facial volume, tone, and smooth skin.",
    beforeImage: "/assets/results/BEFORE AFTER/RESULTS-8.jpg",
    afterImage: "/assets/results/BEFORE AFTER/RESULTS-8.jpg",
  },
  {
    id: 9,
    category: "Face",
    title: "Buccal Fat Pad Removal",
    description: "Targeted cheek fat reduction to carve sculpted cheekbones and refine lower facial profile.",
    beforeImage: "/assets/results/BEFORE AFTER/RESULTS-9.jpg",
    afterImage: "/assets/results/BEFORE AFTER/RESULTS-9.jpg",
  },
  {
    id: 10,
    category: "Face",
    title: "Blepharoplasty (Eyelid Surgery)",
    description: "Surgical removal of drooping upper eyelid skin and under-eye bags for a bright, awake gaze.",
    beforeImage: "/assets/results/BEFORE AFTER/RESULTS-10.jpg",
    afterImage: "/assets/results/BEFORE AFTER/RESULTS-10.jpg",
  },
];

const filterCategories = ["All", "Face", "Body", "Breast"];

export default function Results() {
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
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: easePremium }}
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1, ease: easePremium }}
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

        {/* Before & After 4:3 Cards Grid — Sequential Stagger Fade-Up Re-trigger */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          <AnimatePresence mode="popLayout">
            {filteredResults.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 25, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: (idx % 3) * 0.1,
                  ease: easePremium,
                }}
                className="h-full"
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
      </div>
    </section>
  );
}
