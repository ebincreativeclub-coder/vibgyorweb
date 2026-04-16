"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { VibgyorButton } from "./ui/VibgyorButton";

export function AboutVision() {
  const reasons = [
    {
      id: "01",
      title: "Flexibility",
      description: "Our success has been built on our ability to listen to the client and be flexible to change as and when the business demands."
    },
    {
      id: "02",
      title: "Repeat clients",
      description: "We have been able to establish a large base of repeat clientele by servicing clients repeatedly and receiving excellent customer feedback"
    },
    {
      id: "03",
      title: "Strong Local Presence",
      description: "Our network through the country with strong local teams helps us service our clients in all regions."
    }
  ];

  return (
    <section className="bg-white py-24 md:py-32 font-['Instrument_Sans'] overflow-hidden relative">
      {/* Left Image: Mask group-2.jpg (Woman Standing) */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute left-0 top-[25%] md:top-[30%] lg:top-[35%] -translate-x-[60%] md:-translate-x-[55%] lg:-translate-x-[50%] w-[450px] md:w-[650px] lg:w-[750px] aspect-square pointer-events-none z-0"
      >
        <Image 
          src="/images/hero whychooseus/Mask group-2.jpg" 
          alt="Workplace Design" 
          fill 
          className="object-cover" 
          style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
        />
      </motion.div>

      {/* Right Image: Mask group-3.jpg (Woman Sitting) */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="absolute right-0 top-[55%] md:top-[50%] lg:top-[45%] translate-x-[60%] md:translate-x-[55%] lg:translate-x-[50%] w-[450px] md:w-[650px] lg:w-[750px] aspect-square pointer-events-none z-0"
      >
        <Image 
          src="/images/hero whychooseus/Mask group-3.jpg" 
          alt="Interior Transformation" 
          fill 
          className="object-cover"
          style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
        />
      </motion.div>

      <div className="container mx-auto px-8 max-w-[1280px] relative z-10">
        
        {/* Top Section: Branding + Why Choose Us (Untouched) */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-24 gap-16 lg:gap-32">
          
          {/* Left: Branding */}
          <div className="max-w-[400px] relative z-10">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[40px] font-medium leading-[49px] text-[#16232A] mb-8"
            >
              Vibgyor <br /> Engineering WLL
            </motion.h2>
            <VibgyorButton href="/about" variant="outline">Learn More</VibgyorButton>
          </div>

          {/* Right: Why Choose Us List */}
          <div className="flex-1 w-full lg:max-w-[650px] relative z-10">
            <h4 className="text-[18px] font-medium text-[#16232A] mb-4">Why choose us</h4>
            <div className="w-full h-px bg-[#63757E]/20 mb-8" />
            
            <div className="space-y-12">
              {reasons.map((reason, index) => (
                <div key={reason.id} className="relative">
                  <div className="flex items-start gap-8">
                    <span className="text-[18px] font-medium text-[#03AEF2] mt-1 shrink-0">{reason.id}</span>
                    <div className="space-y-3">
                      <h3 className="text-[28px] font-medium text-[#16232A] leading-none">{reason.title}</h3>
                      <p className="text-[18px] text-[#63757E] font-normal leading-[26px]">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                  {index < reasons.length - 1 && (
                    <div className="w-full h-px bg-[#63757E]/20 mt-10" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section: Vision Quote */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-[850px] mx-auto pt-20 pb-20 lg:pt-32 lg:pb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[28px] md:text-[36px] font-medium leading-[1.3] text-[#16232A] mb-12"
          >
            This isn’t just about design. <br />
            It’s about purpose. Identity. Progress. <br />
            You’re not simply shaping a space - <span className="text-[#63757E]">you’re <br className="hidden md:block"/>
            shaping how people experience it. We <br className="hidden md:block"/>
            make that vision real.</span>
          </motion.h2>
          
          <VibgyorButton href="/about" variant="outline">About Us</VibgyorButton>
        </div>
      </div>
    </section>
  );
}