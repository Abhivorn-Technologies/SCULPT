import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Before & After Results Gallery — The Sculpt Aesthetics",
  description:
    "Explore authentic Before & After transformations across all 36 cosmetic, surgical, and non-surgical procedures at The Sculpt Aesthetics in Madhapur, Hyderabad.",
  openGraph: {
    title: "Before & After Results Gallery | The Sculpt Aesthetics Hyderabad",
    description:
      "Explore real patient outcomes for Rhinoplasty, Liposuction, Breast Augmentation, Body Contouring, and Facial Rejuvenation.",
    url: "https://thesculptaesthetics.com/gallery",
    siteName: "The Sculpt Aesthetics",
    images: [
      {
        url: "/assets/services results/Rhinoplasty.png",
        width: 1200,
        height: 630,
        alt: "The Sculpt Aesthetics Before & After Results Gallery",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  alternates: {
    canonical: "https://thesculptaesthetics.com/gallery",
  },
};

export default function GalleryPage() {
  return (
    <div className="pt-24 pb-20 space-y-12 bg-[#F8F6F2] min-h-screen">
      {/* Header Banner */}
      <section className="bg-[#151515] text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-[#F6B73C] text-xs font-bold uppercase tracking-[0.25em] bg-[#E6663A]/20 border border-[#E6663A]/40 px-3.5 py-1.5 rounded-full inline-block">
            RESULTS
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold">
            Real People. <span className="text-[#E6663A]">Real Results.</span>
          </h1>
          <p className="text-white/75 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Authentic clinical before-and-after outcomes showcasing surgical precision, natural harmony, and dedicated patient care.
          </p>
        </div>
      </section>

      {/* Main Filterable Gallery */}
      <GalleryClient />
    </div>
  );
}
