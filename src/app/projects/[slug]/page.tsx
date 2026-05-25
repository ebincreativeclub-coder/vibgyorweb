"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { client } from "@/sanity/lib/client";
import { projectBySlugQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { RevealText, FadeUp } from "@/components/ui/Reveal";

// Helper function to extract aspect ratio from Sanity image metadata or ref string
function getImageAspectRatio(img: any): number {
  if (!img) return 1.5;
  
  if (img.asset?.metadata?.dimensions?.aspectRatio) {
    return img.asset.metadata.dimensions.aspectRatio;
  }
  
  if (img.asset?.metadata?.dimensions) {
    const { width, height } = img.asset.metadata.dimensions;
    if (width && height) return width / height;
  }

  const ref = img.asset?._ref || img.asset?._id || "";
  if (ref) {
    const parts = ref.split("-");
    if (parts.length >= 3) {
      const dimensions = parts[2];
      const [widthStr, heightStr] = dimensions.split("x");
      const width = parseInt(widthStr, 10);
      const height = parseInt(heightStr, 10);
      if (!isNaN(width) && !isNaN(height) && height > 0) {
        return width / height;
      }
    }
  }

  return 1.5;
}

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    async function fetchProject() {
      try {
        const data = await client.fetch(projectBySlugQuery, { slug });
        if (data) {
          // Combine mainImage and gallery images, filtering out any items without a valid asset
          const images = [data.mainImage, ...(data.images || [])].filter((img: any) => img && img.asset);
          setProject({ ...data, images });
        }
      } catch (error) {
        console.error("Error fetching Sanity project:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#03AEF2] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    notFound();
  }

  const allImages = project.images || [];

  return (
    <>
      <main className="bg-white min-h-screen pt-24 md:pt-32 selection:bg-[#16232A] selection:text-white">
        
        {/* Breadcrumb & Intro */}
        <section className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px] mb-12 md:mb-16">
          <nav className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-[#16232A]/40 mb-6">
            <Link href="/projects" className="hover:text-[#16232A] transition-colors">Projects</Link>
            <span>/</span>
            <span className="text-[#16232A]/70">{project.title}</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-[700px]">
              <span className="inline-block text-[10px] font-black tracking-[0.25em] uppercase text-[#03AEF2] bg-[#03AEF2]/8 px-4 py-2 rounded-full mb-4">
                {project.category}
              </span>
              <RevealText>
                <h1 className="text-[36px] md:text-[56px] font-bold text-[#16232A] leading-[1.1] tracking-tight">
                  {project.title}
                </h1>
              </RevealText>
            </div>
            
            <FadeUp>
              <Link 
                href="/projects"
                className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-[#16232A]/50 hover:text-[#16232A] transition-colors pb-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <span>Back to Projects</span>
              </Link>
            </FadeUp>
          </div>
        </section>

        {/* Masonry-like Puzzle Gallery Grid */}
        <section className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px] mb-16 md:mb-24">
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            {allImages.map((img: any, idx: number) => {
              const isPortrait = getImageAspectRatio(img) < 0.9;
              const spanClass = isPortrait 
                ? "col-span-6 md:col-span-3 aspect-[3/4]" 
                : "col-span-12 md:col-span-6 aspect-[16/10]";

              return (
                <motion.div
                  key={idx}
                  className={`${spanClass} overflow-hidden rounded-[20px] md:rounded-[28px] border border-[#16232A]/5 bg-[#F8FAFB] cursor-zoom-in shadow-sm hover:shadow-md transition-all duration-500 relative group`}
                  onClick={() => {
                    setActiveImageIndex(idx);
                    setLightboxOpen(true);
                  }}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={urlForImage(img).url()}
                      alt={`${project.title} gallery image ${idx + 1}`}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

      </main>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            <button 
              onClick={() => setLightboxOpen(false)}
              className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all z-10"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {allImages.length > 1 && (
              <>
                <button
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    setActiveImageIndex(prev => prev === 0 ? allImages.length - 1 : prev - 1); 
                  }}
                  className="absolute left-6 md:left-12 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all z-10"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                <button
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    setActiveImageIndex(prev => prev === allImages.length - 1 ? 0 : prev + 1); 
                  }}
                  className="absolute right-6 md:right-12 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all z-10"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={activeImageIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-[90vw] h-[80vh] max-w-[1400px]"
                onClick={(e) => e.stopPropagation()}
              >
                {allImages.length > 0 && (
                  <Image
                    src={urlForImage(allImages[activeImageIndex]).url()}
                    alt={project.title}
                    fill
                    className="object-contain"
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
