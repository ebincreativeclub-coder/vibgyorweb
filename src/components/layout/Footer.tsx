"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { RevealImage, FadeUp } from "../ui/Reveal";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#16232A] pt-20 pb-12 font-['Instrument_Sans'] overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1248px]">
        {/* Contact CTA Banner - Precisely 1200px content width */}
        <RevealImage delay={0.1} className="relative w-full h-[400px] md:h-[480px] rounded-[40px] overflow-hidden mb-24 md:mb-28 shadow-2xl">
          {/* Background Image with Darker Overlay for Visibility */}
          <div className="absolute inset-0">
            <Image
              src="/images/common/cta-banner.jpg"
              alt="Start your project"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>

          {/* CTA Content - Guaranteed Visibility */}
          <div className="relative h-full flex flex-col items-center justify-center text-center px-6 z-20">
            <h3 className="text-white text-[28px] md:text-[40px] font-medium leading-[1.1] mb-10 max-w-[550px] drop-shadow-lg">
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
        </RevealImage>

        {/* Main Footer Content Flex - Spread to edges */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-8 mb-10 md:mb-12">
          
          {/* Column 1: Logo, Description & Socials */}
          <FadeUp delay={0.1} className="flex flex-col space-y-10 max-w-full lg:max-w-[440px]">
            {/* Brand Logo */}
            <div className="relative w-[240px] md:w-[320px] h-[86px] md:h-[116px]">
              <Image 
                src="/images/common/logo-full.svg" 
                alt="Vibgyor logo" 
                fill
                className="object-contain object-left"
                priority 
              />
            </div>

            {/* Brand Description */}
            <p className="text-white text-[14px] leading-[1.6] font-normal opacity-100">
              Our on-site teams get to work with precision and professionalism. We manage every trade, every material, and every milestone - so you can focus on your business while we build your space.
            </p>

            {/* Social Icons */}
            <div className="flex gap-6">
              {[
                { id: 'instagram', icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
                { id: 'linkedin', icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
                { id: 'facebook', icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> }
              ].map((social) => (
                <a 
                  key={social.id} 
                  href={`#${social.id}`} 
                  className="text-[#63757E] hover:text-[#03AEF2] transition-colors"
                  aria-label={social.id}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </FadeUp>

          {/* Column 2: Navigation Links */}
          <FadeUp delay={0.2} className="lg:pt-8 min-w-[140px]">
            <h5 className="lg:hidden text-[#63757E] text-[12px] uppercase tracking-widest font-normal mb-6">Explore</h5>
            <div className="flex flex-col space-y-2">
              {['Services', 'About', 'Contact', 'Downloads'].map((item) => (
                <Link 
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="block text-white text-[18px] md:text-[20px] font-medium leading-[38px] md:leading-[45px] hover:text-[#03AEF2] transition-all duration-300 whitespace-nowrap"
                >
                  {item}
                </Link>
              ))}
            </div>
          </FadeUp>

          {/* Column 3: Contact Details */}
          <FadeUp delay={0.3} className="space-y-10 lg:pt-8 min-w-[180px]">
            {/* Address */}
            <div className="space-y-3">
              <h5 className="text-[#63757E] text-[12px] uppercase tracking-widest font-normal">Address</h5>
              <div className="text-white text-[14px] leading-[1.8] font-semibold">
                <p>P.O Box: 32272</p>
                <p>Doha-Qatar</p>
              </div>
            </div>

            {/* Call Us */}
            <div className="space-y-3">
              <h5 className="text-[#63757E] text-[12px] uppercase tracking-widest font-normal">Call Us</h5>
              <div className="text-white text-[14px] leading-[1.8] font-semibold space-y-1">
                <p>+974 44604655</p>
                <p>+974 70689948</p>
                <p>+974 44513654</p>
              </div>
            </div>

            {/* Email Us */}
            <div className="space-y-3">
              <h5 className="text-[#63757E] text-[12px] uppercase tracking-widest font-normal">Email Us</h5>
              <p className="text-white text-[14px] font-semibold">
                info@vibgyorworld.net
              </p>
            </div>
          </FadeUp>
        </div>

        {/* Footer Copyright Bar - Ultra-tight divider padding */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="border-t border-[#63757E]/20 pt-3 md:pt-4"
        >
          <p className="text-[#FFFFFF]/80 text-[12px] font-light font-['Inter'] tracking-wide">
            Vibgyor Engineering W.L.L &copy; {currentYear}. All Rights Reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
