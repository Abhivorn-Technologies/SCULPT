"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Printer,
  Download,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  Building2,
  Share2,
  Loader2,
} from "lucide-react";
import { downloadDirectInvoicePdf } from "@/lib/pdfDownloader";

export interface IReceiptData {
  id: string;
  invoiceNumber: string;
  fullName: string;
  phone: string;
  email?: string;
  service: string;
  message?: string;
  originalFee: number;
  discountPercent: number;
  amountPaid: number;
  currency: string;
  paymentStatus: "Pending" | "Paid" | "Failed";
  razorpayPaymentId?: string;
  razorpayOrderId?: string;
  createdAt: string;
}

interface ReceiptClientProps {
  receipt: IReceiptData;
  autoPrint?: boolean;
  autoDownload?: boolean;
}

export default function ReceiptClient({ receipt, autoPrint, autoDownload }: ReceiptClientProps) {
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (autoPrint) {
      const timer = setTimeout(() => {
        window.print();
      }, 600);
      return () => clearTimeout(timer);
    }
    if (autoDownload) {
      const timer = setTimeout(() => {
        handleDownloadPdf();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [autoPrint, autoDownload]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    setDownloading(true);
    try {
      await downloadDirectInvoicePdf(receipt);
    } finally {
      setDownloading(false);
    }
  };

  const discountAmount = Math.max(0, receipt.originalFee - receipt.amountPaid);

  const formattedDate = new Date(receipt.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedTime = new Date(receipt.createdAt).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleShareWhatsApp = () => {
    const text = `The Sculpt Aesthetics - Consultation Invoice Receipt\nInvoice: ${receipt.invoiceNumber}\nPatient: ${receipt.fullName}\nService: ${receipt.service}\nAmount Paid: ₹${receipt.amountPaid}\nStatus: ${receipt.paymentStatus}\nPayment ID: ${receipt.razorpayPaymentId || "N/A"}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#F8F6F2] py-8 sm:py-12 px-4 sm:px-6 font-sans">
      <style jsx global>{`
        @media print {
          html, body {
            background: #ffffff !important;
            color: #000000 !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          @page {
            size: A4 portrait;
            margin: 10mm;
          }
        }
      `}</style>

      {/* Action Bar (Hidden during Print) */}
      <div className="max-w-3xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#555555] hover:text-[#151515] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Clinic Website</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShareWhatsApp}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#EFE8E0] text-xs font-semibold text-[#151515] hover:border-[#25D366] hover:text-[#25D366] transition-all shadow-xs cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#EFE8E0] text-xs font-semibold text-[#151515] hover:border-[#E6663A] hover:text-[#E6663A] transition-all shadow-xs cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            disabled={downloading}
            className="btn-sculpt-gradient inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-60"
          >
            {downloading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating PDF...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Printable Invoice Container */}
      <div
        id="invoice-document"
        className="max-w-3xl mx-auto bg-white rounded-3xl border border-[#EFE8E0] shadow-xl p-6 sm:p-10 relative overflow-hidden print:border-0 print:shadow-none print:p-0 print:rounded-none print:max-w-none"
      >
        {/* Top Decorative Border */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#E6663A] via-[#F6B73C] to-[#E6663A]" />

        {/* Invoice Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-8 border-b border-[#EFE8E0]">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <span className="font-serif font-black text-2xl sm:text-3xl tracking-tight text-[#151515]">
                THE SCULPT
              </span>
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#E6663A] bg-[#E6663A]/10 px-2.5 py-1 rounded-md">
                Aesthetics
              </span>
            </div>
            <p className="text-[11px] font-semibold tracking-wide text-[#777777] uppercase">
              Center for Advanced Dermatology, Trichology & Aesthetics
            </p>

            <div className="mt-3 text-xs text-[#555555] space-y-1">
              <p className="flex items-start gap-1.5 max-w-sm">
                <MapPin className="w-3.5 h-3.5 text-[#E6663A] shrink-0 mt-0.5" />
                <span>
                  1st Floor, Sri Rama Arcade, Above ICICI Bank, Beside Royal Enfield, Main Road, Pragathi Nagar, Hyderabad - 500090, Telangana
                </span>
              </p>
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#E6663A] shrink-0" />
                <span>+91 96396 35454 / +91 96396 36464</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#E6663A] shrink-0" />
                <span>thesculptaesthetics@gmail.com</span>
              </p>
            </div>
          </div>

          <div className="sm:text-right shrink-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-3">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>PAYMENT CONFIRMED</span>
            </div>

            <div className="space-y-1 text-xs">
              <div>
                <span className="text-[#888888] text-[11px] uppercase tracking-wider block font-semibold">
                  Invoice Number
                </span>
                <span className="font-mono font-bold text-[#151515] text-sm">
                  {receipt.invoiceNumber}
                </span>
              </div>
              <div className="pt-1">
                <span className="text-[#888888] text-[11px] uppercase tracking-wider block font-semibold">
                  Date & Time
                </span>
                <span className="font-semibold text-[#151515]">
                  {formattedDate}, {formattedTime}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Patient & Booking Details */}
        <div className="py-6 border-b border-[#EFE8E0] grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#888888]">
              Bill To / Patient Information
            </span>
            <div className="text-sm font-bold text-[#151515]">{receipt.fullName}</div>
            <div className="text-xs text-[#555555] space-y-0.5">
              <p className="flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-[#777777]" />
                {receipt.phone}
              </p>
              {receipt.email && (
                <p className="flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-[#777777]" />
                  {receipt.email}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2 sm:text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#888888]">
              Consultation & Payment Details
            </span>
            <div className="text-xs font-semibold text-[#151515] flex items-center sm:justify-end gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-[#E6663A]" />
              <span>Razorpay Online Gateway</span>
            </div>
            {receipt.razorpayPaymentId && (
              <p className="text-[11px] text-[#666666] font-mono">
                Transaction ID: {receipt.razorpayPaymentId}
              </p>
            )}
            {receipt.razorpayOrderId && (
              <p className="text-[10px] text-[#888888] font-mono">
                Order ID: {receipt.razorpayOrderId}
              </p>
            )}
          </div>
        </div>

        {/* Itemized Table */}
        <div className="py-6">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EFE8E0] text-[10px] uppercase tracking-wider text-[#777777] font-bold">
                <th className="pb-3">Description</th>
                <th className="pb-3 text-center">Service Type</th>
                <th className="pb-3 text-right">Standard Fee</th>
                <th className="pb-3 text-right">Website Concession</th>
                <th className="pb-3 text-right">Amount Paid</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFE8E0]/60">
              <tr>
                <td className="py-4">
                  <div className="font-bold text-[#151515] text-sm">
                    Doctor Consultation & Aesthetic Evaluation
                  </div>
                  <div className="text-[11px] text-[#666666] mt-0.5">
                    Service Focus: <strong>{receipt.service}</strong>
                  </div>
                  {receipt.message && (
                    <div className="text-[10px] text-[#888888] italic mt-1 max-w-sm">
                      Note: &quot;{receipt.message}&quot;
                    </div>
                  )}
                </td>
                <td className="py-4 text-center">
                  <span className="px-2.5 py-1 rounded-md bg-[#F8F6F2] border border-[#EFE8E0] text-[11px] font-semibold text-[#151515]">
                    In-Clinic / Online
                  </span>
                </td>
                <td className="py-4 text-right font-medium text-[#777777]">
                  ₹{receipt.originalFee.toLocaleString("en-IN")}
                </td>
                <td className="py-4 text-right text-emerald-700 font-semibold">
                  {discountAmount > 0 ? (
                    <span>
                      -₹{discountAmount.toLocaleString("en-IN")} ({receipt.discountPercent}%)
                    </span>
                  ) : (
                    <span>—</span>
                  )}
                </td>
                <td className="py-4 text-right font-bold text-[#151515] text-sm">
                  ₹{receipt.amountPaid.toLocaleString("en-IN")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Total & Summary Breakdown */}
        <div className="pt-4 pb-8 border-t border-[#EFE8E0] flex flex-col sm:flex-row sm:items-start justify-between gap-6">
          <div className="text-xs text-[#666666] space-y-1.5 max-w-md">
            <div className="flex items-center gap-1.5 font-bold text-[#151515]">
              <ShieldCheck className="w-4 h-4 text-[#E6663A]" />
              <span>Priority Consultation Privileges Included:</span>
            </div>
            <ul className="list-disc list-inside text-[11px] text-[#555555] space-y-0.5">
              <li>Direct 1-on-1 evaluation with certified aesthetic dermatologists.</li>
              <li>Personalized skin/hair diagnosis & treatment protocol roadmap.</li>
              <li>Dedicated patient care coordinator assistance for scheduling.</li>
            </ul>
          </div>

          <div className="w-full sm:w-64 space-y-2 text-xs bg-[#F8F6F2] p-4 rounded-2xl border border-[#EFE8E0]">
            <div className="flex justify-between text-[#666666]">
              <span>Subtotal:</span>
              <span>₹{receipt.originalFee.toLocaleString("en-IN")}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Website Courtesy ({receipt.discountPercent}%):</span>
                <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
              </div>
            )}

            <div className="flex justify-between text-[#666666]">
              <span>Applicable Taxes:</span>
              <span>Included</span>
            </div>

            <div className="pt-2 border-t border-[#EFE8E0] flex justify-between items-baseline font-bold">
              <span className="text-[#151515] text-sm">Total Paid:</span>
              <span className="text-base text-[#E6663A]">
                ₹{receipt.amountPaid.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex justify-between text-[11px] text-[#777777] pt-1">
              <span>Balance Due:</span>
              <span className="font-semibold text-emerald-700">₹0.00 (Fully Paid)</span>
            </div>
          </div>
        </div>

        {/* Footer Notes & Digital Stamp */}
        <div className="pt-6 border-t border-[#EFE8E0] flex flex-col sm:flex-row sm:items-end justify-between gap-6 text-[11px] text-[#777777]">
          <div className="space-y-1 max-w-md">
            <p className="font-bold text-[#151515] uppercase tracking-wider text-[10px]">
              Clinic Terms & Instructions
            </p>
            <p>
              Please present this invoice receipt at the reception desk upon your arrival. Appointments can be rescheduled up to 4 hours in advance by calling +91 96396 35454.
            </p>
            <p className="text-[10px] text-[#999999] pt-1">
              This is a computer-generated tax and consultation receipt. Verified through Razorpay payment gateway.
            </p>
          </div>

          <div className="text-center sm:text-right shrink-0">
            <div className="inline-block border-2 border-dashed border-[#E6663A]/40 rounded-xl px-4 py-2 bg-[#E6663A]/5">
              <div className="font-serif font-black text-xs text-[#E6663A] uppercase tracking-wider">
                The Sculpt Aesthetics
              </div>
              <div className="text-[9px] text-[#888888] uppercase tracking-widest font-semibold mt-0.5">
                Authorized Digital Stamp
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
