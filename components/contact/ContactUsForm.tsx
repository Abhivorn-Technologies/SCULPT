"use client";

import { useState } from "react";
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
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { servicesData } from "@/lib/servicesData";

export default function ContactUsForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName.trim() || !formData.phone.trim() || !formData.service) {
      setErrorMessage("Please fill in your Name, Phone Number, and Service / Topic of Interest.");
      setStatus("error");
      return;
    }

    const digitsOnly = formData.phone.replace(/\D/g, "");
    if (digitsOnly.length < 8) {
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
      // Send directly to MongoDB database (Admin Contact Enquiries desk)
      // No payment required, No EmailJS required
      const res = await fetch("/api/appointment", {
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
          source: "Contact Page",
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit enquiry. Please call us directly.");
      }

      setStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        service: "",
        message: "",
      });
    } catch (err: unknown) {
      console.error("Contact Enquiry submission error:", err);
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again or call us directly.";
      setErrorMessage(msg);
      setStatus("error");
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-[#EFE8E0] relative font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Contact Cards & Google Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone */}
              <div className="p-6 rounded-2xl bg-white border border-[#EFE8E0] shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-full bg-[#E6663A]/10 text-[#E6663A] flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-[#151515]">Phone Helpline</h3>
                <a
                  href="tel:+919639635454"
                  className="text-xs text-[#555555] hover:text-[#E6663A] font-semibold block transition-colors"
                >
                  +91 96396 35454
                </a>
              </div>

              {/* Email */}
              <div className="p-6 rounded-2xl bg-white border border-[#EFE8E0] shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-full bg-[#E6663A]/10 text-[#E6663A] flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-[#151515]">Direct Email</h3>
                <a
                  href="mailto:thesculptaesthetics@gmail.com"
                  className="text-xs text-[#555555] hover:text-[#E6663A] font-medium block truncate transition-colors"
                  title="thesculptaesthetics@gmail.com"
                >
                  thesculptaesthetics@gmail.com
                </a>
              </div>

              {/* Address Card */}
              <a
                href="https://www.google.com/maps/place/Sculpt/@17.4406662,78.3918986,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb917cb723e195:0xfe5bff602d50552e!8m2!3d17.4406662!4d78.3918986!16s%2Fg%2F11vqkz3bwz?hl=en&entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 rounded-2xl bg-white border border-[#EFE8E0] shadow-sm space-y-2 hover:border-[#E6663A] transition-all group block sm:col-span-2"
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
              <div className="p-6 rounded-2xl bg-white border border-[#EFE8E0] shadow-sm space-y-2 sm:col-span-2">
                <div className="w-10 h-10 rounded-full bg-[#F6B73C]/20 text-[#F6B73C] flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-[#151515]">Consultation & Working Hours</h3>
                <div className="flex flex-wrap items-center gap-4 text-xs">
                  <span className="text-[#555555]">Mon - Sat: <strong>10:00 AM - 7:00 PM</strong></span>
                  <span className="text-[#E6663A] font-semibold">Sunday: Closed</span>
                </div>
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

          {/* Right Column: Free General Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-black/5">
            <div className="mb-6 space-y-1">
              <span className="text-[11px] font-bold text-[#E6663A] uppercase tracking-wider bg-[#E6663A]/10 px-3 py-1 rounded-full inline-block">
                Direct Clinic Desk Inquiry
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] pt-1">
                Send Us a Message
              </h3>
              <p className="text-xs text-[#666666] leading-relaxed">
                Have a question about our aesthetic treatments, downtime, or clinic location? Submit your enquiry below and our patient care team will get back to you promptly.
              </p>
            </div>

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-50 border border-emerald-200 text-[#151515] rounded-2xl p-8 text-center space-y-5"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-emerald-950">
                  Enquiry Received Successfully!
                </h4>
                <p className="text-xs text-[#555555] max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to The Sculpt Aesthetics. Your message has been logged directly with our clinic desk. A representative will get in touch with you shortly.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href="https://wa.me/919639635454?text=Hello%20Sculpt%20Aesthetics%2C%20I%20have%20submitted%20an%20enquiry%20on%20your%20website%20and%20would%20like%20more%20details."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-white font-bold text-xs shadow-md hover:opacity-95 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Quick Chat on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => setStatus("idle")}
                    className="text-xs font-semibold text-[#666666] hover:text-[#151515] underline cursor-pointer px-4 py-2"
                  >
                    Send Another Message
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
                      Email Address (Optional)
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
                    Treatment or Inquiry Topic *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    suppressHydrationWarning
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F6F2] border border-[#EFE8E0] focus:border-[#E6663A] focus:outline-none text-sm text-[#151515]"
                  >
                    <option value="">Select a procedure or topic</option>
                    <option value="General Clinic Inquiry">General Clinic Inquiry / Timings</option>
                    <option value="Treatment Consultation Inquiry">Treatment Consultation Inquiry</option>
                    {servicesData.map((s) => (
                      <option key={s.slug} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-1.5">
                    Your Message / Question
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your question, aesthetic goals, or request for information..."
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
                  <Send className="w-4 h-4" />
                  <span>{status === "submitting" ? "SENDING ENQUIRY..." : "SEND ENQUIRY"}</span>
                </button>

                <p className="text-[11px] text-[#777777] text-center pt-2 leading-relaxed">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#E6663A] inline mr-1 -mt-0.5" />
                  Free enquiry. By submitting, you agree to our{" "}
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
