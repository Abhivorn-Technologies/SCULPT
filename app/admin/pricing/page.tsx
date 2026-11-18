"use client";

import { useState, useEffect } from "react";
import {
  CreditCard,
  Percent,
  IndianRupee,
  CheckCircle,
  AlertCircle,
  Save,
  Sparkles,
  BadgeCheck,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function AdminPricingPage() {
  const [consultationFee, setConsultationFee] = useState<number>(1000);
  const [discountPercent, setDiscountPercent] = useState<number>(50);
  const [isDiscountActive, setIsDiscountActive] = useState<boolean>(true);
  const [pricingLoading, setPricingLoading] = useState<boolean>(true);
  const [pricingSaving, setPricingSaving] = useState<boolean>(false);
  const [pricingError, setPricingError] = useState<string>("");
  const [pricingSuccess, setPricingSuccess] = useState<string>("");

  // Fetch current consultation settings on mount
  useEffect(() => {
    async function loadPricingSettings() {
      try {
        setPricingLoading(true);
        const res = await fetch("/api/admin/consultation-settings");
        const data = await res.json();
        if (data.success && data.settings) {
          setConsultationFee(data.settings.consultationFee);
          setDiscountPercent(data.settings.discountPercent);
          setIsDiscountActive(data.settings.isDiscountActive);
        }
      } catch (err) {
        console.error("Failed to load consultation settings:", err);
      } finally {
        setPricingLoading(false);
      }
    }
    loadPricingSettings();
  }, []);

  const handleSavePricing = async (e: React.FormEvent) => {
    e.preventDefault();
    setPricingError("");
    setPricingSuccess("");

    if (consultationFee < 0) {
      setPricingError("Consultation fee cannot be negative.");
      return;
    }

    if (discountPercent < 0 || discountPercent > 100) {
      setPricingError("Discount percentage must be between 0% and 100%.");
      return;
    }

    setPricingSaving(true);

    try {
      const res = await fetch("/api/admin/consultation-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          consultationFee: Number(consultationFee),
          discountPercent: Number(discountPercent),
          isDiscountActive,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setPricingSuccess(
          "Pricing updated successfully! Website forms and Razorpay payments will now automatically charge this fixed amount."
        );
      } else {
        setPricingError(data.error || "Failed to update consultation settings.");
      }
    } catch {
      setPricingError("An error occurred while updating pricing settings.");
    } finally {
      setPricingSaving(false);
    }
  };

  // Real-time calculation preview
  const calculatedPayable = isDiscountActive
    ? Math.max(0, Math.round(consultationFee - (consultationFee * discountPercent) / 100))
    : consultationFee;

  const calculatedSavings = isDiscountActive
    ? Math.round((consultationFee * discountPercent) / 100)
    : 0;

  return (
    <div className="space-y-8 max-w-4xl mx-auto font-sans pb-12">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#E6663A] text-xs font-bold uppercase tracking-widest mb-1">
            <Sparkles className="w-4 h-4" /> Revenue & Booking Control
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#151515] tracking-tight font-serif">
            Consultation Fee & Discount Settings
          </h1>
          <p className="text-[#555555] text-xs md:text-sm mt-0.5">
            Configure clinic standard consultation fee, website booking discount percentage, and automated Razorpay amounts.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
          <BadgeCheck className="w-4 h-4 text-emerald-600" />
          <span>Razorpay Gateway Active</span>
        </div>
      </div>

      {/* Main Pricing Card */}
      <div className="bg-white border border-[#EFE8E0] rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-[#F8F6F2] via-white to-white border-b border-[#EFE8E0] flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#E6663A]/10 border border-[#E6663A]/20 flex items-center justify-center text-[#E6663A]">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#151515] font-serif">
                Fixed Consultation Fee & Website Discount
              </h2>
              <p className="text-xs text-[#555555]">
                Customers will be automatically charged this exact calculated amount during checkout.
              </p>
            </div>
          </div>
        </div>

        {pricingError && (
          <div className="m-6 mb-0 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-3 shadow-xs">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
            <span className="font-semibold">{pricingError}</span>
          </div>
        )}

        {pricingSuccess && (
          <div className="m-6 mb-0 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-3 shadow-xs">
            <CheckCircle className="w-5 h-5 shrink-0 text-emerald-600" />
            <span className="font-semibold">{pricingSuccess}</span>
          </div>
        )}

        <form onSubmit={handleSavePricing} className="p-6 space-y-6">
          {pricingLoading ? (
            <div className="py-12 text-center text-xs text-[#777777] space-y-2">
              <div className="w-6 h-6 border-2 border-[#E6663A] border-t-transparent rounded-full animate-spin mx-auto" />
              <p>Loading current pricing settings from database...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Standard Base Consultation Fee */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-1.5">
                    Standard In-Clinic Consultation Fee (₹) *
                  </label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
                    <input
                      type="number"
                      min={0}
                      step={50}
                      value={consultationFee}
                      onChange={(e) => setConsultationFee(Number(e.target.value))}
                      required
                      placeholder="1000"
                      className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#151515] focus:outline-none focus:border-[#E6663A] font-semibold"
                    />
                  </div>
                  <p className="text-[11px] text-[#777777] mt-1">
                    Regular walk-in doctor evaluation fee before any website booking discount.
                  </p>
                </div>

                {/* Website Booking Discount % */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-1.5">
                    Website Booking Discount (%) *
                  </label>
                  <div className="relative">
                    <Percent className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
                    <input
                      type="number"
                      min={0}
                      max={100}
                      step={1}
                      value={discountPercent}
                      onChange={(e) => setDiscountPercent(Number(e.target.value))}
                      required
                      placeholder="50"
                      className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#151515] focus:outline-none focus:border-[#E6663A] font-semibold"
                    />
                  </div>
                  <p className="text-[11px] text-[#777777] mt-1">
                    Discount percentage applied exclusively for patients who book and pay online.
                  </p>
                </div>
              </div>

              {/* Discount Active Toggle */}
              <div className="p-4 rounded-2xl bg-[#F8F6F2] border border-[#EFE8E0] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#151515]">Enable Website Consultation Discount</h4>
                  <p className="text-[11px] text-[#666666]">
                    When active, patients get the concession rate. If turned off, patients pay the full standard fee online.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isDiscountActive}
                    onChange={(e) => setIsDiscountActive(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E6663A]"></div>
                </label>
              </div>

              {/* Live Preview Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#151515] via-[#201C18] to-[#151515] text-white space-y-4 shadow-lg border border-white/10">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#F6B73C] bg-white/10 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-[#F6B73C]" /> Automatic Server-Locked Charge
                  </span>
                  <span className="text-[11px] text-white/60">
                    No manual amount entry by customer
                  </span>
                </div>

                <div className="flex flex-wrap items-baseline gap-4 pt-1">
                  <span className="text-4xl font-bold font-serif text-white">
                    ₹{calculatedPayable.toLocaleString("en-IN")}
                  </span>
                  {isDiscountActive && discountPercent > 0 && (
                    <>
                      <span className="text-lg line-through text-white/50">
                        ₹{consultationFee.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs font-bold bg-[#E6663A] text-white px-3 py-1 rounded-lg">
                        {discountPercent}% OFF
                      </span>
                      <span className="text-xs text-[#F6B73C] font-semibold">
                        Patient Saves ₹{calculatedSavings.toLocaleString("en-IN")}
                      </span>
                    </>
                  )}
                </div>

                <div className="pt-2 border-t border-white/10 text-xs text-white/70 leading-relaxed flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    When a patient clicks <strong>"Pay & Confirm Consultation"</strong>, Razorpay is locked to{" "}
                    <strong className="text-white">₹{calculatedPayable.toLocaleString("en-IN")}</strong>. The customer cannot alter or type any custom amount.
                  </span>
                </div>
              </div>

              {/* Submit Pricing Button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={pricingSaving}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#E6663A] via-[#F28C28] to-[#F6B73C] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-[#E6663A]/20 hover:opacity-95 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{pricingSaving ? "Saving Pricing..." : "Save Fixed Pricing"}</span>
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
