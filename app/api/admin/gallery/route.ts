import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDatabase from "@/lib/mongodb";
import GalleryResult from "@/lib/models/Gallery";
import { servicesData, getServiceBeforeAfterResults } from "@/lib/servicesData";

// GET /api/admin/gallery — Fetch all/filtered before-and-after results
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    const status = searchParams.get("status");

    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ results: [] });
    }

    await connectToDatabase();

    // Auto-seed existing static 36 gallery items if database collection is empty
    const galleryCount = await GalleryResult.countDocuments();
    if (galleryCount === 0 && servicesData && servicesData.length > 0) {
      const galleryDocs = servicesData.map((service, idx) => {
        const baResults = getServiceBeforeAfterResults(service.slug);
        const primary = baResults[0];
        const defaultImg = `/assets/services results/${service.name}.png`;

        return {
          title: primary?.title || `${service.name} Transformation`,
          beforeImage: primary?.beforeImage || defaultImg,
          afterImage: primary?.afterImage || defaultImg,
          treatmentService: service.name,
          category: service.category || "FACE",
          shortDescription: primary?.description || service.shortDescription || "",
          displayOrder: idx + 1,
          status: "Published",
        };
      });

      await GalleryResult.insertMany(galleryDocs);
    }

    const query: any = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { treatmentService: { $regex: search, $options: "i" } },
      ];
    }

    if (status && status !== "All") {
      query.status = status;
    }

    const results = await GalleryResult.find(query).sort({ displayOrder: 1, createdAt: -1 });

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error("Error fetching gallery results:", error);
    return NextResponse.json({ error: "Failed to fetch gallery results" }, { status: 500 });
  }
}

// POST /api/admin/gallery — Add new before-and-after result
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      beforeImage,
      afterImage,
      treatmentService,
      category,
      shortDescription,
      displayOrder,
      status,
    } = body;

    if (!title || !beforeImage || !afterImage || !treatmentService) {
      return NextResponse.json(
        { error: "Title, Before Image, After Image, and Treatment Service are required." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const newResult = await GalleryResult.create({
      title,
      beforeImage,
      afterImage,
      treatmentService,
      category: category || "FACE",
      shortDescription: shortDescription || "",
      displayOrder: Number(displayOrder) || 0,
      status: status || "Published",
    });

    return NextResponse.json({ success: true, result: newResult });
  } catch (error) {
    console.error("Error creating gallery result:", error);
    return NextResponse.json({ error: "Failed to create gallery result" }, { status: 500 });
  }
}
