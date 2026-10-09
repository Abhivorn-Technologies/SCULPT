import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDatabase from "@/lib/mongodb";
import Service from "@/lib/models/Service";
import { servicesData } from "@/lib/servicesData";

import dns from "dns";

// GET /api/admin/services — Fetch all/filtered services
export async function GET(req: Request) {
  try {
    if (typeof dns.setServers === "function") {
      try {
        dns.setServers(["8.8.8.8", "1.1.1.1"]);
      } catch (e) {}
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    const status = searchParams.get("status");

    if (!process.env.MONGODB_URI) {
      const fallback = servicesData.map((s, idx) => ({
        _id: s.slug,
        name: s.name,
        slug: s.slug,
        category: (s.category || "FACE").toUpperCase(),
        isPlasticSurgery: s.isPlasticSurgery || false,
        featured: s.featured || false,
        image: s.image || "",
        shortDescription: s.shortDescription || "",
        displayOrder: idx + 1,
        status: "Published",
      }));
      return NextResponse.json({ success: true, services: fallback });
    }

    await connectToDatabase();

    // Always ensure all static services exist and have media fields populated
    if (servicesData && servicesData.length > 0) {
      for (let idx = 0; idx < servicesData.length; idx++) {
        const s = servicesData[idx];

        // Resolve videos from static resolver if not in service object
        const { getServiceBeforeAfterResults, getServiceVideos } = await import("@/lib/servicesData");
        const staticBeforeAfter = s.beforeAfterResults && s.beforeAfterResults.length > 0
          ? s.beforeAfterResults
          : getServiceBeforeAfterResults(s.slug);
        const staticVideos = s.videos && s.videos.length > 0
          ? s.videos
          : getServiceVideos(s.slug);

        const coreDoc = {
          name: s.name,
          slug: s.slug,
          category: (s.category || "FACE").toUpperCase(),
          isPlasticSurgery: s.isPlasticSurgery || false,
          featured: s.featured || false,
          image: s.image || "",
          shortDescription: s.shortDescription || "",
          heroHeadline: s.heroHeadline || s.name,
          displayOrder: idx + 1,
          status: "Published",
        };

        const contentDoc = {
          introHeadline: s.introHeadline || "",
          introParagraphs: s.introParagraphs || [],
          understandingHeadline: s.understandingHeadline || "",
          understandingParagraphs: s.understandingParagraphs || [],
          benefits: s.benefits || [],
          candidateIntro: s.candidateIntro || "",
          candidateItems: s.candidateItems || [],
          candidateSummary: s.candidateSummary || "",
          procedureSteps: s.procedureSteps || [],
          approachParagraphs: s.approachParagraphs || [],
          approachSubSections: s.approachSubSections || [],
          recoveryParagraphs: s.recoveryParagraphs || [],
          pricingText: s.pricingText || "",
          scarsText: s.scarsText || "",
          safetyText: s.safetyText || "",
          faqs: s.faqs || [],
          beforeAfterResults: staticBeforeAfter,
          videos: staticVideos,
          isEmpty: s.isEmpty || false,
          filterCategories: s.filterCategories || [s.category],
          seo: s.seo || {
            metaTitle: `${s.name} in Hyderabad — Sculpt Aesthetics`,
            metaDescription: s.shortDescription || s.name,
          },
        };

        // Insert if not exists; then patch empty media fields on existing docs
        await Service.updateOne(
          { slug: s.slug },
          {
            $setOnInsert: { ...coreDoc, ...contentDoc },
          },
          { upsert: true }
        );

        // Patch existing documents that have empty beforeAfterResults or videos
        await Service.updateOne(
          { slug: s.slug, $or: [{ beforeAfterResults: { $size: 0 } }, { videos: { $size: 0 } }] },
          {
            $set: {
              beforeAfterResults: staticBeforeAfter,
              videos: staticVideos,
            },
          }
        );
      }
    }

    const query: any = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { shortDescription: { $regex: search, $options: "i" } },
      ];
    }

    if (category && category !== "All") {
      query.category = { $regex: new RegExp(`^${category}$`, "i") };
    }

    if (status && status !== "All") {
      query.status = status;
    }

    const services = await Service.find(query).sort({ displayOrder: 1, createdAt: -1 });

    return NextResponse.json({ success: true, services });
  } catch (error: any) {
    console.error("Error fetching services from DB, using fallback:", error);
    let filtered = servicesData.map((s, idx) => ({
      _id: s.slug,
      name: s.name,
      slug: s.slug,
      category: (s.category || "FACE").toUpperCase(),
      isPlasticSurgery: s.isPlasticSurgery || false,
      featured: s.featured || false,
      image: s.image || "",
      shortDescription: s.shortDescription || "",
      displayOrder: idx + 1,
      status: "Published",
    }));

    return NextResponse.json({ success: true, services: filtered });
  }
}

// POST /api/admin/services — Add new service
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, category } = body;

    if (!name || !category) {
      return NextResponse.json(
        { error: "Service Name and Category are required." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const slug = body.slug || name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    const newService = await Service.create({
      ...body,
      slug,
      category: category.trim().toUpperCase(),
      status: body.status || "Published",
    });

    return NextResponse.json({ success: true, service: newService });
  } catch (error: any) {
    console.error("Error creating service:", error);
    if (error.code === 11000) {
      return NextResponse.json({ error: "A service with this slug already exists." }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}
