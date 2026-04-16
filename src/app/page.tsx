import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { ServicesPortfolio } from "@/components/ServicesPortfolio";
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
      <AboutVision />
      <Testimonials />
      <Companies />
      <Footer />
    </main>
  );
}
