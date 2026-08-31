import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — SCULPT Aesthetics | Transforming Confidence",
  description: "Learn about SCULPT Cosmetic Surgery Center. Over 20 years of clinical excellence, led by senior surgeons Dr. Jagadish Kiran, Dr. Suma Sandhyala, and Dr. M. Madhusudhan.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
