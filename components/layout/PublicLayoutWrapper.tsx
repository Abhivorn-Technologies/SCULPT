"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/ui/FloatingActions";
import ScrollToTop from "@/components/layout/ScrollToTop";
import ConsultationPopup from "@/components/ui/ConsultationPopup";
import CookieConsent from "@/components/ui/CookieConsent";

export default function PublicLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  const isReceiptRoute = pathname?.startsWith("/receipt");

  if (isAdminRoute) {
    return <div className="min-h-screen bg-slate-950 text-slate-100">{children}</div>;
  }

  if (isReceiptRoute) {
    return <div className="min-h-screen bg-[#F8F6F2]">{children}</div>;
  }

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <FloatingActions />
      <ConsultationPopup />
      <CookieConsent />
    </>
  );
}
