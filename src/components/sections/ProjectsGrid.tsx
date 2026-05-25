"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { RevealStaggerGroup, staggerItemVariants, FadeUp, RevealImage } from "../ui/Reveal";
import { VibgyorButton } from "../ui/VibgyorButton";
import { client } from "@/sanity/lib/client";
import { projectsQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

const categories = ["All", "Interior Fit Out", "Civil Engineering", "Joinery", "Food and Hospitality"] as const;

export function ProjectsGrid() {
  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await client.fetch(projectsQuery);
        setProjectsList(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const filteredProjects = activeCategory === "All" 
    ? projectsList 
    : projectsList.filter(p => p.category === activeCategory);

  const spans = [
    "lg:col-span-2", "lg:col-span-1",
    "lg:col-span-1", "lg:col-span-1", "lg:col-span-1",
    "lg:col-span-1", "lg:col-span-2",
    "lg:col-span-1", "lg:col-span-1", "lg:col-span-1",
    "lg:col-span-2", "lg:col-span-1",
  ];

  if (loading) {
    return (
      <section className="bg-white pb-12 md:pb-20 min-h-[400px] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#03AEF2] border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

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
              <motion.div
                key={project._id}
                layout
                className={spans[index % spans.length]}
                variants={staggerItemVariants}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.95, y: 30, transition: { duration: 0.3 } }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href={`/projects/${project.slug}`}>
                  <ProjectCard project={project} />
                </Link>
              </motion.div>
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

function ProjectCard({ project }: { project: any }) {
  return (
    <div className="group relative overflow-hidden rounded-[16px] md:rounded-[24px] w-full h-full min-h-[250px] md:min-h-[320px] lg:min-h-[350px] cursor-pointer bg-[#F8FAFB]">
      <RevealImage className="absolute inset-0 z-0">
        {project.mainImage && (
          <Image
            src={urlForImage(project.mainImage).url()}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-1000 ease-[0.16, 1, 0.3, 1] group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 100vw"
          />
        )}
      </RevealImage>

      {/* Overlay & Content */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#16232A]/70 via-transparent to-transparent transition-opacity duration-700 ease-out z-[1]" />
      
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 pointer-events-none z-[2]">
        <div className="transition-all duration-700 ease-[0.16, 1, 0.3, 1] group-hover:translate-y-[-4px]">
          <span className="inline-flex items-center px-3 py-1 rounded-full border border-[#03AEF2]/30 bg-[#16232A]/80 backdrop-blur-md text-[10px] font-bold tracking-[0.15em] text-[#03AEF2] uppercase mb-3 drop-shadow-sm w-fit">
            {project.category}
          </span>
          <h3 className="text-[18px] md:text-[22px] font-medium text-white leading-tight drop-shadow-md">
            {project.title}
          </h3>
        </div>
      </div>

      <div className="absolute inset-0 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </div>
  );
}
