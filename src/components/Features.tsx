"use client";

import { motion } from "framer-motion";
import { VibgyorButton } from "./ui/VibgyorButton";

export function Features() {
  const stats = [
    { number: "10", suffix: "+", label: "Years of Experience" },
    { number: "25", suffix: "+", label: "Years of Experience" },
    { number: "150", suffix: "+", label: "Happy Clients" },
    { number: "300", suffix: "+", label: "Projects Completed" },
  ];

  return (
    <section className="bg-white py-16 md:py-24 font-['Instrument_Sans']">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px]">
        {/* Top Text Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-20 md:mb-24 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[40px] md:text-[56px] lg:text-[64px] font-medium text-[#16232A] leading-[1.1] tracking-tight">
              We Build Spaces <br />
              <span className="text-[#63757E]">That Work.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col"
          >
            <p className="text-lg md:text-[20px] font-normal text-[#16232A] leading-[1.5] mb-6 md:mb-8 max-w-[594px]">
              Vibgyor Engineering W.L.L is a Doha-based interior fit-out and civil engineering company with over 10 years of experience delivering exceptional spaces for Qatar's leading businesses, hotels, and institutions. From first brief to final handover — we handle it all.
            </p>
            
            <div className="mt-2">
              <VibgyorButton href="/about" variant="dark">Learn More</VibgyorButton>
            </div>
          </motion.div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 pt-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              <div className="flex items-baseline mb-2">
                <span className="text-[56px] md:text-[64px] font-normal text-[#16232A] leading-none">
                  {stat.number}
                </span>
                <span className="text-[40px] md:text-[48px] font-normal text-[#03AEF2] leading-none ml-1">
                  {stat.suffix}
                </span>
              </div>
              <span className="text-xs md:text-sm font-semibold text-[#16232A] opacity-60 uppercase tracking-[0.15em] leading-tight">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
