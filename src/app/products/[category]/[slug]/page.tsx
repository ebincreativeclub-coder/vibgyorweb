"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { client } from "@/sanity/lib/client";
import { productBySlugQuery, categoryBySlugQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

export default function ProductDetailPage() {
  const { category: categorySlug, slug: productSlug } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [prodData, catData] = await Promise.all([
          client.fetch(productBySlugQuery, { slug: productSlug }),
          client.fetch(categoryBySlugQuery, { category: categorySlug })
        ]);

        if (!prodData) {
          setLoading(false);
          return;
        }

        const images = [prodData.mainImage, ...(prodData.gallery || [])].filter(Boolean);
        setProduct({ ...prodData, images });
        setCategory(catData);
      } catch (error) {
        console.error("Error fetching Sanity data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [productSlug, categorySlug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-[3px] border-[#16232A] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product || !category) {
    notFound();
  }

  const allImages = product.images || [];

  return (
    <>
      <main className="bg-white min-h-screen pt-20 md:pt-24 selection:bg-[#16232A] selection:text-white">
        
        {/* ═══════════════════════════════════════════════
            SECTION 1 — HERO SPLIT
            Full-width immersive product hero
        ═══════════════════════════════════════════════ */}
        <section className="flex flex-col lg:flex-row max-w-[1600px] mx-auto items-start">
          
          {/* LEFT — Image & Thumbnails */}
          <div className="relative w-full lg:w-[55%] p-4 md:p-6 lg:p-8 flex flex-col gap-6">
            
            {/* Breadcrumb — Moved to top for better mobile flow */}
            <nav className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-[#16232A]/40">
              <Link href="/products" className="hover:text-[#16232A] transition-colors">Products</Link>
              <span>/</span>
              <Link href={`/products/${category.slug}`} className="hover:text-[#16232A] transition-colors">{category.title}</Link>
              <span>/</span>
              <span className="text-[#16232A]/70">{product.title}</span>
            </nav>

            <div 
              className="relative w-full aspect-square lg:aspect-auto lg:h-[calc(100vh-220px)] overflow-hidden rounded-[24px] md:rounded-[32px] bg-[#F8FAFB] cursor-zoom-in isolation-isolate transform-gpu shadow-sm border border-[#16232A]/5"
              onClick={() => setLightboxOpen(true)}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={activeImageIndex}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    mass: 0.8
                  }}
                  className="absolute inset-0 touch-pan-y cursor-grab active:cursor-grabbing bg-[#F8FAFB]"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    const swipeThreshold = 50;
                    if (info.offset.x > swipeThreshold) {
                      setActiveImageIndex(prev => prev === 0 ? allImages.length - 1 : prev - 1);
                    } else if (info.offset.x < -swipeThreshold) {
                      setActiveImageIndex(prev => prev === allImages.length - 1 ? 0 : prev + 1);
                    }
                  }}
                >
                  <Image
                    src={urlForImage(allImages[activeImageIndex]).url()}
                    alt={product.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* Image Counter */}
              {allImages.length > 1 && (
                <div className="absolute bottom-6 left-6 flex items-center gap-3 z-10">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#16232A] bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">
                    {activeImageIndex + 1} / {allImages.length}
                  </span>
                </div>
              )}

              {/* Expand Icon */}
              <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#16232A] hover:bg-white hover:scale-105 transition-all shadow-sm z-10 cursor-pointer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <polyline points="9 21 3 21 3 15"></polyline>
                  <line x1="21" y1="3" x2="14" y2="10"></line>
                  <line x1="3" y1="21" x2="10" y2="14"></line>
                </svg>
              </div>
            </div>

            {/* Thumbnail Strip — Mobile Only */}
            {allImages.length > 1 && (
              <div className="flex flex-wrap gap-3 mt-2 lg:hidden">
                {allImages.map((img: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden transition-all duration-300 ${
                      activeImageIndex === idx 
                        ? 'ring-2 ring-[#16232A] ring-offset-2 ring-offset-white' 
                        : 'opacity-40 hover:opacity-80'
                    }`}
                  >
                    <Image
                      src={urlForImage(img).width(200).url()}
                      alt={`${product.title} view ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — Product Info */}
          <div className="w-full lg:w-[45%] flex flex-col justify-start px-6 md:px-10 lg:px-16 py-8 lg:py-12">
            

            {/* Sub Category Badge */}
            {product.subCategory && (
              <span className="inline-block w-fit text-[10px] font-black tracking-[0.25em] uppercase text-[#03AEF2] bg-[#03AEF2]/8 px-4 py-2 rounded-full mb-6">
                {product.subCategory}
              </span>
            )}

            {/* Title */}
            <h1 className="text-[36px] md:text-[48px] lg:text-[56px] font-bold text-[#16232A] leading-[1.05] tracking-tight mb-8">
              {product.title}
            </h1>

            {/* Description */}
            <div className="mb-12 max-w-[480px]">
              <motion.div
                initial={false}
                animate={{ 
                  height: (product.description?.length > 120 && !isExpanded) ? "3.6em" : "auto" 
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden relative"
              >
                <p className="text-[16px] md:text-[18px] text-[#16232A]/55 leading-[1.8] font-normal">
                  {product.description}
                </p>
                {(product.description?.length > 120 && !isExpanded) && (
                  <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                )}
              </motion.div>
              {product.description && product.description.length > 120 && (
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#03AEF2] hover:text-[#16232A] transition-colors group/read"
                >
                  <span>{isExpanded ? 'Show Less' : 'Read More'}</span>
                  <svg 
                    className={`transition-transform duration-500 ${isExpanded ? 'rotate-180' : 'group-hover/read:translate-y-0.5'}`}
                    width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              )}
            </div>

            {/* Key Features — Clean Inline */}
            {product.features && product.features.length > 0 && (
              <div className="mb-12">
                <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#16232A]/30 mb-5">Features</h3>
                <div className="flex flex-wrap gap-3">
                  {product.features.map((feature: string, i: number) => (
                    <span 
                      key={i} 
                      className="text-[13px] font-medium text-[#16232A]/70 bg-[#16232A]/[0.04] px-5 py-2.5 rounded-full border border-[#16232A]/[0.06]"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA — Enquire */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <Link 
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#16232A] text-white text-[13px] font-bold uppercase tracking-[0.15em] rounded-full hover:bg-[#03AEF2] transition-colors duration-500"
              >
                <span>Enquire Now</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
              <Link 
                href={`/products/${category.slug}`}
                className="inline-flex items-center gap-2 px-8 py-4 text-[13px] font-bold uppercase tracking-[0.15em] text-[#16232A]/50 hover:text-[#16232A] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <span>Back</span>
              </Link>
            </div>

            {/* Thumbnail Strip — Desktop Only */}
            {allImages.length > 1 && (
              <div className="hidden lg:flex flex-wrap gap-3 pt-8 border-t border-[#16232A]/[0.06]">
                {allImages.map((img: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-16 xl:w-20 xl:h-20 rounded-2xl overflow-hidden transition-all duration-300 ${
                      activeImageIndex === idx 
                        ? 'ring-2 ring-[#16232A] ring-offset-2 ring-offset-white' 
                        : 'opacity-40 hover:opacity-80'
                    }`}
                  >
                    <Image
                      src={urlForImage(img).width(200).url()}
                      alt={`${product.title} view ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            SECTION 2 — SPECIFICATIONS
            Editorial table layout
        ═══════════════════════════════════════════════ */}
        {product.specifications && product.specifications.length > 0 && (
          <section className="border-t border-[#16232A]/[0.06]">
            <div className="max-w-[1080px] mx-auto px-8 md:px-16 py-24 md:py-32">
              
              <div className="flex flex-col md:flex-row md:items-start gap-12 md:gap-24">
                {/* Left Label */}
                <div className="md:w-[280px] shrink-0">
                  <h2 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#16232A]/30 mb-3">Technical Specifications</h2>
                  <p className="text-[15px] text-[#16232A]/40 leading-relaxed">
                    Detailed measurements and material information for this product.
                  </p>
                </div>

                {/* Right Table */}
                <div className="flex-1">
                  {product.specifications.map((spec: any, i: number) => (
                    <div 
                      key={i} 
                      className={`flex justify-between items-baseline py-5 ${
                        i !== product.specifications.length - 1 ? 'border-b border-[#16232A]/[0.06]' : ''
                      }`}
                    >
                      <span className="text-[14px] text-[#16232A]/45 font-medium">{spec.label}</span>
                      <span className="text-[14px] text-[#16232A] font-semibold text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════
            SECTION 3 — GALLERY MOSAIC
            Pinterest-style asymmetric grid
        ═══════════════════════════════════════════════ */}
        {allImages.length > 1 && (
          <section className="border-t border-[#16232A]/[0.06] bg-white">
            <div className="max-w-[1280px] mx-auto px-8 md:px-16 py-24 md:py-32">
              
              <h2 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#16232A]/30 mb-12">Gallery</h2>

              {/* Mosaic Grid */}
              <div className="columns-1 sm:columns-2 gap-4 md:gap-6">
                {allImages.map((img: any, idx: number) => (
                  <div 
                    key={idx}
                    className="mb-4 md:mb-6 break-inside-avoid group cursor-pointer"
                    onClick={() => { setActiveImageIndex(idx); setLightboxOpen(true); }}
                  >
                    <div className={`relative w-full overflow-hidden rounded-2xl md:rounded-3xl bg-white isolation-isolate transform-gpu ${
                      idx % 3 === 0 ? 'aspect-[3/4]' : idx % 3 === 1 ? 'aspect-square' : 'aspect-[4/3]'
                    }`}>
                      <Image
                        src={urlForImage(img).url()}
                        alt={`${product.title} ${idx + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105 transform-gpu"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════
            SECTION 4 — DOWNLOADS
            Clean file cards
        ═══════════════════════════════════════════════ */}
        {product.downloads && product.downloads.length > 0 && (
          <section className="border-t border-[#16232A]/[0.06]">
            <div className="max-w-[1080px] mx-auto px-8 md:px-16 py-24 md:py-32">
              
              <div className="flex flex-col md:flex-row md:items-start gap-12 md:gap-24">
                {/* Left Label */}
                <div className="md:w-[280px] shrink-0">
                  <h2 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#16232A]/30 mb-3">Resources</h2>
                  <p className="text-[15px] text-[#16232A]/40 leading-relaxed">
                    Download brochures, spec sheets, and technical documentation.
                  </p>
                </div>

                {/* Right Cards */}
                <div className="flex-1 flex flex-col gap-3">
                  {product.downloads.map((download: any, i: number) => (
                    <a
                      key={i}
                      href={download.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/dl flex items-center justify-between px-6 py-5 rounded-2xl bg-[#16232A]/[0.02] border border-[#16232A]/[0.04] hover:bg-[#16232A] hover:border-[#16232A] transition-all duration-500"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#16232A]/[0.06] group-hover/dl:bg-white/15 flex items-center justify-center transition-colors duration-500">
                          <svg className="text-[#16232A] group-hover/dl:text-white transition-colors duration-500" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                          </svg>
                        </div>
                        <span className="text-[14px] font-semibold text-[#16232A] group-hover/dl:text-white transition-colors duration-500">
                          {download.name}
                        </span>
                      </div>
                      <svg className="text-[#16232A]/20 group-hover/dl:text-white/60 transition-all duration-500 group-hover/dl:translate-x-1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}


      </main>

      {/* ═══════════════════════════════════════════════
          LIGHTBOX
          Full-screen image viewer
      ═══════════════════════════════════════════════ */}
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
            {/* Close */}
            <button 
              onClick={() => setLightboxOpen(false)}
              className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all z-10"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Navigation Arrows */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); setActiveImageIndex(prev => prev === 0 ? allImages.length - 1 : prev - 1); }}
                  className="absolute left-6 md:left-12 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all z-10"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setActiveImageIndex(prev => prev === allImages.length - 1 ? 0 : prev + 1); }}
                  className="absolute right-6 md:right-12 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all z-10"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </>
            )}

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImageIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-[90vw] h-[80vh] max-w-[1400px]"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={urlForImage(allImages[activeImageIndex]).url()}
                  alt={product.title}
                  fill
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
