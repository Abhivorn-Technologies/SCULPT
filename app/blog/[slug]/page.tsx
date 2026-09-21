import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllBlogPosts, getBlogPostBySlug, type BlogPost } from "@/lib/blogData";
import BlogDetailClient from "./BlogDetailClient";
import connectToDatabase from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

async function getPost(slug: string): Promise<BlogPost | null> {
  if (process.env.MONGODB_URI) {
    try {
      await connectToDatabase();
      const dbDoc = await Blog.findOne({ slug, status: "Published" }).lean();
      if (dbDoc) {
        return {
          id: String(dbDoc._id),
          slug: dbDoc.slug,
          title: dbDoc.title,
          category: dbDoc.category || "Facial Aesthetics",
          date: dbDoc.publishDate
            ? new Date(dbDoc.publishDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "Recent",
          author: dbDoc.author || "Sculpt Team",
          readTime: "5 min read",
          image: dbDoc.featuredImage || "https://res.cloudinary.com/grm13j3k/image/upload/v1789990763/sculpt_aesthetics/assets/logo/logo.png",
          excerpt: dbDoc.shortDescription || dbDoc.title,
          htmlContent: dbDoc.content,
          seo: {
            metaTitle: dbDoc.metaTitle || dbDoc.title,
            metaDescription: dbDoc.metaDescription || dbDoc.shortDescription || dbDoc.title,
            canonicalUrl: `https://thesculpt.co.in/blog/${dbDoc.slug}`,
            ogImage: dbDoc.featuredImage || "https://thesculpt.co.inhttps://res.cloudinary.com/grm13j3k/image/upload/v1789990763/sculpt_aesthetics/assets/logo/logo.png",
            keywords: [dbDoc.category, dbDoc.title],
          },
        };
      }
    } catch (e) {
      console.error("Error fetching DB blog post:", e);
    }
  }

  return getBlogPostBySlug(slug) || null;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Article Not Found — The Sculpt Aesthetics",
    };
  }

  const { seo } = post;

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonicalUrl,
    },
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      url: seo.canonicalUrl,
      siteName: "The Sculpt Aesthetics",
      images: [
        {
          url: seo.ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.metaTitle,
      description: seo.metaDescription,
      images: [seo.ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllBlogPosts();
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug);

  return <BlogDetailClient post={post} relatedPosts={relatedPosts} />;
}
