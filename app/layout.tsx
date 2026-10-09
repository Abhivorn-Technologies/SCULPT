import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/components/providers/NextAuthProvider";
import PublicLayoutWrapper from "@/components/layout/PublicLayoutWrapper";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thesculptaesthetics.com"),
  title: "The Sculpt Aesthetics — Advanced Cosmetic & Plastic Surgery Clinic",
  description: "Experience world-class cosmetic surgery, facial rejuvenation, body contouring, breast surgery & advanced skin care at The Sculpt Aesthetics, Hyderabad.",
  icons: {
    icon: "/assets/logo/favicon.png",
    shortcut: "/assets/logo/favicon.png",
    apple: "/assets/logo/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="font-sans bg-[#F8F6F2] text-[#151515] antialiased selection:bg-[#E6663A] selection:text-white min-h-screen flex flex-col" suppressHydrationWarning>
        <NextAuthProvider>
          <PublicLayoutWrapper>{children}</PublicLayoutWrapper>
        </NextAuthProvider>
      </body>
    </html>
  );
}

