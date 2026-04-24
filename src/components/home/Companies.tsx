"use client";

import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { FadeUp } from "../ui/Reveal";

const brands = [
  { id: 1, src: "/images/brands/alfardan.png", alt: "Alfardan" },
  { id: 2, src: "/images/brands/asteco.png", alt: "Asteco" },
  { id: 3, src: "/images/brands/banana_island.png", alt: "Banana Island" },
  { id: 4, src: "/images/brands/doha_festival_city.png", alt: "Doha Festival City" },
  { id: 5, src: "/images/brands/hbk.png", alt: "HBK" },
  { id: 6, src: "/images/brands/hyatt.png", alt: "Hyatt" },
  { id: 7, src: "/images/brands/kone.png", alt: "KONE" },
  { id: 8, src: "/images/brands/melia.png", alt: "MELIA" },
  { id: 9, src: "/images/brands/qafac.png", alt: "QAFAC" },
  { id: 10, src: "/images/brands/wyndham.png", alt: "Wyndham" },
];

export function Companies({ 
  showBackground = true, 
  compact = false 
}: { 
  showBackground?: boolean;
  compact?: boolean;
}) {
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
    <section className={`
      ${showBackground ? 'bg-[#F1F2F3]' : 'bg-transparent'} 
      ${compact ? 'pt-6 pb-12 md:pb-16' : 'pt-14 pb-16 md:pb-24'} 
      overflow-hidden font-['Instrument_Sans'] selection:bg-[#03AEF2] selection:text-white
    `}>
      <div className="text-center">
        <FadeUp>
          <h4 className={`text-[18px] md:text-[20px] font-medium text-[#16232A] tracking-tight ${compact ? 'mb-6' : 'mb-8 md:mb-10'}`}>
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
                className="w-[180px] md:w-[260px] h-[75px] md:h-[105px] px-2 py-1 border border-[#63757E]/15 rounded-[60px] flex items-center justify-center bg-white shrink-0 hover:border-[#63757E]/40 hover:shadow-sm transition-all duration-300 group select-none"
              >
                <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
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
