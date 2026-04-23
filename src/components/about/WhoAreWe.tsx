"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { RevealText, FadeUp, RevealImage } from "../ui/Reveal";

export function WhoAreWe() {
  return (
    <section className="bg-white py-12 md:py-16 overflow-hidden selection:bg-[#03AEF2] selection:text-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px]">
        
        {/* Row 1: Title and Large Image */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-start mb-12 md:mb-20">
          {/* Title */}
          <div className="pt-2">
            <RevealText delay={0.1}>
              <h2 className="text-[20px] font-medium text-[#16232A] uppercase tracking-tight">
                Who are we
              </h2>
            </RevealText>
          </div>

          {/* Top Right Image */}
          <div className="w-full">
            <RevealImage delay={0.2} className="relative aspect-[633/317] w-full rounded-[20px] md:rounded-[32px] overflow-hidden shadow-sm">
              <Image 
                src="/images/about page/Mask group-4.webp" 
                alt="Modern Interior Design" 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </RevealImage>
          </div>
        </div>

        {/* Row 2: Small Image and Description Text */}
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_2fr] gap-12 md:gap-20 items-start">
          {/* Bottom Left Image */}
          <div className="w-full max-w-[265px] md:max-w-none">
            <RevealImage delay={0.3} className="relative aspect-[265/273] w-full rounded-[20px] md:rounded-[32px] overflow-hidden shadow-sm">
              <Image 
                src="/images/about page/Mask group-5.webp" 
                alt="Carpentry Details" 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 80vw, 400px"
              />
            </RevealImage>
          </div>

          {/* Description Text */}
          <div className="max-w-[633px]">
            <FadeUp delay={0.4}>
              <p className="text-[18px] md:text-[20px] font-medium text-[#16232A] leading-[1.6] md:leading-[1.4] opacity-90">
                With over 10 years of experience, we are an enthusiastic and motivated company with an efficient and friendly approach In addition to traditional and modern Civil , Interior Fit out , carpentry and joinery have developed skills and experience in hardwood specifications and with specialist care and attention. 
                <br /><br />
                Our labor force is highly skilled and fully equipped with all the plant and hand tools required to perform and meet all type schedules of works. We recognize the pressure of large scale projects and are widely experienced in completing projects to the highest standards within an agreed timeframe. You can rest assured that unlike many other manufacturers.
              </p>
            </FadeUp>
          </div>
        </div>

      </div>
    </section>
  );
}
