import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Service from "@/lib/models/Service";
import { servicesData } from "@/lib/servicesData";
import dns from "dns";

export async function GET(req: Request) {
  try {
    if (typeof dns.setServers === "function") {
      try { dns.setServers(["8.8.8.8", "1.1.1.1"]); } catch {}
    }

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const page     = parseInt(searchParams.get("page") || "1", 10);
    const limit    = parseInt(searchParams.get("limit") || "18", 10);

    const query: any = { status: "Published" };
    if (category && category !== "ALL" && category !== "All") {
      if (category === "PLASTIC SURGERY") {
        query.isPlasticSurgery = true;
      } else {
        query.category = { $regex: new RegExp(`^${category}$`, "i") };
      }
    }

    if (!process.env.MONGODB_URI) {
      // Fallback: static data
      let list = servicesData as any[];
      if (category && category !== "ALL") {
        if (category === "PLASTIC SURGERY") {
          list = list.filter((s) => s.isPlasticSurgery);
        } else {
          list = list.filter((s) => (s.category || "").toUpperCase() === category.toUpperCase());
        }
      }
      const total = list.length;
      const paged = list.slice((page - 1) * limit, page * limit);
      return NextResponse.json({ success: true, services: paged, total, page, totalPages: Math.ceil(total / limit) });
    }

    await connectToDatabase();

    const total    = await Service.countDocuments(query);
    const services = await Service.find(query)
      .sort({ displayOrder: 1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    if (services.length === 0 && page === 1) {
      // Seed fallback: static data
      const fallback = servicesData.map((s, idx) => ({
        _id: s.slug,
        ...s,
        status: "Published",
        displayOrder: idx + 1,
      }));
      let list = fallback as any[];
      if (category && category !== "ALL") {
        if (category === "PLASTIC SURGERY") {
          list = list.filter((s) => s.isPlasticSurgery);
        } else {
          list = list.filter((s) => (s.category || "").toUpperCase() === category.toUpperCase());
        }
      }
      const t = list.length;
      const paged = list.slice(0, limit);
      return NextResponse.json({ success: true, services: paged, total: t, page: 1, totalPages: Math.ceil(t / limit) });
    }

    return NextResponse.json({
      success: true,
      services,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Public Services API Error:", error);
    // Final fallback
    const fallback = servicesData.map((s, idx) => ({ _id: s.slug, ...s, status: "Published", displayOrder: idx + 1 }));
    return NextResponse.json({ success: true, services: fallback, total: fallback.length, page: 1, totalPages: 1 });
  }
}
