import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { getAllBlogPosts } from "@/lib/blogData";

export const metadata = {
  title: "Blog & Patient Guide — The Sculpt Aesthetics",
  description:
    "Read expert articles on plastic surgery preparation, recovery tips, lipoma removal, gynecomastia treatment, and aesthetic guides written by our specialist surgeons in Hyderabad.",
  alternates: {
    canonical: "https://thesculpt.co.in/blog",
  },
  openGraph: {
    title: "Blog & Patient Guide — The Sculpt Aesthetics",
    description:
      "Expert articles on surgical preparation, recovery tips, lipoma removal, and gynecomastia surgery by Dr. Jagadish Kiran and Dr. Suma Sandhyala.",
    url: "https://thesculpt.co.in/blog",
    siteName: "The Sculpt Aesthetics",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="pt-24 pb-20 space-y-16">
      {/* Hero Header */}
      <section className="bg-[#151515] text-white py-20 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#E6663A_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-[#F6B73C] text-xs font-bold uppercase tracking-[0.25em] bg-[#E6663A]/20 border border-[#E6663A]/40 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#F6B73C]" />
            Educational & Clinical Resources
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight">
            Aesthetic <span className="text-[#E6663A]">Blog & Patient Guide</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Detailed clinical insights, surgical guides, cost estimates, and recovery advice authored directly by our board-certified surgeons in Hyderabad.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#EFE8E0]">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#151515]">
            <BookOpen className="w-4 h-4 text-[#E6663A]" />
            <span>Featured Articles ({posts.length})</span>
          </div>
          <span className="text-xs text-[#777777]">Expert Medical Guides</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#EFE8E0] flex flex-col justify-between group hover:-translate-y-1"
            >
              {/* 1. Blog image at the top */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#F8F6F2]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute top-4 left-4 bg-[#E6663A] text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md backdrop-blur-sm">
                  {post.category}
                </div>
              </div>

              {/* 2. Blog information / content below the image */}
              <div className="p-6 sm:p-8 pb-4 space-y-3 flex-1">
                <div className="flex items-center gap-4 text-xs text-[#777777]">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-[#E6663A]" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#E6663A]" />
                    {post.readTime}
                  </span>
                </div>

                <p className="text-sm text-[#555555] leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              {/* 3. A clear blog heading/title at the bottom area of the card */}
              <div className="p-6 sm:p-8 pt-4 space-y-4 border-t border-[#EFE8E0] bg-[#FAF8F5]/60 mt-auto">
                <Link href={`/blog/${post.slug}`} className="block group/title">
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#151515] group-hover/title:text-[#E6663A] transition-colors leading-snug">
                    {post.title}
                  </h2>
                </Link>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-semibold text-[#777777] max-w-[200px] truncate">
                    By {post.author}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white bg-[#E6663A] hover:bg-[#d05328] px-4 py-2 rounded-full transition-all duration-200 shadow-sm hover:shadow group-hover:scale-105"
                    aria-label={`Read more about ${post.title}`}
                  >
                    Read More
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
