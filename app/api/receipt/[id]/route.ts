import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Appointment from "@/lib/models/Appointment";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id || id.length !== 24) {
      return NextResponse.json(
        { error: "Invalid appointment receipt identifier" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const appointment = await Appointment.findById(id).lean();

    if (!appointment) {
      return NextResponse.json(
        { error: "Appointment receipt not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      receipt: {
        id: String(appointment._id),
        invoiceNumber: `INV-SCULPT-${String(appointment._id).slice(-8).toUpperCase()}`,
        fullName: appointment.fullName,
        phone: appointment.phone,
        email: appointment.email || "",
        service: appointment.service,
        message: appointment.message || "",
        status: appointment.status,
        originalFee: appointment.originalFee || 0,
        discountPercent: appointment.discountPercent || 0,
        amountPaid: appointment.amountPaid || 0,
        currency: appointment.currency || "INR",
        paymentStatus: appointment.paymentStatus,
        razorpayPaymentId: appointment.razorpayPaymentId || "",
        razorpayOrderId: appointment.razorpayOrderId || "",
        createdAt: appointment.createdAt,
      },
    });
  } catch (error: any) {
    console.error("Receipt fetch error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve appointment receipt" },
      { status: 500 }
    );
  }
}
