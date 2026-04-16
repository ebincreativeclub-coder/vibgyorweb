"use client";

import { motion } from "framer-motion";
import { VibgyorButton } from "./ui/VibgyorButton";

export function Features() {
  const stats = [
    { number: "1", label: "Team" },
    { number: "500+", label: "Clients" },
    { number: "125+", label: "Experts" },
    { number: "1500+", label: "Projects" },
  ];

  return (
    <section className="bg-white py-24 md:py-32 font-['Instrument_Sans']">
      <div className="container mx-auto px-8 max-w-[1280px]">
        {/* Top Text Content (Group 460) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-32 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[40px] font-medium text-[#16232A] leading-[45px] tracking-tight">
              We Offer Wide <br className="hidden md:block" />
              Range Of <span className="text-[#8e979c]">Designs</span> <br />
              & Services
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p className="text-[20px] font-medium text-[#16232A] leading-[24px] mb-8 max-w-[594px]">
              Great spaces don’t happen by chance. We design, plan, and build interiors with precision - <span className="text-[#8e979c]">delivering turnkey solutions</span> that turn ideas into exceptional environments.
            </p>
            
            <div className="mt-8">
              <VibgyorButton href="/about" variant="dark">Learn More</VibgyorButton>
            </div>
          </motion.div>
        </div>

        {/* Stats Row (Group 409) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 border-t border-[#16232A]/5 pt-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col"
            >
              <span className="text-[64px] font-normal text-[#16232A] leading-[78px] mb-1">
                {stat.number}
              </span>
              <span className="text-[16px] font-semibold text-[#16232A] opacity-60 uppercase tracking-widest">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
