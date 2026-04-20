"use client";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { RevealText, FadeUp } from "@/components/ui/Reveal";

export default function ContactPage() {
  return (
    <main className="bg-white min-h-screen text-[#16232A]">
      <Navigation />
      
      <section className="pt-40 pb-20 container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
                <RevealText>
                    <h1 className="text-display font-bold mb-8">Get in Touch</h1>
                </RevealText>
                <FadeUp delay={0.2}>
                    <p className="text-body-lg text-[#16232A]/70 mb-12">
                        Ready to start your next project? Our team is standing by to help bring your vision to life.
                    </p>
                </FadeUp>
                
                <div className="space-y-8">
                    <div>
                        <h4 className="text-ui font-semibold uppercase tracking-widest text-[#63757E] mb-2">Email</h4>
                        <p className="text-h4 font-medium">info@vibgyorworld.net</p>
                    </div>
                    <div>
                        <h4 className="text-ui font-semibold uppercase tracking-widest text-[#63757E] mb-2">Phone</h4>
                        <p className="text-h4 font-medium">+974 4460 4655</p>
                    </div>
                    <div>
                        <h4 className="text-ui font-semibold uppercase tracking-widest text-[#63757E] mb-2">Office</h4>
                        <p className="text-h4 font-medium">P.O Box: 32272, Doha - Qatar</p>
                    </div>
                </div>
            </div>

            <FadeUp delay={0.4} className="bg-[#16232A] rounded-[40px] p-10 md:p-14 text-white shadow-2xl">
                <h3 className="text-h3 font-medium mb-8">Send us a message</h3>
                <div className="space-y-6">
                    <div className="border-b border-white/20 pb-4">
                        <label className="text-ui-xs uppercase tracking-widest text-white/50 block mb-2">Full Name</label>
                        <input type="text" placeholder="John Doe" className="bg-transparent w-full outline-none text-body-lg" />
                    </div>
                    <div className="border-b border-white/20 pb-4">
                        <label className="text-ui-xs uppercase tracking-widest text-white/50 block mb-2">Email address</label>
                        <input type="email" placeholder="john@example.com" className="bg-transparent w-full outline-none text-body-lg" />
                    </div>
                    <div className="border-b border-white/20 pb-8">
                        <label className="text-ui-xs uppercase tracking-widest text-white/50 block mb-2">Your Message</label>
                        <textarea placeholder="Tell us about your project" className="bg-transparent w-full outline-none text-body-lg h-32 resize-none" />
                    </div>
                    <button className="w-full py-5 bg-[#03AEF2] text-white font-semibold rounded-full hover:bg-[#03AEF2]/90 transition-all">
                        Send Inquiry
                    </button>
                </div>
            </FadeUp>
        </div>
      </section>

      <Footer />
    </main>
  );
}
