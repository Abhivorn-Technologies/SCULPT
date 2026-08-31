import Contact from "@/components/home/Contact";

export const metadata = {
  title: "Contact Us & Book Appointment — The Sculpt Aesthetics",
  description: "Schedule a confidential cosmetic consultation at The Sculpt Aesthetics clinic located in Madhapur, Hyderabad. Phone: +91 99495 19191.",
};

export default function ContactPage() {
  return (
    <div className="pt-24 pb-16 space-y-12">
      <section className="bg-[#151515] text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-[#F6B73C] text-xs font-bold uppercase tracking-[0.25em] bg-[#E6663A]/20 border border-[#E6663A]/40 px-3.5 py-1.5 rounded-full inline-block">
            Get In Touch
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold">
            Contact <span className="text-[#E6663A]">The Sculpt Clinic</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-base sm:text-lg">
            We are located in Madhapur, Hyderabad. Reach out to schedule your consultation.
          </p>
        </div>
      </section>

      <Contact />
    </div>
  );
}
