"use client";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { RevealText, FadeUp } from "@/components/ui/Reveal";

export default function AboutPage() {
  return (
    <main className="bg-[#16232A] min-h-screen text-white">
      <Navigation />
      
      {/* Skeleton Content */}
      <section className="pt-40 pb-20 container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px]">
        <RevealText>
          <h1 className="text-display font-bold mb-8">About Vibgyor</h1>
        </RevealText>
        <FadeUp delay={0.2}>
          <p className="text-body-lg text-white/70 max-w-[700px] leading-relaxed">
            Established with a vision to redefine the interior fit-out landscape in Qatar, Vibgyor Engineering W.L.L has grown into a trusted partner for luxury commercial and residential transformations.
          </p>
        </FadeUp>
        
        <div className="mt-20 h-[400px] rounded-[40px] bg-white/5 border border-white/10 flex items-center justify-center">
            <p className="text-white/30 italic">Detailed About content and journey timeline coming soon...</p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
