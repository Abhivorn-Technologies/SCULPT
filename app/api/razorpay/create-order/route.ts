import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import connectToDatabase from "@/lib/mongodb";
import Appointment from "@/lib/models/Appointment";
import { getOrInitSettings } from "@/lib/models/Settings";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, name, phone, email, service, message, source } = body;

    const fullName = (name || `${firstName || ""} ${lastName || ""}`).trim();

    if (!fullName || fullName.length < 2) {
      return NextResponse.json(
        { error: "Full Name is required" },
        { status: 400 }
      );
    }

    const cleanPhone = String(phone || "").trim();
    const digitsOnly = cleanPhone.replace(/\D/g, "");
    if (!cleanPhone || digitsOnly.length < 8 || digitsOnly.length > 15) {
      return NextResponse.json(
        { error: "A valid Phone number is required" },
        { status: 400 }
      );
    }

    if (!service || typeof service !== "string") {
      return NextResponse.json(
        { error: "Service of interest is required" },
        { status: 400 }
      );
    }

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret || keyId.includes("your_razorpay") || keySecret.includes("your_razorpay")) {
      return NextResponse.json(
        {
          error:
            "Razorpay API Keys are not configured. Please add your actual Razorpay Key ID and Secret in your .env.local file (and in Vercel environment variables for production).",
        },
        { status: 500 }
      );
    }

    // Connect to database and fetch dynamic pricing from settings
    await connectToDatabase();
    const settings = await getOrInitSettings();

    const originalFee = Number(settings.consultationFee) || 0;
    const discountPercent = settings.isDiscountActive ? Number(settings.discountPercent) || 0 : 0;
    const payableAmount = Math.max(1, Math.round(originalFee - (originalFee * discountPercent) / 100));

    // Initialize Razorpay client
    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    // Create Razorpay Order (amount in smallest currency unit: paise)
    const orderOptions = {
      amount: Math.round(payableAmount * 100),
      currency: settings.currency || "INR",
      receipt: `sculpt_${Date.now()}_${digitsOnly.slice(-4)}`,
      notes: {
        fullName: fullName.slice(0, 40),
        phone: cleanPhone.slice(0, 20),
        service: service.slice(0, 40),
      },
    };

    const order = await razorpay.orders.create(orderOptions);

    // Create an Appointment lead in DB with status "Pending" payment
    const appointment = await Appointment.create({
      fullName: fullName.slice(0, 100),
      phone: cleanPhone.slice(0, 20),
      email: typeof email === "string" && email.includes("@") ? email.trim().slice(0, 100) : undefined,
      service: service.trim().slice(0, 100),
      message: typeof message === "string" ? message.trim().slice(0, 1000) : "",
      status: "New",
      originalFee,
      discountPercent,
      amountPaid: payableAmount,
      currency: settings.currency || "INR",
      paymentStatus: "Pending",
      razorpayOrderId: order.id,
      source: source || "Website",
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
      appointmentId: String(appointment._id),
      payableAmount,
      originalFee,
      discountPercent,
      customer: {
        name: fullName,
        phone: cleanPhone,
        email: email || "",
      },
    });
  } catch (error: any) {
    console.error("Razorpay order creation error:", error);
    const detail =
      error?.error?.description ||
      error?.description ||
      error?.message ||
      (typeof error === "string" ? error : "Failed to create payment order");
    return NextResponse.json(
      { error: detail },
      { status: 500 }
    );
  }
}
