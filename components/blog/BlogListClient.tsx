"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Calendar, Clock, ArrowRight, BookOpen, Sparkles, FileText } from "lucide-react";
import type { BlogPost } from "@/lib/blogData";

interface Props {
  posts: BlogPost[];
}

export default function BlogListClient({ posts }: Props) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: "easeOut",
      },
    },
  };

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
            Detailed clinical insights, surgical guides, cost factors, and recovery advice from The Sculpt Plastic & Cosmetic Surgery Clinic in Hyderabad.
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
          <span className="text-xs text-[#777777]">The Sculpt Official Guides</span>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {posts.map((post) => (
            <motion.article
              key={post.id}
              variants={cardVariants}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#EFE8E0] flex flex-col justify-between group hover:-translate-y-1"
            >
              {/* 1. Blog Image Area */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-gradient-to-br from-[#1E1E1E] to-[#121212] flex items-center justify-center">
                {post.image ? (
                  <>
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                  </>
                ) : (
                  <div className="text-center p-6 space-y-3 relative z-10">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-[#E6663A]/20 border border-[#E6663A]/40 flex items-center justify-center text-[#F6B73C] shadow-inner">
                      <FileText className="w-7 h-7 text-[#F6B73C]" />
                    </div>
                    <span className="text-xs uppercase tracking-widest text-[#E6663A] font-bold block">
                      The Sculpt Clinical Guide
                    </span>
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-[#E6663A] text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md backdrop-blur-sm z-20">
                  {post.category}
                </div>
              </div>

              {/* 2. Blog Meta & Short Excerpt */}
              <div className="p-6 sm:p-8 pb-4 space-y-3 flex-1">
                <div className="flex items-center gap-4 text-xs text-[#777777]">
                  {post.date && (
                    <span className="flex items-center gap-1.5 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-[#E6663A]" />
                      {post.date}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#E6663A]" />
                    {post.readTime}
                  </span>
                </div>

                <p className="text-sm text-[#555555] leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              {/* 3. Exact Blog Heading/Title at Bottom Content Area */}
              <div className="p-6 sm:p-8 pt-5 space-y-4 border-t border-[#EFE8E0] bg-[#FAF8F5]/60 mt-auto">
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
            </motion.article>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
