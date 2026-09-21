import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDatabase from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";
import { blogPosts } from "@/lib/blogData";

// GET /api/admin/blogs — Fetch all/filtered blogs
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    const status = searchParams.get("status");

    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ blogs: [] });
    }

    await connectToDatabase();

    // Auto-seed existing static blogs if database collection is empty
    const blogCount = await Blog.countDocuments();
    if (blogCount === 0 && blogPosts && blogPosts.length > 0) {
      const blogDocs = blogPosts.map((post) => ({
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
    }

    const query: any = {};

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (category && category !== "All") {
      query.category = category;
    }

    if (status && status !== "All") {
      query.status = status;
    }

    const blogs = await Blog.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

// POST /api/admin/blogs — Create new blog
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      slug,
      featuredImage,
      shortDescription,
      content,
      category,
      author,
      publishDate,
      status,
      metaTitle,
      metaDescription,
      relatedService,
    } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Blog Title and Content are required fields." },
        { status: 400 }
      );
    }

    // Auto-generate slug if not provided
    const finalSlug = (slug || title)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    await connectToDatabase();

    // Check slug uniqueness
    const existing = await Blog.findOne({ slug: finalSlug });
    if (existing) {
      return NextResponse.json(
        { error: "A blog with this slug already exists. Please modify the slug or title." },
        { status: 400 }
      );
    }

    const blog = await Blog.create({
      title,
      slug: finalSlug,
      featuredImage: featuredImage || "",
      shortDescription: shortDescription || "",
      content,
      category: category || "Facial Aesthetics",
      author: author || "Sculpt Team",
      publishDate: publishDate ? new Date(publishDate) : new Date(),
      status: status || "Published",
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || shortDescription || "",
      relatedService: relatedService || "",
    });

    return NextResponse.json({ success: true, blog });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
  }
}
