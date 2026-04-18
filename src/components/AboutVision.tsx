"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { VibgyorButton } from "./ui/VibgyorButton";
import { RevealText, FadeUp, RevealStaggerGroup, RevealItem, RevealImage } from "./ui/Reveal";

export function AboutVision() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Client-First Flexibility is open by default

  const reasons = [
    {
      id: "01",
      title: "Client-First Flexibility",
      description: "We listen before we build. We adapt to your requirements, timeline, and constraints — without compromising on quality or cutting corners."
    },
    {
      id: "02",
      title: "Strong Repeat Client Base",
      description: "A significant share of our work comes from returning clients and referrals — trust earned through consistent quality and transparent communication over 10+ years."
    },
    {
      id: "03",
      title: "Strong Local Expertise",
      description: "Based in Doha, we understand Qatar's construction environment, regulations, and procurement pace. That local knowledge means fewer delays and fewer surprises."
    },
    {
      id: "04",
      title: "On Time. Within Budget.",
      description: "We understand that delays have real costs. Our project management process is built around clear timelines, proactive scheduling, and disciplined budget control."
    },
    {
      id: "05",
      title: "Standardised Quality Systems",
      description: "We operate with documented SOPs and quality checks across every project — ensuring consistent standards and full accountability at every stage of the build."
    },
    {
      id: "06",
      title: "Dedicated Project Teams",
      description: "Each project gets its own dedicated team from day one. Your project lead and on-site crew are accountable, accessible, and committed to your outcomes."
    }
  ];

  return (
    <section className="bg-white pt-12 pb-12 lg:pt-16 lg:pb-16 font-['Instrument_Sans'] overflow-hidden relative selection:bg-[#03AEF2] selection:text-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px] relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-32 items-start">
          
          {/* LEFT COLUMN: WHAT SETS US APART */}
          <div className="w-full lg:w-[400px] shrink-0 lg:sticky lg:top-10">
            <RevealText delay={0.1}>
              <h2 className="text-3xl md:text-[40px] font-medium leading-[1.2] text-[#16232A] mb-8 tracking-tight">
                What Sets Us <br /> Apart.
              </h2>
            </RevealText>

            <FadeUp delay={0.2}>
              <VibgyorButton href="/about" variant="outline">Learn More</VibgyorButton>
            </FadeUp>
          </div>

          {/* RIGHT COLUMN: INTERACTIVE ACCORDION */}
          <div className="flex-1 w-full">
            <FadeUp delay={0.1} className="mb-10">
              <span className="text-[18px] md:text-[20px] font-medium text-[#16232A]">Why Choose Us</span>
              <div className="h-px w-full bg-[#63757E]/20 mt-6" />
            </FadeUp>

            <RevealStaggerGroup className="w-full">
              {reasons.map((reason, index) => (
                <RevealItem 
                  key={index} 
                  className="border-b border-[#63757E]/20"
                >
                  <button 
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full py-8 md:py-10 flex items-start text-left group transition-all duration-300"
                  >
                    {/* ID */}
                    <span className="text-[18px] md:text-[20px] font-medium leading-none mt-2 transition-colors duration-300 w-12 md:w-16 shrink-0 text-[#03AEF2]">
                      {reason.id}
                    </span>

                    {/* TITLE & CONTENT */}
                    <div className="flex-1 pr-8">
                      <h3 className="text-[24px] md:text-[32px] font-medium text-[#16232A] leading-tight tracking-tight">
                        {reason.title}
                      </h3>
                      
                      <AnimatePresence>
                        {openIndex === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: "auto", opacity: 1, marginTop: 24 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                            className="overflow-hidden"
                          >
                            <p className="text-[16px] md:text-[18px] text-[#63757E] leading-relaxed max-w-[549px] font-normal">
                              {reason.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* ICON (Plus/Close) */}
                    <div className="shrink-0 mt-3 md:mt-4">
                      <div className="relative w-5 h-5 md:w-6 md:h-6 flex items-center justify-center">
                        <div className={`absolute w-full h-[1.5px] bg-[#16232A] transition-transform duration-500 ${openIndex === index ? 'rotate-[135deg]' : 'rotate-0'}`} />
                        <div className={`absolute w-[1.5px] h-full bg-[#16232A] transition-transform duration-500 ${openIndex === index ? 'rotate-[135deg]' : 'rotate-0'}`} />
                      </div>
                    </div>
                  </button>
                </RevealItem>
              ))}
            </RevealStaggerGroup>
          </div>

        </div>

        {/* BOTTOM SECTION: ABOUT US BANNER */}
        <RevealImage 
          delay={0.2}
          className="relative w-full mt-16 mb-16 overflow-hidden isolate min-h-[465px] flex flex-col items-center justify-center text-center px-6 cursor-pointer"
        >
          {/* Background Image Container for Scale Effect */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <Image 
              src="/images/Group 426.webp" 
              alt="Interior Storytelling" 
              fill 
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Dark Overlay (Figma opacity: 0.73 base) */}
          <motion.div 
            whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.55)" }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-black/45 z-[1]" 
          />

          {/* Content */}
          <div className="relative z-[2] max-w-[623px]">
            <h2 className="text-[28px] md:text-[32px] font-medium leading-[39px] text-white mb-10">
              Every space tells a story. We make sure yours says exactly the right thing.
            </h2>
            
            <VibgyorButton href="/about" variant="light">About Us</VibgyorButton>
          </div>
        </RevealImage>
      </div>
    </section>
  );
}