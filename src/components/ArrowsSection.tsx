"use client";

import { motion } from "framer-motion";

const ARROWS = [
  { title: "Expert Agents", text: "Working with the best in the business to guide you home." },
  { title: "Real Guidance", text: "Transparency at every step of your real estate journey." },
  { title: "A Clear Path", text: "Streamlined processes that make moving simple and stress-free." },
  { title: "Find What’s Next", text: "We help you discover the home that fits your future." },
];

export function ArrowsSection() {
  return (
    <section className="bg-white text-black section-padding">
      <div className="container">
        <h2 className="text-4xl md:text-6xl font-black mb-16 text-center tracking-tighter uppercase">
          This isn’t just about <span className="italic serif">real estate.</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ARROWS.map((arrow, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="group p-10 bg-zinc-50 border border-zinc-200 rounded-3xl hover:bg-black hover:text-white transition-all duration-500 cursor-pointer flex flex-col gap-8 shadow-sm hover:shadow-2xl"
            >
              <div className="w-12 h-12 bg-black text-white group-hover:bg-white group-hover:text-black rounded-full flex items-center justify-center transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 uppercase tracking-tighter transition-all group-hover:translate-x-2">
                  {arrow.title}
                </h3>
                <p className="text-zinc-600 transition-colors group-hover:text-white/70">
                  {arrow.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
