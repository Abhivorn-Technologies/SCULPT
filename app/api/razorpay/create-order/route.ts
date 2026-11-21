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

    const rawKeyId = (process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "");
    const rawKeySecret = (process.env.RAZORPAY_KEY_SECRET || "");

    const keyId = rawKeyId.replace(/^["'\[]|["'\]]$/g, "").trim();
    const keySecret = rawKeySecret.replace(/^["'\[]|["'\]]$/g, "").trim();

    console.log(`Razorpay Key Check: KeyId starts with '${keyId.slice(0, 10)}...' (length ${keyId.length}), Secret length is ${keySecret.length}`);

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

    const isTestKey = keyId.startsWith("rzp_test_");
    const isLiveKey = keyId.startsWith("rzp_live_");

    // Quick direct diagnostic fetch to inspect Razorpay's exact auth response
    try {
      const authHeader = "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64");
      const testRes = await fetch("https://api.razorpay.com/v1/payments?count=1", {
        headers: { Authorization: authHeader },
      });
      const testJson = await testRes.json();
      console.log(`Razorpay Direct Auth Probe: HTTP ${testRes.status}`, testJson?.error || "Auth successful!");
    } catch (e: any) {
      console.warn("Razorpay Probe network error:", e?.message || e);
    }

    let order: any = null;
    let paymentLink: any = null;
    let orderCreateError: any = null;

    // 1. First attempt standard Order creation
    try {
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

      order = await razorpay.orders.create(orderOptions);
    } catch (err: any) {
      orderCreateError = err;
      console.warn("Razorpay standard order creation failed:", err?.error?.description || err?.message || err);

      // 2. If orders.create failed (e.g. Access Denied on Payment-Links-only merchant account), attempt Payment Link
      try {
        const linkOptions = {
          amount: Math.round(payableAmount * 100),
          currency: settings.currency || "INR",
          accept_partial: false,
          description: `Consultation Booking: ${service.slice(0, 40)}`,
          customer: {
            name: fullName.slice(0, 40),
            contact: cleanPhone.slice(0, 20),
            email: typeof email === "string" && email.includes("@") ? email.trim() : undefined,
          },
          notify: {
            sms: true,
            email: typeof email === "string" && email.includes("@"),
          },
          reminder_enable: true,
          notes: {
            fullName: fullName.slice(0, 40),
            phone: cleanPhone.slice(0, 20),
            service: service.slice(0, 40),
          },
        };

        paymentLink = await (razorpay as any).paymentLink.create(linkOptions);
      } catch (linkErr: any) {
        console.error("Razorpay paymentLink creation also failed:", linkErr?.error?.description || linkErr?.message || linkErr);
      }
    }

    if (!order && !paymentLink) {
      const desc = orderCreateError?.error?.description || orderCreateError?.message || "Access Denied";
      let hint = "";

      if (desc.toLowerCase().includes("access denied")) {
        hint = isLiveKey
          ? " (Access Denied: Your Razorpay account is in Live mode. If your account KYC / activation is still under review with Axis Bank/Razorpay, or if IP whitelisting is active on your dashboard, live API calls are restricted. For local development & testing, please switch your Razorpay dashboard to 'Test Mode' and use your rzp_test_... key)."
          : " (Access Denied: Please verify that your Key ID and Key Secret match and that your account has API access permissions enabled in your Razorpay Dashboard).";
      }

      return NextResponse.json(
        {
          error: `${desc}${hint}`,
          details: orderCreateError?.error || orderCreateError?.message,
        },
        { status: 500 }
      );
    }

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
      razorpayOrderId: order ? order.id : (paymentLink?.id || "PL_" + Date.now()),
      source: source || "Website",
    });

    return NextResponse.json({
      success: true,
      orderId: order?.id || null,
      paymentLinkId: paymentLink?.id || null,
      paymentLinkUrl: paymentLink?.short_url || null,
      amount: order?.amount || paymentLink?.amount || Math.round(payableAmount * 100),
      currency: order?.currency || paymentLink?.currency || settings.currency || "INR",
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
