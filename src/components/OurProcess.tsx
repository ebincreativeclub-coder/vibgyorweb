"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { RevealText, FadeUp, RevealStaggerGroup, RevealItem } from "./ui/Reveal";

const processSteps = [
  {
    id: "01",
    title: "Consultation",
    description: "We start by listening. Our team meets with you to understand your space, your requirements, your timeline, and your budget. No assumptions, no generic solutions - every project starts with a proper brief.",
    icon: "/images/our process svg/Vector-2.svg"
  },
  {
    id: "02",
    title: "Design & Planning",
    description: "Our designers and project leads translate your brief into a detailed execution plan - layouts, material selections, timelines, and cost breakdowns. Everything is agreed and signed off before a single tool is picked up.",
    icon: "/images/our process svg/Vector-3.svg"
  },
  {
    id: "03",
    title: "Execution",
    description: "Our on-site teams get to work with precision and professionalism. We manage every trade, every material, and every milestone - so you can focus on your business while we build your space.",
    icon: "/images/our process svg/Vector-4.svg"
  },
  {
    id: "04",
    title: "Handover",
    description: "We don't just finish - we hand over. A thorough walkthrough, full snag resolution, and complete sign-off ensures your space is delivered exactly as promised. No loose ends.",
    icon: "/images/our process svg/Vector-5.svg"
  }
];

export function OurProcess() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section className="bg-white py-24 md:py-32 font-['Instrument_Sans'] overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px]">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-24 md:mb-32">
          <FadeUp delay={0.1} className="lg:w-1/4 pt-2">
            <span className="text-[20px] font-medium text-[#16232A]">Our Process</span>
          </FadeUp>

          <div className="lg:w-3/4 max-w-[700px]">
            <RevealText delay={0.2}>
              <h2 className="text-3xl md:text-[40px] font-medium text-[#16232A] leading-[1.2] mb-6">
                From Brief to Handover - <br />
                <span className="text-[#63757E]">We Handle It All.</span>
              </h2>
            </RevealText>
            
            <FadeUp delay={0.3}>
              <p className="text-lg md:text-[20px] font-medium text-[#16232A] leading-[1.3] max-w-[582px]">
                A structured process means fewer surprises, faster delivery, and results you can count on every time.
              </p>
            </FadeUp>
          </div>
        </div>

        {/* Desktop View */}
        <RevealStaggerGroup className="hidden lg:flex justify-between items-start relative">
          {/* Precise Dotted Connecting Line (Behind circles) */}
          <div 
            className="absolute top-[42.5px] left-[10%] right-[10%] h-[1px] z-0" 
            style={{
              backgroundImage: 'radial-gradient(circle, #03AEF2 1.5px, transparent 1.5px)',
              backgroundSize: '12px 100%',
              backgroundRepeat: 'repeat-x',
              opacity: 0.6
            }}
          />
          
          {processSteps.map((step, index) => (
            <RevealItem 
              key={step.id}
              className="relative z-10 flex flex-col items-center text-center w-1/4"
            >
              <div className="w-[85px] h-[85px] rounded-full border border-[#16232A] border-opacity-[0.15] bg-white flex items-center justify-center mb-10 transition-shadow duration-500 relative z-20">
                <div className="relative w-9 h-9">
                  <Image src={step.icon} alt={step.title} fill className="object-contain" />
                </div>
              </div>
              
              <h3 className="text-[24px] font-medium text-[#16232A] mb-5 tracking-tight">{step.title}</h3>
              <p className="text-[14px] font-normal text-[#16232A] leading-[1.5] max-w-[245px] opacity-80 font-['Instrument_Sans']">
                {step.description}
              </p>
            </RevealItem>
          ))}
        </RevealStaggerGroup>

        {/* Mobile View (Accordion Style as in image) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:hidden flex flex-col border-t border-[#16232A]/10"
        >
          {processSteps.map((step, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <div key={step.id} className="border-b border-[#16232A]/10">
                <button 
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className="w-full py-6 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-6">
                    <span className={`text-lg font-normal transition-colors duration-300 ${isExpanded ? 'text-[#03AEF2]' : 'text-[#63757E]'}`}>
                      {step.id}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-medium text-[#16232A]">{step.title}</h3>
                  </div>
                  <div className="relative w-6 h-6 flex items-center justify-center">
                    <motion.div 
                      animate={{ rotate: isExpanded ? 45 : 0 }}
                      className="absolute w-full h-0.5 bg-[#16232A]"
                    />
                    <motion.div 
                      animate={{ rotate: isExpanded ? 45 : 90 }}
                      className="absolute w-full h-0.5 bg-[#16232A]"
                    />
                  </div>
                </button>
                
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pl-14 md:pl-16 pr-4">
                        <p className="text-base font-normal text-[#16232A] leading-relaxed opacity-70">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
