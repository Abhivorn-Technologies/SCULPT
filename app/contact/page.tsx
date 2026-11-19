import ContactUsForm from "@/components/contact/ContactUsForm";

export const metadata = {
  title: "Contact Us — The Sculpt Aesthetics",
  description: "Get in touch with The Sculpt Aesthetics clinic in Madhapur, Hyderabad. Submit your enquiry online or call +91 96396 35454.",
};

export default function ContactPage() {
  return (
    <div className="pt-24 pb-16 space-y-4">
      <section className="bg-[#151515] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-[#F6B73C] text-xs font-bold uppercase tracking-[0.25em] bg-[#E6663A]/20 border border-[#E6663A]/40 px-3.5 py-1.5 rounded-full inline-block">
            Get In Touch
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold">
            Contact <span className="text-[#E6663A]">The Sculpt Clinic</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-sm sm:text-base">
            Located in Madhapur, Hyderabad. Have questions about our aesthetic procedures? Send us an inquiry and our clinical team will assist you.
          </p>
        </div>
      </section>

      <ContactUsForm />
    </div>
  );
}
