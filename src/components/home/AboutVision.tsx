"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { VibgyorButton } from "../ui/VibgyorButton";
import { RevealText, FadeUp, RevealStaggerGroup, RevealItem, RevealImage } from "../ui/Reveal";

interface AboutVisionProps {
  showBanner?: boolean;
}

export function AboutVision({ showBanner = true }: AboutVisionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null); // Start with all closed

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
    <section className="bg-[#16232A] text-white pt-16 pb-12 lg:pt-24 lg:pb-16 overflow-hidden relative selection:bg-[#03AEF2] selection:text-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px] relative z-10">
        
        {/* TOP HEADER: Full Width Split */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 lg:mb-24 gap-10">
          <div className="lg:w-1/2">
            <FadeUp delay={0.1}>
              <span className="text-body-lg font-medium text-white mb-6 block">
                Why Choose Us
              </span>
            </FadeUp>
            <RevealText delay={0.2}>
              <h2 className="text-3xl md:text-h2 font-medium text-white">
                What Sets Us <br className="hidden md:block"/> Apart.
              </h2>
            </RevealText>
          </div>

          <div className="lg:w-1/3 flex flex-col items-start lg:items-end text-left lg:text-right">
            <FadeUp delay={0.3}>
              <p className="text-body md:text-body-md text-white/70 mb-8 max-w-[400px]">
                We don't just build spaces - we build trust through transparency, precision, and a relentless focus on your goals.
              </p>
              {!showBanner && (
                <VibgyorButton href="/about" variant="light">Learn More</VibgyorButton>
              )}
            </FadeUp>
          </div>
        </div>

        {/* INDEPENDENT 2-COLUMN ACCORDION */}
        <div className="w-full mt-4 md:mt-8">
          <RevealStaggerGroup className="w-full flex flex-col md:flex-row gap-x-12 lg:gap-x-20">
            
            {/* LEFT COLUMN */}
            <div className="flex-1 flex flex-col">
              {reasons.slice(0, 3).map((reason, idx) => {
                const index = idx;
                const isOpen = openIndex === index;

                return (
                  <RevealItem key={reason.id}>
                    <div className={`border-t transition-colors duration-500 ${isOpen ? 'border-t-[#03AEF2]' : 'border-white/10'}`}>
                      <button 
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        className="w-full py-8 md:py-10 flex flex-col gap-4 items-start text-left group transition-all duration-300"
                      >
                        <div className="flex items-center justify-between w-full">
                          {/* Column 1: Number */}
                          <span className={`text-body-lg md:text-h4 font-light transition-colors duration-300 shrink-0 ${isOpen ? 'text-[#03AEF2]' : 'text-[#63757E] group-hover:text-[#03AEF2]'}`}>
                            {reason.id}
                          </span>
                          
                          {/* Icon */}
                          <div className="relative shrink-0">
                            <div className="relative w-6 h-6 flex items-center justify-center">
                              <div className={`absolute w-full h-[1.5px] transition-all duration-500 ${isOpen ? 'rotate-[135deg] bg-[#03AEF2]' : 'bg-white group-hover:bg-[#03AEF2]'}`} />
                              <div className={`absolute w-[1.5px] h-full transition-all duration-500 ${isOpen ? 'rotate-[135deg] bg-[#03AEF2]' : 'bg-white group-hover:bg-[#03AEF2]'}`} />
                            </div>
                          </div>
                        </div>

                        {/* Column 2: Title */}
                        <h3 className={`text-2xl md:text-h4 lg:text-h4 font-medium transition-all duration-500 ${isOpen ? 'text-[#03AEF2]' : 'text-white group-hover:tracking-wider'}`}>
                          {reason.title}
                        </h3>
                      </button>

                      {/* Expandable Content */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="pb-10 pt-2 lg:pb-12 overflow-hidden">
                              <motion.div
                                initial={{ opacity: 0, y: "20%" }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.15, ease: [0.33, 1, 0.68, 1] }}
                              >
                                <p className="text-body md:text-body-lg text-white/70 max-w-full font-normal">
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
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex-1 flex flex-col">
              {reasons.slice(3, 6).map((reason, idx) => {
                const index = idx + 3;
                const isOpen = openIndex === index;

                return (
                  <RevealItem key={reason.id}>
                    <div className={`border-t transition-colors duration-500 ${isOpen ? 'border-t-[#03AEF2]' : 'border-white/10'}`}>
                      <button 
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        className="w-full py-8 md:py-10 flex flex-col gap-4 items-start text-left group transition-all duration-300"
                      >
                        <div className="flex items-center justify-between w-full">
                          {/* Column 1: Number */}
                          <span className={`text-body-lg md:text-h4 font-light transition-colors duration-300 shrink-0 ${isOpen ? 'text-[#03AEF2]' : 'text-[#63757E] group-hover:text-[#03AEF2]'}`}>
                            {reason.id}
                          </span>
                          
                          {/* Icon */}
                          <div className="relative shrink-0">
                            <div className="relative w-6 h-6 flex items-center justify-center">
                              <div className={`absolute w-full h-[1.5px] transition-all duration-500 ${isOpen ? 'rotate-[135deg] bg-[#03AEF2]' : 'bg-white group-hover:bg-[#03AEF2]'}`} />
                              <div className={`absolute w-[1.5px] h-full transition-all duration-500 ${isOpen ? 'rotate-[135deg] bg-[#03AEF2]' : 'bg-white group-hover:bg-[#03AEF2]'}`} />
                            </div>
                          </div>
                        </div>

                        {/* Column 2: Title */}
                        <h3 className={`text-2xl md:text-h4 lg:text-h4 font-medium transition-all duration-500 ${isOpen ? 'text-[#03AEF2]' : 'text-white group-hover:tracking-wider'}`}>
                          {reason.title}
                        </h3>
                      </button>

                      {/* Expandable Content */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="pb-10 pt-2 lg:pb-12 overflow-hidden">
                              <motion.div
                                initial={{ opacity: 0, y: "20%" }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.15, ease: [0.33, 1, 0.68, 1] }}
                              >
                                <p className="text-body md:text-body-lg text-white/70 max-w-full font-normal">
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
            </div>

          </RevealStaggerGroup>
        </div>

        {/* BOTTOM SECTION: ABOUT US BANNER (CONDITIONALLY RENDERED) */}
        {showBanner && (
          <RevealImage 
            delay={0.2}
            className="relative w-full mt-24 mb-16 overflow-hidden rounded-[2.5rem] isolate min-h-[465px] flex flex-col items-center justify-center text-center px-6 cursor-pointer transform-gpu"
          >
            {/* Unified Interaction Parent: Wraps EVERYTHING */}
            <motion.div 
              whileHover="hover"
              initial="initial"
              className="absolute inset-0 flex flex-col items-center justify-center will-change-transform"
            >
              {/* The Image Container */}
              <motion.div 
                variants={{
                  initial: { scale: 1 },
                  hover: { scale: 1.1 }
                }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 z-0 will-change-transform"
              >
                <Image 
                  src="/images/about/Group 426.webp" 
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
                <h2 className="text-2xl md:text-3xl lg:text-h3 font-medium text-white mb-10">
                  Every space tells a story. We make sure yours says exactly the right thing.
                </h2>
                
                <VibgyorButton href="/about" variant="light">About Us</VibgyorButton>
              </div>
            </motion.div>
          </RevealImage>
        )}
      </div>
    </section>
  );
}