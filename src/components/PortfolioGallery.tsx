"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { VibgyorButton } from "./ui/VibgyorButton";
import { RevealText, FadeUp, RevealImage } from "./ui/Reveal";

export function PortfolioGallery() {
  const [galleryIndex, setGalleryIndex] = useState(2);

  const galleryItems = [
    { id: 1, src: "/images/home gallery/image_39_1.webp", title: "Luxury Showcase", subtitle: "Doha - Qatar" },
    { id: 2, src: "/images/home gallery/image_39_2_1.webp", title: "Modern Corporate", subtitle: "West Bay" },
    { id: 3, src: "/images/home gallery/image_39_3_1.webp", title: "Premium Interior", subtitle: "Pearl Qatar" },
    { id: 4, src: "/images/home gallery/image_39_4_1.webp", title: "Urban Workspace", subtitle: "Lusail City" },
    { id: 5, src: "/images/home gallery/image_39_5_1.webp", title: "Minimalist Studio", subtitle: "Msheireb" },
  ];

  const nextSlide = () => setGalleryIndex((prev) => (prev + 1) % galleryItems.length);
  const prevSlide = () => setGalleryIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);

  return (
    <section className="bg-[#16232A] text-white pt-24 pb-40 md:pt-32 md:pb-48 font-['Instrument_Sans'] overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px]">
        <div className="flex flex-col items-center text-center mb-16 md:mb-24 mx-auto w-full">
          <RevealText delay={0.1}>
            <h2 className="text-[36px] md:text-[54px] font-medium leading-[1.1] mb-6">
              Real spaces. <span className="text-[#63757E]">Real transformations.</span>
            </h2>
          </RevealText>
          <FadeUp delay={0.2}>
            <p className="text-sm md:text-lg lg:text-[20px] font-normal text-white/80 leading-relaxed max-w-[582px]">
              Explore the projects that showcase our expertise in interior design, fit-out, and contracting
            </p>
          </FadeUp>
        </div>

        <RevealImage delay={0.1} className="relative w-full h-[450px] md:h-[650px] flex items-center justify-center">
          <motion.div 
          className="absolute inset-0 w-full h-full flex items-center justify-center"
          style={{ touchAction: "pan-y" }}
          onPanEnd={(e, info) => {
            const swipe = Math.abs(info.offset.x) > 30 || Math.abs(info.velocity.x) > 400;
            if (swipe) {
              if (info.offset.x < 0) {
                nextSlide();
              } else {
                prevSlide();
              }
            }
          }}
        >
          <button 
            onClick={prevSlide}
            className="absolute left-0 md:left-4 z-50 p-4 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all group active:scale-90"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="rotate-180"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-0 md:right-4 z-50 p-4 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all group active:scale-90"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>

          <div className="relative w-full max-w-[800px] h-full flex items-center justify-center [perspective:1200px]">
            {galleryItems.map((item, index) => {
              let offset = index - galleryIndex;
              if (offset < -Math.floor(galleryItems.length / 2)) offset += galleryItems.length;
              if (offset > Math.floor(galleryItems.length / 2)) offset -= galleryItems.length;

              const isActive = offset === 0;
              const isVisible = Math.abs(offset) <= 2;

              if (!isVisible) return null;

              return (
                <GalleryCard 
                  key={item.id}
                  item={item}
                  index={index}
                  offset={offset}
                  isActive={isActive}
                  onFocus={() => setGalleryIndex(index)}
                />
              );
            })}
          </div>
          </motion.div>
        </RevealImage>
        
        <FadeUp delay={0.2} className="flex justify-center mt-16 md:mt-24">
          <VibgyorButton href="/projects">View All Projects</VibgyorButton>
        </FadeUp>
      </div>
    </section>
  );
}

function GalleryCard({ item, offset, isActive, onFocus }: any) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 150, damping: 40 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 150, damping: 40 });
  
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), { stiffness: 150, damping: 40 });
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), { stiffness: 150, damping: 40 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!isActive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const glareStyle = useTransform(
    [glareX, glareY],
    ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`
  );

  return (
    <motion.div
      initial={false}
      animate={{
        x: offset * (typeof window !== 'undefined' && window.innerWidth < 768 ? 140 : 320),
        scale: isActive ? 1 : 0.75,
        z: -Math.abs(offset) * 200,
        rotateY: offset * -25,
        opacity: 1 - Math.abs(offset) * 0.3,
        zIndex: 10 - Math.abs(offset),
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 30
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onFocus}
      className="absolute w-[280px] md:w-[420px] lg:w-[480px] h-full cursor-pointer"
      style={{
        perspective: "1200px",
        transformStyle: "preserve-3d"
      }}
    >
      <motion.div 
        className={`relative w-full h-full bg-[#1A1A1A] rounded-[24px] overflow-hidden transition-shadow duration-700 ${isActive ? 'shadow-[0_30px_60px_rgba(0,0,0,0.6)]' : 'shadow-xl'}`}
        style={{
          rotateX: isActive ? rotateX : 0,
          rotateY: isActive ? rotateY : 0,
          transformStyle: "preserve-3d"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <Image src={item.src} alt={item.title} fill className="object-cover" />
        
        <motion.div 
          className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300"
          style={{ 
            background: glareStyle,
            opacity: isActive ? 1 : 0
          }}
        />

        <div className={`absolute inset-0 bg-gradient-to-t from-[#16232A]/90 via-transparent to-transparent transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0'}`} />

        <div className={`absolute inset-0 flex flex-col justify-end p-8 md:p-12 transition-all duration-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <motion.div style={{ translateZ: "60px" }} className="flex flex-col">
            <h3 className="text-[28px] md:text-[42px] lg:text-[48px] font-medium leading-tight mb-2 md:mb-4 uppercase tracking-tighter">
              {item.title}
            </h3>
            <div className="w-12 md:w-16 h-0.5 bg-[#03AEF2] mb-4 md:mb-6" />
            <p className="text-sm md:text-lg lg:text-[18px] font-normal text-white/50 uppercase tracking-[0.2em]">
              {item.subtitle}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
