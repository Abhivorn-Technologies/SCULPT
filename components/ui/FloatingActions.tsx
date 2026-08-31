"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";
import Image from "next/image";

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const whatsappNumber = "919639635454";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3.5 pointer-events-none">
      {/* Scroll to Top (Up Arrow) Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="group relative pointer-events-auto w-12 h-12 rounded-full bg-[#151515] text-white border border-white/20 shadow-xl hover:bg-[#E6663A] hover:border-[#E6663A] flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 backdrop-blur-md"
          >
            <ChevronUp className="w-6 h-6 text-white group-hover:-translate-y-0.5 transition-transform duration-300" />
            
            {/* Hover Tooltip */}
            <span className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-[#151515] text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white/10 shadow-lg">
              Back to Top
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Button */}
      <motion.a
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative pointer-events-auto w-12 h-12 rounded-full bg-gradient-to-tr from-[#128C7E] via-[#25D366] to-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.5)] hover:shadow-[0_14px_40px_rgba(37,211,102,0.7)] flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 overflow-hidden"
      >
        {/* Pulsing ring animation behind WhatsApp button */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping -z-10" />

        {/* WhatsApp Official PNG Icon */}
        <Image
          src="/assets/contact/whatsapp.png"
          alt="WhatsApp"
          width={36}
          height={36}
          className="w-9 h-9 object-contain transition-transform duration-300 group-hover:rotate-6"
        />

        {/* Hover Tooltip */}
        <span className="absolute right-20 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-[#151515] text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-white/10 shadow-xl">
          Chat on WhatsApp
        </span>
      </motion.a>
    </div>
  );
}
