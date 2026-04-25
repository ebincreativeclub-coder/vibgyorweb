"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useAnimationFrame, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { VibgyorButton } from "../ui/VibgyorButton";
import { RevealText, FadeUp } from "../ui/Reveal";

export function PortfolioGallery() {
  const galleryItems = [
    { id: 1, src: "/images/home gallery/image_39_1.webp", title: "Luxury Showcase", subtitle: "Doha - Qatar" },
    { id: 2, src: "/images/home gallery/image_39_2_1.webp", title: "Modern Corporate", subtitle: "West Bay" },
    { id: 3, src: "/images/home gallery/image_39_3_1.webp", title: "Premium Interior", subtitle: "Pearl Qatar" },
    { id: 4, src: "/images/home gallery/image_39_4_1.webp", title: "Urban Workspace", subtitle: "Lusail City" },
    { id: 5, src: "/images/home gallery/image_39_5_1.webp", title: "Minimalist Studio", subtitle: "Msheireb" },
  ];

  const x = useMotionValue(0);
  const setRef = useRef<HTMLDivElement>(null);
  const [setWidth, setSetWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Measure the exact width of a single repeating set
  useEffect(() => {
    const updateWidth = () => {
      if (setRef.current) {
        // Use getBoundingClientRect for exact fractional widths to ensure flawless snapping
        setSetWidth(setRef.current.getBoundingClientRect().width);
      }
    };
    
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Initialize offset to start in the middle to allow dragging in both directions immediately
  useEffect(() => {
    if (setWidth > 0) {
      x.set(-setWidth);
    }
  }, [setWidth, x]);

  // INFINITE DRAP SNAPPING MATH
  useMotionValueEvent(x, "change", (latest) => {
    if (setWidth === 0) return;
    
    // We maintain the scroll position strictly bounded between -setWidth and -2*setWidth
    // This visually locks us into the middle sets, giving us infinite buffers on both sides
    if (latest > -setWidth) {
      // User dragged right past the boundary, snap back one sequence
      x.set(latest - setWidth);
    } else if (latest <= -2 * setWidth) {
      // User dragged left past the boundary, snap forward one sequence
      x.set(latest + setWidth);
    }
  });

  // AUTO-SCROLL LOOP
  useAnimationFrame((t, delta) => {
    if (isPaused || isDragging || setWidth === 0) return;
    
    const speed = -0.6; // pixels per frame
    const currentX = x.get();
    const moveBy = speed * (delta / 16); 
    x.set(currentX + moveBy);
  });

  return (
    <section className="bg-[#16232A] text-white pt-24 pb-32 md:pt-32 md:pb-40 overflow-hidden selection:bg-[#03AEF2] selection:text-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px]">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
          <div className="max-w-[700px]">
             <FadeUp delay={0.1}>
              <span className="text-body-lg font-medium text-white mb-6 block">
                Our Work
              </span>
            </FadeUp>
            <RevealText delay={0.2}>
              <h2 className="text-3xl md:text-h2 font-medium leading-[1.1]">
                Real spaces. <br className="hidden md:block"/>
                <span className="text-[#63757E]">Real transformations.</span>
              </h2>
            </RevealText>
          </div>
          <FadeUp delay={0.3} className="md:max-w-[340px]">
            <p className="text-body md:text-body-lg font-normal text-white/70 leading-relaxed">
              Explore the projects that showcase our expertise in interior design, fit-out, and contracting.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* INFINITE WIDE CAROUSEL */}
      <FadeUp delay={0.4} className="relative w-full outline-none pb-10">
        <motion.div 
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -100000, right: 100000 }} // Allow infinite dragging distance
          dragElastic={0} // No elasticity needed for infinite drag
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          onHoverStart={() => setIsPaused(true)}
          onHoverEnd={() => setIsPaused(false)}
          className="flex w-max cursor-grab active:cursor-grabbing px-4 md:px-8 will-change-transform transform-gpu"
        >
          {/* We render 4 identical sets side-by-side to guarantee buffer in both directions */}
          
          <div ref={setRef} className="flex gap-4 md:gap-8 pr-4 md:pr-8">
            {galleryItems.map((item) => <GalleryCard key={`set1-${item.id}`} item={item} />)}
          </div>
          
          <div className="flex gap-4 md:gap-8 pr-4 md:pr-8">
            {galleryItems.map((item) => <GalleryCard key={`set2-${item.id}`} item={item} />)}
          </div>
          
          <div className="flex gap-4 md:gap-8 pr-4 md:pr-8">
            {galleryItems.map((item) => <GalleryCard key={`set3-${item.id}`} item={item} />)}
          </div>
          
          <div className="flex gap-4 md:gap-8 pr-4 md:pr-8">
             {galleryItems.map((item) => <GalleryCard key={`set4-${item.id}`} item={item} />)}
          </div>

        </motion.div>
      </FadeUp>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px]">
        <FadeUp delay={0.2} className="flex justify-center mt-12 md:mt-16">
          <VibgyorButton href="/projects" variant="light">View All Projects</VibgyorButton>
        </FadeUp>
      </div>
    </section>
  );
}

// --- WIDE CARD COMPONENT ---
function GalleryCard({ item }: { item: any }) {
  return (
    <div className="relative shrink-0 w-[85vw] sm:w-[600px] md:w-[700px] lg:w-[800px] aspect-[4/3] md:aspect-video rounded-[32px] overflow-hidden group/card bg-[#1A1A1A] shadow-2xl pointer-events-none transform-gpu isolate">
      
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Image 
          src={item.src} 
          alt={item.title} 
          fill 
          className="object-cover transition-transform duration-[2s] ease-out group-hover/card:scale-105" 
          sizes="(max-width: 768px) 85vw, 800px"
          draggable={false}
        />
      </div>

      {/* Gradient Overlay for Text */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#16232A]/90 via-[#16232A]/20 to-transparent opacity-80 group-hover/card:opacity-90 transition-opacity duration-500" />

      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 select-none">
        <div className="mb-2 md:mb-3">
          <p className="text-xs md:text-sm font-bold tracking-[0.2em] text-[#03AEF2] uppercase">
            {item.subtitle}
          </p>
        </div>
        
        <h3 className="text-2xl md:text-4xl lg:text-h3 font-medium text-white leading-tight">
          {item.title}
        </h3>
      </div>

    </div>
  );
}