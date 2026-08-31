"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, UserCheck } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    treatment: "Rhinoplasty",
    rating: 5,
    quote:
      "The team at Sculpt made me feel so comfortable from day one. My rhinoplasty results look incredibly natural, exactly what I hoped for. The care and attention to detail were exceptional.",
    initials: "SM",
  },
  {
    id: 2,
    name: "David K.",
    treatment: "Gynecomastia (Male Chest Reduction)",
    rating: 5,
    quote:
      "After years of struggling with chest fullness, the male breast reduction procedure has completely restored my confidence. The process was smooth, painless, and the follow-up care was brilliant.",
    initials: "DK",
  },
  {
    id: 3,
    name: "Emily R.",
    treatment: "Mommy Makeover",
    rating: 5,
    quote:
      "I had a mommy makeover here and the results exceeded my expectations. Dr. Kiran is a true artist. The entire staff was supportive and attentive throughout my entire recovery.",
    initials: "ER",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-24 bg-[#EFE8E0] relative overflow-hidden">
      {/* Decorative background quote element */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-[#E6663A]/10 pointer-events-none">
        <Quote className="w-96 h-96" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[#E6663A] text-xs font-bold uppercase tracking-[0.25em] bg-[#E6663A]/10 px-3.5 py-1.5 rounded-full inline-block">
            Patient Stories
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#151515]">
            What Our <span className="text-[#E6663A]">Patients Say</span>
          </h2>
          <p className="text-[#555555] text-base sm:text-lg">
            Read verified reviews and real feedback from patients who entrusted their transformation to The Sculpt Aesthetics.
          </p>
        </div>

        {/* Carousel Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-black/5 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6 text-center"
              >
                {/* 5-Star Rating */}
                <div className="flex justify-center items-center space-x-1 text-[#F6B73C]">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>

                {/* Patient Quote */}
                <p className="font-serif text-xl sm:text-2xl text-[#151515] italic leading-relaxed max-w-3xl mx-auto">
                  &ldquo;{testimonials[currentIndex].quote}&rdquo;
                </p>

                {/* Patient Profile Details */}
                <div className="pt-4 flex flex-col items-center justify-center space-y-2">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#E6663A] to-[#F6B73C] text-white font-bold text-lg flex items-center justify-center shadow-md">
                    {testimonials[currentIndex].initials}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#151515]">
                      {testimonials[currentIndex].name}
                    </h3>
                    <p className="text-xs font-semibold text-[#E6663A] uppercase tracking-wider">
                      Patient • {testimonials[currentIndex].treatment}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between absolute top-1/2 -translate-y-1/2 left-4 right-4 sm:-left-6 sm:-right-6 pointer-events-none">
              <button
                onClick={prevTestimonial}
                aria-label="Previous testimonial"
                className="w-12 h-12 rounded-full bg-white text-[#151515] shadow-lg border border-[#EFE8E0] hover:bg-[#E6663A] hover:text-white flex items-center justify-center transition-all pointer-events-auto"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextTestimonial}
                aria-label="Next testimonial"
                className="w-12 h-12 rounded-full bg-white text-[#151515] shadow-lg border border-[#EFE8E0] hover:bg-[#E6663A] hover:text-white flex items-center justify-center transition-all pointer-events-auto"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? "w-8 bg-[#E6663A]" : "w-2.5 bg-[#555555]/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
