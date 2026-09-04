import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Blog & Patient Guide — The Sculpt Aesthetics",
  description: "Read expert articles on plastic surgery preparation, recovery tips, body contouring, and facial aesthetic guides written by our doctors.",
};

const blogPosts = [
  {
    id: 1,
    title: "What to Expect During Your Rhinoplasty Recovery: A Day-by-Day Timeline",
    category: "Plastic Surgery",
    date: "August 15, 2026",
    author: "Dr. Jagadish Kiran",
    readTime: "6 min read",
    image: "/assets/services/face.jpg",
    excerpt:
      "Planning a nose reshaping procedure? Learn what swelling, bruising, and healing milestones to expect during the first two weeks post-surgery.",
  },
  {
    id: 2,
    title: "Mommy Makeover Recovery Guide: Restoring Abdominal & Breast Contours",
    category: "Body Contouring",
    date: "August 02, 2026",
    author: "Dr. Suma Sandhyala",
    readTime: "8 min read",
    image: "/assets/services/Mummy Makeover.png",
    excerpt:
      "A comprehensive guide on combining abdominoplasty and breast procedures safely for optimal post-pregnancy restoration.",
  },
  {
    id: 3,
    title: "Understanding Liposuction vs. Non-Surgical Fat Reduction (CoolSculpting)",
    category: "Body Contouring",
    date: "July 24, 2026",
    author: "Dr. M. Madhusudhan",
    readTime: "5 min read",
    image: "/assets/services/body.jpg",
    excerpt:
      "Discover the fundamental differences between surgical liposuction for volume reduction and non-invasive cryolipolysis for targeted contouring.",
  },
];

export default function BlogPage() {
  return (
    <div className="pt-24 pb-16 space-y-16">
      {/* Subpage Header */}
      <section className="bg-[#151515] text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-[#F6B73C] text-xs font-bold uppercase tracking-[0.25em] bg-[#E6663A]/20 border border-[#E6663A]/40 px-3.5 py-1.5 rounded-full inline-block">
            Educational Resources
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold">
            Aesthetic <span className="text-[#E6663A]">Blog & Patient Guide</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-base sm:text-lg">
            Expert insights, procedure guides, and pre & post-care recommendations authored by our specialist surgeons.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#EFE8E0] flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-[#E6663A] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-xs text-[#777777]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#E6663A]" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#E6663A]" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="font-serif text-xl font-bold text-[#151515] group-hover:text-[#E6663A] transition-colors leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-xs text-[#555555] leading-relaxed">{post.excerpt}</p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-[#EFE8E0] mt-4">
                <span className="text-xs font-semibold text-[#151515]">By {post.author}</span>
                <span className="text-xs font-bold text-[#E6663A] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
