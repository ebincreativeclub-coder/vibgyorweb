"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { RevealText, FadeUp, RevealStaggerGroup, RevealItem, RevealImage } from "@/components/ui/Reveal";
import { PortfolioGallery } from "@/components/sections/PortfolioGallery";
import { Companies } from "@/components/home/Companies";

interface ServiceItem {
  id: string;
  title: string;
  services: string[];
  image: string;
  stats: {
    projectsDone: string;
    projectsInHand: string;
    experts: string;
  };
}

const serviceData: ServiceItem[] = [
  {
    id: "01",
    title: "Interior Fit Out Services",
    image: "/images/service page/Mask group-6.webp",
    services: [
      "Interior turnkey solutions",
      "Showroom interior design & decorations",
      "Exhibition stall & trade show counters",
      "Wooden /Drywall/Gypsum/Glass partitions",
      "Carpentry & furniture solutions",
      "Stainless steel & aluminum works",
      "Demountable partitions",
      "Complete Flooring solution",
    ],
    stats: {
      projectsDone: "300+",
      projectsInHand: "5+",
      experts: "8"
    }
  },
  {
    id: "02",
    title: "Civil Engineering Services",
    image: "/images/service page/Mask group-7.webp",
    services: [
      "Civil construction",
      "Water proofing",
      "Concrete & screed finishing",
      "Road kerb & interlock floorings",
      "Drainage construction",
      "Plastering",
      "Painting",
      "ACP Claddings",
    ],
    stats: {
      projectsDone: "300+",
      projectsInHand: "5+",
      experts: "8"
    }
  },
  {
    id: "02",
    title: "Carpentry Services",
    image: "/images/service page/Mask group-8.webp",
    services: [
      "Custom made kitchens",
      "Vanity Counters",
      "Hotel Bedroom Furniture's",
      "Carpentry & furniture solutions",
      "Exhibition & Trade show stands",
      "Customized Work stations & furniture",
      "Steel stainless steel aluminum works",
      "Demountable partitions",
      "Complete Flooring solution",
      "Wooden/Drywall partitions with doors",
      "Gypsum/Glass partitions with doors",
    ],
    stats: {
      projectsDone: "200+",
      projectsInHand: "5+",
      experts: "8"
    }
  }
];

export default function ServicesPage() {
  return (
    <main className="bg-white min-h-screen pt-24  md:pt-32 selection:bg-[#03AEF2] selection:text-white">

      {/* ── HEADER: "Services" + subtitle ── */}
      <section className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px] mb-8 md:mb-12">
        <div className="flex flex-col items-center text-center">
          <RevealText delay={0.1}>
            <h1 className="text-[52px] md:text-[75px] font-bold text-[#16232A] leading-[1.1] mb-4 tracking-[-0.02em]">
              Services
            </h1>
          </RevealText>
          <FadeUp delay={0.3}>
            <p className="text-[18px] md:text-[20px] font-medium text-[#16232A] max-w-[594px] leading-[24px] text-center opacity-80">
              Interior fit-out, civil engineering, and expert carpentry solutions.{" "}
              Built with precision, quality, and attention to every detail.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px]">

        {/* Top full-width separator: Figma Line 76 */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-[1px] bg-[#63757E] w-full origin-left"
        />

        {/* ── SERVICE SECTIONS ── */}
        {serviceData.map((section, index) => (
          <div key={index} className="relative w-full">

            {/* Row: Left text + Right image/stats */}
            <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-0 pt-[49px]">

              {/* ── LEFT COLUMN ── */}
              <div className="w-full lg:w-[408px] flex flex-col shrink-0">

                {/* Section number: "01" / "02" */}
                <RevealText>
                  <span className="text-[20px] font-medium text-[#16232A] leading-[24px] block mb-[8px]">
                    {section.id}
                  </span>
                </RevealText>

                {/* Section title */}
                <RevealText delay={0.1}>
                  <h2 className="text-[32px] md:text-[40px] font-medium text-[#16232A] leading-[45px] capitalize mb-[37px]">
                    {section.title}
                  </h2>
                </RevealText>

                {/* Service list – 35px line-height, thin separators */}
                <RevealStaggerGroup className="flex flex-col">
                  {section.services.map((text, i) => (
                    <RevealItem key={i}>
                      <div className="group border-b border-[#63757E]/30 cursor-default">
                        <p className="text-[18px] md:text-[20px] leading-[35px] text-[#63757E] font-medium transition-colors duration-300 group-hover:text-[#16232A]">
                          {text}
                        </p>
                      </div>
                    </RevealItem>
                  ))}
                </RevealStaggerGroup>
              </div>

              {/* ── RIGHT COLUMN ── */}
              <div className="w-full lg:w-[633px] flex flex-col shrink-0">

                {/* Showcase image */}
                <RevealImage>
                  <div className="relative w-full aspect-[633/304] overflow-hidden rounded-[24px] md:rounded-[32px] group">
                    <Image
                      src={section.image}
                      alt={section.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  </div>
                </RevealImage>

                {/* Stats row – 26px below image bottom */}
                <div className="grid grid-cols-3 w-full mt-[26px]">
                  <FadeUp delay={0.3} className="flex flex-col items-center">
                    <span className="text-[32px] md:text-[40px] font-normal text-[#16232A] leading-[49px] uppercase">
                      {section.stats.projectsDone}
                    </span>
                    <span className="text-[14px] md:text-[16px] font-semibold text-[#16232A] leading-[20px] mt-[6px]">
                      Projects Done
                    </span>
                  </FadeUp>

                  <FadeUp delay={0.4} className="flex flex-col items-center">
                    <span className="text-[32px] md:text-[40px] font-normal text-[#16232A] leading-[49px] uppercase">
                      {section.stats.projectsInHand}
                    </span>
                    <span className="text-[14px] md:text-[16px] font-semibold text-[#16232A] leading-[20px] mt-[6px]">
                      Projects in Hand
                    </span>
                  </FadeUp>

                  <FadeUp delay={0.5} className="flex flex-col items-center">
                    <span className="text-[32px] md:text-[40px] font-normal text-[#16232A] leading-[49px] uppercase">
                      {section.stats.experts}
                    </span>
                    <span className="text-[14px] md:text-[16px] font-semibold text-[#16232A] leading-[20px] mt-[6px]">
                      Experts
                    </span>
                  </FadeUp>
                </div>
              </div>
            </div>

            {/* Full-width separator between sections */}
            {index < serviceData.length - 1 && (
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="h-[1px] bg-[#63757E] w-full origin-left mt-[49px]"
              />
            )}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px] mt-[49px] mb-20 md:mb-32">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-[1px] bg-[#63757E] w-full origin-left"
        />
      </div>

      <PortfolioGallery />
      <Companies showBackground={false} />
    </main>
  );
}
