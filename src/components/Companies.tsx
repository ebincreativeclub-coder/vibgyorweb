"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const brands = [
  { id: 1, src: "/images/brands/Alfardan@3x.png", alt: "Alfardan" },
  { id: 2, src: "/images/brands/Asteco@3x.png", alt: "Asteco" },
  { id: 3, src: "/images/brands/Banana Island Resort Doha@3x.png", alt: "Banana Island" },
  { id: 4, src: "/images/brands/Doha Festival City@3x.png", alt: "Doha Festival City" },
  { id: 5, src: "/images/brands/HBK@3x.png", alt: "HBK" },
  { id: 6, src: "/images/brands/Hyatt@3x.png", alt: "Hyatt" },
  { id: 7, src: "/images/brands/KONE@3x.png", alt: "KONE" },
  { id: 8, src: "/images/brands/MELIA@3x.png", alt: "MELIA" },
  { id: 9, src: "/images/brands/QAFAC@3x.png", alt: "QAFAC" },
  { id: 10, src: "/images/brands/Wyndham@3x.png", alt: "Wyndham" },
];

export function Companies() {
  return (
    <section className="bg-[#F1F2F3] pt-0 pb-24 md:pb-32 overflow-hidden font-['Instrument_Sans'] selection:bg-[#03AEF2] selection:text-white">
      <div className="text-center">
        {/* Title: Trusted by the 150+ companies */}
        <motion.h4 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[18px] md:text-[20px] font-medium text-[#16232A] mb-12 tracking-tight"
        >
          Trusted by the 150+ companies
        </motion.h4>

        {/* Infinite Looping Carousel with Logos - Full Viewport Width */}
        <div className="relative w-full overflow-hidden flex items-center">
          <motion.div 
            className="flex gap-4 md:gap-6 items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 30, // Balanced speed
              ease: "linear",
              repeat: Infinity
            }}
          >
            {/* Duplicated set for seamless infinite loop */}
            {[...brands, ...brands].map((brand, idx) => (
              <div
                key={`${brand.id}-${idx}`}
                className="w-[180px] md:w-[260px] h-[75px] md:h-[105px] px-4 py-2 border border-[#63757E]/15 rounded-[60px] flex items-center justify-center bg-white shrink-0 hover:border-[#63757E]/40 hover:shadow-sm transition-all duration-300 group"
              >
                <div className="relative w-[85%] h-[85%] flex items-center justify-center">
                  <Image
                    src={brand.src}
                    alt={brand.alt}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
