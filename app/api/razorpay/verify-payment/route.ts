import { NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";
import connectToDatabase from "@/lib/mongodb";
import Appointment from "@/lib/models/Appointment";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      appointmentId,
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing required payment verification parameters" },
        { status: 400 }
      );
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json(
        { error: "Razorpay secret is not configured on server" },
        { status: 500 }
      );
    }

    // Verify HMAC SHA256 signature
    const hmac = crypto.createHmac("sha256", keySecret);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest("hex");

    const isSignatureValid = generatedSignature === razorpay_signature;

    await connectToDatabase();

    if (!isSignatureValid) {
      if (appointmentId) {
        await Appointment.findByIdAndUpdate(appointmentId, {
          paymentStatus: "Failed",
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
        });
      }
      return NextResponse.json(
        { error: "Payment verification failed. Invalid signature." },
        { status: 400 }
      );
    }

    // Signature is valid — mark appointment as Paid
    let updatedAppointment = null;
    if (appointmentId) {
      updatedAppointment = await Appointment.findByIdAndUpdate(
        appointmentId,
        {
          paymentStatus: "Paid",
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
        },
        { new: true }
      );
    } else {
      updatedAppointment = await Appointment.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        {
          paymentStatus: "Paid",
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
        },
        { new: true }
      );
    }

    // Send confirmation email to clinic desk if SMTP is configured
    try {
      if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && updatedAppointment) {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: Number(process.env.SMTP_PORT) === 465,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        const emailSubject = `[PAID] New Consultation Booking (₹${updatedAppointment.amountPaid}) — The Sculpt Aesthetics`;
        const emailText = `A new paid consultation appointment has been confirmed on the website.

Patient Details:
Name: ${updatedAppointment.fullName}
Phone: ${updatedAppointment.phone}
Email: ${updatedAppointment.email || "Not provided"}
Service: ${updatedAppointment.service}
Message: ${updatedAppointment.message || "None"}

Payment Details:
Amount Paid: ₹${updatedAppointment.amountPaid} (${updatedAppointment.discountPercent}% website booking discount applied)
Standard Fee: ₹${updatedAppointment.originalFee}
Razorpay Payment ID: ${razorpay_payment_id}
Razorpay Order ID: ${razorpay_order_id}
Payment Status: PAID

Please reach out to the patient to confirm their consultation slot.`;

        await transporter.sendMail({
          from: process.env.SMTP_FROM || `"The Sculpt Aesthetics" <${process.env.SMTP_USER}>`,
          to: process.env.APPOINTMENT_EMAIL_TO || "thesculptaesthetics@gmail.com",
          subject: emailSubject,
          text: emailText,
        });
      }
    } catch (mailErr) {
      console.error("Email notification error for paid appointment:", mailErr);
      // Non-fatal, continue responding to client
    }

    return NextResponse.json({
      success: true,
      message: "Payment successfully verified and appointment confirmed",
      appointment: updatedAppointment,
    });
  } catch (error: any) {
    console.error("Payment verification server error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error verifying payment" },
      { status: 500 }
    );
  }
}
