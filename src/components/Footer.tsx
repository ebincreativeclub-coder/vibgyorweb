"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#16232A] pt-20 pb-12 font-['Instrument_Sans'] overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Contact CTA Banner - Now inside the footer flow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative w-full max-w-[1057px] mx-auto h-[400px] md:h-[450px] rounded-[40px] overflow-hidden mb-24 md:mb-32 shadow-2xl"
        >
          {/* Background Image with Darker Overlay for Visibility */}
          <div className="absolute inset-0">
            <Image
              src="/images/Group 366.jpg"
              alt="Start your project"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>

          {/* CTA Content - Guaranteed Visibility */}
          <div className="relative h-full flex flex-col items-center justify-center text-center px-6 z-20">
            <h3 className="text-white text-[32px] md:text-[45px] font-medium leading-[1.15] mb-10 max-w-[501px] drop-shadow-lg">
              Start Your Project With Us.
            </h3>
            
            <Link 
              href="/contact"
              className="group flex items-center bg-white rounded-full p-1.5 pl-8 hover:pr-1.5 transition-all duration-300 shadow-xl"
            >
              <span className="text-[#16232A] text-[14px] font-semibold mr-5">
                Let's Get Started
              </span>
              <div className="w-[38px] h-[38px] bg-[#16232A] rounded-full flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-300">
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>
          </div>
        </motion.div>

        {/* Branding & Contact Region */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-24">
          
          {/* Logo & Contact Info Section */}
          <div className="lg:col-span-8 space-y-16">
            {/* Brand Logo - Correct version Group 175.svg */}
            <div className="relative w-[210px] md:w-[254px] h-[80px] md:h-[92px]">
              <Image 
                src="/images/Group 175.svg" 
                alt="Vibgyor logo" 
                fill
                className="object-contain"
                priority 
              />
            </div>

            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-16">
              {/* Address */}
              <div className="space-y-3">
                <h5 className="text-[#63757E] text-[12px] uppercase tracking-widest font-normal">Address</h5>
                <p className="text-white text-[14px] leading-relaxed font-semibold">
                  P.O Box: 32272<br />
                  Doha-Qatar
                </p>
              </div>

              {/* Call Us */}
              <div className="space-y-3">
                <h5 className="text-[#63757E] text-[12px] uppercase tracking-widest font-normal">Call Us</h5>
                <div className="text-white text-[14px] leading-relaxed font-semibold">
                  <p>+974 44604655</p>
                  <p>+974 70689948</p>
                  <p className="mt-2 text-[#63757E]/70 font-normal tracking-wide">+974 44513654</p>
                </div>
              </div>

              {/* Email Us */}
              <div className="space-y-3">
                <h5 className="text-[#63757E] text-[12px] uppercase tracking-widest font-normal">Email Us</h5>
                <p className="text-white text-[14px] leading-relaxed font-semibold">
                  info@vibgyorworld.net
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="lg:col-span-2 space-y-1 pt-2">
            {['Services', 'About', 'Contact', 'Downloads'].map((item) => (
              <Link 
                key={item}
                href={`/${item.toLowerCase()}`}
                className="block text-white text-[20px] font-medium leading-[45px] hover:text-[#03AEF2] transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Social Icons - Right Aligned below or next to links */}
          <div className="lg:col-span-2 flex lg:justify-end gap-5 lg:mt-32">
            {[
              { id: 'instagram', icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
              { id: 'linkedin', icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
              { id: 'facebook', icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> }
            ].map((social) => (
              <a 
                key={social.id} 
                href={`#${social.id}`} 
                className="w-10 h-10 border border-[#63757E]/30 rounded-full flex items-center justify-center text-[#63757E] hover:text-[#03AEF2] hover:border-[#03AEF2] transition-all"
                aria-label={social.id}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Footer Copyright Bar */}
        <div className="border-t border-[#63757E]/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#FFFFFF]/90 text-[12px] font-light font-['Inter'] tracking-wide">
            Vibgyor Engineering W.L.L &copy; {currentYear}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
