import type { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/blogData";
import BlogListClient from "@/components/blog/BlogListClient";

export const metadata: Metadata = {
  title: "Blog & Patient Guide — The Sculpt Aesthetics Hyderabad",
  description:
    "Read comprehensive patient guides on plastic and cosmetic procedures including gynecomastia, breast surgery, liposuction, tummy tuck, rhinoplasty, and body contouring by The Sculpt in Hyderabad.",
  alternates: {
    canonical: "https://thesculptaesthetics.com/blog",
  },
  openGraph: {
    title: "Blog & Patient Guide — The Sculpt Aesthetics Hyderabad",
    description:
      "Expert articles on surgical preparation, recovery tips, body contouring, and facial aesthetics from The Sculpt Plastic & Cosmetic Surgery Center in Hyderabad.",
    url: "https://thesculptaesthetics.com/blog",
    siteName: "The Sculpt Aesthetics",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();
  return <BlogListClient posts={posts} />;
}
