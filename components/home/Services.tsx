"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { getFeaturedServices } from "@/lib/servicesData";

export default function Services() {
  const featuredServices = getFeaturedServices();

  return (
    <section id="services" className="py-24 bg-[#EFE8E0] relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with smooth fade-up entrance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
          className="text-center max-w-3xl mx-auto mb-14 space-y-4"
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

        {/* 10 Featured Service Cards Grid — Exactly 2 Rows x 5 Columns on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
          {featuredServices.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -6 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{
                duration: 0.45,
                delay: (idx % 5) * 0.08,
                ease: [0.25, 0.1, 0.25, 1.0],
              }}
              className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_16px_36px_rgba(230,102,58,0.14)] hover:border-[#E6663A]/40 transition-all duration-300 ease-out border border-black/5 flex flex-col justify-between group h-full cursor-pointer"
            >
              <div className="flex flex-col flex-grow">
                {/* Image Container with fixed height & object-cover */}
                <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-[#EFE8E0] shrink-0">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out filter contrast-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5 text-[11px] font-bold text-[#151515] shadow-xs border border-white/50">
                    <Sparkles className="w-3 h-3 text-[#E6663A]" />
                    <span>{service.category}</span>
                  </div>
                </div>

                {/* Service Name & Short Description */}
                <div className="p-4 sm:p-5 space-y-2 flex-grow flex flex-col justify-start">
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#151515] group-hover:text-[#E6663A] transition-colors duration-300 leading-snug line-clamp-2">
                    {service.name}
                  </h3>

                  <p className="text-xs text-[#666666] leading-relaxed font-light line-clamp-2">
                    {service.shortDescription}
                  </p>
                </div>
              </div>

              {/* Footer KNOW ABOUT → Button navigating to /services/[slug] */}
              <div className="p-4 sm:p-5 pt-0 mt-auto">
                <Link
                  href={`/services/${service.slug}`}
                  scroll={true}
                  className="w-full py-2.5 px-3 rounded-full border border-[#151515] text-[#151515] hover:border-transparent hover:bg-gradient-to-r hover:from-[#fa4c00] hover:to-[#ffbd59] hover:text-white transition-all duration-300 ease-in-out font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 group/btn shadow-xs hover:shadow-md"
                >
                  <span>KNOW ABOUT</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-300 ease-out text-[#E6663A] group-hover/btn:text-white" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Services CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-center mt-14"
        >
          <Link
            href="/our-services"
            className="btn-sculpt-gradient px-8 py-3.5 sm:px-9 sm:py-4 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase inline-flex items-center gap-3 shadow-xl hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-0.5"
          >
            <span>VIEW ALL SERVICES</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
