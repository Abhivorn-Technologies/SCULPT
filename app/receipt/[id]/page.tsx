import type { Metadata } from "next";
import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";
import connectToDatabase from "@/lib/mongodb";
import Appointment from "@/lib/models/Appointment";
import ReceiptClient, { IReceiptData } from "./ReceiptClient";

interface ReceiptPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Consultation Invoice Receipt | The Sculpt Aesthetics`,
    description: `Official consultation booking invoice receipt for appointment ${id}.`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function ReceiptPage({
  params,
  searchParams,
}: ReceiptPageProps) {
  const { id } = await params;
  const sParams = await searchParams;
  const autoPrint = sParams.print === "1" || sParams.print === "true";

  if (!id || id.length !== 24) {
    return (
      <div className="min-h-screen bg-[#F8F6F2] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-[#EFE8E0] p-8 text-center space-y-4 shadow-lg">
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-xl font-bold text-[#151515]">Invalid Receipt Link</h2>
          <p className="text-xs text-[#666666]">
            The invoice receipt reference is malformed or invalid. If you recently paid, please contact our clinic desk with your Razorpay transaction ID.
          </p>
          <Link
            href="/"
            className="btn-sculpt-gradient inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  let appointment = null;
  try {
    await connectToDatabase();
    appointment = await Appointment.findById(id).lean();
  } catch (err) {
    console.error("Error loading receipt appointment:", err);
  }

  if (!appointment) {
    return (
      <div className="min-h-screen bg-[#F8F6F2] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-[#EFE8E0] p-8 text-center space-y-4 shadow-lg">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-xl font-bold text-[#151515]">Receipt Not Found</h2>
          <p className="text-xs text-[#666666]">
            We could not find an appointment receipt for this reference. Please check your booking details or contact The Sculpt Aesthetics support.
          </p>
          <Link
            href="/"
            className="btn-sculpt-gradient inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  const receiptData: IReceiptData = {
    id: String(appointment._id),
    invoiceNumber: `INV-SCULPT-${String(appointment._id).slice(-8).toUpperCase()}`,
    fullName: appointment.fullName,
    phone: appointment.phone,
    email: appointment.email || "",
    service: appointment.service,
    message: appointment.message || "",
    originalFee: appointment.originalFee || 0,
    discountPercent: appointment.discountPercent || 0,
    amountPaid: appointment.amountPaid || 0,
    currency: appointment.currency || "INR",
    paymentStatus: (appointment.paymentStatus as any) || "Paid",
    razorpayPaymentId: appointment.razorpayPaymentId || "",
    razorpayOrderId: appointment.razorpayOrderId || "",
    createdAt: appointment.createdAt ? new Date(appointment.createdAt).toISOString() : new Date().toISOString(),
  };

  return <ReceiptClient receipt={receiptData} autoPrint={autoPrint} />;
}
