"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { getServiceBySlug } from "@/lib/servicesData";

// Exactly 6 selected featured services in balanced 2x3 grid
const homepageFeaturedSlugs = [
  "facial-rejuvenation",
  "gynecomastia",
  "liposuction",
  "body-contouring",
  "rhinoplasty",
  "lip-augmentation",
];

export default function Services() {
  const featuredServices = homepageFeaturedSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter(Boolean);

  return (
    <section id="services" className="py-24 bg-[#EFE8E0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with smooth fade-up entrance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <span className="text-[#E6663A] text-xs font-bold uppercase tracking-[0.25em] bg-[#E6663A]/10 px-3.5 py-1.5 rounded-full inline-block">
            Featured Services
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#151515]">
            Our Expertise. Your <span className="text-[#E6663A]">Transformation.</span>
          </h2>
          <p className="text-[#555555] text-base sm:text-lg font-light">
            Comprehensive surgical and non-surgical aesthetic solutions executed by leading specialists using state-of-the-art medical technology.
          </p>
        </motion.div>

        {/* 6 Featured Service Cards Grid — Staggered Reveal & Replayable Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredServices.map((service, idx) => {
            if (!service) return null;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ y: -8, scale: 1.01 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: (idx % 3) * 0.1,
                  ease: [0.25, 0.1, 0.25, 1.0],
                }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(230,102,58,0.15)] hover:border-[#E6663A]/40 transition-all duration-400 ease-out border border-black/5 flex flex-col justify-between group h-full cursor-pointer"
              >
                <div className="flex flex-col flex-grow">
                  {/* Image Header with smooth 0.5s zoom & overflow hidden */}
                  <div className="relative h-56 xl:h-60 w-full overflow-hidden bg-[#EFE8E0] shrink-0">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-600 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                    
                    {/* Category Pill with subtle hover highlight & movement */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1 rounded-full flex items-center gap-1.5 text-xs font-bold text-[#151515] shadow-sm border border-white/40 group-hover:translate-y-[-2px] group-hover:bg-white group-hover:border-[#E6663A]/50 transition-all duration-300">
                      <Sparkles className="w-3.5 h-3.5 text-[#E6663A]" />
                      <span>{service.category}</span>
                    </div>
                  </div>

                  {/* Service Heading & Short Description */}
                  <div className="p-6 space-y-3 flex-grow flex flex-col justify-start">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#151515] group-hover:text-[#E6663A] transition-colors duration-300 leading-tight">
                      {service.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#555555] leading-relaxed font-light line-clamp-2">
                      {service.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Footer KNOW ABOUT → Button with Orange-Yellow Gradient & Arrow Lift */}
                <div className="p-6 pt-0 mt-auto">
                  <Link
                    href={`/services/${service.slug}`}
                    className="w-full py-3 px-4 rounded-full border border-[#151515] text-[#151515] hover:border-transparent hover:bg-gradient-to-r hover:from-[#fa4c00] hover:to-[#ffbd59] hover:text-white transition-all duration-300 ease-in-out font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 group/btn shadow-xs hover:shadow-md group-hover/btn:-translate-y-0.5"
                  >
                    <span>KNOW ABOUT</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform duration-300 ease-out text-[#E6663A] group-hover/btn:text-white" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Services CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Link
            href="/our-services"
            className="btn-sculpt-gradient px-9 py-4 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase inline-flex items-center gap-3 shadow-xl hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-0.5"
          >
            <span>VIEW ALL SERVICES</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
