"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How do I book a consultation?",
    answer:
      "You can book a consultation by calling our clinic at +91 96396 35454, filling out the appointment form on our website, or visiting our clinic in Madhapur, Hyderabad. Our care coordinators will help schedule a convenient time for you.",
  },
  {
    question: "How do I know which treatment is right for me?",
    answer:
      "During your initial consultation, our senior plastic surgeon or aesthetic specialist will conduct a comprehensive clinical evaluation, listen to your aesthetic goals, and recommend a personalized treatment plan tailored to your anatomical structure and preferences.",
  },
  {
    question: "Are the procedures safe?",
    answer:
      "Yes, absolute patient safety is our top priority. All surgical procedures are performed in state-of-the-art sterile surgical suites under strict international medical guidelines by board-certified specialists using FDA-approved technologies.",
  },
  {
    question: "What is the recovery time?",
    answer:
      "Recovery time depends on the specific procedure. Non-surgical skin and laser treatments usually have zero downtime. Surgical procedures like Rhinoplasty or Liposuction may require 5 to 7 days of mild downtime, with complete healing in a few weeks.",
  },
  {
    question: "Will there be any visible scars?",
    answer:
      "Our plastic surgeons utilize advanced micro-incision techniques hidden within natural skin folds whenever possible to minimize visible scarring. Comprehensive scar therapy protocols are also provided post-surgery.",
  },
  {
    question: "How much do the treatments cost?",
    answer:
      "Treatment costs vary depending on procedure complexity, customized technique, and individual requirements. We provide full transparent pricing breakdowns during your confidential consultation.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-[#F8F6F2] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-[#E6663A] text-xs font-bold uppercase tracking-[0.25em] bg-[#E6663A]/10 px-3.5 py-1.5 rounded-full inline-block">
            FAQ
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#151515]">
            Frequently Asked <span className="text-[#E6663A]">Questions</span>
          </h2>
          <p className="text-[#555555] text-base sm:text-lg">
            Got questions about our cosmetic procedures or clinic consultations? Find clear, expert answers below.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white rounded-2xl border border-[#EFE8E0] overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif text-lg font-bold text-[#151515] hover:text-[#E6663A] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#E6663A] shrink-0" />
                    <span>{faq.question}</span>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? "bg-[#E6663A] text-white" : "bg-[#EFE8E0] text-[#151515]"
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-0 text-[#555555] text-sm leading-relaxed border-t border-[#EFE8E0]/60 mt-2 pt-4 pl-14">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
