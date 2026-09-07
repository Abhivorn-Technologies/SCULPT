"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";
import { servicesData, getServiceBeforeAfterResults, type PrimaryCategory } from "@/lib/servicesData";

// Premium modern easing curve for smooth, refined slide + fade
const easePremium = [0.22, 1, 0.36, 1] as const;

// All 36 services mapped to their Before & After result item
export interface GalleryItem {
  id: string;
  slug: string;
  name: string;
  category: PrimaryCategory;
  title: string;
  image: string;
  description: string;
}

export const galleryItems: GalleryItem[] = servicesData.map((service) => {
  const baResults = getServiceBeforeAfterResults(service.slug);
  const primaryResult = baResults[0];

  return {
    id: service.id,
    slug: service.slug,
    name: service.name,
    category: service.category,
    title: primaryResult?.title || service.name,
    image: primaryResult?.beforeImage || `/assets/services results/${service.name}.png`,
    description: primaryResult?.description || service.shortDescription,
  };
});

const filterTabs: Array<"ALL" | PrimaryCategory> = [
  "ALL",
  "FACE",
  "BODY",
  "BREAST",
  "SKIN",
  "INTIMATE",
  "WELLNESS",
];

export default function GalleryClient() {
  const shouldReduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<"ALL" | PrimaryCategory>("ALL");

  const filteredItems =
    activeCategory === "ALL"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <div className="space-y-12">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-5xl mx-auto px-4">
        {filterTabs.map((tab) => {
          const isActive = activeCategory === tab;
          const count =
            tab === "ALL"
              ? galleryItems.length
              : galleryItems.filter((item) => item.category === tab).length;

          return (
            <button
              key={tab}
              onClick={() => setActiveCategory(tab)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                isActive
                  ? "bg-[#E6663A] text-white shadow-lg shadow-[#E6663A]/25 scale-105"
                  : "bg-white text-[#555555] hover:bg-[#EFE8E0] hover:text-[#151515] border border-[#EFE8E0] shadow-xs"
              }`}
            >
              <span>{tab}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive ? "bg-black/20 text-white" : "bg-[#EFE8E0] text-[#777777]"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Results Count Banner */}
      <div className="text-center text-xs text-[#777777] font-medium tracking-wide">
        Showing <span className="text-[#E6663A] font-bold">{filteredItems.length}</span> of {galleryItems.length} verified surgical & clinical outcomes
      </div>

      {/* 36-Service Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
              whileInView={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12, margin: "0px 0px -30px 0px" }}
              exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.6,
                delay: shouldReduceMotion ? 0 : (idx % 6) * 0.09,
                ease: easePremium,
              }}
              className="h-full will-change-transform"
            >
              <BeforeAfterSlider
                beforeImage={item.image}
                afterImage={item.image}
                title={item.title}
                description={item.description}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
