"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { RevealText, FadeUp, RevealStaggerGroup, RevealItem } from "./ui/Reveal";
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

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const options = {
      root: container,
      rootMargin: "0px -20% 0px -20%", // Focus on the middle 60% of the container
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
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

        {/* Mobile: Horizontal Swiper with Peek and Hidden Scrollbar */}
        <div className="md:hidden">
          <div 
            ref={scrollContainerRef}
            className="flex items-stretch overflow-x-auto snap-x snap-mandatory gap-5 pb-8 no-scrollbar px-6"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {sectors.map((sector, index) => (
              <motion.div 
                key={index}
                data-index={index}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.2, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="sector-card-mobile min-w-[260px] w-[75vw] snap-start snap-always p-8 border-[0.5px] border-[#63757E]/30 bg-[#F9FBFC] rounded-2xl flex flex-col shrink-0"
              >
                <div className="mb-6 w-fit text-[#03AEF2]">
                  <sector.icon size={40} />
                </div>
                <h3 className="text-h4 font-semibold text-[#16232A] mb-4 tracking-tight">
                  {sector.title}
                </h3>
                <p className="text-body font-normal text-[#16232A] opacity-70 mb-4 flex-1">
                  {sector.description}
                </p>
              </motion.div>
            ))}
          </div>
          {/* Mobile Navigation Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {sectors.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-300 ${activeMobileIndex === i ? 'w-6 bg-[#03AEF2]' : 'w-1.5 bg-[#63757E]/30'}`}
              />
            ))}
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
