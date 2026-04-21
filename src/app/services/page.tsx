"use client";

import { RevealText, FadeUp } from "@/components/ui/Reveal";

export default function ServicesPage() {
  return (
    <main className="bg-[#16232A] min-h-screen text-white">
      
      <section className="pt-40 pb-20 container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px]">
        <RevealText>
          <h1 className="text-display font-bold mb-8">Comprehensive Services</h1>
        </RevealText>
        <FadeUp delay={0.2}>
          <p className="text-body-lg text-white/70 max-w-[700px] leading-relaxed">
            From initial concept to final civil hand-over, we provide a full spectrum of engineering and fit-out capabilities tailored to the Qatari market.
          </p>
        </FadeUp>
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-[300px] rounded-[32px] bg-white/5 border border-white/10 p-10">
                <h3 className="text-h3 font-medium mb-4">Interior Fit-out</h3>
                <p className="text-white/50">Details for Interior services coming soon...</p>
            </div>
            <div className="h-[300px] rounded-[32px] bg-white/5 border border-white/10 p-10">
                <h3 className="text-h3 font-medium mb-4">Civil Engineering</h3>
                <p className="text-white/50">Details for Civil services coming soon...</p>
            </div>
        </div>
      </section>

    </main>
  );
}
