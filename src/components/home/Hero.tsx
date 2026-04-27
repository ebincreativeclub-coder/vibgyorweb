"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { VibgyorButton } from "../ui/VibgyorButton";

const slides = [
  {
    image: "/images/hero new slide/image 66.jpg",
    title: "Interior Fit-out",
    headline: "Spaces That\nInspire.",
    description: "Interiors that reflect your brand and elevate your business."
  },
  {
    image: "/images/hero new slide/image 66-2.jpg",
    title: "Carpentry & Joinery",
    headline: "Crafted with\nPrecision.",
    description: "Bespoke woodwork built to your exact specifications."
  },
  {
    image: "/images/hero new slide/image 66-3.jpg",
    title: "Civil Engineering",
    headline: "Built to\nLast.",
    description: "Reliable civil works delivered on time and to the highest standard."
  }
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const slideDuration = 6000;

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, slideDuration);

    return () => clearInterval(timer);
  }, [currentIndex]);

  // Ultra-Premium Parallax Slide
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      scale: 1.05,
      opacity: 1,
      zIndex: 2,
    }),
    center: {
      x: 0,
      scale: 1,
      opacity: 1,
      zIndex: 2,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "15%" : "-15%", 
      scale: 0.95, // 3D push-back effect
      opacity: 0.4, 
      zIndex: 1,
    }),
  };

  // Aggressive 'Snap-then-Coast' Easing for Text (Apple-style)
  const premiumEase = [0.075, 0.82, 0.165, 1] as const;
  
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 }
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.05, staggerDirection: -1, duration: 0.4 }
    }
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1.4, ease: premiumEase } 
    },
    exit: { 
      opacity: 0, 
      y: -30, 
      transition: { duration: 0.6, ease: [0.7, 0, 0.84, 0] as const } 
    }
  };

  return (
    <section className="relative w-full h-[90vh] md:h-screen bg-white flex flex-col pt-[88px] md:pt-[100px] pb-6 px-4 md:px-6 lg:px-8">
      <div className="relative flex-1 w-full mx-auto rounded-[30px] md:rounded-[40px] overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-[#061014]">
        
        {/* --- 1. SLIDING BACKGROUNDS --- */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 1.4, ease: premiumEase }}
            className="absolute inset-0"
          >
            {/* Continuous 'Breathing' Ken Burns */}
            <motion.div
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 8, ease: "linear" }}
              className="absolute inset-0 will-change-transform transform-gpu"
            >
              <Image
                src={slides[currentIndex].image}
                alt={slides[currentIndex].title}
                fill
                className="object-cover"
                priority
                quality={100}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* --- 2. STATIC OVERLAY GRADIENT --- */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/30 to-transparent pointer-events-none mix-blend-multiply" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            
        {/* --- 3. STATIONARY TEXT CONTAINER --- */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end pb-12 md:pb-24 lg:pb-32 px-8 md:px-16 lg:px-24 pointer-events-none">
          <div className="max-w-[800px] pointer-events-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                variants={textContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col items-start will-change-[transform,opacity] transform-gpu"
              >
                {/* Refined Glassy Pill */}
                <motion.div
                  variants={textItemVariants}
                  className="inline-flex items-center px-5 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl mb-8 shadow-[0_8px_30px_rgb(0,0,0,0.2)]"
                >
                  <span className="text-white text-xs font-bold tracking-[0.3em] uppercase">
                    {slides[currentIndex].title}
                  </span>
                </motion.div>

                {/* Headline */}
                <motion.h1 
                  variants={textItemVariants}
                  className="text-white text-5xl md:text-7xl lg:text-[96px] font-bold leading-[1.02] mb-6 tracking-tight whitespace-pre-line drop-shadow-xl"
                >
                  {slides[currentIndex].headline}
                </motion.h1>
                
                {/* Description */}
                <motion.p 
                  variants={textItemVariants}
                  className="text-white/80 text-lg md:text-2xl font-medium mb-12 tracking-wide max-w-[500px] drop-shadow-md leading-relaxed"
                >
                  {slides[currentIndex].description}
                </motion.p>
                
                {/* Button */}
                <motion.div variants={textItemVariants}>
                  <VibgyorButton href="/services" variant="light" className="scale-105 transform origin-left">
                    Explore Services
                  </VibgyorButton>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* --- 4. INTEGRATED PROGRESS NAVIGATION --- */}
        <div className="hidden md:flex absolute bottom-10 right-8 md:right-16 gap-4 z-40">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (idx === currentIndex) return;
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className="relative flex items-center justify-center h-8 focus:outline-none group/dot"
              aria-label={`Go to slide ${idx + 1}`}
            >
              {/* Background Track */}
              <div 
                className={`h-[2px] rounded-full transition-all duration-700 ease-out ${
                  idx === currentIndex 
                    ? "w-16 bg-white/20" 
                    : "w-6 bg-white/40 group-hover/dot:bg-white/70"
                }`}
              />
              
              {/* Active Fill Animation */}
              {idx === currentIndex && (
                <motion.div 
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,1)]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: slideDuration / 1000, ease: "linear" }}
                  key={`fill-${currentIndex}`} // Force reset on slide change
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
