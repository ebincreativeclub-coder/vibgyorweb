import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/sections/Features";
import { ServicesPortfolio } from "@/components/sections/ServicesPortfolio";
import { OurProcess } from "@/components/sections/OurProcess";
import { Sectors } from "@/components/sections/Sectors";
import { PortfolioGallery } from "@/components/sections/PortfolioGallery";
import { AboutVision } from "@/components/home/AboutVision";
import { Testimonials } from "@/components/sections/Testimonials";
import { Companies } from "@/components/home/Companies";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Features />
      <ServicesPortfolio />
      <OurProcess />
      <PortfolioGallery />
      <Sectors />
      <AboutVision />
      <Testimonials />
      <Companies />
    </main>
  );
}
