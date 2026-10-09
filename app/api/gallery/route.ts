import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import GalleryResult from "@/lib/models/Gallery";

export async function GET() {
  try {
    if (process.env.MONGODB_URI) {
      await connectToDatabase();
      const results = await GalleryResult.find({ status: "Published" })
        .sort({ displayOrder: 1, createdAt: -1 })
        .lean();

      if (results && results.length > 0) {
        return NextResponse.json({ success: true, results });
      }
    }

    return NextResponse.json({ success: true, results: [] });
  } catch (error) {
    console.error("Public Gallery API Error:", error);
    return NextResponse.json({ success: false, results: [] }, { status: 500 });
  }
}
