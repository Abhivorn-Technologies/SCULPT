import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#151515] text-white pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          {/* Column 1: Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center group">
              <Image
                src="/assets/logo/logo.png"
                alt="The Sculpt Aesthetics"
                width={280}
                height={80}
                className="h-14 sm:h-18 lg:h-22 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            <p className="text-[#999999] text-sm leading-relaxed">
              Hyderabad’s premier center for advanced plastic surgery, cosmetic enhancements, and clinical dermatology. Where art meets surgical precision.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/thesculptaesthetics?igsi=YWxyYm12MDVwdDI5"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/5 text-white/80 hover:text-white hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:shadow-[0_0_14px_rgba(220,39,67,0.5)] hover:scale-[1.07] focus:text-white focus:bg-gradient-to-tr focus:from-[#f09433] focus:via-[#dc2743] focus:to-[#bc1888] focus:shadow-[0_0_14px_rgba(220,39,67,0.5)] focus:scale-[1.07] focus:outline-none flex items-center justify-center transition-all duration-300 ease-out"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/191krAr21i/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/5 text-white/80 hover:text-white hover:bg-[#1877F2] hover:shadow-[0_0_14px_rgba(24,119,242,0.5)] hover:scale-[1.07] focus:text-white focus:bg-[#1877F2] focus:shadow-[0_0_14px_rgba(24,119,242,0.5)] focus:scale-[1.07] focus:outline-none flex items-center justify-center transition-all duration-300 ease-out"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.592 9 4.415V8z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com/@sculptplasticsurgery?si=jJl25VJ2fSMmTrTu"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-white/5 text-white/80 hover:text-white hover:bg-[#FF0000] hover:shadow-[0_0_14px_rgba(255,0,0,0.5)] hover:scale-[1.07] focus:text-white focus:bg-[#FF0000] focus:shadow-[0_0_14px_rgba(255,0,0,0.5)] focus:scale-[1.07] focus:outline-none flex items-center justify-center transition-all duration-300 ease-out"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-white mb-6 border-b border-[#E6663A]/40 pb-2 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm text-[#999999]">
              {[
                { name: "About The Sculpt", href: "/about" },
                { name: "Our Services & Procedures", href: "/services" },
                { name: "Before & After Results", href: "/results" },
                { name: "Expert Doctors & Surgeons", href: "/#doctors" },
                { name: "Patient Transformations", href: "/#transformation" },
                { name: "Blog & Patient Guide", href: "/blog" },
                { name: "Book Consultation", href: "/contact" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="hover:text-[#E6663A] flex items-center gap-1.5 transition-colors group"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#E6663A] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Featured Services */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-white mb-6 border-b border-[#E6663A]/40 pb-2 inline-block">
              Core Treatments
            </h3>
            <ul className="space-y-3 text-sm text-[#999999]">
              {[
                "Rhinoplasty (Nose Reshaping)",
                "Liposuction & Body Sculpting",
                "Breast Augmentation & Lift",
                "Gynecomastia (Male Breast Reduction)",
                "Facial Rejuvenation & Anti-Aging",
                "Mommy Makeover Surgery",
                "CoolSculpting & Weight Loss",
              ].map((service, idx) => (
                <li key={idx}>
                  <Link href="/services" className="hover:text-[#E6663A] transition-colors">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-white mb-6 border-b border-[#E6663A]/40 pb-2 inline-block">
              Clinic Contact
            </h3>

            <a
              href="https://www.google.com/maps/place/Sculpt/@17.4406662,78.3918986,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb917cb723e195:0xfe5bff602d50552e!8m2!3d17.4406662!4d78.3918986!16s%2Fg%2F11vqkz3bwz?hl=en&entry=ttu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 text-sm text-[#999999] hover:text-[#E6663A] transition-colors group"
            >
              <MapPin className="w-5 h-5 text-[#E6663A] shrink-0 mt-0.5" />
              <span>Sculpt, Madhapur, Hyderabad, Telangana 500081</span>
            </a>

            <div className="flex items-center gap-3 text-sm text-[#999999]">
              <Phone className="w-4 h-4 text-[#E6663A] shrink-0" />
              <div className="flex flex-col">
                <a href="tel:+919949519191" className="hover:text-white transition-colors">+91 99495 19191</a>
                <a href="tel:+919849012345" className="hover:text-white transition-colors">+91 98490 12345</a>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-[#999999]">
              <Mail className="w-4 h-4 text-[#E6663A] shrink-0" />
              <a href="mailto:info@thesculpt.co.in" className="hover:text-white transition-colors">
                info@thesculpt.co.in
              </a>
            </div>

            <div className="flex items-start gap-3 text-sm text-[#999999] pt-2 border-t border-white/5">
              <Clock className="w-4 h-4 text-[#F6B73C] shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-medium text-xs">Working Hours:</p>
                <p className="text-xs">Mon - Sat: 10:00 AM - 7:00 PM</p>
                <p className="text-xs text-[#E6663A]">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#777777] gap-4 text-center md:text-left">
          <p>© {new Date().getFullYear()} The Sculpt Aesthetics. All rights reserved.</p>

          <div className="flex items-center gap-1.5 font-medium text-xs text-[#999999]">
            <span>Developed by</span>
            <a
              href="https://www.abhivorn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="shiny-text tracking-wider hover:drop-shadow-[0_0_10px_rgba(230,102,58,0.7)] transition-all duration-300 inline-block"
            >
              Abhivorn Technologies
            </a>
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/about" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/about" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/about" className="hover:text-white transition-colors">Medical Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
