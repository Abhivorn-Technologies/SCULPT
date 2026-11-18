"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  CreditCard,
  Percent,
  Sparkles,
  Download,
  FileText,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { servicesData } from "@/lib/servicesData";
import emailjs from "@emailjs/browser";
import { openRazorpayCheckout } from "@/lib/razorpayClient";

interface IPricing {
  consultationFee: number;
  discountPercent: number;
  discountedFee: number;
  currency: string;
  isDiscountActive: boolean;
  razorpayKeyId?: string;
}

export default function Contact() {
  const pathname = usePathname();
  const leadSource = pathname?.includes("contact") ? "Contact Page" : "Home Page";

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

  // Fetch dynamic consultation fee & website discount from admin settings
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
        console.error("Failed to load consultation pricing:", err);
      }
    }
    fetchPricing();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      // 1. Create Razorpay order dynamically via server
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
          source: leadSource,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.success) {
        throw new Error(orderData.error || "Unable to initiate payment order");
      }

      // 2. Open Razorpay Gateway
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
                  message: `${formData.message.trim() || "Consultation appointment"} | Paid: ₹${orderData.payableAmount} (Razorpay ID: ${response.razorpay_payment_id})`,
                },
                publicKey
              );
            } catch (emailJsErr) {
              console.error("EmailJS dispatch error:", emailJsErr);
            }

            // 5. Format WhatsApp Confirmation Message
            const whatsappMsg = `Hello Sculpt Aesthetics,

I have booked a consultation and completed my payment online.

Name: ${fullName}
Phone: ${formData.phone.trim()}
Email: ${formData.email.trim() || "Not provided"}
Service: ${formData.service}
Amount Paid: ₹${orderData.payableAmount}
Payment ID: ${response.razorpay_payment_id}

Please confirm my consultation appointment schedule.`;

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
            console.error("Payment verification failed:", verifyErr);
            setErrorMessage(verifyErr?.message || "Payment verification failed. Please contact our clinic desk.");
            setStatus("error");
          }
        },
      });
    } catch (err: unknown) {
      console.error("Submission error:", err);
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again or call us directly.";
      setErrorMessage(msg);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#EFE8E0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[#E6663A] text-xs font-bold uppercase tracking-[0.25em] bg-[#E6663A]/10 px-3.5 py-1.5 rounded-full inline-block">
            Book Consultation
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#151515]">
            WE&apos;RE HERE TO <span className="text-[#E6663A]">HELP YOU.</span>
          </h2>
          <p className="text-[#555555] text-base sm:text-lg">
            Ready to start your transformation journey? Schedule a confidential consultation with our leading aesthetic specialists.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Cards & Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone */}
              <div className="p-6 rounded-2xl bg-white border border-[#EFE8E0] shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-full bg-[#E6663A]/10 text-[#E6663A] flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-[#151515]">Phone</h3>
                <p className="text-xs text-[#555555]">+91 96396 35454</p>
              </div>

              {/* Email */}
              <div className="p-6 rounded-2xl bg-white border border-[#EFE8E0] shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-full bg-[#E6663A]/10 text-[#E6663A] flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-[#151515]">Email</h3>
                <p className="text-xs text-[#555555]">thesculptaesthetics@gmail.com</p>
              </div>

              {/* Address Card */}
              <a
                href="https://www.google.com/maps/place/Sculpt/@17.4406662,78.3918986,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb917cb723e195:0xfe5bff602d50552e!8m2!3d17.4406662!4d78.3918986!16s%2Fg%2F11vqkz3bwz?hl=en&entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 rounded-2xl bg-white border border-[#EFE8E0] shadow-sm space-y-2 hover:border-[#E6663A] transition-all group block"
              >
                <div className="w-10 h-10 rounded-full bg-[#E6663A]/10 text-[#E6663A] flex items-center justify-center group-hover:bg-[#E6663A] group-hover:text-white transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-[#151515]">Clinic Location</h3>
                <p className="text-xs text-[#555555] group-hover:text-[#E6663A] transition-colors leading-relaxed">
                  4th Floor, Boppana&apos;s Annapurna Arcade, near Metro Pillar no c1729, Phase 2, Kavuri Hills, Madhapur, Hyderabad, Telangana 500081
                </p>
                <span className="text-[11px] text-[#E6663A] font-semibold flex items-center gap-1 pt-1">
                  Open in Google Maps &rarr;
                </span>
              </a>

              {/* Working Hours */}
              <div className="p-6 rounded-2xl bg-white border border-[#EFE8E0] shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-full bg-[#F6B73C]/20 text-[#F6B73C] flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-[#151515]">Working Hours</h3>
                <p className="text-xs text-[#555555]">Mon - Sat: 10 AM - 7 PM</p>
                <p className="text-xs text-[#E6663A] font-semibold">Sunday: Closed</p>
              </div>
            </div>

            {/* Google Map Embed Card */}
            <div className="rounded-2xl overflow-hidden shadow-sm border border-white h-72 relative bg-[#EFE8E0] group">
              <iframe
                title="The Sculpt Clinic Exact Google Maps Location"
                src="https://maps.google.com/maps?q=17.4406662,78.3918986&z=17&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              />
              <a
                href="https://www.google.com/maps/place/Sculpt/@17.4406662,78.3918986,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb917cb723e195:0xfe5bff602d50552e!8m2!3d17.4406662!4d78.3918986!16s%2Fg%2F11vqkz3bwz?hl=en&entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20 hover:bg-[#E6663A] transition-all flex items-center gap-1.5 shadow-lg"
              >
                <MapPin className="w-3.5 h-3.5 text-[#F6B73C]" />
                <span>View on Google Maps</span>
              </a>
            </div>
          </div>

          {/* Right Column: Appointment Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-black/5">
            <h3 className="font-serif text-2xl font-bold text-[#151515] mb-2">
              Book a Consultation
            </h3>
            <p className="text-xs text-[#555555] mb-4">
              Schedule your appointment online to secure priority slot booking.
            </p>

            {/* Short & Sweet Consultation Fee & Offer Badge */}
            {pricing && (
              <div className="mb-5 flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-[#FAF8F5] via-[#FFFBF7] to-[#FAF8F5] border border-[#E6663A]/25 shadow-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#E6663A]/10 text-[#E6663A] flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-[#151515]">
                        Doctor Consultation
                      </span>
                      {pricing.isDiscountActive && pricing.discountPercent > 0 && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                          {pricing.discountPercent}% OFF
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#777777]">
                      Exclusive website booking courtesy
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="flex items-baseline gap-1.5 justify-end">
                    {pricing.isDiscountActive && pricing.discountPercent > 0 ? (
                      <>
                        <span className="line-through text-[#999999] text-xs">
                          ₹{pricing.consultationFee.toLocaleString("en-IN")}
                        </span>
                        <span className="text-[#E6663A] font-bold text-lg font-serif">
                          ₹{pricing.discountedFee.toLocaleString("en-IN")}
                        </span>
                      </>
                    ) : (
                      <span className="text-[#151515] font-bold text-lg font-serif">
                        ₹{pricing.consultationFee.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>
                  <span className="text-[9px] text-[#888888] uppercase tracking-wider block font-semibold">
                    Pay Online
                  </span>
                </div>
              </div>
            )}

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#E6663A]/10 border border-[#E6663A] text-[#151515] rounded-2xl p-8 text-center space-y-5"
              >
                <div className="w-16 h-16 rounded-full bg-[#E6663A] text-white mx-auto flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-2xl font-bold">Appointment Confirmed & Paid!</h4>
                <p className="text-sm text-[#555555]">
                  Thank you! Your payment of <strong>₹{paidDetails?.amount}</strong> was successful.
                  {paidDetails?.paymentId && (
                    <span className="block text-xs font-mono text-[#777777] mt-1">
                      Payment ID: {paidDetails.paymentId}
                    </span>
                  )}
                  Our patient care coordinator will contact you shortly with your consultation details.
                </p>

                {/* Invoice Download Action */}
                {paidDetails?.appointmentId && (
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={`/receipt/${paidDetails.appointmentId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-sculpt-gradient px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Invoice Receipt</span>
                      <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-80" />
                    </a>
                  </div>
                )}

                <div className="pt-1">
                  <button
                    onClick={() => {
                      setStatus("idle");
                      setPaidDetails(null);
                    }}
                    className="text-xs font-semibold text-[#666666] hover:text-[#151515] underline cursor-pointer"
                  >
                    Book Another Appointment
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" suppressHydrationWarning>
                {status === "error" && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-1.5">
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
                      className="w-full px-4 py-3 rounded-xl bg-[#F8F6F2] border border-[#EFE8E0] focus:border-[#E6663A] focus:outline-none text-sm text-[#151515]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-1.5">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="e.g. Sharma"
                      suppressHydrationWarning
                      className="w-full px-4 py-3 rounded-xl bg-[#F8F6F2] border border-[#EFE8E0] focus:border-[#E6663A] focus:outline-none text-sm text-[#151515]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-1.5">
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
                      className="w-full px-4 py-3 rounded-xl bg-[#F8F6F2] border border-[#EFE8E0] focus:border-[#E6663A] focus:outline-none text-sm text-[#151515]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ananya@example.com"
                      suppressHydrationWarning
                      className="w-full px-4 py-3 rounded-xl bg-[#F8F6F2] border border-[#EFE8E0] focus:border-[#E6663A] focus:outline-none text-sm text-[#151515]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-1.5">
                    Service of Interest *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    suppressHydrationWarning
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F6F2] border border-[#EFE8E0] focus:border-[#E6663A] focus:outline-none text-sm text-[#151515]"
                  >
                    <option value="">Select a procedure or service</option>
                    {servicesData.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-1.5">
                    Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your aesthetic goals or preferred consultation date..."
                    suppressHydrationWarning
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F6F2] border border-[#EFE8E0] focus:border-[#E6663A] focus:outline-none text-sm text-[#151515]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  suppressHydrationWarning
                  className="w-full btn-sculpt-gradient py-4 rounded-xl font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all cursor-pointer disabled:opacity-60"
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

                <p className="text-[11px] text-[#777777] text-center pt-2 leading-relaxed">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#E6663A] inline mr-1 -mt-0.5" />
                  Secured by Razorpay with 256-bit encryption. By submitting, you agree to our{" "}
                  <Link href="/terms-of-service" className="text-[#E6663A] font-semibold hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy-policy" className="text-[#E6663A] font-semibold hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
