"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { RevealStaggerGroup, RevealItem, FadeUp, RevealImage } from "../ui/Reveal";
import { VibgyorButton } from "../ui/VibgyorButton";

interface Project {
  id: number;
  src: string;
  title: string;
  category: "Interior Fit Out" | "Civil Engineering" | "Carpentry";
}

const projects: Project[] = [
  { id: 9, src: "/images/projects/mask_group_9_1_1x.webp", title: "Modern Office Workspace", category: "Interior Fit Out" },
  { id: 10, src: "/images/projects/mask_group_10_1_1x.webp", title: "Residential Complex A1", category: "Civil Engineering" },
  { id: 11, src: "/images/projects/mask_group_11_1_1x.webp", title: "Custom Timber Kitchen", category: "Carpentry" },
  { id: 12, src: "/images/projects/mask_group_12_1_1x.webp", title: "Luxury Executive Suite", category: "Interior Fit Out" },
  { id: 13, src: "/images/projects/mask_group_13_1_1x.webp", title: "Foundation Works - Lusail", category: "Civil Engineering" },
  { id: 14, src: "/images/projects/mask_group_14_1_1x.webp", title: "Bespoke Office Furniture", category: "Carpentry" },
  { id: 15, src: "/images/projects/mask_group_15_1_1x.webp", title: "Retail Showroom Design", category: "Interior Fit Out" },
  { id: 16, src: "/images/projects/mask_group_16_1_1x.webp", title: "Structural Reinforcement", category: "Civil Engineering" },
  { id: 17, src: "/images/projects/mask_group_17_1_1x.webp", title: "Artisan Wood Paneling", category: "Carpentry" },
  { id: 18, src: "/images/projects/mask_group_18_1_1x.webp", title: "Hospitality Lounge", category: "Interior Fit Out" },
  { id: 19, src: "/images/projects/mask_group_19_1_1x.webp", title: "Urban Infrastructure Project", category: "Civil Engineering" },
  { id: 20, src: "/images/projects/mask_group_20_1_1x.webp", title: "Modern Joinery Solutions", category: "Carpentry" },
];

const categories = ["All", "Interior Fit Out", "Civil Engineering", "Carpentry"] as const;

export function ProjectsGrid() {
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>("All");

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const spans = [
    "lg:col-span-2", "lg:col-span-1",
    "lg:col-span-1", "lg:col-span-1", "lg:col-span-1",
    "lg:col-span-1", "lg:col-span-2",
    "lg:col-span-1", "lg:col-span-1", "lg:col-span-1",
    "lg:col-span-2", "lg:col-span-1",
  ];

  return (
    <section className="bg-white pb-12 md:pb-20">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-[1440px]">
        
        {/* Category Filter Bar */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mb-16 md:mb-20">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative text-[14px] md:text-[16px] font-medium transition-colors duration-300 ${
                activeCategory === cat ? "text-[#16232A]" : "text-[#63757E]/60 hover:text-[#16232A]"
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[#03AEF2]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        <RevealStaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredProjects.map((project, index) => (
              <RevealItem 
                key={project.id}
                className={spans[index % spans.length]}
              >
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              </RevealItem>
            ))}
          </AnimatePresence>
        </RevealStaggerGroup>

        <FadeUp delay={0.2} className="flex justify-center mt-12 md:mt-16">
          <VibgyorButton href="/projects" variant="outline">
            View More
          </VibgyorButton>
        </FadeUp>

      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative overflow-hidden rounded-[16px] md:rounded-[24px] w-full h-full min-h-[250px] md:min-h-[320px] lg:min-h-[350px] cursor-pointer bg-[#F8FAFB]">
      <RevealImage className="absolute inset-0 z-0">
        <Image
          src={project.src}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-1000 ease-[0.16, 1, 0.3, 1] group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 100vw"
        />
      </RevealImage>

      {/* Overlay & Content */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#16232A]/90 via-[#16232A]/30 to-transparent transition-opacity duration-700 ease-out z-[1]" />
      
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 pointer-events-none">
        <div className="transition-all duration-700 ease-[0.16, 1, 0.3, 1]">
          <span className="text-[10px] md:text-[12px] font-bold tracking-[0.2em] text-[#03AEF2] uppercase mb-2 block">
            {project.category}
          </span>
          <h3 className="text-[18px] md:text-[22px] font-medium text-white leading-tight">
            {project.title}
          </h3>
        </div>
      </div>

      <div className="absolute inset-0 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </div>
  );
}
