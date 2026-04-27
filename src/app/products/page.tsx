"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RevealText, FadeUp, RevealStaggerGroup, RevealItem } from "@/components/ui/Reveal";
import { client } from "@/sanity/lib/client";
import { allCategoriesQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

export default function ProductsPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await client.fetch(allCategoriesQuery);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-[#03AEF2] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen pt-24 md:pt-32 selection:bg-[#03AEF2] selection:text-white">
      {/* ── HEADER ── */}
      <section className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px] mb-16 md:mb-24">
        <div className="flex flex-col items-center text-center">
          <RevealText delay={0.1}>
            <h1 className="text-[52px] md:text-[75px] font-bold text-[#16232A] leading-[1.1] mb-6 tracking-[-0.02em]">
              Our Products
            </h1>
          </RevealText>
          <FadeUp delay={0.3}>
            <p className="text-[18px] md:text-[22px] font-medium text-[#16232A] max-w-[700px] leading-relaxed text-center opacity-80">
              High-performance interior solutions engineered for modern architectural demands. 
              From bespoke furniture to advanced partitioning and flooring systems.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── CATEGORY GRID ── */}
      <section className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px] pb-24 md:pb-32">
        <RevealStaggerGroup className="flex flex-wrap justify-center gap-8 md:gap-12">
          {categories.map((category, index) => (
            <RevealItem key={category._id} className="group cursor-pointer w-full md:w-[calc(33.333%-32px)] min-w-[300px] max-w-[400px]">
              <Link href={`/products/${category.slug}`}>
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[20px] md:rounded-[40px] mb-8 bg-white shadow-xl transition-all duration-700 group-hover:shadow-2xl isolation-isolate transform-gpu">
                  {/* Category Image */}
                  <div className="absolute inset-0">
                    {category.mainImage && (
                      <Image
                        src={urlForImage(category.mainImage).url()}
                        alt={category.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110 transform-gpu"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none" />
                  </div>

                  {/* View Products Label */}
                  <div className="absolute bottom-10 left-10 overflow-hidden">
                    <motion.div 
                      initial={{ y: "100%" }}
                      whileHover={{ y: 0 }}
                      className="flex items-center gap-3 text-white font-semibold tracking-wider uppercase text-sm"
                    >
                      View Products
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </motion.div>
                  </div>
                </div>

                <div className="px-2">
                  <h2 className="text-[28px] md:text-[34px] font-semibold text-[#16232A] mb-4 leading-tight group-hover:text-[#03AEF2] transition-colors duration-300">
                    {category.title}
                  </h2>
                  <p className="text-[16px] md:text-[18px] text-[#63757E] font-medium leading-relaxed max-w-[320px]">
                    {category.description}
                  </p>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealStaggerGroup>
      </section>

      {/* ── FOOTER CTA ── */}
      <section className="bg-[#16232A] py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px] text-center">
          <FadeUp>
            <h2 className="text-3xl md:text-5xl font-medium text-white mb-8">
              Need a Customized Solution?
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-[600px] mx-auto mb-12 leading-relaxed">
              Our experts can help you select and customize the perfect products for your specific project requirements.
            </p>
            <Link 
              href="/contact"
              className="inline-flex px-10 py-5 bg-[#03AEF2] text-white font-bold rounded-full shadow-lg hover:bg-white hover:text-[#16232A] transition-all duration-500 scale-105 active:scale-95"
            >
              Get in Touch
            </Link>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
