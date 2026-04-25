"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import Image from "next/image";
import { RevealText, FadeUp } from "../ui/Reveal";

const processSteps = [
  {
    id: "01",
    title: "Consultation",
    description: "We start by listening. Our team meets with you to understand your space, your requirements, your timeline, and your budget. No assumptions, no generic solutions - every project starts with a proper brief.",
    icon: "/images/our process svg/Vector-2.svg"
  },
  {
    id: "02",
    title: "Design & Plan",
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

// --- EXTRACTED COMPONENT ---
// This fixes the Hook ordering error by putting useTransform at the top level of a component.
interface ProcessCardProps {
  step: typeof processSteps[0];
  index: number;
  totalSteps: number;
  smoothProgress: MotionValue<number>;
}

const ProcessCard = ({ step, index, totalSteps, smoothProgress }: ProcessCardProps) => {
  const scrubEnd = 0.85; // Finish all animations by 85% of scroll
  const stepWindow = scrubEnd / totalSteps; 
  const start = index * stepWindow;
  const end = start + stepWindow;

  // 1. SVG Ring Drawing
  const ringProgress = useTransform(smoothProgress, [start, end], [0, 1]);

  // 2. The Wave Elevation
  const cardY = useTransform(smoothProgress, [start - 0.05, start, end, end + 0.05], [0, -16, -16, 0]);
  const cardScale = useTransform(smoothProgress, [start - 0.05, start, end, end + 0.05], [0.98, 1.02, 1.02, 1]);

  // 3. Opacity
  const cardOpacity = useTransform(smoothProgress, [start - 0.1, start], [0.4, 1]);

  // 4. Glow / Shadow
  const boxShadow = useTransform(
    smoothProgress, 
    [start - 0.05, start, end, end + 0.05], 
    [
      "0px 4px 20px rgba(0,0,0,0.03)", 
      "0px 30px 60px rgba(3, 174, 242, 0.15)", 
      "0px 30px 60px rgba(3, 174, 242, 0.15)", 
      "0px 8px 30px rgba(0,0,0,0.04)"
    ]
  );

  // 5. Border Color
  const borderColor = useTransform(
    smoothProgress, 
    [start - 0.05, start, end, end + 0.05], 
    [
      "rgba(22, 35, 42, 0.06)", 
      "rgba(3, 174, 242, 0.6)", 
      "rgba(3, 174, 242, 0.6)", 
      "rgba(3, 174, 242, 0.2)"
    ]
  );

  // 6. Background Blob Intensity
  const blobOpacity = useTransform(smoothProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);

  return (
    <motion.div 
      style={{ 
        opacity: cardOpacity, 
        y: cardY, 
        scale: cardScale, 
        boxShadow, 
        borderColor,
        transform: "translateZ(0)", // Safari hardware acceleration
      }}
      className="w-full lg:flex-1 bg-white border-[1.5px] rounded-[2.5rem] p-6 md:p-8 xl:p-10 flex flex-col relative overflow-hidden will-change-transform isolate"
    >
      {/* Decorative Glowing Background Blob - Safari optimized with translateZ */}
      <motion.div 
        style={{ opacity: blobOpacity, transform: "translateZ(0)" }}
        className="absolute -top-20 -right-20 w-48 h-48 bg-[#03AEF2] blur-[90px] rounded-full pointer-events-none"
      />

      {/* Header: Ring Indicator & Step Number */}
      <div className="flex justify-between items-start mb-12 relative z-10">
        <div className="relative w-[76px] h-[76px] flex items-center justify-center bg-white rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
          {/* Background Track */}
          <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 76 76">
            <circle cx="38" cy="38" r="34" stroke="#F1F5F9" strokeWidth="4" fill="none" />
          </svg>
          
          {/* Animated Blue Progress Ring */}
          <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 76 76">
            <motion.circle 
              cx="38" cy="38" r="34" 
              stroke="#03AEF2" 
              strokeWidth="4" 
              fill="none" 
              strokeLinecap="round"
              style={{ pathLength: ringProgress }} 
            />
          </svg>

          {/* Icon */}
          <div className="relative w-7 h-7">
            <Image src={step.icon} alt={step.title} fill className="object-contain" />
          </div>
        </div>

        {/* Faded Step Number Watermark */}
        <span className="text-display font-light text-[#16232A]/5 mb-2 block">
          {step.id}
        </span>
      </div>
      
      {/* Text Content */}
      <div className="relative z-10">
        <span className="inline-block text-[#03AEF2] text-ui-xs font-semibold tracking-widest uppercase mb-4">
          Step {step.id}
        </span>
        <h3 className="text-h4 font-medium text-[#16232A] mb-4">
          {step.title}
        </h3>
        <p className="text-body-sm font-normal text-[#63757E]">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
};


export function OurProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  // SCROLL ENGINE
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30, 
    restDelta: 0.001 
  });

  return (
    <section ref={containerRef} className="relative bg-[#FAFCFF]">
      
      {/* PART 1: Header — Scrolls naturally, never clipped */}
      <div className="pt-24 md:pt-32 pb-12 md:pb-16">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px]">
          <div className="flex flex-col lg:flex-row justify-between items-start">
            <FadeUp delay={0.1} className="lg:w-1/4 pt-2">
              <span className="text-body-lg font-medium text-[#16232A]">Our Process</span>
            </FadeUp>

            <div className="lg:w-3/4 max-w-[700px]">
              <RevealText delay={0.2}>
                <h2 className="text-3xl md:text-h2 font-medium text-[#16232A] mb-6">
                  From Brief to Handover - <br />
                  <span className="text-[#63757E]">We Handle It All.</span>
                </h2>
              </RevealText>
              
              <FadeUp delay={0.3}>
                <p className="text-body-lg font-medium text-[#16232A] max-w-[582px]">
                  A structured process means fewer surprises, faster delivery, and results you can count on every time.
                </p>
              </FadeUp>
            </div>
          </div>
        </div>
      </div>

      {/* PART 2: Desktop Card Scrub Zone (Unchanged) */}
      <div className="hidden lg:block relative h-[400vh]">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px] w-full">
            <div className="flex flex-row gap-6 items-stretch w-full pb-10">
              {processSteps.map((step, index) => (
                <ProcessCard 
                  key={step.id} 
                  step={step} 
                  index={index} 
                  totalSteps={processSteps.length}
                  smoothProgress={smoothProgress} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* PART 3: Mobile Vertical Flow — Natural & Fluid */}
      <div className="lg:hidden pb-24 px-6 relative">
        <div className="flex flex-col gap-16 relative">
          {/* Vertical Connecting Line (Static on mobile for better UX) */}
          <div className="absolute left-[38px] top-10 bottom-10 w-[1px] bg-[#16232A]/5" />
          
          {processSteps.map((step, idx) => (
            <FadeUp key={step.id} delay={idx * 0.1}>
              <div className="relative">
                <MobileProcessCard step={step} />
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

    </section>
  );
}

// --- MOBILE SPECIFIC COMPONENT ---
// Simplified reveal-based card for mobile
function MobileProcessCard({ step }: { step: typeof processSteps[0] }) {
  return (
    <div className="flex gap-6 items-start">
      {/* Icon Ring with simpler entrance animation */}
      <div className="flex-shrink-0 relative w-[76px] h-[76px] flex items-center justify-center bg-white rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-[#03AEF2]/10 z-10">
        <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 76 76">
          <circle cx="38" cy="38" r="34" stroke="#F1F5F9" strokeWidth="4" fill="none" />
          <motion.circle 
            cx="38" cy="38" r="34" 
            stroke="#03AEF2" strokeWidth="4" fill="none" strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          />
        </svg>
        <div className="relative w-7 h-7">
          <Image src={step.icon} alt={step.title} fill className="object-contain" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pt-2">
        <span className="text-[#03AEF2] text-ui-tiny font-semibold tracking-widest uppercase mb-2 block">
          Step {step.id}
        </span>
        <h3 className="text-body-lg font-medium text-[#16232A] mb-3 leading-tight uppercase tracking-tight">
          {step.title}
        </h3>
        <p className="text-ui font-normal text-[#63757E] leading-relaxed max-w-xs">
          {step.description}
        </p>
      </div>
    </div>
  );
}