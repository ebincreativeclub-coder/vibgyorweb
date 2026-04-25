"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useAnimationFrame, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { RevealText, FadeUp } from "../ui/Reveal";

const TEAM_MEMBERS = [
  { id: 1, name: "Alexander Wright", designation: "Managing Director" },
  { id: 2, name: "Sarah Al-Thani", designation: "Design Lead" },
  { id: 3, name: "Marcus Chen", designation: "Project Manager" },
  { id: 4, name: "Elena Petrova", designation: "Civil Engineer" },
  { id: 5, name: "James Miller", designation: "Head of Carpentry" },
  { id: 6, name: "Lina Hadid", designation: "Interior Architect" },
];

export function TeamSection() {
  const x = useMotionValue(0);
  const setRef = useRef<HTMLDivElement>(null);
  const [setWidth, setSetWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const updateWidth = () => {
      if (setRef.current) {
        setSetWidth(setRef.current.getBoundingClientRect().width);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    if (setWidth > 0) {
      x.set(-setWidth);
    }
  }, [setWidth, x]);

  useMotionValueEvent(x, "change", (latest) => {
    if (setWidth === 0) return;
    if (latest > -setWidth) {
      x.set(latest - setWidth);
    } else if (latest <= -2 * setWidth) {
      x.set(latest + setWidth);
    }
  });

  useAnimationFrame((t, delta) => {
    if (isPaused || isDragging || setWidth === 0) return;
    const speed = -0.6;
    const currentX = x.get();
    const moveBy = speed * (delta / 16);
    x.set(currentX + moveBy);
  });

  return (
    <section className="bg-white py-24 md:py-32 overflow-hidden selection:bg-[#03AEF2] selection:text-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px] mb-24 md:mb-32">
        <RevealText delay={0.1}>
          <h2 className="text-3xl md:text-[40px] font-medium text-[#000000] mb-6 tracking-tight leading-[49px]">
            Meet the Vibgyor Team
          </h2>
        </RevealText>
        <FadeUp delay={0.3}>
          <p className="text-[18px] md:text-[20px] font-medium text-[#16232A] max-w-[594px] leading-[24px]">
            Behind every successful project is a team of skilled professionals <br className="hidden md:block" />
            <span className="text-[#63757E]">dedicated to design, precision, and excellence.</span>
          </p>
        </FadeUp>
      </div>

      {/* Infinite Wave Carousel */}
      <div className="relative w-full cursor-grab active:cursor-grabbing pb-16 md:pb-24">
        <motion.div
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -100000, right: 100000 }}
          dragElastic={0}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          onHoverStart={() => setIsPaused(true)}
          onHoverEnd={() => setIsPaused(false)}
          className="flex flex-nowrap gap-8 md:gap-[150px] items-center will-change-transform transform-gpu"
        >
          {/* We render multiple sets for the infinite loop */}
          {[1, 2, 3].map((setIndex) => (
            <div 
              key={`set-${setIndex}`}
              ref={setIndex === 1 ? setRef : null}
              className="flex flex-nowrap gap-8 md:gap-[150px]"
            >
              {TEAM_MEMBERS.map((member, idx) => (
                <TeamCard 
                  key={`${setIndex}-${member.id}`} 
                  member={member} 
                  index={idx} 
                />
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TeamCard({ member, index }: { member: any; index: number }) {
  // Wave Logic: Offset Y based on index (even/odd)
  const isUp = index % 2 === 0;

  return (
    <div 
      className="flex flex-col items-center text-center shrink-0 will-change-transform transform-gpu"
      style={{
        transform: `translateY(${isUp ? "-50px" : "50px"}) translateZ(0)`
      }}
    >
      <div className="relative w-[220px] h-[220px] md:w-[271px] md:h-[271px] mb-8 group isolate">
        <div className="absolute inset-0 rounded-[135.5px] overflow-hidden bg-gradient-to-b from-[#B3B3B3] to-[#F1F1F1] transition-transform duration-500 group-hover:scale-105 transform-gpu">
          <Image 
            src="/images/about page/Rectangle 621.jpg" 
            alt={member.name}
            fill
            className="object-cover"
            draggable={false}
          />
          {/* Replaced mix-blend-overlay with standard alpha for Safari performance on moving elements */}
          <div className="absolute inset-0 bg-black/15 pointer-events-none" />
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="text-[18px] md:text-[20px] font-medium text-[#000000] leading-[24px]">
          {member.name}
        </h3>
        <p className="text-[12px] md:text-[13px] font-medium text-[#000000] opacity-50 leading-[16px] uppercase tracking-widest">
          {member.designation}
        </p>
      </div>
    </div>
  );
}
