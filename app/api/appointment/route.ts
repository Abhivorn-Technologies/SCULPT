import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, name, phone, email, service, message } = body;

    const fullName = (name || `${firstName || ""} ${lastName || ""}`).trim();

    if (!fullName) {
      return NextResponse.json(
        { error: "Full Name is required" },
        { status: 400 }
      );
    }

    if (!phone || String(phone).replace(/\D/g, "").length < 8) {
      return NextResponse.json(
        { error: "A valid Phone number is required" },
        { status: 400 }
      );
    }

    if (!service) {
      return NextResponse.json(
        { error: "Service of interest is required" },
        { status: 400 }
      );
    }

    const emailSubject = "New Appointment Request — Sculpt Aesthetics";
    const emailText = `New appointment request received.

Name: ${fullName}
Phone: ${phone}
Email: ${email || "Not provided"}
Service: ${service}
Message: ${message || "No additional message"}

Source:
Sculpt Aesthetics Website`;

    // If SMTP credentials exist in environment, send via nodemailer
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || `"Sculpt Aesthetics Website" <${process.env.SMTP_USER}>`,
        to: process.env.APPOINTMENT_EMAIL_TO || "thesculptaesthetics@gmail.com",
        replyTo: email || undefined,
        subject: emailSubject,
        text: emailText,
      });
    } else {
      // Server-side logged appointment lead
      console.log("=== NEW APPOINTMENT REQUEST ===");
      console.log(`To: thesculptaesthetics@gmail.com`);
      console.log(`Subject: ${emailSubject}`);
      console.log(emailText);
      console.log("================================");
    }

    return NextResponse.json({
      success: true,
      message: "Appointment request received successfully",
    });
  } catch (error) {
    console.error("Error processing appointment request:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your appointment request" },
      { status: 500 }
    );
  }
}
