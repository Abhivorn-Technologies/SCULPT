import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Surgical & Aesthetic Procedures in Hyderabad | The Sculpt Aesthetics",
  description:
    "Explore our complete catalog of 36 board-certified plastic surgery, body contouring, facial rejuvenation, intimate aesthetics, and clinical skin treatments in Madhapur, Hyderabad.",
  alternates: {
    canonical: "https://thesculptaesthetics.com/our-services",
  },
  openGraph: {
    title: "All Surgical & Aesthetic Procedures | The Sculpt Aesthetics",
    description:
      "Explore our complete catalog of 36 board-certified plastic surgery, body contouring, facial rejuvenation, and advanced aesthetic procedures.",
    url: "https://thesculptaesthetics.com/our-services",
    siteName: "The Sculpt Aesthetics",
    type: "website",
  },
};

export default function OurServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
