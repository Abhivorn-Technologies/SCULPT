"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Building2, FlaskConical, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

const pillars = [
  {
    icon: Heart,
    title: "Patient-Centered Care",
    desc: "Compassionate, personalized treatment plans prioritizing your safety, privacy, and unique aesthetic goals.",
  },
  {
    icon: Building2,
    title: "World-Class Infrastructure",
    desc: "State-of-the-art sterile surgical suites designed to international medical and hospitality standards.",
  },
  {
    icon: FlaskConical,
    title: "Advanced Procedures",
    desc: "Cutting-edge plastic surgery techniques, laser medicine, and non-surgical aesthetic innovations.",
  },
  {
    icon: Sparkles,
    title: "Natural & Aesthetic Results",
    desc: "Subtle, harmonious enhancements that refine your appearance while keeping your individual charm intact.",
  },
];

const easePremium = [0.25, 0.1, 0.25, 1.0] as const;

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#F8F6F2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column: Clinic Image with Subtle Fade-Up Entrance */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: easePremium }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5]">
              <Image
                src="/assets/about/about-image.jpg"
                alt="Inside The Sculpt Aesthetics Clinic"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-[#EFE8E0] shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#E6663A] text-white flex items-center justify-center font-bold text-lg shrink-0">
                    14+
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-[#151515]">
                      Years of Clinical Excellence
                    </h4>
                    <p className="text-xs text-[#555555]">
                      Trusted by thousands across India & abroad
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle decorative background glow */}
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-[#E6663A]/10 rounded-full blur-3xl -z-10" />
          </motion.div>

          {/* Right Column: About Content & Sequential Drop-Up Animated Elements */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              {/* 1. Badge: 0ms delay */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0, ease: easePremium }}
              >
                <span className="text-[#E6663A] text-xs font-bold uppercase tracking-[0.25em] bg-[#E6663A]/10 px-3.5 py-1.5 rounded-full inline-block">
                  About The Sculpt
                </span>
              </motion.div>

              {/* 2. Main Heading: 100ms delay */}
              <motion.h2
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.1, ease: easePremium }}
                className="font-serif text-3xl sm:text-5xl font-bold text-[#151515] leading-tight"
              >
                Where <span className="text-[#E6663A]">Art</span> Meets Science.
              </motion.h2>

              {/* 3. Description Paragraph: 200ms delay */}
              <motion.p
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.2, ease: easePremium }}
                className="text-[#555555] text-base sm:text-lg leading-relaxed"
              >
                At The Sculpt Aesthetics, we believe beauty is personal. Our expert team combines advanced surgical techniques with a refined artistic approach to deliver natural, safe, and long-lasting results tailored to you. We are dedicated to enhancing your natural features, boosting your self-confidence, and ensuring the highest standards of medical safety in every procedure.
              </motion.p>
            </div>

            {/* 4 Key Pillars Grid: Cards 1-4 with 300ms, 400ms, 500ms, 600ms delays */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {pillars.map((pillar, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + idx * 0.1,
                    ease: easePremium,
                  }}
                  className="p-5 rounded-2xl bg-white border border-[#EFE8E0] shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#E6663A]/10 text-[#E6663A] flex items-center justify-center mb-3 group-hover:bg-[#E6663A] group-hover:text-white transition-colors duration-300">
                    <pillar.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#151515] mb-1.5">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#555555] leading-relaxed">{pillar.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* 5. CTA Button: 750ms delay */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.75, ease: easePremium }}
              className="pt-4"
            >
              <Link
                href="/about"
                className="btn-sculpt-gradient px-8 py-4 rounded-full text-sm font-bold tracking-wider uppercase inline-flex items-center gap-3 shadow-lg hover:shadow-xl transition-all group"
              >
                <span>EXPLORE OUR STORY</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
