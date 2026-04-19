"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, animate } from "framer-motion";
import { VibgyorButton } from "./ui/VibgyorButton";
import { RevealText, FadeUp, RevealStaggerGroup, RevealItem } from "./ui/Reveal";

function Counter({ value, suffix }: { value: string, suffix: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.5 });
  const num = parseInt(value);

  useEffect(() => {
    if (inView && numberRef.current) {
      const controls = animate(0, num, {
        duration: 2.2,
        ease: [0.16, 1, 0.3, 1], // Ultra-premium architectural ease
        onUpdate(v) {
          if (numberRef.current) {
            numberRef.current.textContent = Math.round(v).toString();
          }
        },
      });
      return () => controls.stop();
    }
  }, [inView, num]);

  return (
    <motion.div 
      ref={containerRef} 
      className="flex items-baseline mb-2"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <span
        ref={numberRef}
        className="text-5xl md:text-h1 font-normal text-[#16232A]"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        0
      </span>
      <span className="text-h3 md:text-h1 font-normal text-[#03AEF2]">
        {suffix}
      </span>
    </motion.div>
  );
}

export function Features() {
  const stats = [
    { number: "10", suffix: "+", label: "Years of Experience" },
    { number: "25", suffix: "+", label: "Expert Team Members" },
    { number: "150", suffix: "+", label: "Happy Clients" },
    { number: "300", suffix: "+", label: "Projects Completed" },
  ];
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px]">
        {/* Top Text Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-20 md:mb-24 items-start">
          <RevealText delay={0.1}>
            <h2 className="text-h3 md:text-5xl lg:text-h1 font-medium text-[#16232A]">
              We Build Spaces <br />
              <span className="text-[#63757E]">That Work.</span>
            </h2>
          </RevealText>

          <FadeUp delay={0.2} className="flex flex-col">
            <p className="text-body-md md:text-body-lg font-normal text-[#16232A] mb-6 md:mb-8 max-w-[594px]">
              Vibgyor Engineering W.L.L is a Doha-based interior fit-out and civil engineering company with over 10 years of experience delivering exceptional spaces for Qatar's leading businesses, hotels, and institutions. From first brief to final handover — we handle it all.
            </p>
            
            <div className="mt-2">
              <VibgyorButton href="/about" variant="dark">Learn More</VibgyorButton>
            </div>
          </FadeUp>
        </div>

        {/* Stats Row */}
        <RevealStaggerGroup className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 pt-4">
          {stats.map((stat, index) => (
            <RevealItem
              key={index}
              className="flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              <Counter value={stat.number} suffix={stat.suffix} />
              <span className="text-ui-xs md:text-ui font-semibold text-[#16232A] opacity-60 uppercase tracking-[0.15em] leading-tight">
                {stat.label}
              </span>
            </RevealItem>
          ))}
        </RevealStaggerGroup>
      </div>
    </section>
  );
}
