"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { VibgyorButton } from "../ui/VibgyorButton";

export function ServicesPortfolio() {
  const router = useRouter();
  const [activeService, setActiveService] = useState<number | null>(null);

  const services = [
    { id: "1", title: "Interior Fit out", href: "/services#service-01" },
    { id: "2", title: "Carpentry", href: "/services#service-02" },
    { id: "3", title: "Furniture", href: "/products" },
    { id: "4", title: "Partitioning Systems", href: "/products" },
    { id: "5", title: "Raised Floor Systems.", href: "/products" },
    { id: "6", title: "Civil Engineering Services", href: "/services#service-03" },
  ];

  return (
    <section className="bg-[#16232A] text-white pt-16 pb-0 md:pt-20 md:pb-0 overflow-hidden">
      
      {/* 1. HEADER SECTION */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 md:mb-20 gap-6">
          <h2 className="text-3xl md:text-h3 font-medium">
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
            "1": "/images/hero-services/interior.webp",
            "2": "/images/hero-services/carpentry.webp",
            "3": "/images/hero-services/furniture.webp",
            "4": "/images/hero-services/partition.webp",
            "5": "/images/hero-services/raised.webp",
            "6": "/images/hero-services/civil.webp",
          };
          const bgImage = serviceImages[service.id as keyof typeof serviceImages];
          const isActive = activeService === index;

          return (
            <motion.div
              key={service.id}
              onMouseEnter={() => setActiveService(index)}
              onMouseLeave={() => setActiveService(null)}
              className="group relative border-b border-[#63757E] border-opacity-50 min-h-[130px] md:min-h-[160px] lg:min-h-[180px] flex items-center cursor-pointer overflow-hidden transition-all duration-500 py-8"
            >
              <Link href={service.href} className="absolute inset-0 z-20" />
              
              <div className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-500 transform-gpu ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                <Image src={bgImage} alt={service.title} fill className="object-cover" />
                {/* Replaced mix-blend-multiply with standard alpha for better Safari performance */}
                <div className="absolute inset-0 bg-[#16232A]/70" />
              </div>

              <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px] relative z-10 w-full flex items-center justify-between pointer-events-none">
                <div className="w-[15%] md:w-[20%] flex justify-start">
                  <div className={`w-8 h-8 md:w-[29px] md:h-[29px] rounded-full border-[0.5px] flex items-center justify-center text-xs shrink-0 font-normal transition-colors duration-500 ${isActive ? 'border-white text-white' : 'border-[#63757E] text-[#63757E]'} group-hover:border-white group-hover:text-white`}>
                    {service.id}
                  </div>
                </div>
                <div className="w-[70%] md:w-[60%] flex justify-center text-center">
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-[40px] font-medium text-white leading-tight">
                    {service.title}
                  </h3>
                </div>
                <div className="w-[15%] md:w-[20%] flex justify-end transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2">
                  <svg viewBox="0 0 115 115" fill="none" className={`w-8 h-8 md:w-16 md:h-16 lg:w-[70px] lg:h-[70px] origin-right transition-colors duration-500 ${isActive ? 'text-white' : 'text-[#63757E]'}`}>
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