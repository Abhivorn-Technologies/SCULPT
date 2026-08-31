import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Services from "@/components/home/Services";
import Doctors from "@/components/home/Doctors";
import Transformation from "@/components/home/Transformation";
import Results from "@/components/home/Results";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import Contact from "@/components/home/Contact";

export default function Home() {
  return (
    <>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. About The Sculpt */}
      <About />

      {/* 3. Our Services */}
      <Services />

      {/* 4. Meet Our Experts & Doctors */}
      <Doctors />

      {/* 5. Transformation */}
      <Transformation />

      {/* 6. Results / Before & After */}
      <Results />

      {/* 7. Testimonials */}
      <Testimonials />

      {/* 8. FAQ */}
      <FAQ />

      {/* 9. Contact & Location */}
      <Contact />
    </>
  );
}
