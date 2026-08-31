import Results from "@/components/home/Results";

export const metadata = {
  title: "Before & After Results — The Sculpt Aesthetics",
  description: "Browse authentic Before and After patient transformations for Rhinoplasty, Liposuction, Breast Augmentation, and Facial Rejuvenation.",
};

export default function ResultsPage() {
  return (
    <div className="pt-24 pb-16 space-y-12">
      <section className="bg-[#151515] text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-[#F6B73C] text-xs font-bold uppercase tracking-[0.25em] bg-[#E6663A]/20 border border-[#E6663A]/40 px-3.5 py-1.5 rounded-full inline-block">
            Verified Clinical Outcomes
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold">
            Before & After <span className="text-[#E6663A]">Results Gallery</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-base sm:text-lg">
            Real patient results showcasing surgical artistry, precision, and natural aesthetic outcomes.
          </p>
        </div>
      </section>

      <Results />
    </div>
  );
}
