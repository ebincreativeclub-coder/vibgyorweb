"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const testimonials = [
  {
    id: 1,
    author: "Harish",
    role: "CEO",
    company: "Vital Health Technologies",
    text: "“The team of Vibgyor have been outstanding to work with during our new office fitout works . The professionalism of them and quality of their work was exceptional, as well as their easy going attitudes. Our building, which is just under 1000sq mtr, was delivered on time and in only 8 weeks. A massive credit to Sabeesh, Unni and the rest of the team at Vibgyor. Feel free to come over to Vital to inspect the high quality fit out.”",
  },
  {
    id: 2,
    author: "General Manager",
    role: "",
    company: "A Major Civil Contracting Company",
    text: "“Vibgyor is one of our preferred contractors for fitout works. Our recent project with Vibgyor was the fit out works of Meeting Rooms and Spa for a 5 Star Hotel in Doha. The work was complicated and very detailed. Vibgyor, however, was always there for us. Their professional approach and flexibility to find timely solutions is greatly appreciated. The work was finished to a high standard and on time.”",
  },
  {
    id: 3,
    author: "General Manager",
    role: "",
    company: "A Major Civil Contracting Company",
    text: "“A truly professional and reliable team. They understood our requirements perfectly. Execution was smooth and well managed. The finish and craftsmanship were excellent. Great communication throughout the project. We are very satisfied with the results.”",
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-white pt-24 pb-12 overflow-hidden font-['Instrument_Sans']">
      <div className="container mx-auto px-6">
        {/* Title: The Voices Behind Our Work. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-[40px] font-medium leading-[1.2] tracking-tight">
            <span className="text-[#16232A] block">The Voices</span>
            <span className="text-[#63757E] block">Behind Our Work.</span>
          </h2>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="bg-[#F0F1F3] rounded-[40px] p-10 flex flex-col h-full relative"
            >
              {/* Profile Bar */}
              <div className="flex items-center gap-4 mb-8">
                {/* Circle Avatar matching Figma */}
                <div className="w-[49px] h-[49px] bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm border border-white">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="8" r="4" fill="#C7D8E8" />
                    <path d="M4 19C4 16.5 8 15 12 15C16 15 20 16.5 20 19V21H4V19Z" fill="#C7D8E8" />
                  </svg>
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="font-['Lora'] text-[16px] font-medium text-[#16232A] leading-tight flex items-center gap-1">
                    {t.author} {t.role && <span className="font-medium">{t.role}</span>}
                  </h4>
                  <p className="font-['Lora'] text-[15px] text-[#63757E] leading-tight mt-0.5">{t.company}</p>
                </div>
              </div>

              {/* Quote Body */}
              <blockquote className="font-['Lora'] text-[16px] leading-[1.45] text-[#16232A] flex-1 font-normal">
                {t.text}
              </blockquote>
            </motion.div>
          ))}
        </div>

        {/* Custom Pagination as specified in Figma (Ellipse + Rectangle) */}
        <div className="flex justify-center items-center gap-2 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-[4px] transition-all duration-300 rounded-full ${
                i === activeIndex ? "w-[12px] bg-[#03AEF2]" : "w-[4px] bg-[#63757E]/40"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
