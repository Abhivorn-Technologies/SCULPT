import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About The Sculpt Aesthetics — Leading Plastic Surgery Clinic in Hyderabad",
  description:
    "Learn about The Sculpt Aesthetics, founded by board-certified plastic surgeons Dr. Jagadish Kiran and Dr. Suma Sandhyala in Madhapur, Hyderabad.",
  alternates: {
    canonical: "https://thesculptaesthetics.com/about",
  },
  openGraph: {
    title: "About The Sculpt Aesthetics | Plastic Surgery & Cosmetic Clinic",
    description:
      "Learn about The Sculpt Aesthetics, our board-certified surgeons, surgical excellence, and patient-first approach in Madhapur, Hyderabad.",
    url: "https://thesculptaesthetics.com/about",
    siteName: "The Sculpt Aesthetics",
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
