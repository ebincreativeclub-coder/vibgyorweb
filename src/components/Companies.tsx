"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const brands = [
  { id: 1, src: "/images/brands/01 2.png", width: 183, height: 122 },
  { id: 2, src: "/images/brands/02 2.png", width: 132, height: 88 },
  { id: 3, src: "/images/brands/03 2.png", width: 209, height: 140 },
  { id: 4, src: "/images/brands/04 2.png", width: 177, height: 118 },
  { id: 5, src: "/images/brands/09 1.png", width: 130, height: 86 },
];

export function Companies() {
  return (
    <section className="bg-white pt-10 pb-24 md:pb-32 overflow-hidden font-['Instrument_Sans']">
      <div className="container mx-auto px-6 text-center">
        {/* Title: Trusted by the 150+ companies */}
        <motion.h4 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[20px] font-medium text-[#16232A] mb-12"
        >
          Trusted by the 150+ companies
        </motion.h4>

        {/* Infinite Looping Carousel with Logos */}
        <div className="relative w-full overflow-hidden flex items-center">
          <motion.div 
            className="flex gap-6 lg:gap-8 items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 25,
              ease: "linear",
              repeat: Infinity
            }}
          >
            {/* Duplicated set for seamless infinite loop */}
            {[...brands, ...brands].map((brand, idx) => (
              <div
                key={`${brand.id}-${idx}`}
                className="w-[239px] h-[95px] px-8 py-4 border border-[#63757E]/30 rounded-[50px] flex items-center justify-center bg-white shrink-0 hover:border-[#03AEF2] hover:shadow-sm transition-all duration-300"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={brand.src}
                    alt="Trusted Partner"
                    width={brand.width}
                    height={brand.height}
                    className="object-contain max-h-[60px] w-auto transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </motion.div>

          {/* Fade overlays for the premium carousel look */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
