"use client";

import { motion } from "framer-motion";

export function ForAgents() {
  return (
    <section className="bg-black text-white section-padding overflow-hidden relative">
      <div className="container relative z-10 flex flex-col items-center text-center max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-2 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest mb-10 text-white/60">
            For Real Estate Agents
          </div>
          <h2 className="text-4xl md:text-8xl font-black mb-10 uppercase tracking-tighter leading-none">
            Don’t Rent <br /> Your Career. <span className="em">Own It.</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/60 leading-relaxed mb-16 max-w-2xl mx-auto">
            Become a partner, <span className="em">not just an agent.</span> Join the only brokerage that offers true equity and a path to financial freedom.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <button className="bg-white text-black px-12 py-5 rounded-full font-bold hover:bg-zinc-200 transition-all text-lg">
              Partner with FIND
            </button>
            <button className="border border-white/20 text-white px-12 py-5 rounded-full font-bold hover:bg-white hover:text-black transition-all text-lg">
              See the Benefits
            </button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}
