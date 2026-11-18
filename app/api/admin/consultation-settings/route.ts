import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import Settings, { getOrInitSettings } from "@/lib/models/Settings";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const settings = await getOrInitSettings();

    const consultationFee = Number(settings.consultationFee) || 0;
    const discountPercent = Number(settings.discountPercent) || 0;
    const discountedFee = Math.round(consultationFee - (consultationFee * discountPercent) / 100);

    return NextResponse.json({
      success: true,
      settings: {
        consultationFee,
        discountPercent,
        discountedFee,
        currency: settings.currency || "INR",
        isDiscountActive: Boolean(settings.isDiscountActive),
      },
    });
  } catch (error) {
    console.error("Error reading consultation settings:", error);
    return NextResponse.json({ error: "Failed to read settings" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { consultationFee, discountPercent, isDiscountActive } = body;

    const parsedFee = Number(consultationFee);
    const parsedDiscount = Number(discountPercent);

    if (isNaN(parsedFee) || parsedFee < 0) {
      return NextResponse.json(
        { error: "Consultation fee must be a valid positive number" },
        { status: 400 }
      );
    }

    if (isNaN(parsedDiscount) || parsedDiscount < 0 || parsedDiscount > 100) {
      return NextResponse.json(
        { error: "Discount percentage must be between 0 and 100" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    await getOrInitSettings();

    const updated = await Settings.findOneAndUpdate(
      { key: "general" },
      {
        $set: {
          consultationFee: parsedFee,
          discountPercent: parsedDiscount,
          isDiscountActive: Boolean(isDiscountActive),
        },
      },
      { new: true, upsert: true }
    );

    const discountedFee = Math.round(
      updated.consultationFee - (updated.consultationFee * (updated.isDiscountActive ? updated.discountPercent : 0)) / 100
    );

    return NextResponse.json({
      success: true,
      message: "Consultation fee & discount settings updated successfully",
      settings: {
        consultationFee: updated.consultationFee,
        discountPercent: updated.discountPercent,
        discountedFee,
        currency: updated.currency,
        isDiscountActive: updated.isDiscountActive,
      },
    });
  } catch (error) {
    console.error("Error updating consultation settings:", error);
    return NextResponse.json({ error: "Failed to update consultation settings" }, { status: 500 });
  }
}
