"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { RevealText, FadeUp, RevealImage } from "../ui/Reveal";

export function AboutHero() {
  return (
    <section className="bg-white pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden selection:bg-[#03AEF2] selection:text-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px]">
        
        {/* Header Text */}
        <div className="flex flex-col items-center text-center mb-8 md:mb-12">
          <RevealText delay={0.1}>
            <h1 className="text-[52px] md:text-[75px] font-bold text-[#16232A] leading-[1.1] mb-4 tracking-[-0.02em]">
              About Us
            </h1>
          </RevealText>
          <FadeUp delay={0.3}>
            <p className="text-[18px] md:text-[24px] font-normal text-[#16232A] opacity-80">
              Vibgyor Engineering WLL
            </p>
          </FadeUp>
        </div>

        {/* Main Banner / Mask Group */}
        <div className="relative w-full max-w-[1084px] mx-auto mb-10 md:mb-12" >
          <RevealImage delay={0.4} className="relative aspect-[1084/465] w-full rounded-[20px] md:rounded-[40px] overflow-hidden shadow-2xl group">
            {/* Background Image */}
            <Image 
              src="/images/about page/Group 426-2.webp" 
              alt="Vibgyor Interior Workspace" 
              fill 
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              priority
            />
            {/* Dark Overlay as per Mask Group */}
            <div className="absolute inset-0 bg-[#000000]/30" />

            {/* Play Button Icon (Polygon 7) */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="absolute inset-0 flex items-center justify-center z-10"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 transition-all hover:scale-110 hover:bg-white/30 cursor-pointer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="ml-1">
                  <path d="M5 3L19 12L5 21V3Z" />
                </svg>
              </div>
            </motion.div>
          </RevealImage>
        </div>

        {/* Bottom Quote / Mission Statement */}
        <div className="max-w-[700px] mx-auto text-center">
          <FadeUp delay={0.6}>
            <p className="text-[18px] md:text-[20px] font-medium text-[#16232A] leading-[1.5]">
              Great spaces don&apos;t happen by chance. <br className="hidden md:block" />
              we design, plan, and build interiors with precision — <span className="text-[#63757E]">delivering turnkey solutions that turn ideas into exceptional environments.</span>
            </p>
          </FadeUp>
        </div>

      </div>
    </section>
  );
}
