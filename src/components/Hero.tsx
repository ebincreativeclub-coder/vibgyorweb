"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { VibgyorButton } from "./ui/VibgyorButton";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 35,
    restDelta: 0.0001
  });

  // Smooth Continuous Motion (Eliminated the 'stuck' feeling)
  const interiorScale = useTransform(smoothProgress, [0, 0.6, 1], [1, 1.4, 1.6]);
  const interiorY = useTransform(smoothProgress, [0, 0.45, 0.75, 1], [0, -40, -120, -210]);
  const interiorOpacity = useTransform(smoothProgress, [0.75, 0.95], [1, 0]);

  // Content Fades
  const headlineOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const headlineY = useTransform(smoothProgress, [0, 0.15], [0, -50]);
  


  // Cloud Parallax (Fly-past effect)
  const cloud1X = useTransform(smoothProgress, [0, 1], ["0%", "-150%"]);
  const cloud2X = useTransform(smoothProgress, [0, 1], ["0%", "150%"]);
  const cloud3Y = useTransform(smoothProgress, [0, 1], ["0%", "-100%"]);
  const cloudScale = useTransform(smoothProgress, [0, 1], [1, 1.5]);

  // Background Gradient Shift
  const bgScale = useTransform(smoothProgress, [0, 1], [1, 1.2]);
  // Cinematic 'Mist Wash' & 'Lens Blur' Transition
  const blur = useTransform(smoothProgress, [0.7, 0.95], ["0px", "15px"]);
  const mistY = useTransform(smoothProgress, [0.75, 0.98], ["0%", "-65%"]);
  const mistOpacity = useTransform(smoothProgress, [0.7, 0.8], [1, 1]); // Keep it solid

  return (
    <section ref={containerRef} className="relative w-full h-[350vh] bg-white overflow-visible font-['Instrument_Sans']">
      <div className="sticky top-0 w-full h-screen overflow-hidden flex justify-center">
        
        {/* Background Layer with scaling gradient and blur */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ 
            scale: bgScale,
            filter: useTransform(blur, (b) => `blur(${b})`),
            opacity: useTransform(smoothProgress, [0.9, 1], [1, 0])
          }}
        >
          <div 
            className="absolute inset-0" 
            style={{ 
              background: 'linear-gradient(213.25deg, #E2F2FF 39.76%, #03AEF2 123.2%)' 
            }}
          />
        </motion.div>

        {/* Content Container */}
        <div className="relative w-full max-w-[1280px] h-full mx-auto">
          
          {/* Initial Headline (Wide range of services!) */}
          <motion.div 
            className="absolute z-[60] flex flex-col pt-[168px] items-center text-center w-full pointer-events-none"
            style={{ y: headlineY, opacity: headlineOpacity, filter: useTransform(blur, (b) => `blur(${b})`) }}
          >
            <h1 className="w-full max-w-[833px] text-[clamp(40px,7vw,75px)] font-bold text-[#16232A] leading-[1.2] mb-4">
              Wide range of services!
            </h1>
            <p className="text-[clamp(18px,2vw,24px)] font-normal text-[#16232A] opacity-80">
              Vibgyor Engineering WLL
            </p>
            
            <div className="mt-12 pointer-events-auto">
              <VibgyorButton href="/services" variant="dark">Explore Services</VibgyorButton>
            </div>
          </motion.div>



          {/* Main Interior Showroom Image (The focal point of zoom) */}
          <motion.div 
            className="absolute z-30"
            style={{ 
              left: '50%',
              x: '-50%',
              top: '45%',
              scale: interiorScale,
              y: interiorY,
              originX: 0.5,
              originY: 1,
              opacity: interiorOpacity,
              filter: useTransform(blur, (b) => `blur(${b})`),
              width: '1050px',
              height: '700px'
            }}
          >
            <Image 
              src="/images/Interior Img 1.png" 
              alt="Luxury Interior" 
              width={1050} 
              height={700} 
              className="object-contain drop-shadow-[0_40px_100px_rgba(0,0,0,0.15)]"
              priority
              quality={100}
            />
          </motion.div>

          {/* Dynamic Parallax Clouds */}
          <motion.div className="absolute z-40" style={{ left: '10%', top: '30%', width: '40%', height: '30%', x: cloud1X, scale: cloudScale, filter: useTransform(blur, (b) => `blur(${b})`) }}>
            <Image src="/images/Cloud-2 1.png" alt="Cloud" fill className="object-contain opacity-80" />
          </motion.div>
          <motion.div className="absolute z-40" style={{ right: '5%', top: '50%', width: '45%', height: '40%', x: cloud2X, scale: cloudScale, filter: useTransform(blur, (b) => `blur(${b})`) }}>
            <Image src="/images/Cloud-2 2.png" alt="Cloud" fill className="object-contain opacity-90" />
          </motion.div>
          <motion.div className="absolute z-20" style={{ left: '60%', top: '20%', width: '35%', height: '30%', y: cloud3Y, scale: cloudScale, filter: useTransform(blur, (b) => `blur(${b})`) }}>
            <Image src="/images/Cloud-3 1.png" alt="Cloud" fill className="object-contain opacity-60" />
          </motion.div>

          {/* Group 390 (Bottom Cloud Bank - Mostly submerged in mist for soft transition) */}
          <motion.div className="absolute z-[110]" style={{ left: '547px', bottom: '-180px', width: '802px', height: '471px', transform: 'rotate(-180deg)', y: mistY }}>
            <Image src="/images/Cloud-2 1.png" alt="Cloud" fill className="object-contain opacity-70" />
          </motion.div>
          <motion.div className="absolute z-[110]" style={{ left: '298px', bottom: '-220px', width: '802px', height: '471px', transform: 'rotate(-180deg)', y: mistY }}>
            <Image src="/images/Cloud-2 1.png" alt="Cloud" fill className="object-contain opacity-80" />
          </motion.div>
          <motion.div className="absolute z-[110]" style={{ left: '-249px', bottom: '-160px', width: '802px', height: '471px', transform: 'rotate(-180deg)', y: mistY }}>
            <Image src="/images/Cloud-2 1.png" alt="Cloud" fill className="object-contain opacity-75" />
          </motion.div>

        </div>

        {/* Bottom Mist/Gradient (Rectangle 350) - Moved outside container to cover full 100vw */}
        <motion.div 
          className="absolute inset-x-0 bottom-[-65vh] z-[120] h-[100vh] pointer-events-none" 
          style={{ 
            background: 'linear-gradient(0deg, #FFFFFF 30.38%, rgba(255, 255, 255, 0) 92.42%)',
            y: mistY
          }} 
        />
      </div>
      
      {/* Scroll buffer for section pinning */}
      <div className="h-[250vh]" />
    </section>
  );
}
