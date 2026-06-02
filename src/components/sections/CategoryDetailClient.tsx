"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { urlForImage } from "@/sanity/lib/image";

import type { Image as SanityImage } from "sanity";

interface CategoryDetailProps {
  category: {
    _id: string;
    title: string;
    slug: string;
    description?: string;
    mainImage?: SanityImage;
    gallery?: SanityImage[];
    pdfUrl?: string;
  };
}

export default function CategoryDetailClient({ category }: CategoryDetailProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const allImages: SanityImage[] = [category.mainImage, ...(category.gallery || [])].filter(
    (img): img is SanityImage => !!img
  );

  return (
    <>
      <main className="bg-white min-h-screen pt-24 md:pt-32 pb-24 selection:bg-[#03AEF2] selection:text-white">
        
        {/* ── BREADCRUMB ── */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px] mb-8 md:mb-12">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-[#63757E]"
          >
            <Link href="/products" className="hover:text-[#03AEF2] transition-colors">Products</Link>
            <span className="opacity-40">/</span>
            <span className="text-[#16232A]">{category.title}</span>
          </motion.div>
        </div>

        {/* ── MAIN LAYOUT SECTION ── */}
        <section className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px]">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            
            {/* LEFT COLUMN: Text Info & Primary CTA */}
            <div className="w-full lg:w-[45%] flex flex-col justify-start lg:sticky lg:top-28">

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[38px] md:text-[50px] lg:text-[58px] font-bold text-[#16232A] leading-[1.1] tracking-tight mb-6"
              >
                {category.title}
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="text-[16px] md:text-[18px] text-[#63757E] font-medium leading-[1.8] mb-10 max-w-[500px]"
              >
                {category.description}
              </motion.p>

              {/* Action Box: Catalog PDF Download */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="border-t border-[#16232A]/5 pt-8 flex flex-col gap-6"
              >
                {category.pdfUrl ? (
                  <a
                    href={category.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full md:max-w-[400px] px-8 py-5 rounded-2xl bg-[#16232A] text-white border border-[#16232A] hover:bg-[#03AEF2] hover:border-[#03AEF2] shadow-md hover:shadow-lg transition-all duration-500 group/btn"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/10 group-hover/btn:bg-white/20 flex items-center justify-center transition-colors duration-500">
                        <svg className="text-white" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="12" y1="18" x2="12" y2="12"></line>
                          <polyline points="9 15 12 18 15 15"></polyline>
                        </svg>
                      </div>
                      <span className="text-[14px] font-bold uppercase tracking-wider">
                        View PDF Catalog
                      </span>
                    </div>
                    <svg className="text-white/40 group-hover/btn:text-white transition-all duration-500 group-hover/btn:translate-x-1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                ) : (
                  <div className="w-full md:max-w-[400px] px-6 py-5 rounded-2xl bg-[#F8FAFB] border border-[#16232A]/5 text-center">
                    <span className="text-[13px] font-semibold text-[#63757E]/75 italic">
                      Catalog PDF coming soon
                    </span>
                  </div>
                )}
                
                <div className="flex items-center gap-4 mt-2">
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-[#63757E] hover:text-[#16232A] transition-colors group/back"
                  >
                    <svg className="transition-transform duration-300 group-hover/back:-translate-x-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="19" y1="12" x2="5" y2="12"></line>
                      <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    <span>Back to Collections</span>
                  </Link>
                </div>
              </motion.div>
            </div>
            
            {/* RIGHT COLUMN: Image Gallery Display */}
            <div className="w-full lg:w-[55%] flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Active Image Frame */}
                <div 
                  className="relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-[24px] md:rounded-[32px] bg-[#F8FAFB] cursor-zoom-in border border-[#16232A]/5 shadow-sm group"
                  onClick={() => setLightboxOpen(true)}
                >
                  {allImages.length > 0 && (
                    <Image
                      src={urlForImage(allImages[activeImageIndex]).width(1200).url()}
                      alt={category.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-102"
                      priority
                    />
                  )}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  {/* Zoom Icon Overlay */}
                  <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#16232A] hover:bg-white hover:scale-105 transition-all shadow-sm opacity-0 group-hover:opacity-100 duration-300">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <polyline points="9 21 3 21 3 15"></polyline>
                      <line x1="21" y1="3" x2="14" y2="10"></line>
                      <line x1="3" y1="21" x2="10" y2="14"></line>
                    </svg>
                  </div>
                </div>
              </motion.div>

              {/* Thumbnails list */}
              {allImages.length > 1 && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-wrap gap-4"
                >
                  {allImages.map((img: SanityImage, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden transition-all duration-300 border ${
                        activeImageIndex === idx 
                          ? 'ring-2 ring-[#03AEF2] ring-offset-2 ring-offset-white border-transparent' 
                          : 'opacity-60 hover:opacity-100 border-[#16232A]/10'
                      }`}
                    >
                      <Image
                        src={urlForImage(img).width(160).height(160).url()}
                        alt={`${category.title} thumbnail ${idx + 1}`}
                        fill
                        sizes="100px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

          </div>
        </section>

      </main>

      {/* ── LIGHTBOX (Interactive Image Zoom) ── */}
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
            {/* Close button */}
            <button 
              onClick={() => setLightboxOpen(false)}
              className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all z-10"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Navigation Arrows */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    setActiveImageIndex(prev => prev === 0 ? allImages.length - 1 : prev - 1); 
                  }}
                  className="absolute left-6 md:left-12 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all z-10"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </>
            )}

            {/* Main Lightbox Image */}
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
                <Image
                  src={urlForImage(allImages[activeImageIndex]).width(2000).url()}
                  alt={category.title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </motion.div>
            </AnimatePresence>

            {/* Counter */}
            {allImages.length > 1 && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                <span className="text-[12px] font-semibold tracking-[0.15em] uppercase text-white/50">
                  {activeImageIndex + 1} / {allImages.length}
                </span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
