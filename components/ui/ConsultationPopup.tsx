"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  CreditCard,
  Percent,
  Sparkles,
  Download,
  ExternalLink,
  FileText,
} from "lucide-react";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import { servicesData } from "@/lib/servicesData";
import { openRazorpayCheckout } from "@/lib/razorpayClient";

const POPUP_INTERVAL_MS = 30000; // 30 seconds

interface IPricing {
  consultationFee: number;
  discountPercent: number;
  discountedFee: number;
  currency: string;
  isDiscountActive: boolean;
  razorpayKeyId?: string;
}

export default function ConsultationPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
  const [pricing, setPricing] = useState<IPricing | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [paidDetails, setPaidDetails] = useState<{
    amount: number;
    paymentId: string;
    appointmentId?: string;
  } | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch dynamic consultation pricing from database
  useEffect(() => {
    async function fetchPricing() {
      try {
        const res = await fetch("/api/consultation-fee");
        const data = await res.json();
        if (data.success) {
          setPricing({
            consultationFee: data.consultationFee,
            discountPercent: data.discountPercent,
            discountedFee: data.discountedFee,
            currency: data.currency || "INR",
            isDiscountActive: Boolean(data.isDiscountActive),
            razorpayKeyId: data.razorpayKeyId,
          });
        }
      } catch (err) {
        console.error("Failed to load consultation pricing in popup:", err);
      }
    }
    fetchPricing();
  }, []);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Unified validation matching Contact.tsx
    if (!formData.firstName.trim() || !formData.phone.trim() || !formData.service) {
      setErrorMessage("Please fill in your Name, Phone Number, and Service of Interest.");
      setStatus("error");
      return;
    }

    if (formData.phone.replace(/\D/g, "").length < 8) {
      setErrorMessage("Please enter a valid Phone number.");
      setStatus("error");
      return;
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setErrorMessage("Please enter a valid Email Address or leave it empty.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim();

    try {
      // 1. Create Razorpay order on server
      const orderRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          name: fullName,
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          service: formData.service,
          message: formData.message.trim(),
          source: "Consultation Popup",
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.success) {
        throw new Error(orderData.error || "Unable to initiate payment");
      }

      // 2. Open Razorpay Checkout Gateway
      await openRazorpayCheckout({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "The Sculpt Aesthetics",
        description: `Consultation Booking: ${formData.service}`,
        order_id: orderData.orderId,
        prefill: {
          name: fullName,
          contact: formData.phone.trim(),
          email: formData.email.trim() || undefined,
        },
        theme: {
          color: "#E6663A",
        },
        modal: {
          ondismiss: () => {
            setStatus("idle");
          },
        },
        handler: async (response) => {
          try {
            // 3. Verify Razorpay signature on server
            const verifyRes = await fetch("/api/razorpay/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                appointmentId: orderData.appointmentId,
              }),
            });

            const verifyData = await verifyRes.json();
            if (!verifyRes.ok || !verifyData.success) {
              throw new Error(verifyData.error || "Payment verification failed");
            }

            // 4. Send Email via EmailJS
            try {
              const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_cb3yi8i";
              const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_4hytol7";
              const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "z9VhBkfhS8i3eoiGC";

              await emailjs.send(
                serviceId,
                templateId,
                {
                  name: fullName,
                  phone: formData.phone.trim(),
                  email: formData.email.trim() || "Not provided",
                  service: formData.service,
                  message: `${formData.message.trim() || "Consultation Popup"} | Paid: ₹${orderData.payableAmount} (Razorpay ID: ${response.razorpay_payment_id})`,
                },
                publicKey
              );
            } catch (emailJsErr) {
              console.error("EmailJS dispatch error:", emailJsErr);
            }

            // 5. Open Business WhatsApp with confirmation
            const whatsappMsg = `Hello Sculpt Aesthetics,

I have booked a consultation and completed my payment online.

Name: ${fullName}
Phone: ${formData.phone.trim()}
Email: ${formData.email.trim() || "Not provided"}
Service: ${formData.service}
Amount Paid: ₹${orderData.payableAmount}
Payment ID: ${response.razorpay_payment_id}

Please confirm my consultation schedule.`;

            const whatsappUrl = `https://wa.me/919639635454?text=${encodeURIComponent(whatsappMsg)}`;

            try {
              window.open(whatsappUrl, "_blank", "noopener,noreferrer");
            } catch {
              window.location.href = whatsappUrl;
            }

            setPaidDetails({
              amount: orderData.payableAmount,
              paymentId: response.razorpay_payment_id,
              appointmentId: verifyData?.appointment?._id || orderData.appointmentId,
            });
            setStatus("success");
            setFormData({
              firstName: "",
              lastName: "",
              phone: "",
              email: "",
              service: "",
              message: "",
            });
          } catch (verifyErr: any) {
            console.error("Popup verification error:", verifyErr);
            setErrorMessage(verifyErr?.message || "Payment verification failed. Please contact clinic.");
            setStatus("error");
          }
        },
      });
    } catch (err: any) {
      console.error("Popup submit error:", err);
      setErrorMessage(err?.message || "Failed to start booking. Please try again.");
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
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
            className="relative w-full max-w-[520px] bg-[#0E0C09] text-white rounded-3xl border border-white/15 p-5 sm:p-7 shadow-[0_25px_70px_rgba(0,0,0,0.95)] z-10 my-auto overflow-hidden max-h-[92vh] overflow-y-auto"
          >
            {/* Top Glow Accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-[#E6663A] to-transparent opacity-80" />

            {/* Circular Close Button */}
            <button
              onClick={handleClose}
              type="button"
              aria-label="Close consultation popup"
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="pr-8 mb-4">
              <h2 id="popup-title" className="font-serif text-2xl sm:text-[26px] font-bold text-white tracking-tight leading-tight">
                Book a Consultation
              </h2>
              <p className="text-xs text-white/70 mt-1 leading-relaxed">
                Schedule your appointment online to secure priority slot booking.
              </p>
            </div>

            {/* Short & Sweet Consultation Fee & Offer Badge */}
            {pricing && (
              <div className="mb-3.5 flex items-center justify-between gap-3 p-3 rounded-xl bg-white/[0.06] border border-white/10 shadow-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#E6663A]/20 text-[#F6B73C] flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white">
                        Doctor Consultation
                      </span>
                      {pricing.isDiscountActive && pricing.discountPercent > 0 && (
                        <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                          {pricing.discountPercent}% OFF
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-white/60">
                      Exclusive website booking courtesy
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="flex items-baseline gap-1.5 justify-end">
                    {pricing.isDiscountActive && pricing.discountPercent > 0 ? (
                      <>
                        <span className="line-through text-white/40 text-xs">
                          ₹{pricing.consultationFee.toLocaleString("en-IN")}
                        </span>
                        <span className="text-[#F6B73C] font-bold text-lg font-serif">
                          ₹{pricing.discountedFee.toLocaleString("en-IN")}
                        </span>
                      </>
                    ) : (
                      <span className="text-white font-bold text-lg font-serif">
                        ₹{pricing.consultationFee.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>
                  <span className="text-[9px] text-white/50 uppercase tracking-wider block font-semibold">
                    Pay Online
                  </span>
                </div>
              </div>
            )}

            {/* Success View */}
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center space-y-5"
              >
                <div className="w-16 h-16 rounded-full bg-[#E6663A]/20 border border-[#E6663A]/40 text-[#F6B73C] flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(230,102,58,0.4)]">
                  <CheckCircle2 className="w-9 h-9 text-[#F6B73C]" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-serif text-xl font-bold text-white">Appointment Confirmed & Paid!</h3>
                  <p className="text-sm text-white/80 max-w-xs mx-auto">
                    Your appointment payment of <strong>₹{paidDetails?.amount}</strong> was successful.
                    {paidDetails?.paymentId && (
                      <span className="block text-xs font-mono text-white/60 mt-1">
                        Payment ID: {paidDetails.paymentId}
                      </span>
                    )}
                    Our patient care coordinator will contact you shortly with your consultation details.
                  </p>
                </div>

                {/* Download Invoice Receipt */}
                {paidDetails?.appointmentId && (
                  <div className="pt-2 flex flex-col items-center justify-center gap-2.5">
                    <a
                      href={`/receipt/${paidDetails.appointmentId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-sculpt-gradient px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Invoice Receipt</span>
                      <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-80" />
                    </a>
                  </div>
                )}

                <div className="pt-1">
                  <button
                    onClick={handleClose}
                    className="text-xs text-white/60 hover:text-white underline cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Consultation Form — Perfectly matching Contact.tsx */
              <form onSubmit={handleSubmit} className="space-y-3" noValidate suppressHydrationWarning>
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

                {/* 1. First & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/90 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="e.g. Ananya"
                      required
                      suppressHydrationWarning
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.07] border border-white/15 focus:border-[#E6663A] focus:bg-white/[0.1] text-white text-xs placeholder:text-white/35 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/90 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="e.g. Sharma"
                      suppressHydrationWarning
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.07] border border-white/15 focus:border-[#E6663A] focus:bg-white/[0.1] text-white text-xs placeholder:text-white/35 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* 2. Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/90 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      required
                      suppressHydrationWarning
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.07] border border-white/15 focus:border-[#E6663A] focus:bg-white/[0.1] text-white text-xs placeholder:text-white/35 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/90 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ananya@example.com"
                      suppressHydrationWarning
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.07] border border-white/15 focus:border-[#E6663A] focus:bg-white/[0.1] text-white text-xs placeholder:text-white/35 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* 3. Service of Interest (From official servicesData) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/90 mb-1">
                    Service of Interest *
                  </label>
                  <div className="relative">
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      suppressHydrationWarning
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#16120D] border border-white/15 focus:border-[#E6663A] text-xs focus:outline-none transition-colors appearance-none cursor-pointer ${
                        formData.service ? "text-white" : "text-white/40"
                      }`}
                    >
                      <option value="" disabled className="bg-[#16120D] text-white/40">
                        Select a procedure or service
                      </option>
                      {servicesData.map((s) => (
                        <option key={s.id} value={s.name} className="bg-[#16120D] text-white py-1">
                          {s.name}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-white/50">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* 4. Message (Optional) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/90 mb-1">
                    Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    rows={2}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your aesthetic goals or preferred consultation date..."
                    suppressHydrationWarning
                    className="w-full px-3.5 py-2 rounded-xl bg-white/[0.07] border border-white/15 focus:border-[#E6663A] focus:bg-white/[0.1] text-white text-xs placeholder:text-white/35 focus:outline-none transition-colors"
                  />
                </div>

                {/* 5. CTA Button */}
                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    suppressHydrationWarning
                    className="w-full btn-sculpt-gradient py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all cursor-pointer disabled:opacity-60"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>
                      {status === "submitting"
                        ? "INITIATING SECURE PAYMENT..."
                        : pricing
                        ? `PAY ₹${pricing.discountedFee.toLocaleString("en-IN")} & CONFIRM CONSULTATION`
                        : "PAY & CONFIRM CONSULTATION"}
                    </span>
                  </button>
                </div>

                {/* DPDP Act 2023 Consent Notice */}
                <p className="text-[10px] text-white/50 text-center leading-relaxed pt-1">
                  <ShieldCheck className="w-3 h-3 text-[#F6B73C] inline mr-1 -mt-0.5" />
                  Secured by Razorpay. By submitting, you agree to our{" "}
                  <Link href="/terms-of-service" onClick={handleClose} className="text-[#F6B73C] hover:underline">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy-policy" onClick={handleClose} className="text-[#F6B73C] hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
