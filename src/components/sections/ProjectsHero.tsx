"use client";

import { motion } from "framer-motion";
import { RevealText, FadeUp } from "../ui/Reveal";

export function ProjectsHero() {
  return (
    <section className="bg-white pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden selection:bg-[#03AEF2] selection:text-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px]">
        
        {/* Header Text */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <RevealText delay={0.1}>
            <h1 className="text-[52px] md:text-[75px] font-bold text-[#16232A] leading-[1.1] mb-4 tracking-[-0.02em]">
              Projects
            </h1>
          </RevealText>
          <FadeUp delay={0.3}>
            <p className="text-[18px] md:text-[20px] font-medium text-[#16232A] max-w-[850px] leading-relaxed opacity-80">
              Explore the spaces we&apos;ve transformed through thoughtful design and precise execution. <br className="hidden md:block" />
              Each project reflects our commitment to quality, creativity, and craftsmanship.
            </p>
          </FadeUp>
        </div>

        {/* Separator Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-[1px] bg-[#63757E] w-full origin-left opacity-30"
        />

      </div>
    </section>
  );
}
