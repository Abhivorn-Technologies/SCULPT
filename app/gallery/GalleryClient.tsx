"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";
import { servicesData, getServiceBeforeAfterResults, type PrimaryCategory } from "@/lib/servicesData";

// Premium modern easing curve for smooth, refined slide + fade
const easePremium = [0.22, 1, 0.36, 1] as const;

export interface GalleryItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  title: string;
  beforeImage: string;
  afterImage: string;
  description: string;
}

// Fallback static items
export const galleryItems: GalleryItem[] = servicesData.map((service) => {
  const baResults = getServiceBeforeAfterResults(service.slug);
  const primaryResult = baResults[0];

  const defaultImg = `/assets/services results/${service.name}.png`;

  return {
    id: service.id,
    slug: service.slug,
    name: service.name,
    category: service.category,
    title: primaryResult?.title || service.name,
    beforeImage: primaryResult?.beforeImage || defaultImg,
    afterImage: primaryResult?.afterImage || defaultImg,
    description: primaryResult?.description || service.shortDescription,
  };
});

const defaultTabs = [
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
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [dbItems, setDbItems] = useState<GalleryItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  // Fetch published gallery items from MongoDB
  useEffect(() => {
    async function loadGallery() {
      try {
        const res = await fetch("/api/gallery");
        const data = await res.json();
        if (data.success && data.results && data.results.length > 0) {
          const mapped: GalleryItem[] = data.results.map((r: any) => {
            const matchingService = servicesData.find(
              (s) => s.name.toLowerCase() === (r.treatmentService || "").toLowerCase()
            );

            return {
              id: String(r._id),
              slug: r.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
              name: r.treatmentService || "Treatment",
              category: (r.category || matchingService?.category || "FACE") as string,
              title: r.title,
              beforeImage: r.beforeImage,
              afterImage: r.afterImage,
              description: r.shortDescription || r.title,
            };
          });
          setDbItems(mapped);
        }
      } catch (e) {
        console.error("Failed to load DB gallery:", e);
      }
    }
    loadGallery();
  }, []);

  // Priority to MongoDB published items when available
  const allGalleryItems = dbItems.length > 0 ? dbItems : galleryItems;

  const extraCategories = Array.from(
    new Set(allGalleryItems.map((item) => (item.category || "FACE").toUpperCase()))
  );
  const filterTabs = Array.from(new Set([...defaultTabs, ...extraCategories]));

  const filteredItems =
    activeCategory === "ALL"
      ? allGalleryItems
      : allGalleryItems.filter((item) => (item.category || "FACE").toUpperCase() === activeCategory);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategoryChange = (tab: string) => {
    setActiveCategory(tab);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (typeof window !== "undefined") {
      const el = document.getElementById("gallery-results-start");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div id="gallery-results-start" className="space-y-12">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-5xl mx-auto px-4">
        {filterTabs.map((tab) => {
          const isActive = activeCategory === tab;
          const count =
            tab === "ALL"
              ? allGalleryItems.length
              : allGalleryItems.filter((item) => item.category === tab).length;

          return (
            <button
              key={tab}
              onClick={() => handleCategoryChange(tab)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer ${
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
        Showing <span className="text-[#E6663A] font-bold">{(currentPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredItems.length)}</span> of {filteredItems.length} verified surgical & clinical outcomes
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="popLayout">
          {paginatedItems.map((item, idx) => (
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
                beforeImage={item.beforeImage}
                afterImage={item.afterImage}
                title={item.title}
                treatmentName={item.name}
                description={item.description}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Public Gallery Pagination Bar */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto px-4 pt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-5 py-2.5 rounded-full border border-[#EFE8E0] bg-white text-xs font-bold text-[#151515] hover:bg-[#E6663A] hover:text-white hover:border-[#E6663A] transition-all disabled:opacity-40 disabled:pointer-events-none shadow-xs cursor-pointer"
          >
            ← Previous Page
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`w-9 h-9 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  currentPage === pageNum
                    ? "bg-[#E6663A] text-white shadow-md shadow-[#E6663A]/30 scale-105"
                    : "bg-white text-[#555555] hover:text-[#151515] border border-[#EFE8E0]"
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-5 py-2.5 rounded-full border border-[#EFE8E0] bg-white text-xs font-bold text-[#151515] hover:bg-[#E6663A] hover:text-white hover:border-[#E6663A] transition-all disabled:opacity-40 disabled:pointer-events-none shadow-xs cursor-pointer"
          >
            Next Page →
          </button>
        </div>
      )}
    </div>
  );
}
