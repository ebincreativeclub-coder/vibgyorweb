"use client";

import { motion } from "framer-motion";
import { RevealText, FadeUp, RevealStaggerGroup, RevealItem } from "../ui/Reveal";

export function MissionVision() {
  return (
    <section className="bg-[#16232A] py-24 md:py-32 overflow-hidden selection:bg-[#03AEF2] selection:text-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px]">
        
        <RevealStaggerGroup className="flex flex-col">
          
          {/* OUR MISSION */}
          <RevealItem>
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_2fr] gap-8 md:gap-16 items-start pb-16 md:pb-24 border-b border-white/10">
              <div className="flex items-center">
                <h2 className="text-3xl md:text-h2 font-medium text-white tracking-tight">
                  Our <span className="text-[#63757E]">Mission</span>
                </h2>
              </div>
              <div className="max-w-[700px]">
                <p className="text-body md:text-body-lg text-white/80 leading-relaxed font-normal">
                  We are committed to delivering timely cost effective and technical efficient project solutions to our clients. We strive to stay abreast of the latest developments in the Construction industry in order to create value for our customers through the application of Vibgyor Engineering Techniques and Technology.
                </p>
              </div>
            </div>
          </RevealItem>

          {/* OUR VISION */}
          <RevealItem>
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_2fr] gap-8 md:gap-16 items-start pt-16 md:pt-24">
              <div className="flex items-center">
                <h2 className="text-3xl md:text-h2 font-medium text-white tracking-tight">
                  Our <span className="text-[#63757E]">Vision</span>
                </h2>
              </div>
              <div className="max-w-[700px]">
                <p className="text-body md:text-body-lg text-white/80 leading-relaxed font-normal">
                  Providing effective services and corporate solution for our customers to their utmost satisfaction with the state of Technological awareness Infrastructure and assure them with latest Technological art to art in the industry.
                </p>
              </div>
            </div>
          </RevealItem>

        </RevealStaggerGroup>

      </div>
    </section>
  );
}
