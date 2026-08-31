"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { servicesData } from "@/lib/servicesData";

const categories = ["All", "Face", "Body", "Breast", "Intimate", "Minor Surgical"];

// Filter out "Breast Procedures" for the All Services grid (24 services remaining)
const allServices24 = servicesData.filter((s) => s.id !== "breast-procedures");

export default function OurServicesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredServices =
    activeCategory === "All"
      ? allServices24
      : allServices24.filter((s) => s.category === activeCategory);

  return (
    <div className="pt-24 pb-20 bg-[#F8F6F2] space-y-16 selection:bg-[#E6663A] selection:text-white">
      {/* Subpage Luxury Header Banner */}
      <section className="bg-[#151515] text-white py-20 relative overflow-hidden border-b border-white/10">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#E6663A]/10 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E6663A]/20 border border-[#E6663A]/40 text-[#F6B73C] text-xs font-semibold uppercase tracking-[0.25em]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>OUR COMPREHENSIVE PROCEDURES</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white"
          >
            All Surgical & <span className="bg-gradient-to-r from-[#E6663A] via-[#F28C28] to-[#F6B73C] bg-clip-text text-transparent">Aesthetic Services</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/75 max-w-2xl mx-auto text-base sm:text-lg font-light leading-relaxed"
          >
            Explore our complete suite of board-certified plastic surgery, body contouring, facial rejuvenation, and specialized intimate care treatments.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-2 flex flex-wrap justify-center gap-6 items-center text-xs text-white/80 font-medium"
          >
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#E6663A]" /> Board-Certified Surgeons
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#F6B73C]" /> NABH & US FDA Compliant
            </span>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#E6663A] text-white shadow-md scale-105"
                  : "bg-white text-[#555555] hover:bg-[#EFE8E0] hover:text-[#151515] border border-[#EFE8E0]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 24 Services Grid — 4 Columns x 6 Rows on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8">
          {filteredServices.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.5, delay: (idx % 4) * 0.08 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-[#EFE8E0] hover:border-[#E6663A]/40 flex flex-col justify-between group h-full"
            >
              <div className="flex flex-col flex-grow">
                {/* Service Image with Category Badge */}
                <div className="relative h-56 xl:h-60 w-full overflow-hidden bg-[#EFE8E0] shrink-0">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                  
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#151515] shadow-md border border-white/40 uppercase tracking-wider">
                    {service.category}
                  </div>
                </div>

                {/* Service Details */}
                <div className="p-6 space-y-3 flex-grow flex flex-col justify-start">
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#151515] group-hover:text-[#E6663A] transition-colors leading-snug">
                    {service.name}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#555555] leading-relaxed font-light line-clamp-3">
                    {service.shortDescription}
                  </p>
                </div>
              </div>

              {/* KNOW ABOUT Action Button */}
              <div className="p-6 pt-0 mt-auto">
                <Link
                  href={`/services/${service.slug}`}
                  className="w-full py-3 px-5 rounded-full border border-[#151515] text-[#151515] hover:border-transparent hover:bg-gradient-to-r hover:from-[#fa4c00] hover:to-[#ffbd59] hover:text-white transition-all duration-300 ease-in-out font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 group/btn shadow-sm hover:shadow-md"
                >
                  <span>KNOW ABOUT</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300 text-[#E6663A] group-hover/btn:text-white" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
