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
    <section className="bg-white pt-24 pb-12 md:pt-32 md:pb-16 font-['Instrument_Sans'] selection:bg-[#03AEF2] selection:text-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px]">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <FadeUp delay={0.1}>
            <span className="block text-[18px] md:text-[20px] font-medium text-[#16232A] mb-8 tracking-tight">
              Who We Work With
            </span>
          </FadeUp>
          
          <RevealText delay={0.2}>
            <h2 className="text-3xl md:text-[40px] font-medium text-[#16232A] leading-tight mb-8 max-w-[802px]">
              Built for Qatar&apos;s <span className="text-[#63757E]">Most Demanding Sectors.</span>
            </h2>
          </RevealText>
          
          <FadeUp delay={0.3}>
            <p className="text-lg md:text-[20px] font-medium text-[#16232A] leading-relaxed max-w-[674px] opacity-80">
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
                <h3 className="text-[24px] font-semibold text-[#16232A] mb-4 tracking-tight">
                  {sector.title}
                </h3>
                <p className="text-base font-normal text-[#16232A] leading-relaxed opacity-70 mb-4 flex-1">
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

        {/* Desktop: Grid Design */}
        <RevealStaggerGroup className="hidden md:grid relative border-[0.5px] border-[#63757E]/30 grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector, index) => (
            <RevealItem 
              key={index}
              className={`group p-8 md:p-10 lg:p-12 border-[0.5px] border-[#63757E]/30 transition-colors duration-500 hover:bg-[#F9FBFC]`}
            >
              <div className="mb-6 w-fit text-[#63757E] group-hover:text-[#03AEF2] transition-colors duration-500">
                <sector.icon size={32} />
              </div>
              <h3 className="text-[22px] font-semibold text-[#16232A] mb-3 tracking-tight">
                {sector.title}
              </h3>
              <p className="text-base font-normal text-[#16232A] leading-relaxed opacity-70">
                {sector.description}
              </p>
            </RevealItem>
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
