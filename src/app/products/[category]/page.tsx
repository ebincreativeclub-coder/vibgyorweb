"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RevealText, FadeUp, RevealStaggerGroup, RevealItem } from "@/components/ui/Reveal";
import { client } from "@/sanity/lib/client";
import { categoryBySlugQuery, productsByCategoryQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

// Clean custom dropdown component for a premium feel
const CustomDropdown = ({ value, onChange, options, placeholder, className = "", isMulti = false }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedOptions = isMulti 
    ? options.filter((opt: any) => value.includes(opt.value))
    : [options.find((opt: any) => opt.value === value)].filter(Boolean);

  const toggleOption = (optValue: string) => {
    if (!isMulti) {
      onChange(optValue);
      setIsOpen(false);
      return;
    }

    const newValue = value.includes(optValue)
      ? value.filter((v: string) => v !== optValue)
      : [...value, optValue];
    onChange(newValue);
  };

  const label = isMulti 
    ? selectedOptions.length === 0 
      ? placeholder 
      : selectedOptions.length === 1
        ? selectedOptions[0].label
        : `${selectedOptions.length} Selected`
    : selectedOptions[0]?.label || placeholder;

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between gap-4 px-5 py-3 rounded-full text-[13px] font-bold transition-all shadow-sm border border-transparent whitespace-nowrap md:w-[160px]
          ${selectedOptions.length > 0 ? 'bg-white text-[#16232A]' : 'bg-white text-[#16232A]/40 hover:text-[#16232A]'}`}
      >
        <span>{label}</span>
        <svg 
          className={`transition-transform duration-500 ${isOpen ? 'rotate-180' : ''} text-[#16232A]/20`} 
          width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 top-full mt-2 w-full md:w-max md:min-w-full bg-white rounded-2xl shadow-2xl border border-[#16232A]/5 overflow-hidden z-50 py-2"
            >
              {options.map((opt: any) => {
                const isActive = isMulti ? value.includes(opt.value) : value === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => toggleOption(opt.value)}
                    className={`w-full text-left px-5 py-2.5 text-[13px] font-bold transition-colors flex items-center justify-between gap-4
                      ${isActive ? 'bg-[#F8FAFB] text-[#03AEF2]' : 'text-[#16232A]/60 hover:bg-[#F8FAFB] hover:text-[#16232A]'}`}
                  >
                    <span>{opt.label}</span>
                    {isActive && isMulti && (
                      <div className="w-4 h-4 bg-[#03AEF2] rounded-full flex items-center justify-center">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function CategoryPage() {
  const { category: categorySlug } = useParams();
  const [category, setCategory] = useState<any>(null);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter & Sort State
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
  const [uniqueFeatures, setUniqueFeatures] = useState<string[]>([]);
  const [uniqueSubCategories, setUniqueSubCategories] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [catData, prodData] = await Promise.all([
          client.fetch(categoryBySlugQuery, { category: categorySlug }),
          client.fetch(productsByCategoryQuery, { category: categorySlug })
        ]);

        if (!catData) {
          setLoading(false);
          return;
        }

        setCategory(catData);
        
        // Sort data immediately to match the default "name-asc" state
        const initiallySortedProducts = [...prodData].sort((a, b) => 
          a.title.localeCompare(b.title)
        );

        setAllProducts(initiallySortedProducts);
        setFilteredProducts(initiallySortedProducts);

        // Extract unique features for the filter
        const features = new Set<string>();
        const subs = new Set<string>();
        prodData.forEach((p: any) => {
          p.features?.forEach((f: string) => features.add(f));
          if (p.subCategory) subs.add(p.subCategory);
        });
        setUniqueFeatures(Array.from(features).sort());
        setUniqueSubCategories(Array.from(subs).sort());
      } catch (error) {
        console.error("Error fetching Sanity data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [categorySlug]);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...allProducts];

    // Search filter
    if (searchQuery) {
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Feature filter
    if (selectedFeatures.length > 0) {
      result = result.filter(p => 
        selectedFeatures.every(f => p.features?.includes(f))
      );
    }

    // Sub Category filter
    if (selectedSubCategories.length > 0) {
      result = result.filter(p => selectedSubCategories.includes(p.subCategory));
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === "name-asc") return a.title.localeCompare(b.title);
      if (sortBy === "name-desc") return b.title.localeCompare(a.title);
      if (sortBy === "newest") return new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime();
      return 0;
    });

    setFilteredProducts(result);
  }, [searchQuery, sortBy, selectedFeatures, selectedSubCategories, allProducts]);

  if (loading) {
    return <div className="min-h-screen bg-white" />;
  }

  if (!category) {
    notFound();
  }

  return (
    <main className="bg-white min-h-screen pt-24 md:pt-32 selection:bg-[#03AEF2] selection:text-white">
      {/* ── BREADCRUMB ── */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px] mb-8">
        <FadeUp className="flex items-center gap-2 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-[#63757E]">
          <Link href="/products" className="hover:text-[#03AEF2] transition-colors">Products</Link>
          <span className="opacity-40">/</span>
          <span className="text-[#16232A]">{category.title}</span>
        </FadeUp>
      </div>

      {/* ── SHOP HEADER ── */}
      <section className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px] mb-12 md:mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-[600px]">
            <RevealText delay={0.1}>
              <h1 className="text-[42px] md:text-[56px] font-bold text-[#16232A] leading-[1.1] mb-6 tracking-tight">
                {category.title}
              </h1>
            </RevealText>
            <FadeUp delay={0.3}>
              <p className="text-base md:text-lg text-[#63757E] font-medium leading-relaxed">
                {category.description}
              </p>
            </FadeUp>
          </div>
          
          {/* Controls — Unified Filter Bar */}
          <div className="w-full lg:w-auto flex flex-col items-end gap-4">
            <FadeUp delay={0.4} className="w-full">
              <div className="flex flex-col md:flex-row items-center gap-2 bg-[#F8FAFB] p-2 rounded-[24px] md:rounded-[32px] border border-[#16232A]/5">
                
                {/* Search */}
                <div className="relative w-full md:w-[260px]">
                  <input 
                    type="text" 
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white rounded-full text-sm font-medium focus:outline-none transition-all shadow-sm border border-transparent focus:border-[#03AEF2]/30"
                  />
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#16232A]/80" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </div>

                <div className="grid grid-cols-2 md:flex md:items-center gap-2 w-full md:w-auto">
                  {/* Sort */}
                  <CustomDropdown 
                    value={sortBy} 
                    onChange={setSortBy} 
                    options={[
                      { value: "name-asc", label: "A - Z" },
                      { value: "name-desc", label: "Z - A" },
                      { value: "newest", label: "Newest" }
                    ]}
                    className="w-full md:w-auto"
                  />

                  {/* Type Filter */}
                  <CustomDropdown 
                    value={selectedSubCategories} 
                    onChange={setSelectedSubCategories} 
                    isMulti={true}
                    placeholder="All Types"
                    options={uniqueSubCategories.map(sub => ({ value: sub, label: sub }))}
                    className="w-full md:w-auto"
                  />
                </div>

                {/* Features Filter */}
                <CustomDropdown 
                  value={selectedFeatures} 
                  onChange={setSelectedFeatures} 
                  isMulti={true}
                  placeholder="All Features"
                  options={uniqueFeatures.map(f => ({ value: f, label: f }))}
                  className="w-full md:w-auto"
                />
              </div>
            </FadeUp>
            
            {/* Active Filters Display */}
            <div className="h-6 flex items-center pr-6">
              {(searchQuery || selectedFeatures.length > 0 || selectedSubCategories.length > 0) && (
                <FadeUp delay={0.1}>
                  <button 
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedFeatures([]);
                      setSelectedSubCategories([]);
                    }}
                    className="text-[10px] font-bold uppercase tracking-widest text-[#03AEF2] hover:text-[#16232A] transition-colors"
                  >
                    Clear all filters
                  </button>
                </FadeUp>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCT GRID (Shopping Style) ── */}
      <section className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px] pb-32 min-h-[400px]">
        <AnimatePresence mode="wait" initial={false}>
          {filteredProducts.length > 0 ? (
            <motion.div 
              key={`${searchQuery}-${sortBy}-${selectedFeatures.join(',')}-${selectedSubCategories.join(',')}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-wrap justify-center gap-6 md:gap-8 w-full"
            >
              {filteredProducts.map((product) => (
                <div key={product._id} className="group w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] max-w-[400px]">
                  <Link href={`/products/${categorySlug}/${product.slug}`} className="block h-full flex flex-col">
                    {/* Product Image Container */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[24px] md:rounded-[32px] mb-6 bg-white shadow-sm group-hover:shadow-xl transition-all duration-700 isolation-isolate transform-gpu">
                      {product.mainImage && (
                        <Image
                          src={urlForImage(product.mainImage).url()}
                          alt={product.title}
                          fill
                          className="object-cover transition-transform duration-1000 group-hover:scale-110 transform-gpu"
                        />
                      )}
                      
                      {/* Quick Action Overlay */}
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-48px)]">
                        <div className="w-full py-4 bg-white/90 backdrop-blur-md rounded-2xl text-[#16232A] text-sm font-bold uppercase tracking-widest text-center shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                          View Details
                        </div>
                      </div>
                    </div>

                    {/* Product Meta */}
                    <div className="flex flex-col flex-1 px-2">
                      <div className="flex justify-between items-start mb-2">
                        <h2 className="text-[20px] md:text-[22px] font-bold text-[#16232A] leading-tight group-hover:text-[#03AEF2] transition-colors duration-300">
                          {product.title}
                        </h2>
                      </div>
                      {/* Sub Category Label */}
                      {product.subCategory && (
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#03AEF2] mb-2">
                          {product.subCategory}
                        </span>
                      )}
                      <p className="text-[14px] text-[#63757E] font-medium leading-relaxed line-clamp-2 mb-4">
                        {product.description}
                      </p>
                      
                      <div className="mt-auto pt-4 border-t border-[#16232A]/5 flex items-center justify-between">
                        <span className="text-[12px] font-bold text-[#16232A]/40 uppercase tracking-widest">
                          Premium Series
                        </span>
                        <div className="flex items-center gap-1 text-[#03AEF2] font-bold text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                          <span>Explore</span>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 w-full"
            >
              <p className="text-[#63757E] font-medium">No products found matching your criteria.</p>
              <button 
                onClick={() => { setSearchQuery(""); setSelectedFeatures([]); setSelectedSubCategories([]); }}
                className="mt-4 text-[#03AEF2] font-bold hover:underline"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Pagination - only show if more than 12 products */}
        {filteredProducts.length > 12 && (
          <FadeUp delay={0.5} className="mt-20 flex justify-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#16232A] text-white flex items-center justify-center font-bold text-sm">1</div>
              <div className="w-10 h-10 rounded-full bg-white border border-[#16232A]/5 text-[#16232A] flex items-center justify-center font-bold text-sm hover:border-[#03AEF2] transition-colors cursor-pointer">2</div>
              <div className="w-10 h-10 rounded-full bg-white border border-[#16232A]/5 text-[#16232A] flex items-center justify-center font-bold text-sm hover:border-[#03AEF2] transition-colors cursor-pointer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </div>
            </div>
          </FadeUp>
        )}
      </section>
    </main>
  );
}
