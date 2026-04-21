"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { RevealText, RevealStaggerGroup, RevealItem } from "../ui/Reveal";

const testimonials = [
  {
    id: 1,
    name: "Harish",
    role: "CEO",
    company: "Vital Health Technologies",
    text: "Working with Vibgyor on our new office fit-out was an outstanding experience. The team's professionalism and the quality of their work were exceptional — and their easy-going attitude made the whole process smooth. Our space, just under 1,000 sq. metres, was delivered on time in only 8 weeks. A massive credit to Sabeesh, Unni, and the rest of the Vibgyor team.",
  },
  {
    id: 2,
    name: "General Manager",
    role: "",
    company: "Major Civil Contracting Company, Doha",
    text: "Vibgyor is one of our preferred contractors for fit-out works. Our most recent project — fit-out of Meeting Rooms and a Spa for a 5-star hotel in Doha — was highly complex and detailed. Vibgyor's professional approach and ability to find timely solutions throughout the project is greatly appreciated. The work was completed to a high standard and on time.",
  }
];

export function Testimonials() {
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const options = {
      root: container,
      rootMargin: "0px -20% 0px -20%",
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

    const cards = container.querySelectorAll(".testimonial-card-mobile");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-[#F1F2F3] pt-16 pb-24 md:pt-20 md:pb-32 overflow-hidden selection:bg-[#03AEF2] selection:text-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px]">
        
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <RevealText>
            <h2 className="text-3xl md:text-h2 font-medium">
              <span className="text-[#16232A]">The Voices </span>
              <span className="text-[#63757E]">Behind Our Work.</span>
            </h2>
          </RevealText>
        </div>

        {/* Mobile: Swiper | Desktop: Grid */}
        <div className="relative">
          {/* Desktop/Tablet Grid */}
          <RevealStaggerGroup className="hidden md:grid grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12 max-w-[1100px] mx-auto">
            {testimonials.slice(0, 2).map((t, index) => (
              <TestimonialCard key={t.id} t={t} index={index} />
            ))}
          </RevealStaggerGroup>

          {/* Mobile Horizontal Scroll */}
          <div className="md:hidden">
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-8 no-scrollbar px-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {testimonials.map((t, index) => (
                <div key={t.id} data-index={index} className="testimonial-card-mobile min-w-[85vw] snap-center snap-always">
                  <TestimonialCard t={t} index={index} />
                </div>
              ))}
            </div>
            
            {/* Mobile Dots */}
            <div className="flex justify-center gap-2">
              {testimonials.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${activeMobileIndex === i ? 'w-6 bg-[#03AEF2]' : 'w-1.5 bg-[#63757E]/30'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ t, index }: { t: any; index: number }) {
  return (
    <RevealItem className="bg-white rounded-[40px] p-8 md:p-12 flex flex-col h-full relative group hover:shadow-xl transition-shadow duration-500">
      {/* Top Quote Icon */}
      <div className="mb-6">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#16232A]">
          <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C20.1215 16 21.017 16.8954 21.017 18V21C21.017 22.1046 20.1215 23 19.017 23H16.017C14.9124 23 14.017 22.1046 14.017 21ZM3 21L3 18C3 16.8954 3.89543 16 5 16H8C9.10457 16 10 16.8954 10 18V21C10 22.1046 9.10457 23 8 23H5C3.89543 23 3 22.1046 3 21ZM14.017 13V10C14.017 6.13401 17.151 3 21.017 3V5C18.2556 5 16.017 7.23858 16.017 10H19.017C20.1215 10 21.017 10.8954 21.017 12V13C21.017 14.1046 20.1215 15 19.017 15H16.017C14.9124 15 14.017 14.1046 14.017 13ZM3 13V10C3 6.13401 6.13401 3 10 3V5C7.23858 5 5 7.23858 5 10H8C9.10457 10 10 10.8954 10 12V13C10 14.1046 9.10457 15 8 15H5C3.89543 15 3 14.1046 3 13Z" fill="currentColor"/>
        </svg>
      </div>

      {/* Testimonial Text */}
      <p className="text-body-sm md:text-body text-[#16232A] mb-12 flex-1 font-normal opacity-90">
        {t.text}
      </p>

      {/* Author Footer */}
      <div className="flex items-center justify-between border-t border-[#63757E]/10 pt-8 mt-auto">
        <div className="flex items-center gap-4">
          {/* Avatar Placeholder Circle */}
          <div className="w-12 h-12 rounded-full bg-[#F0F1F3] flex items-center justify-center shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#C7D8E8]">
              <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h4 className="text-body-sm md:text-body font-medium text-[#16232A] leading-tight">
              {t.name} {t.role && <span className="font-normal opacity-60 ml-0.5">{t.role}</span>}
            </h4>
            <p className="text-ui text-[#63757E] leading-tight mt-1">{t.company}</p>
          </div>
        </div>

        {/* Closing Quote Icon (Faded) */}
        <div className="opacity-[0.08] hidden sm:block">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="rotate-180">
            <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C20.1215 16 21.017 16.8954 21.017 18V21C21.017 22.1046 20.1215 23 19.017 23H16.017C14.9124 23 14.017 22.1046 14.017 21ZM3 21L3 18C3 16.8954 3.89543 16 5 16H8C9.10457 16 10 16.8954 10 18V21C10 22.1046 9.10457 23 8 23H5C3.89543 23 3 22.1046 3 21ZM14.017 13V10C14.017 6.13401 17.151 3 21.017 3V5C18.2556 5 16.017 7.23858 16.017 10H19.017C20.1215 10 21.017 10.8954 21.017 12V13C21.017 14.1046 20.1215 15 19.017 15H16.017C14.9124 15 14.017 14.1046 14.017 13ZM3 13V10C3 6.13401 6.13401 3 10 3V5C7.23858 5 5 7.23858 5 10H8C9.10457 10 10 10.8954 10 12V13C10 14.1046 9.10457 15 8 15H5C3.89543 15 3 14.1046 3 13Z" fill="currentColor"/>
          </svg>
        </div>
      </div>
    </RevealItem>
  );
}
