import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { getOrInitSettings } from "@/lib/models/Settings";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();
    const settings = await getOrInitSettings();

    const consultationFee = Number(settings.consultationFee) || 0;
    const discountPercent = settings.isDiscountActive ? Number(settings.discountPercent) || 0 : 0;
    const discountedFee = Math.round(consultationFee - (consultationFee * discountPercent) / 100);

    return NextResponse.json({
      success: true,
      consultationFee,
      discountPercent,
      discountedFee,
      currency: settings.currency || "INR",
      isDiscountActive: Boolean(settings.isDiscountActive),
      razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
    });
  } catch (error) {
    console.error("Error fetching consultation fee:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to load consultation pricing",
      },
      { status: 500 }
    );
  }
}
