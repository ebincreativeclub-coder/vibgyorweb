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
          <RevealImage delay={0.4} className="relative aspect-[1084/465] w-full rounded-[20px] md:rounded-[40px] overflow-hidden shadow-2xl group isolate">
            {/* Background Video */}
            <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000"
            >
              <source src="/images/video/8829009-hd_1366_720_25fps.mp4" type="video/mp4" />
            </video>

            {/* Dark Overlay as per Mask Group */}
            <div className="absolute inset-0 bg-[#000000]/30 z-10" />
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
