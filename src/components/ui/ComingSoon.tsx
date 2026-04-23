"use client";

import { motion } from "framer-motion";
import { VibgyorButton } from "./VibgyorButton";
import { RevealText, FadeUp } from "./Reveal";

interface ComingSoonProps {
  pageName: string;
}

export function ComingSoon({ pageName }: ComingSoonProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 selection:bg-[#03AEF2] selection:text-white">
      <div className="max-w-[600px] w-full">
        {/* Simple Progress Line */}
        <FadeUp delay={0.1}>
          <div className="w-24 h-1 bg-[#16232A]/5 mx-auto mb-12 rounded-full overflow-hidden">
            <motion.div 
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1/2 h-full bg-[#03AEF2]"
            />
          </div>
        </FadeUp>

        <RevealText delay={0.2}>
          <h1 className="text-3xl md:text-5xl font-medium text-[#16232A] mb-8 tracking-tight">
            Refining the <span className="text-[#03AEF2]">{pageName}</span> Experience.
          </h1>
        </RevealText>

        <FadeUp delay={0.3}>
          <p className="text-body md:text-body-lg text-[#16232A]/50 mb-12 font-normal">
            We are currently building this section to our standard of excellence. 
            Check back soon for the full reveal.
          </p>
        </FadeUp>

        <FadeUp delay={0.4}>
          <div className="flex items-center justify-center">
            <VibgyorButton href="/" variant="dark">Return Home</VibgyorButton>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
