"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Award, GraduationCap, ArrowRight, UserCheck } from "lucide-react";

const doctors = [
  {
    id: "jagadish",
    name: "Dr. Jagadish Kiran",
    role: "Senior Plastic Surgeon",
    qualification: "MBBS, MS, MCh (Plastic Surgery)",
    experience: "15+ Years Experience",
    image: "/assets/doctors/dr1.JPG",
    imageClassName: "object-cover object-top group-hover:scale-105",
    specialties: ["Rhinoplasty", "Body Contouring", "Breast Surgery"],
  },
  {
    id: "suma",
    name: "Dr. Suma Sandhyala",
    role: "Plastic & Reconstructive Surgeon",
    qualification: "MBBS, MS, MCh (Plastic Surgery)",
    experience: "12+ Years Experience",
    image: "/assets/doctors/dr2.JPG",
    imageClassName: "object-cover object-top scale-[1.25] origin-[50%_15%] group-hover:scale-[1.32]",
    specialties: ["Breast Augmentation", "Laser Treatments", "Facial Aesthetics"],
  },
  {
    id: "madhusudhan",
    name: "Dr. M. Madhusudhan",
    role: "Aesthetic Dermatologist",
    qualification: "MBBS, DDVL",
    experience: "10+ Years Experience",
    image: "/assets/doctors/doctor-3.jpg",
    imageClassName: "object-cover object-top group-hover:scale-105",
    specialties: ["Laser Rejuvenation", "Anti-Aging", "Chemical Peels"],
  },
];

interface DoctorsProps {
  onViewProfile?: (doctorId: string) => void;
}

export default function Doctors({ onViewProfile }: DoctorsProps) {
  return (
    <section id="doctors" className="py-24 bg-[#F8F6F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[#E6663A] text-xs font-bold uppercase tracking-[0.25em] bg-[#E6663A]/10 px-3.5 py-1.5 rounded-full inline-block">
            Meet Our Experts
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#151515]">
            EXPERIENCE. EXPERTISE. <span className="text-[#E6663A]">EXCELLENCE.</span>
          </h2>
          <p className="text-[#555555] text-base sm:text-lg">
            Our team of board-certified plastic and cosmetic surgeons are committed to delivering safety, artful precision, and exemplary patient care.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {doctors.map((doc, idx) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#EFE8E0] flex flex-col group h-full"
            >
              {/* Doctor Portrait */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-[#EFE8E0] shrink-0">
                <Image
                  src={doc.image}
                  alt={doc.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={`${doc.imageClassName || "object-cover object-top group-hover:scale-105"} transition-transform duration-500`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Experience Badge */}
                <div className="absolute bottom-4 left-4 bg-[#E6663A] text-white px-3.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md">
                  <Award className="w-3.5 h-3.5" />
                  <span>{doc.experience}</span>
                </div>
              </div>

              {/* Doctor Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#151515] group-hover:text-[#E6663A] transition-colors">
                      {doc.name}
                    </h3>
                    <p className="text-sm font-semibold text-[#E6663A] mt-0.5">{doc.role}</p>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#555555] pt-1">
                    <GraduationCap className="w-4 h-4 text-[#C94F2D] shrink-0" />
                    <span>{doc.qualification}</span>
                  </div>

                  <div className="pt-2 border-t border-[#EFE8E0] flex flex-wrap gap-1.5">
                    {doc.specialties.map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] bg-[#F8F6F2] text-[#555555] px-2.5 py-1 rounded-md border border-[#EFE8E0]"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* VIEW PROFILE BUTTON */}
                <div className="pt-3 mt-auto">
                  {onViewProfile ? (
                    <button
                      onClick={() => onViewProfile(doc.id)}
                      className="w-full py-2.5 px-4 rounded-full border border-[#151515] text-[#151515] hover:bg-[#151515] hover:text-white transition-all duration-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 group/btn"
                    >
                      <span>VIEW PROFILE</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  ) : (
                    <Link
                      href={`/about?doctor=${doc.id}#detailed-doctors`}
                      className="w-full py-2.5 px-4 rounded-full border border-[#151515] text-[#151515] hover:bg-[#151515] hover:text-white transition-all duration-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 group/btn"
                    >
                      <span>VIEW PROFILE</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Team CTA */}
        <div className="text-center mt-12">
          <Link
            href="/about#medical-team"
            className="btn-sculpt-gradient px-8 py-4 rounded-full text-sm font-bold tracking-wider uppercase inline-flex items-center gap-3 shadow-lg hover:shadow-xl transition-all"
          >
            <UserCheck className="w-4 h-4" />
            <span>VIEW OUR MEDICAL TEAM</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
