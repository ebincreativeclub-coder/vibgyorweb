"use client";

import { motion } from "framer-motion";
import { RevealText, FadeUp, RevealImage } from "@/components/ui/Reveal";
import Image from "next/image";

export default function ContactPage() {
  return (
    <main className="bg-white min-h-screen pt-[168px] pb-32 selection:bg-[#03AEF2] selection:text-white font-['Instrument_Sans']">
      
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px]">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
          
          {/* LEFT COLUMN: CONTACT INFO */}
          <div className="flex-1 max-w-[500px]">
            <RevealText>
              <h1 className="text-[52px] md:text-[75px] font-bold text-[#16232A] leading-[1] mb-8 tracking-[-0.02em]">
                Let&apos;s Talk
              </h1>
            </RevealText>
            
            <FadeUp delay={0.2}>
              <p className="text-[18px] md:text-[20px] font-medium text-[#16232A] leading-[1.2] mb-12 opacity-90 max-w-[418px]">
                Ready to start your next project?<br />
                Our team is here to help you build something extraordinary.
              </p>
            </FadeUp>

            {/* Separator Line 76 */}
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-[1px] bg-[#63757E]/30 w-full mb-12 origin-left"
            />

            {/* Contact Details Group 444 */}
            <div className="space-y-10">
              {/* Address */}
              <FadeUp delay={0.4} className="flex gap-4">
                <div className="mt-1 shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#63757E]">
                    <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="text-[18px] md:text-[20px] font-medium text-[#16232A] leading-[1.2]">
                  Vibgyor Engineering W.L.L<br />
                  P.O Box: 32272<br />
                  Doha-Qatar
                </div>
              </FadeUp>

              {/* Phone */}
              <FadeUp delay={0.5} className="flex gap-4">
                <div className="mt-1 shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#63757E]">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="text-[18px] md:text-[20px] font-medium text-[#16232A] leading-[1.4]">
                  +974 44604655<br />
                  +974 70689948
                </div>
              </FadeUp>

              {/* Fax Style (Line 669 top) */}
              <FadeUp delay={0.6} className="flex gap-4">
                <div className="mt-1 shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#63757E]">
                    <polyline points="6 9 6 2 18 2 18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="6" y="14" width="12" height="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="text-[18px] md:text-[20px] font-medium text-[#16232A] leading-[1.2]">
                  +974 44513654
                </div>
              </FadeUp>

              {/* Email */}
              <FadeUp delay={0.7} className="flex gap-4">
                <div className="mt-1 shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#63757E]">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="text-[18px] md:text-[20px] font-medium text-[#16232A] leading-[1.2]">
                  info@vibgyorworld.net
                </div>
              </FadeUp>
            </div>
          </div>

          {/* RIGHT COLUMN: BOOK APPOINTMENT FORM (Rectangle 626) */}
          <FadeUp delay={0.4} className="flex-1 w-full lg:max-w-[583px]">
            <div className="bg-[#16232A] rounded-[40px] md:rounded-[59px] p-10 md:p-14 lg:pt-[67px] lg:pb-12 min-h-[731px] flex flex-col">
              <h2 className="text-[32px] md:text-[40px] font-medium text-white mb-16">
                Book Appointment
              </h2>

              <form className="space-y-10 flex-grow">
                {[
                  "Your Name",
                  "Your Email",
                  "Your Phone",
                  "Prefered Date & Time",
                  "Your Message"
                ].map((label, idx) => (
                  <div key={idx} className="relative border-b border-[#63757E] pb-2 group transition-all duration-300 focus-within:border-[#03AEF2]">
                    <label className="text-[14px] md:text-[16px] font-medium text-[#63757E] uppercase block mb-1">
                      {label}
                    </label>
                    <input 
                      type="text" 
                      className="bg-transparent w-full text-white outline-none font-medium h-8"
                    />
                  </div>
                ))}

                {/* Submit Group 399 Style */}
                <div className="pt-8 flex justify-center lg:justify-start">
                  <button className="group relative flex items-center bg-white rounded-full h-[40px] pr-1 pl-8 hover:bg-[#F1F2F3] transition-all duration-300 shadow-xl">
                    <span className="text-[#16232A] text-[12px] font-medium tracking-[0.1em] mr-4 uppercase">
                      SUBMIT
                    </span>
                    <div className="w-[32px] h-[32px] bg-[#16232A] rounded-full flex items-center justify-center transition-transform duration-500 -rotate-[60deg] group-hover:rotate-0">
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </FadeUp>

        </div>

        {/* MAP SECTION */}
        <FadeUp delay={0.8} className="mt-32">
          <div className="relative w-full aspect-[1084/450] rounded-[20px] md:rounded-[40px] overflow-hidden grayscale contrast-125 hover:grayscale-0 transition-all duration-1000 shadow-xl border border-[#63757E]/10">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115431.11193356066!2d51.45115201889816!3d25.285434400000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c43496924847%3A0x6335f629c402a5c!2sDoha%2C%20Qatar!5e0!3m2!1sen!2sqa!4v1713840000000!5m2!1sen!2sqa" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Our Location in Doha"
              className="absolute inset-0"
            ></iframe>
          </div>
        </FadeUp>

      </div>
    </main>
  );
}
