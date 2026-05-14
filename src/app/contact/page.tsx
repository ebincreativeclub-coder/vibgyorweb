"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RevealText, FadeUp, RevealImage } from "@/components/ui/Reveal";
import Image from "next/image";

export default function ContactPage() {
  const [isMapInteractive, setIsMapInteractive] = useState(false);
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
              {/* Phone */}
              <FadeUp delay={0.4} className="flex gap-4">
                <div className="mt-1 shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#63757E]">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="text-[18px] md:text-[20px] font-medium text-[#16232A] leading-[1.4] flex flex-col items-start">
                  <a href="tel:+97444604655" className="hover:text-[#03AEF2] transition-colors duration-300">
                    +974 44604655
                  </a>
                  <a href="tel:+97470689948" className="hover:text-[#03AEF2] transition-colors duration-300">
                    +974 70689948
                  </a>
                </div>
              </FadeUp>

              {/* Fax Style (Line 669 top) */}
              <FadeUp delay={0.45} className="flex gap-4">
                <div className="mt-1 shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#63757E]">
                    <polyline points="6 9 6 2 18 2 18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="6" y="14" width="12" height="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="text-[18px] md:text-[20px] font-medium text-[#16232A] leading-[1.2]">
                  +974 44513654
                </div>
              </FadeUp>

              {/* Email */}
              <FadeUp delay={0.5} className="flex gap-4">
                <div className="mt-1 shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#63757E]">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="text-[18px] md:text-[20px] font-medium text-[#16232A] leading-[1.2]">
                  <a href="mailto:info@vibgyorworld.net" className="hover:text-[#03AEF2] transition-colors duration-300">
                    info@vibgyorworld.net
                  </a>
                </div>
              </FadeUp>

              {/* WhatsApp Section */}
              <FadeUp delay={0.55}>
                <a
                  href="https://wa.me/97470689948?text=Hi%20Vibgyor%20Engineering%20team,%20I%20am%20interested%20in%20discussing%20a%20project%20with%20you."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex gap-4 items-center group/wa cursor-pointer"
                >
                  <div className="shrink-0 text-[#63757E] transition-colors duration-300 group-hover/wa:text-[#25D366]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.882-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.577-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                  </div>
                  <div>
                    <div className="inline-flex items-center justify-between h-[39px] pl-5 pr-1 bg-[#16232A] text-white rounded-full transition-all duration-300 group-hover/wa:pr-2 shadow-md group-hover/wa:shadow-lg">
                      <span className="text-[12px] font-semibold tracking-[0.05em] uppercase text-white whitespace-nowrap mr-4">
                        Chat on WhatsApp
                      </span>

                      <div className="w-[31px] h-[31px] bg-white rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover/wa:rotate-45">
                        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" className="text-[#16232A]">
                          <path d="M1 11L11 1M11 1H1M11 1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              </FadeUp>

              {/* Address */}
              <FadeUp delay={0.6} className="flex gap-4">
                <div className="mt-1 shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#63757E]">
                    <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="text-[18px] md:text-[20px] font-medium text-[#16232A] leading-[1.2]">
                  Vibgyor Engineering W.L.L<br />
                  P.O Box: 32272<br />
                  Doha-Qatar
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
                        <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
          {/* Smart Interactive Map Wrapper: Isolates expensive pointer hit-testing during page scroll to guarantee pure 60fps scrolling, but enables rich interactive maps mode instantly upon user click */}
          <div 
            className="relative w-full aspect-[1084/450] rounded-[20px] md:rounded-[40px] overflow-hidden shadow-xl border border-[#63757E]/10 transform-gpu group"
            onMouseLeave={() => setIsMapInteractive(false)}
          >
            {/* Active Embedded Map */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115431.11193356066!2d51.45115201889816!3d25.285434400000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c43496924847%3A0x6335f629c402a5c!2sDoha%2C%20Qatar!5e0!3m2!1sen!2sqa!4v1713840000000!5m2!1sen!2sqa"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Our Location in Doha"
              className={`absolute inset-0 transition-all duration-500 ${isMapInteractive ? "pointer-events-auto" : "pointer-events-none"}`}
            ></iframe>

            {/* Floating Glassmorphism Unlock Badge */}
            {!isMapInteractive && (
              <div 
                onClick={() => setIsMapInteractive(true)}
                className="absolute inset-0 z-20 flex items-center justify-center bg-[#16232A]/5 bg-gradient-to-t from-[#16232A]/15 via-transparent to-transparent backdrop-blur-[1px] hover:backdrop-blur-[0px] transition-all duration-500 cursor-pointer"
              >
                {/* Premium Core Brand matching Button Signature */}
                <div className="inline-flex items-center justify-between h-[45px] pl-6 pr-1.5 bg-[#16232A] text-white rounded-full group transition-all duration-300 hover:pr-2.5 shadow-[0_15px_30px_rgba(22,35,42,0.25)] hover:shadow-[0_20px_40px_rgba(22,35,42,0.4)] border border-white/10 transform hover:scale-[1.02]">
                  <div className="flex items-center gap-2.5 mr-5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#03AEF2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 animate-pulse">
                      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon>
                      <line x1="9" y1="3" x2="9" y2="18"></line>
                      <line x1="15" y1="6" x2="15" y2="21"></line>
                    </svg>
                    <span className="text-[12px] font-bold tracking-[0.1em] uppercase text-white whitespace-nowrap">
                      Unlock Interactive Map
                    </span>
                  </div>

                  <div className="w-[33px] h-[33px] bg-white rounded-full flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:rotate-45">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#16232A]">
                      <path d="M1 11L11 1M11 1H1M11 1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {/* Subtle Locked Indicator when active */}
            {isMapInteractive && (
              <div className="absolute top-4 right-4 z-20 pointer-events-none animate-fade-in">
                <span className="px-4 py-1.5 rounded-full bg-[#16232A]/80 backdrop-blur-md text-white text-xs font-medium tracking-wide border border-white/10 shadow-lg">
                  Interactive Mode Active • Scroll Outside to Continue
                </span>
              </div>
            )}
          </div>
        </FadeUp>

      </div>
    </main>
  );
}
