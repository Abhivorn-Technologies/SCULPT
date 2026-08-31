"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Menu, X, Calendar, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Our Services", href: "/our-services" },
  { name: "Results", href: "/results" },
  { name: "Blog", href: "/blog" },
  { name: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBookClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      const el = document.getElementById("contact");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#F8F6F2]/90 backdrop-blur-md shadow-sm py-3 border-b border-[#EFE8E0]"
          : "bg-gradient-to-b from-black/60 via-black/30 to-transparent py-5"
      }`}
    >
      {/* Top Header Bar for Contact Number */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center group -mt-1.5 sm:-mt-2.5">
            <Image
              src="/assets/logo/logo.png"
              alt="The Sculpt Aesthetics"
              width={280}
              height={80}
              className="h-14 sm:h-18 lg:h-22 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href === "/our-services" && (pathname === "/services" || pathname.startsWith("/services/")));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? "text-[#E6663A] bg-[#E6663A]/10 font-semibold"
                      : scrolled
                      ? "text-[#555555] hover:text-[#E6663A] hover:bg-[#EFE8E0]/60"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Items: Phone & CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="tel:+919949519191"
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                scrolled
                  ? "text-[#151515] hover:text-[#E6663A]"
                  : "text-white hover:text-[#F6B73C]"
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-[#E6663A]/15 flex items-center justify-center text-[#E6663A]">
                <Phone className="w-4 h-4" />
              </div>
              <span className="hidden xl:inline">+91 99495 19191</span>
            </a>

            <Link
              href={pathname === "/" ? "#contact" : "/contact"}
              onClick={handleBookClick}
              className="btn-sculpt-gradient px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="tel:+919949519191"
              aria-label="Call clinic"
              className={`p-2 rounded-full ${
                scrolled ? "text-[#E6663A] bg-[#EFE8E0]" : "text-white bg-white/10"
              }`}
            >
              <Phone className="w-5 h-5" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className={`p-2 rounded-xl transition-colors ${
                scrolled ? "text-[#151515] hover:bg-[#EFE8E0]" : "text-white hover:bg-white/10"
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-[#F8F6F2] border-b border-[#EFE8E0] px-4 pt-4 pb-6 mt-3 shadow-xl"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href === "/our-services" && (pathname === "/services" || pathname.startsWith("/services/")));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive
                        ? "bg-[#E6663A] text-white font-semibold"
                        : "text-[#151515] hover:bg-[#EFE8E0]"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 opacity-60" />
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-[#EFE8E0] flex flex-col space-y-3">
                <a
                  href="tel:+919949519191"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#EFE8E0] text-[#151515] font-semibold text-sm"
                >
                  <Phone className="w-4 h-4 text-[#E6663A]" />
                  <span>Call: +91 99495 19191</span>
                </a>

                <Link
                  href={pathname === "/" ? "#contact" : "/contact"}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleBookClick(e);
                  }}
                  className="btn-sculpt-gradient py-3.5 px-4 rounded-xl text-center font-bold text-sm flex items-center justify-center gap-2 shadow-lg"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment Now</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
