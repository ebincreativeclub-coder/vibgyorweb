"use client";

import { motion } from "framer-motion";

const STEPS = [
  { 
    num: "01", 
    title: "Curated Listings", 
    text: "We filter through the noise to bring you only the most relevant properties based on your unique criteria." 
  },
  { 
    num: "02", 
    title: "Virtual Tours", 
    text: "Experience high-fidelity 3D tours and live-streamed viewings from the comfort of your couch." 
  },
  { 
    num: "03", 
    title: "Smart Closings", 
    text: "Paperwork made easy. Our digital-first approach handles the legalities with transparency and speed." 
  },
];

export function Rewired() {
  return (
    <section className="bg-zinc-50 text-black section-padding">
      <div className="container grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left: Content */}
        <div className="lg:col-span-5 sticky top-32">
          <h2 className="text-4xl md:text-6xl font-black mb-8 uppercase tracking-tighter">
            Real Estate, <span className="em">Rewired</span>
          </h2>
          <p className="text-xl md:text-2xl text-zinc-600 leading-relaxed mb-12">
            The way you buy and sell houses hasn’t changed in <span className="italic serif">decades.</span> Until now. We’re rebuilding the foundation.
          </p>
          <div className="flex gap-4">
            <button className="bg-black text-white px-10 py-5 rounded-full font-bold hover:bg-zinc-800 transition-colors">
              How it Works
            </button>
          </div>
        </div>

        {/* Right: Steps */}
        <div className="lg:col-span-7 flex flex-col gap-12">
          {STEPS.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="group flex gap-8 p-10 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="text-5xl font-black text-zinc-100 group-hover:text-black transition-colors duration-500">
                {step.num}
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 uppercase tracking-tighter">
                  {step.title}
                </h3>
                <p className="text-zinc-600 leading-relaxed">
                  {step.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
