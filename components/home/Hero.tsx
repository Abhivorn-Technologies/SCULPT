"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Award, Users, ShieldCheck, Cpu, Sparkles, Calendar, ArrowRight } from "lucide-react";

const heroSlides = [
  {
    id: 1,
    image: "/assets/hero/hero-1.jpg",
    mobileImage: "/assets/hero/mobile/hero-1.jpg",
    mobileObjectPosition: "center 20%",
    tagline: "PREMIUM COSMETIC SURGERY CLINIC",
    headline: "Enhancing Confidence.\nTransforming Lives.",
    description:
      "Advanced cosmetic & plastic surgery procedures with personalized care for natural, beautiful, and long-lasting results.",
    primaryCta: "BOOK A CONSULTATION",
    primaryHref: "#contact",
    secondaryCta: "EXPLORE SERVICES",
    secondaryHref: "/services",
  },
  {
    id: 2,
    image: "/assets/hero/hero-2.jpg",
    mobileImage: "/assets/hero/mobile/hero-2.jpg",
    mobileObjectPosition: "center 25%",
    tagline: "PREMIUM WEIGHT LOSS & BODY CONTOURING",
    headline: "Redefine Your Shape.\n& Reclaim Your Confidence.",
    description:
      "Advanced weight loss and body contouring solutions for a more sculpted, balanced appearance. Personalized care designed around your goals.",
    primaryCta: "BOOK A CONSULTATION",
    primaryHref: "#contact",
    secondaryCta: "MEET OUR DOCTORS",
    secondaryHref: "#doctors",
  },
  {
    id: 3,
    image: "/assets/hero/hero-3.jpg",
    mobileImage: "/assets/hero/mobile/hero-3.jpg",
    mobileObjectPosition: "center 20%",
    tagline: "PREMIUM BREAST AUGMENTATION",
    headline: "Enhance Your Shape.\n& Embrace Your Confidence.",
    description:
      "Personalized breast enhancement procedures designed to achieve natural-looking balance, proportion, and beautiful results.",
    primaryCta: "BOOK A CONSULTATION",
    primaryHref: "#contact",
    secondaryCta: "VIEW RESULTS",
    secondaryHref: "/results",
  },
];

const stats = [
  { icon: Award, value: "20+", label: "Years of Experience" },
  { icon: Users, value: "5000+", label: "Happy Patients" },
  { icon: Cpu, value: "Advanced", label: "Technology" },
  { icon: Sparkles, value: "Personalized", label: "Treatment" },
  { icon: ShieldCheck, value: "Safe & Trusted", label: "Procedures" },
];

const SLIDE_DURATION = 6000; // Exactly 6 seconds per auto-scroll slide

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const isInView = useInView(heroRef, { amount: 0.3 });
  const pathname = usePathname();

  const wasInViewRef = useRef(false);

  // Reset to first slide whenever returning to Home or re-entering Hero viewport
  useEffect(() => {
    if (pathname === "/" && isInView && !wasInViewRef.current) {
      wasInViewRef.current = true;
      const timer = setTimeout(() => {
        setCurrentSlide(0);
      }, 0);
      return () => clearTimeout(timer);
    } else if (!isInView) {
      wasInViewRef.current = false;
    }
  }, [pathname, isInView]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Touch Swipe Handlers for Mobile Auto-Scrolling
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Continuous Auto-Scrolling Timer (6-second auto-rotation)
  useEffect(() => {
    // Only run timer when Hero is in view, not paused, and on the home page
    if (isPaused || !isInView || pathname !== "/") return;

    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, SLIDE_DURATION);

    return () => {
      clearInterval(intervalId);
    };
  }, [isPaused, isInView, pathname, currentSlide]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-between bg-[#151515] text-white overflow-hidden pt-24 pb-0 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Background Image Carousel with Smooth Crossfade */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={heroSlides[currentSlide].id}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {/* Mobile image: Dedicated mobile portrait asset & positioning below md breakpoint */}
            <div className="block md:hidden absolute inset-0">
              <Image
                src={heroSlides[currentSlide].mobileImage}
                alt={heroSlides[currentSlide].headline}
                fill
                priority
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: heroSlides[currentSlide].mobileObjectPosition }}
              />
            </div>
            {/* Desktop image: Original desktop asset & positioning above md breakpoint */}
            <div className="hidden md:block absolute inset-0">
              <Image
                src={heroSlides[currentSlide].image}
                alt={heroSlides[currentSlide].headline}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
            {/* Multi-stage dark gradient overlays for text legibility */}
            <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/30" />
            <div className="block md:hidden absolute inset-0 bg-gradient-to-b from-black/85 via-black/55 to-black/80" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-black/50" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow flex items-center w-full my-auto py-8 lg:py-12">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={heroSlides[currentSlide].id}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { staggerChildren: 0.15, duration: 0.8 },
                },
                exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
              }}
              className="space-y-6"
            >
              {/* Tagline Badge */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6663A]/20 border border-[#E6663A]/40 text-[#F6B73C] text-xs font-semibold tracking-widest uppercase backdrop-blur-md"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{heroSlides[currentSlide].tagline}</span>
              </motion.div>

              {/* Large Headline */}
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="font-serif text-3xl sm:text-5xl lg:text-7xl font-bold leading-[1.15] sm:leading-[1.1] tracking-tight text-white whitespace-pre-line"
              >
                {heroSlides[currentSlide].headline}
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="text-sm sm:text-lg lg:text-xl text-white/80 font-light leading-relaxed max-w-2xl"
              >
                {heroSlides[currentSlide].description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 sm:pt-4"
              >
                <Link
                  href={heroSlides[currentSlide].primaryHref}
                  className="btn-sculpt-gradient px-7 py-3.5 sm:px-8 sm:py-4 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{heroSlides[currentSlide].primaryCta}</span>
                </Link>

                <Link
                  href={heroSlides[currentSlide].secondaryHref}
                  className="px-7 py-3.5 sm:px-8 sm:py-4 rounded-full border border-white/40 text-white hover:bg-white hover:text-[#151515] font-semibold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all backdrop-blur-sm"
                >
                  <span>{heroSlides[currentSlide].secondaryCta}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Carousel Controls & Auto-Scroll Progress Indicators */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between pb-5 pt-2">
        {/* Slide Indicators with Progress Fill Animation */}
        <div className="flex items-center space-x-3">
          {heroSlides.map((slide, index) => {
            const isActive = currentSlide === index;
            return (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className="group py-2 transition-all"
              >
                <div
                  className={`h-1.5 rounded-full overflow-hidden transition-all duration-300 relative ${
                    isActive ? "w-12 bg-white/30" : "w-3.5 bg-white/20 group-hover:bg-white/50"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      key={`progress-${currentSlide}-${isPaused}`}
                      initial={{ width: "0%" }}
                      animate={{ width: isPaused ? "100%" : "100%" }}
                      transition={{
                        duration: isPaused ? 0 : SLIDE_DURATION / 1000,
                        ease: "linear",
                      }}
                      className="h-full bg-gradient-to-r from-[#E6663A] to-[#F6B73C] rounded-full"
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Prev / Next Navigation Buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-black/40 hover:bg-[#E6663A] hover:border-[#E6663A] text-white flex items-center justify-center transition-all backdrop-blur-sm active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-black/40 hover:bg-[#E6663A] hover:border-[#E6663A] text-white flex items-center justify-center transition-all backdrop-blur-sm active:scale-95"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>

      {/* Bottom Key Feature Stats Bar */}
      <div className="relative z-10 border-t border-white/10 bg-black/50 backdrop-blur-md py-6 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-[#E6663A]/15 border border-[#E6663A]/30 text-[#E6663A] flex items-center justify-center shrink-0 group-hover:bg-[#E6663A] group-hover:text-white transition-colors duration-300">
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-serif text-lg font-bold text-white leading-tight">
                    {stat.value}
                  </p>
                  <p className="text-xs text-white/70 leading-tight">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
