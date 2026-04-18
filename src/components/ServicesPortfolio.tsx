"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { VibgyorButton } from "./ui/VibgyorButton";

export function ServicesPortfolio() {
  const [activeService, setActiveService] = useState<number | null>(1);

  const services = [
    { id: "1", title: "Interior Fit out Services" },
    { id: "2", title: "Civil Engineering Service" },
    { id: "3", title: "Carpentry Services" },
  ];

  return (
    <section className="bg-[#16232A] text-white pt-16 pb-0 md:pt-20 md:pb-0 font-['Instrument_Sans'] overflow-hidden">
      
      {/* 1. HEADER SECTION */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 md:mb-20 gap-6">
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-medium leading-tight">
            How Vibgyor <span className="text-[#63757E]">Can Help You</span>
          </h2>
          <VibgyorButton href="/services">Explore Services</VibgyorButton>
        </div>
      </div>

      <div className="w-full h-px bg-[#63757E] opacity-50" />

      {/* 2. SERVICES LIST */}
      <div className="w-full flex flex-col">
        {services.map((service, index) => {
          const serviceImages = {
            "1": "/images/hero services/interior.webp",
            "2": "/images/hero services/civil.webp",
            "3": "/images/hero services/carpending_1.webp",
          };
          const bgImage = serviceImages[service.id as keyof typeof serviceImages];
          const isActive = activeService === index;

          return (
            <motion.div
              key={service.id}
              onMouseEnter={() => setActiveService(index)}
              onMouseLeave={() => setActiveService(null)}
              className="group relative border-b border-[#63757E] border-opacity-50 min-h-[140px] md:min-h-[200px] lg:min-h-[289px] flex items-center cursor-pointer overflow-hidden transition-all duration-500 py-6"
            >
              <div className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                <Image src={bgImage} alt={service.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-[#16232A]/50 mix-blend-multiply" />
              </div>

              <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px] relative z-10 w-full flex items-center justify-between">
                <div className="w-[15%] md:w-[20%] flex justify-start">
                  <div className="w-8 h-8 md:w-[29px] md:h-[29px] rounded-full border-[0.5px] border-[#63757E] flex items-center justify-center text-xs shrink-0 font-normal text-[#63757E] transition-colors duration-500 group-hover:border-white group-hover:text-white">
                    {service.id}
                  </div>
                </div>
                <div className="w-[70%] md:w-[60%] flex justify-center text-center">
                  <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-[64px] font-medium leading-tight md:leading-[1.2] text-white">
                    {service.title}
                  </h3>
                </div>
                <div className="w-[15%] md:w-[20%] flex justify-end transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2">
                  <svg viewBox="0 0 115 115" fill="none" className={`w-10 h-10 md:w-20 md:h-20 lg:w-[94px] lg:h-[94px] origin-right transition-colors duration-500 ${isActive ? 'text-white' : 'text-[#63757E]'}`}>
                    <path d="M29.6995 84.2159L84.2158 29.6991" stroke="currentColor" strokeWidth="9" />
                    <path d="M24.4648 30.0525H84.5689V90.1566" stroke="currentColor" strokeWidth="9" />
                  </svg>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}