"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  // Auto-hide logic: hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const direction = latest - lastScrollY.current;
    setIsScrolled(latest > 50);

    if (latest > 500 && !isOpen) {
      if (direction > 10 && isVisible) {
        setIsVisible(false);
      } else if (direction < -10 && !isVisible) {
        setIsVisible(true);
      }
    } else {
      setIsVisible(true);
    }
    lastScrollY.current = latest;
  });

  // Lock scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <motion.nav 
        animate={{ 
          y: isVisible ? 0 : -100,
          backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0)",
          backdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
          boxShadow: isScrolled ? "0 4px 30px rgba(0,0,0,0.02)" : "none"
        }}
        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        className={`fixed top-0 left-0 w-full z-[200] transition-all duration-300 transform-gpu ${
          isScrolled ? "py-4" : "py-6 md:py-8"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px] flex items-center justify-between relative h-full">
          
          {/* Logo - Left */}
          <Link href="/" className="relative z-[210] flex items-center transition-opacity hover:opacity-90">
            <Image 
              src="/images/common/logo new.svg" 
              alt="Vibgyor Engineering" 
              width={180} 
              height={68} 
              className="w-[130px] h-auto md:w-[160px] lg:w-[180px]"
              priority
            />
          </Link>
  
          {/* Desktop Navigation - Absolute Middle */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-[40px]">
            {navLinks.map((link) => (
              <NavLink key={link.name} href={link.href}>{link.name}</NavLink>
            ))}
          </div>

          <div className="flex items-center gap-6">
            {/* Call Now Button - Restricted to Right */}
            <Link 
              href="tel:+97444604655" 
              className="hidden lg:flex px-8 py-2.5 bg-[#086581] text-white font-semibold rounded-full shadow-lg transition-all hover:opacity-90 active:scale-95 text-ui"
            >
              Call Now
            </Link>

            {/* Hamburger Menu Toggle (Mobile only) */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative z-[210] w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
              aria-label="Toggle Menu"
            >
              <motion.span 
                animate={isOpen ? { y: 8, rotate: 45 } : { y: 0, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="w-8 h-0.5 bg-[#16232A] rounded-full"
              />
              <motion.span 
                animate={isOpen ? { rotate: -45 } : { rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="w-8 h-0.5 bg-[#16232A] rounded-full"
              />
              <motion.span 
                animate={isOpen ? { y: -8, rotate: 45 } : { y: 0, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="w-8 h-0.5 bg-[#16232A] rounded-full"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-[190] bg-white pt-32 pb-12 flex flex-col items-center justify-between lg:hidden"
          >
            <div className="flex flex-col items-center gap-8 w-full px-6">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="w-full text-center"
                >
                  <Link 
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-3xl font-medium text-[#16232A] hover:text-[#03AEF2] transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="w-full px-6 flex flex-col items-center gap-10"
            >
               <Link 
                href="tel:+97444604655" 
                onClick={() => setIsOpen(false)}
                className="w-full py-5 bg-[#086581] text-white font-semibold rounded-full shadow-lg text-center text-body-md"
              >
                Call Now
              </Link>
              
              <div className="flex gap-6">
                 {/* Mini Socials in Menu */}
                 <div className="w-10 h-10 rounded-full border border-[#16232A]/10 flex items-center justify-center text-[#16232A]/60">
                   <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                 </div>
                 <div className="w-10 h-10 rounded-full border border-[#16232A]/10 flex items-center justify-center text-[#16232A]/60">
                   <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
 
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="text-body font-medium text-[#16232A] hover:text-[#03AEF2] transition-colors relative group whitespace-nowrap"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#03AEF2] transition-all group-hover:w-full" />
    </Link>
  );
}
