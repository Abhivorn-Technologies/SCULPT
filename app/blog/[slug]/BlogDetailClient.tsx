"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Phone,
  MessageCircle,
  Sparkles,
  Award,
  ChevronRight,
  ShieldCheck,
  Building,
  HelpCircle,
  AlertCircle,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";
import type { BlogPost } from "@/lib/blogData";

interface Props {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogDetailClient({ post, relatedPosts }: Props) {
  const handleShare = () => {
    if (typeof window !== "undefined" && navigator.share) {
      navigator
        .share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
        .catch(() => {});
    } else if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="pt-24 pb-20 space-y-12 bg-[#FDFBF7]">
      {/* 1. Blog Hero / Header */}
      <section className="bg-[#151515] text-white py-14 sm:py-18 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#E6663A_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-white/60">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <Link href="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <span className="text-[#E6663A] truncate max-w-[200px] sm:max-w-none font-medium">
              {post.title}
            </span>
          </nav>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-[#E6663A] text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
                {post.category}
              </span>
              {post.date && (
                <span className="text-white/60 text-xs flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#E6663A]" />
                  {post.date}
                </span>
              )}
              <span className="text-white/60 text-xs flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#E6663A]" />
                {post.readTime}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-white/70">
              <span className="font-medium">By {post.author}</span>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white font-semibold cursor-pointer"
                aria-label="Share this article"
              >
                <Share2 className="w-3.5 h-3.5 text-[#E6663A]" />
                Share
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#151515] hover:text-[#E6663A] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#E6663A]" />
            Back to All Articles
          </Link>
        </div>

        {/* 2. Featured Blog Image */}
        {post.image ? (
          <div className="relative h-[280px] sm:h-[450px] w-full rounded-3xl overflow-hidden shadow-lg border border-[#EFE8E0] bg-white">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>
        ) : (
          <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] text-white border border-[#EFE8E0] shadow-md flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-[#E6663A]/20 border border-[#E6663A]/40 flex items-center justify-center shrink-0">
              <FileText className="w-8 h-8 text-[#F6B73C]" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-[#E6663A] font-bold block mb-1">
                The Sculpt Clinical Guide
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                {post.title}
              </h2>
            </div>
          </div>
        )}

        {/* 3. Article Content */}
        <motion.article
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl p-6 sm:p-12 border border-[#EFE8E0] shadow-sm space-y-8"
        >
          {/* Introductory Paragraphs */}
          {post.introParagraphs && post.introParagraphs.length > 0 && (
            <div className="space-y-4 pb-4 border-b border-[#EFE8E0]">
              {post.introParagraphs.map((intro, iIdx) => (
                <p
                  key={iIdx}
                  className="text-[#333333] text-base sm:text-lg leading-relaxed font-normal"
                >
                  {intro}
                </p>
              ))}
            </div>
          )}

          {/* Sections */}
          {post.sections.map((sec, idx) => (
            <div key={idx} className="space-y-4 pt-2">
              {sec.heading && (
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515] pt-4 border-b border-[#EFE8E0] pb-2">
                  {sec.heading}
                </h2>
              )}

              {sec.subheading && (
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#E6663A] pt-2">
                  {sec.subheading}
                </h3>
              )}

              {sec.paragraphs &&
                sec.paragraphs.map((para, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-[#444444] text-base sm:text-lg leading-relaxed font-normal"
                  >
                    {para}
                  </p>
                ))}

              {sec.list && (
                <div className="my-4 pl-2 sm:pl-4">
                  {sec.listType === "ordered" ? (
                    <ol className="list-decimal list-inside space-y-3 text-[#444444] text-base sm:text-lg leading-relaxed">
                      {sec.list.map((item, lIdx) => (
                        <li key={lIdx} className="pl-1">
                          {item}
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <ul className="space-y-3 text-[#444444] text-base sm:text-lg leading-relaxed">
                      {sec.list.map((item, lIdx) => (
                        <li key={lIdx} className="flex items-start gap-2.5">
                          <span className="w-2 h-2 rounded-full bg-[#E6663A] mt-2.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* 4. FAQ Section where provided */}
          {post.faqs && post.faqs.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[#EFE8E0] space-y-6">
              <div className="flex items-center gap-2.5 pb-2">
                <HelpCircle className="w-6 h-6 text-[#E6663A]" />
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#151515]">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-4">
                {post.faqs.map((faq, fIdx) => (
                  <div
                    key={fIdx}
                    className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F5] border border-[#EFE8E0] space-y-2"
                  >
                    <h3 className="font-serif text-lg font-bold text-[#151515] flex items-start gap-2">
                      <span className="text-[#E6663A] font-sans font-extrabold text-sm mt-0.5">
                        Q:
                      </span>
                      <span>{faq.question}</span>
                    </h3>
                    <p className="text-[#555555] text-base leading-relaxed pl-5">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. Medical Disclaimer where provided */}
          {post.disclaimer && (
            <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-[#FFF8F3] border border-[#E6663A]/30 flex items-start gap-3.5">
              <AlertCircle className="w-5 h-5 text-[#E6663A] shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-[#774433] leading-relaxed italic">
                {post.disclaimer}
              </p>
            </div>
          )}

          {/* Medical Review & Authorship */}
          <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-[#F8F6F2] border border-[#EFE8E0] space-y-4">
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-[#E6663A]" />
              <h3 className="font-serif text-xl font-bold text-[#151515]">
                Medical Review & Authorship
              </h3>
            </div>
            <p className="text-sm text-[#555555] leading-relaxed">
              This medical article was reviewed and approved by the surgical team at The Sculpt Plastic & Cosmetic Surgery Clinic, Hyderabad, led by Dr. Jagadish Kiran (M.S., M.Ch) and Dr. Suma Sandhyala (M.S., M.Ch).
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#151515]">
                <ShieldCheck className="w-4 h-4 text-[#E6663A]" />
                Board-Certified Plastic Surgeons
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#151515]">
                <Building className="w-4 h-4 text-[#E6663A]" />
                Madhapur, Hyderabad Clinic
              </div>
            </div>
          </div>
        </motion.article>

        {/* 6. Consultation CTA */}
        <section className="bg-gradient-to-br from-[#151515] to-[#252525] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-[#E6663A]/30 space-y-6 text-center sm:text-left sm:flex sm:items-center sm:justify-between sm:space-y-0">
          <div className="space-y-3 max-w-lg">
            <span className="text-[#F6B73C] text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Direct Surgeon Consultation
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              {post.cta?.heading || "Book a Consultation in Hyderabad"}
            </h2>
            <p className="text-white/70 text-sm leading-relaxed">
              {post.cta?.description ||
                "Schedule a private, one-on-one consultation with Dr. Jagadish Kiran or Dr. Suma Sandhyala to evaluate your treatment options."}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="tel:+919639635454"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#E6663A] hover:bg-[#d05328] text-white px-6 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all shadow-md hover:scale-105"
            >
              <Phone className="w-4 h-4" />
              Call 96396 35454
            </a>
            <a
              href="https://wa.me/919639635454?text=Hi%2C%20I%20would%20like%20to%20consult%20regarding%20treatment%20at%20Sculpt."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-6 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all shadow-md hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>
        </section>

        {/* 7. Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="space-y-6 pt-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#EFE8E0]">
              <h2 className="font-serif text-2xl font-bold text-[#151515]">
                More Articles & Guides
              </h2>
              <Link
                href="/blog"
                className="text-xs font-bold uppercase tracking-wider text-[#E6663A] hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.slice(0, 4).map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  className="bg-white rounded-2xl overflow-hidden border border-[#EFE8E0] shadow-sm hover:shadow-md transition-all p-5 flex gap-4 items-center group"
                >
                  <div className="relative h-20 w-24 rounded-xl overflow-hidden bg-gradient-to-br from-[#1E1E1E] to-[#121212] shrink-0 flex items-center justify-center">
                    {rel.image ? (
                      <Image
                        src={rel.image}
                        alt={rel.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <FileText className="w-6 h-6 text-[#F6B73C]" />
                    )}
                  </div>
                  <div className="space-y-1 min-w-0 flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#E6663A]">
                      {rel.category}
                    </span>
                    <h3 className="font-serif text-base font-bold text-[#151515] group-hover:text-[#E6663A] transition-colors truncate">
                      {rel.title}
                    </h3>
                    <p className="text-xs text-[#777777] line-clamp-1">{rel.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
