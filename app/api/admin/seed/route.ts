import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDatabase from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";
import GalleryResult from "@/lib/models/Gallery";
import { blogPosts } from "@/lib/blogData";
import { servicesData, getServiceBeforeAfterResults } from "@/lib/servicesData";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: "MongoDB URI not configured" }, { status: 400 });
    }

    await connectToDatabase();

    let seededBlogsCount = 0;
    let seededGalleryCount = 0;

    // 1. Seed Blog Posts if collection is empty
    const blogCount = await Blog.countDocuments();
    if (blogCount === 0 && blogPosts && blogPosts.length > 0) {
      const blogDocs = blogPosts.map((post, idx) => ({
        title: post.title,
        slug: post.slug,
        featuredImage: post.image || "",
        shortDescription: post.excerpt || "",
        content:
          (post.introParagraphs || []).map((p) => `<p>${p}</p>`).join("") +
          (post.sections || [])
            .map(
              (s) =>
                `${s.heading ? `<h2>${s.heading}</h2>` : ""}${
                  s.subheading ? `<h3>${s.subheading}</h3>` : ""
                }${(s.paragraphs || []).map((p) => `<p>${p}</p>`).join("")}`
            )
            .join(""),
        category: post.category || "Facial Aesthetics",
        author: post.author || "Sculpt Team",
        publishDate: new Date(),
        status: "Published",
        metaTitle: post.seo?.metaTitle || post.title,
        metaDescription: post.seo?.metaDescription || post.excerpt,
        relatedService: "",
      }));

      await Blog.insertMany(blogDocs);
      seededBlogsCount = blogDocs.length;
    }

    // 2. Seed Gallery Results if collection is empty
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
          shortDescription: primary?.description || service.shortDescription || "",
          displayOrder: idx + 1,
          status: "Published",
        };
      });

      await GalleryResult.insertMany(galleryDocs);
      seededGalleryCount = galleryDocs.length;
    }

    return NextResponse.json({
      success: true,
      message: "Initial website content imported to MongoDB successfully!",
      seededBlogsCount,
      seededGalleryCount,
    });
  } catch (error) {
    console.error("Error seeding content:", error);
    return NextResponse.json({ error: "Failed to seed content" }, { status: 500 });
  }
}
