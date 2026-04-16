"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { VibgyorButton } from "./ui/VibgyorButton";

export function ServicesPortfolio() {
  const [activeService, setActiveService] = useState<number | null>(1); // Defaulting to 1 (Civil)

  const services = [
    { id: "1", title: "Interior Fit out Services" },
    { id: "2", title: "Civil Engineering Service" },
    { id: "3", title: "Carpentry Services" },
  ];

  const gallery = [
    { src: "/images/home gallery/image_39_1.webp" },
    { src: "/images/home gallery/image_39_2_1.webp" },
    { src: "/images/home gallery/image_39_3_1.webp" },
    { src: "/images/home gallery/image_39_4_1.webp" },
    { src: "/images/home gallery/image_39_5_1.webp" },
  ];

  return (
    <section className="bg-[#16232A] text-white pt-16 pb-40 md:pt-20 md:pb-48 font-['Instrument_Sans'] overflow-hidden">
      
      {/* 1. HEADER SECTION (Inside Container) */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 md:mb-20 gap-6">
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-medium leading-tight">
            How Vibgyor <span className="text-[#63757E]">Can Help You</span>
          </h2>
          
          <VibgyorButton href="/services">Explore Services</VibgyorButton>
        </div>
      </div>

      {/* Full-width Divider Line Above Services */}
      <div className="w-full h-px bg-[#63757E] opacity-50" />

      {/* 2. FULL-WIDTH SERVICES LIST (Outside Container) */}
      <div className="w-full flex flex-col mb-20 md:mb-32">
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Full-Width Background Image Layer */}
              <div 
                className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}
              >
                <Image src={bgImage} alt={service.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-[#16232A]/50 mix-blend-multiply" />
              </div>

              {/* Inner Content Wrapper (Inside Container to match page alignment) */}
              <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px] relative z-10 w-full flex items-center justify-between">
                
                {/* Number (Left) */}
                <div className="w-[15%] md:w-[20%] flex justify-start">
                  <div className="w-8 h-8 md:w-[29px] md:h-[29px] rounded-full border-[0.5px] border-[#63757E] flex items-center justify-center text-xs shrink-0 font-normal text-[#63757E] transition-colors duration-500 group-hover:border-white group-hover:text-white">
                    {service.id}
                  </div>
                </div>
                
                {/* Title (Center) */}
                <div className="w-[70%] md:w-[60%] flex justify-center text-center">
                  <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-[64px] font-medium leading-tight md:leading-[1.2] text-white">
                    {service.title}
                  </h3>
                </div>
                
                {/* Arrow (Right) */}
                <div className="w-[15%] md:w-[20%] flex justify-end transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2">
                  <svg viewBox="0 0 78 85" fill="none" className="w-8 h-8 md:w-16 md:h-16 lg:w-[78px] lg:h-[85px] origin-right">
                    <path 
                      d="M10 75L67 10M67 10H10M67 10V75" 
                      stroke="currentColor" 
                      strokeWidth="9" 
                      strokeLinecap="square" 
                      strokeLinejoin="miter" 
                      className={`transition-colors duration-500 ${isActive ? 'text-white' : 'text-[#63757E]'}`} 
                    />
                  </svg>
                </div>

              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 3. PORTFOLIO GALLERY (Inside Container) */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px]">
        {/* Portfolio Section Header */}
        <div className="flex flex-col items-center text-center mb-12 lg:mb-16 mx-auto w-full">
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-medium leading-tight mb-4">
            Real spaces. <span className="text-[#63757E]">Real transformations.</span>
          </h2>
          <p className="text-sm md:text-lg lg:text-[20px] font-normal text-white/80 leading-relaxed max-w-[582px]">
            Explore the projects that showcase our expertise in interior design, fit-out, and contracting
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          
          {/* Column 1 */}
          <div className="flex flex-col gap-5">
            <div className="relative w-full aspect-[16/9] bg-[#D4D4D4] rounded-sm overflow-hidden group">
              <Image src={gallery[1].src} alt="Project 1" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="relative w-full aspect-[4/3] bg-[#D4D4D4] rounded-sm overflow-hidden group">
              <Image src={gallery[0].src} alt="Project 2" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </div>
          
          {/* Column 2 */}
          <div className="flex flex-col gap-5">
            <div className="relative w-full aspect-[5/4] bg-[#D4D4D4] rounded-sm overflow-hidden group">
              <Image src={gallery[3].src} alt="Project 3" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="relative w-full aspect-[21/9] bg-[#D4D4D4] rounded-sm overflow-hidden group">
              <Image src={gallery[4].src} alt="Project 4" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col sm:col-span-2 lg:col-span-1">
            <div className="relative w-full h-full min-h-[300px] aspect-square sm:aspect-auto lg:aspect-[4/5] bg-[#D4D4D4] rounded-sm overflow-hidden group">
              <Image src={gallery[2].src} alt="Project 5" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </div>
          
        </div>
        
        <div className="flex justify-center md:justify-end mt-8 md:mt-10">
          <VibgyorButton href="/projects">View All Projects</VibgyorButton>
        </div>
      </div>
    </section>
  );
}