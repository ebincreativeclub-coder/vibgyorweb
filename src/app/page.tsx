import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { ServicesPortfolio } from "@/components/ServicesPortfolio";
import { OurProcess } from "@/components/OurProcess";
import { Sectors } from "@/components/Sectors";
import { PortfolioGallery } from "@/components/PortfolioGallery";
import { AboutVision } from "@/components/AboutVision";
import { Testimonials } from "@/components/Testimonials";
import { Companies } from "@/components/Companies";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <Features />
      <ServicesPortfolio />
      <OurProcess />
      <PortfolioGallery />
      <Sectors />
      <AboutVision />
      <Testimonials />
      <Companies />
      <Footer />
    </main>
  );
}
