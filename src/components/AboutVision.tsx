"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { VibgyorButton } from "./ui/VibgyorButton";
import { RevealText, FadeUp, RevealStaggerGroup, RevealItem, RevealImage } from "./ui/Reveal";

export function AboutVision() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Client-First open by default

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
    <section className="bg-white pt-16 pb-12 lg:pt-24 lg:pb-16 font-['Instrument_Sans'] overflow-hidden relative selection:bg-[#03AEF2] selection:text-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px] relative z-10">
        
        {/* TOP HEADER: Full Width Split */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 lg:mb-24 gap-10">
          <div className="lg:w-1/2">
            <FadeUp delay={0.1}>
              <span className="text-[20px] font-medium text-[#16232A] mb-6 block">
                Why Choose Us
              </span>
            </FadeUp>
            <RevealText delay={0.2}>
              <h2 className="text-[36px] md:text-[54px] font-medium leading-[1.1] text-[#16232A] tracking-tight">
                What Sets Us <br className="hidden md:block"/> Apart.
              </h2>
            </RevealText>
          </div>

          <div className="lg:w-1/3 flex flex-col items-start lg:items-end text-left lg:text-right">
            <FadeUp delay={0.3}>
              <p className="text-[16px] md:text-[18px] text-[#63757E] mb-8 leading-relaxed max-w-[400px]">
                We don't just build spaces - we build trust through transparency, precision, and a relentless focus on your goals.
              </p>
              <VibgyorButton href="/about" variant="outline">Learn More</VibgyorButton>
            </FadeUp>
          </div>
        </div>

        {/* FULL WIDTH EDITORIAL ACCORDION */}
        <div className="w-full border-t border-[#16232A]/10">
          <RevealStaggerGroup className="w-full flex flex-col">
            {reasons.map((reason, index) => {
              const isOpen = openIndex === index;

              return (
                <RevealItem key={reason.id}>
                  <div className={`border-b transition-colors duration-500 ${isOpen ? 'border-[#03AEF2]' : 'border-[#16232A]/10'}`}>
                    <button 
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full py-8 md:py-12 flex flex-col md:grid md:grid-cols-[auto_1fr_auto] gap-4 md:gap-12 lg:gap-20 items-start md:items-center text-left group transition-all duration-300"
                    >
                      {/* Column 1: Number */}
                      <span className={`text-[20px] md:text-[24px] font-light transition-colors duration-300 w-12 md:w-16 shrink-0 ${isOpen ? 'text-[#03AEF2]' : 'text-[#63757E] group-hover:text-[#16232A]'}`}>
                        {reason.id}
                      </span>

                      {/* Column 2: Title */}
                      <h3 className={`text-[28px] md:text-[40px] lg:text-[48px] font-medium leading-none tracking-tight transition-all duration-500 ${isOpen ? 'text-[#03AEF2] md:translate-x-4' : 'text-[#16232A] group-hover:translate-x-2'}`}>
                        {reason.title}
                      </h3>

                      {/* Column 3: Icon (Hidden on mobile to avoid heading clutter, visible on desktop) */}
                      <div className="hidden md:flex relative shrink-0 ml-auto">
                        <div className="relative w-8 h-8 flex items-center justify-center">
                          <div className={`absolute w-full h-[1.5px] transition-all duration-500 ${isOpen ? 'rotate-[135deg] bg-[#03AEF2]' : 'rotate-0 bg-[#16232A] group-hover:bg-[#03AEF2]'}`} />
                          <div className={`absolute w-[1.5px] h-full transition-all duration-500 ${isOpen ? 'rotate-[135deg] bg-[#03AEF2]' : 'rotate-0 bg-[#16232A] group-hover:bg-[#03AEF2]'}`} />
                        </div>
                      </div>
                    </button>

                    {/* Expandable Content (Aligns perfectly with the title on desktop) */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden md:grid md:grid-cols-[auto_1fr_auto] md:gap-12 lg:gap-20"
                        >
                          {/* Empty div to offset the text and align it with the Title */}
                          <div className="hidden md:block w-16 shrink-0" />
                          
                          <div className="pb-10 md:pb-14 pr-8 md:pr-0 md:pl-4 overflow-hidden">
                            <motion.div
                              initial={{ opacity: 0, y: "20%" }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.8, delay: 0.15, ease: [0.33, 1, 0.68, 1] }}
                            >
                              <p className="text-[16px] md:text-[20px] text-[#63757E] leading-relaxed max-w-[700px] font-normal">
                                {reason.description}
                              </p>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </RevealItem>
              );
            })}
          </RevealStaggerGroup>
        </div>

        {/* BOTTOM SECTION: ABOUT US BANNER (UNCHANGED) */}
        <RevealImage 
          delay={0.2}
          className="relative w-full mt-24 mb-16 overflow-hidden rounded-[2.5rem] isolate min-h-[465px] flex flex-col items-center justify-center text-center px-6 cursor-pointer"
        >
          {/* Unified Interaction Parent: Wraps EVERYTHING */}
          <motion.div 
            whileHover="hover"
            initial="initial"
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            {/* The Image Container */}
            <motion.div 
              variants={{
                initial: { scale: 1 },
                hover: { scale: 1.1 }
              }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
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

            {/* The Overlay */}
            <motion.div 
              variants={{
                initial: { opacity: 1 },
                hover: { opacity: 0.65 }
              }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-black/45 z-[1]" 
            />

            {/* Content: Now inside the interaction parent */}
            <div className="relative z-[2] max-w-[623px]">
              <h2 className="text-[28px] md:text-[32px] font-medium leading-[39px] text-white mb-10">
                Every space tells a story. We make sure yours says exactly the right thing.
              </h2>
              
              <VibgyorButton href="/about" variant="light">About Us</VibgyorButton>
            </div>
          </motion.div>
        </RevealImage>
      </div>
    </section>
  );
}