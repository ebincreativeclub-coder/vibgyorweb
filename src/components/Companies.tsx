"use client";

import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { FadeUp } from "./ui/Reveal";

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
  const [isDragging, setIsDragging] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const baseX = useMotionValue(0);
  const velocity = useMotionValue(0); // Tracks post-drag inertia

  // Speed factor (lower = slower)
  const baseSpeed = 0.5;

  useAnimationFrame((t, delta) => {
    if (!isDragging) {
      let currentVelocity = velocity.get();
      
      // Apply friction to smoothly decay the swipe velocity
      if (Math.abs(currentVelocity) > 0.05) {
        currentVelocity *= 0.95; // Decay factor per frame
        velocity.set(currentVelocity);
      } else {
        currentVelocity = 0;
      }

      // Combine base auto-scroll with any residual swipe momentum
      const moveBy = (baseSpeed * (delta / 16)) - (currentVelocity * (delta / 16));
      baseX.set(baseX.get() - moveBy);
    }
  });

  // Wrap around logic
  useEffect(() => {
    const checkWrap = () => {
      if (marqueeRef.current) {
        // Since we have [...brands, ...brands, ...brands], one set is 1/3
        const setWidth = marqueeRef.current.scrollWidth / 3;
        const currentX = baseX.get();
        if (currentX <= -setWidth) {
          baseX.set(currentX + setWidth);
        } else if (currentX > 0) {
          baseX.set(currentX - setWidth);
        }
      }
    };
    const unsubscribe = baseX.on("change", checkWrap);
    return () => unsubscribe();
  }, [baseX]);

  return (
    <section className="bg-[#F1F2F3] pt-0 pb-24 md:pb-32 overflow-hidden font-['Instrument_Sans'] selection:bg-[#03AEF2] selection:text-white">
      <div className="text-center">
        <FadeUp>
          <h4 className="text-[18px] md:text-[20px] font-medium text-[#16232A] mb-12 tracking-tight">
            Trusted by the 150+ companies
          </h4>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="relative w-full overflow-hidden flex items-center cursor-grab active:cursor-grabbing">
          <motion.div 
            ref={marqueeRef}
            className="flex gap-4 md:gap-6 items-center w-max"
            style={{ x: baseX }}
            drag="x"
            dragConstraints={{ left: -100000, right: 100000 }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(e, info) => {
              setIsDragging(false);
              velocity.set(info.velocity.x / 100);
            }}
          >
            {/* Duplicated set for seamless infinite loop */}
            {[...brands, ...brands, ...brands].map((brand, idx) => (
              <div
                key={`${brand.id}-${idx}`}
                className="w-[180px] md:w-[260px] h-[75px] md:h-[105px] px-4 py-2 border border-[#63757E]/15 rounded-[60px] flex items-center justify-center bg-white shrink-0 hover:border-[#63757E]/40 hover:shadow-sm transition-all duration-300 group select-none"
              >
                <div className="relative w-[85%] h-[85%] flex items-center justify-center pointer-events-none">
                  <Image
                    src={brand.src}
                    alt={brand.alt}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-110"
                    draggable={false}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </FadeUp>
      </div>
    </section>
  );
}
