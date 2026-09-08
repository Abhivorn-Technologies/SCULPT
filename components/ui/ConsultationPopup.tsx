"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, AlertCircle } from "lucide-react";

const POPUP_INTERVAL_MS = 30000; // 30 seconds

const concernOptions = [
  "Rhinoplasty & Facial Contouring",
  "Body Contouring & Liposuction",
  "Breast Surgery (Augmentation / Lift)",
  "Gynecomastia (Male Chest Reduction)",
  "Men's Aesthetic Treatments",
  "Weight Loss & Slimming Solutions",
  "Anti-Aging (Botox, Fillers & Threads)",
  "Skin Rejuvenation & Laser Treatments",
  "Scar Revision & Pigmentation",
  "Intimate Aesthetics",
  "General Consultation",
];

export default function ConsultationPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    concern: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to start or restart the 30-second timer
  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setIsOpen(true);
      setStatus("idle");
      setErrorMessage("");
    }, POPUP_INTERVAL_MS);
  }, []);

  // Start initial timer on mount
  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [startTimer]);

  // Lock background body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle Close & restart 30-second timer
  const handleClose = useCallback(() => {
    setIsOpen(false);
    startTimer();
  }, [startTimer]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName.trim()) {
      setErrorMessage("Please enter your Full Name.");
      setStatus("error");
      return;
    }

    if (!formData.phone.trim() || formData.phone.replace(/\D/g, "").length < 8) {
      setErrorMessage("Please enter a valid Phone / WhatsApp number.");
      setStatus("error");
      return;
    }

    if (!formData.concern) {
      setErrorMessage("Please select your Primary Concern.");
      setStatus("error");
      return;
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setErrorMessage("Please enter a valid email address or leave it blank.");
      setStatus("error");
      return;
    }

    setStatus("submitting");

    const whatsappMsg = `Hello Sculpt Aesthetics,

I would like to book a free consultation.

Name: ${formData.fullName.trim()}
Phone: ${formData.phone.trim()}
Email: ${formData.email.trim() || "Not provided"}
Service: ${formData.concern}
Message: Regarding ${formData.concern}

Please contact me regarding my consultation.`;

    const whatsappUrl = `https://wa.me/919639635454?text=${encodeURIComponent(whatsappMsg)}`;

    try {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    } catch {
      window.location.href = whatsappUrl;
    }

    setStatus("success");
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      concern: "",
    });

    // Auto close after 2.5 seconds on success and restart cycle
    setTimeout(() => {
      handleClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Centered Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-title"
            className="relative w-full max-w-[480px] bg-[#080603] text-white rounded-3xl border border-white/15 p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.9)] z-10 my-auto overflow-hidden"
          >
            {/* Top Glow Accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-[#E6663A] to-transparent opacity-80" />

            {/* Circular Close Button in Top-Right */}
            <button
              onClick={handleClose}
              type="button"
              aria-label="Close consultation popup"
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-all duration-200 active:scale-90"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="pr-8 mb-5">
              <h2 id="popup-title" className="font-serif text-2xl sm:text-[28px] font-bold text-white tracking-tight leading-tight">
                Book Free Consultation
              </h2>
              <p className="text-xs sm:text-sm text-white/70 mt-1.5 leading-relaxed">
                Fill out the form below and we will contact you shortly.
              </p>
            </div>

            {/* Success View */}
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-[#E6663A]/20 border border-[#E6663A]/40 text-[#F6B73C] flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(230,102,58,0.4)]">
                  <CheckCircle2 className="w-9 h-9 text-[#F6B73C]" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-serif text-xl font-bold text-white">Thank You!</h3>
                  <p className="text-sm text-white/80 max-w-xs mx-auto">
                    Your consultation request has been received. Our senior consultant will contact you shortly.
                  </p>
                </div>
              </motion.div>
            ) : (
              /* Consultation Form */
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Error Banner */}
                {status === "error" && errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-200 text-xs flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}

                {/* 1. Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="popup-fullName" className="block text-xs font-semibold text-white/90 tracking-wide">
                    Full Name <span className="text-[#E6663A]">*</span>
                  </label>
                  <input
                    id="popup-fullName"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/15 focus:border-[#E6663A] focus:bg-white/[0.09] text-white text-sm placeholder:text-white/35 focus:outline-none transition-colors"
                  />
                </div>

                {/* 2. Phone / WhatsApp */}
                <div className="space-y-1.5">
                  <label htmlFor="popup-phone" className="block text-xs font-semibold text-white/90 tracking-wide">
                    Phone / WhatsApp <span className="text-[#E6663A]">*</span>
                  </label>
                  <input
                    id="popup-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/15 focus:border-[#E6663A] focus:bg-white/[0.09] text-white text-sm placeholder:text-white/35 focus:outline-none transition-colors"
                  />
                </div>

                {/* 3. Email Address */}
                <div className="space-y-1.5">
                  <label htmlFor="popup-email" className="block text-xs font-semibold text-white/90 tracking-wide">
                    Email Address
                  </label>
                  <input
                    id="popup-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/15 focus:border-[#E6663A] focus:bg-white/[0.09] text-white text-sm placeholder:text-white/35 focus:outline-none transition-colors"
                  />
                </div>

                {/* 4. Primary Concern */}
                <div className="space-y-1.5">
                  <label htmlFor="popup-concern" className="block text-xs font-semibold text-white/90 tracking-wide">
                    Primary Concern <span className="text-[#E6663A]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="popup-concern"
                      name="concern"
                      value={formData.concern}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 rounded-xl bg-[#120F0A] border border-white/15 focus:border-[#E6663A] text-sm focus:outline-none transition-colors appearance-none cursor-pointer ${
                        formData.concern ? "text-white" : "text-white/35"
                      }`}
                    >
                      <option value="" disabled className="bg-[#120F0A] text-white/40">
                        Select your concern
                      </option>
                      {concernOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#120F0A] text-white py-1">
                          {opt}
                        </option>
                      ))}
                    </select>
                    {/* Custom Dropdown Chevron */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/50">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-3.5 sm:py-4 px-6 rounded-xl bg-gradient-to-r from-[#E6663A] to-[#F6B73C] text-white font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 shadow-[0_8px_25px_rgba(230,102,58,0.45)] hover:shadow-[0_12px_32px_rgba(230,102,58,0.65)] hover:brightness-105 active:scale-[0.99] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? (
                      <span className="inline-flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Submitting...</span>
                      </span>
                    ) : (
                      <>
                        <span>Book Free Consultation</span>
                        <Send className="w-4 h-4 ml-0.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
