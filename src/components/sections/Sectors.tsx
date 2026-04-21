"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { RevealText, FadeUp, RevealStaggerGroup, RevealItem } from "../ui/Reveal";
import { 
  RiHotelLine, 
  RiBuilding4Line, 
  RiShoppingBag3Line, 
  RiShieldCrossLine, 
  RiGraduationCapLine, 
  RiSettings4Line 
} from "react-icons/ri";

const sectors = [
  {
    title: "Hotels & Hospitality",
    description: "Fit-outs and refurbishments for Qatar's leading hotels and serviced residences. We understand the precision, aesthetics, and tight timelines hospitality projects demand.",
    icon: RiHotelLine
  },
  {
    title: "Corporate Offices",
    description: "Workspaces that reflect your brand and support your people. From reception areas to full-floor fit-outs, delivered professionally and on schedule.",
    icon: RiBuilding4Line
  },
  {
    title: "Retail & Showrooms",
    description: "Design-forward retail interiors and exhibition-quality showroom builds that attract customers and showcase your products at their best.",
    icon: RiShoppingBag3Line
  },
  {
    title: "Healthcare & Clinics",
    description: "Clean, compliant, and carefully finished clinical spaces built to the specific standards that healthcare environments require.",
    icon: RiShieldCrossLine
  },
  {
    title: "Education & Institutions",
    description: "Functional, inspiring spaces for learning and training — classrooms, labs, and institutional fit-outs built across Qatar.",
    icon: RiGraduationCapLine
  },
  {
    title: "Civil & Infrastructure",
    description: "Ground-up civil works, drainage, waterproofing, road kerbs, and ACP claddings for developers and main contractors. ",
    icon: RiSettings4Line
  }
];

export function Sectors() {
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isScrollingProgrammatically = useRef(false);

  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cards = container.querySelectorAll(".sector-card-mobile");
    const targetCard = cards[index] as HTMLElement;
    
    if (targetCard) {
      // Lock out the observer so intermediate cards don't flash active
      isScrollingProgrammatically.current = true;
      setActiveMobileIndex(index);

      // Temporarily disable CSS snap to allow fluid glide
      container.style.scrollSnapType = "none";
      
      const targetScrollPos = targetCard.offsetLeft - (container.offsetWidth - targetCard.offsetWidth) / 2;
      const distance = Math.abs(targetScrollPos - container.scrollLeft);
      // Scale duration based on distance for consistent perceived speed
      const duration = Math.min(0.8, Math.max(0.4, distance / 1000));
      
      import("framer-motion").then(({ animate }) => {
        animate(container.scrollLeft, targetScrollPos, {
          duration,
          ease: [0.25, 0.1, 0.25, 1], // Smooth cubic-bezier matching native swipe deceleration
          onUpdate: (latest) => {
            container.scrollLeft = latest;
          },
          onComplete: () => {
            container.style.scrollSnapType = "x mandatory";
            setTimeout(() => {
              isScrollingProgrammatically.current = false;
            }, 100);
          }
        });
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const options = {
      root: container,
      rootMargin: "0px -20% 0px -20%",
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      // Skip observer updates during programmatic scroll
      if (isScrollingProgrammatically.current) return;
      
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute("data-index") || "0");
          setActiveMobileIndex(index);
        }
      });
    }, options);

    const cards = container.querySelectorAll(".sector-card-mobile");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);
  return (
    <section className="bg-white pt-24 pb-12 md:pt-32 md:pb-16 selection:bg-[#03AEF2] selection:text-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px]">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <FadeUp delay={0.1}>
            <span className="block text-body-md md:text-body-lg font-medium text-[#16232A] mb-8 tracking-tight">
              Who We Work With
            </span>
          </FadeUp>
          
          <RevealText delay={0.2}>
            <h2 className="text-3xl md:text-h2 font-medium text-[#16232A] mb-8 max-w-[1100px]">
              Built for Qatar&apos;s <span className="text-[#63757E]">Most Demanding Sectors.</span>
            </h2>
          </RevealText>
          
          <FadeUp delay={0.3}>
            <p className="text-body-md md:text-body-lg font-medium text-[#16232A] max-w-[674px] opacity-80">
              From five-star hotels to high-performance offices, we understand what each industry needs — and we build to that standard.
            </p>
          </FadeUp>
        </div>

        {/* Mobile: Horizontal Swiper with Butter-Smooth Entrance & Physics */}
        <div className="md:hidden">
          <div 
            ref={scrollContainerRef}
            className="flex items-stretch overflow-x-auto snap-x snap-mandatory gap-5 pb-8 no-scrollbar px-6"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              perspective: '1000px'
            }}
          >
            {sectors.map((sector, index) => {
              const isActive = activeMobileIndex === index;
              
              return (
                <motion.div 
                  key={index}
                  data-index={index}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: isActive ? 1 : 0.92,
                    transition: { 
                      duration: 0.6, 
                      ease: "easeOut" 
                    } 
                  }}
                  animate={{ 
                    scale: isActive ? 1 : 0.92,
                    y: isActive ? 0 : 10,
                    opacity: isActive ? 1 : 0.6,
                    borderColor: isActive ? "rgba(3, 174, 242, 0.5)" : "rgba(99, 117, 126, 0.1)"
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 260, 
                    damping: 25,
                    mass: 0.8
                  }}
                  viewport={{ once: true, margin: "200px" }}
                  className="sector-card-mobile min-w-[280px] w-[80vw] snap-center snap-always p-8 border-[0.5px] bg-[#F9FBFC] rounded-3xl flex flex-col shrink-0 shadow-[0_4px_25px_rgba(0,0,0,0.03)]"
                >
                  <div className={`mb-6 w-fit transition-colors duration-500 ${isActive ? 'text-[#03AEF2]' : 'text-[#63757E]'}`}>
                    <sector.icon size={44} />
                  </div>
                  <h3 className={`text-h4 font-semibold mb-4 tracking-tight transition-colors duration-500 ${isActive ? 'text-[#16232A]' : 'text-[#16232A]/80'}`}>
                    {sector.title}
                  </h3>
                  <p className="text-body font-normal text-[#16232A] opacity-70 mb-4 flex-1 leading-relaxed">
                    {sector.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
          
          {/* Mobile Navigation Dots with Spring Physics */}
          <div className="flex justify-center items-center gap-3 mt-4">
            {sectors.map((_, i) => {
              const isActive = activeMobileIndex === i;
              return (
                <motion.div 
                  key={i} 
                  onClick={() => scrollToIndex(i)}
                  animate={{ 
                    width: isActive ? 32 : 8,
                    backgroundColor: isActive ? "#03AEF2" : "rgba(99, 117, 126, 0.2)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="h-2 rounded-full cursor-pointer touch-manipulation"
                />
              );
            })}
          </div>
        </div>

        {/* Desktop: Grid Design with Magnetic & Glassmorphic Interaction */}
        <RevealStaggerGroup className="hidden md:grid relative border-[0.5px] border-[#16232A]/10 grid-cols-2 lg:grid-cols-3 overflow-hidden rounded-[2.5rem]">
          {sectors.map((sector, index) => (
            <SectorCard key={index} sector={sector} />
          ))}
        </RevealStaggerGroup>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

// --- EXTRACTED MAGNETIC CARD COMPONENT ---
function SectorCard({ sector }: { sector: typeof sectors[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
    setMousePos({ x, y });
  };

  return (
    <RevealItem 
      className="group relative h-full"
    >
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMousePos({ x: 0, y: 0 });
        }}
        className="h-full p-10 lg:p-14 border-[0.5px] border-[#16232A]/10 transition-all duration-700 hover:bg-[#F9FDFF] relative overflow-hidden flex flex-col cursor-crosshair"
      >
        {/* Hover Glow Effect */}
        <motion.div 
          animate={{ 
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1.5 : 1,
            x: mousePos.x * 2,
            y: mousePos.y * 2
          }}
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-[#03AEF2] blur-[120px] rounded-full opacity-0 pointer-events-none transition-opacity duration-700"
        />

        {/* Content Wrapper with Magnetic Physics */}
        <motion.div 
          animate={{ x: mousePos.x, y: mousePos.y }}
          transition={{ type: "spring", stiffness: 150, damping: 25, mass: 0.1 }}
          className="relative z-10 flex flex-col h-full"
        >
          {/* Icon with Circle Base */}
          <div className="mb-10 relative">
            <div className="w-16 h-16 rounded-2xl bg-[#F8FAFB] group-hover:bg-[#03AEF2] flex items-center justify-center text-[#63757E] group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-[0_10px_30px_rgba(3,174,242,0.3)] group-hover:-translate-y-1">
              <sector.icon size={28} />
            </div>
          </div>

          <h3 className="text-h4 font-semibold text-[#16232A] mb-4 leading-tight">
            {sector.title}
          </h3>
          
          <p className="text-body-sm font-normal text-[#16232A]/70 leading-relaxed mb-8">
            {sector.description}
          </p>

        </motion.div>
      </div>
    </RevealItem>
  );
}
