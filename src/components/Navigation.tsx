"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
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
        className={`fixed top-0 left-0 w-full z-[200] transition-all duration-300 ${
          isScrolled ? "py-4" : "py-6 md:py-8"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-[1280px] flex items-center justify-between relative h-full">
          
          {/* Logo - Left */}
          <Link href="/" className="relative z-[210] flex items-center transition-transform hover:scale-105">
            <svg width="100" height="38" viewBox="0 0 113 43" fill="none" className="md:w-[113px] md:h-[43px]">
              <path d="M23.5955 9.78414C20.0973 13.1838 17.3255 17.3068 14.9226 21.5667C13.4844 19.7479 12.1711 17.8158 10.6573 16.0565C10.0356 15.3301 8.25451 13.16 7.53975 12.7878C5.00616 11.472 2.12682 14.2703 2.5394 16.9615C2.69339 17.9528 6.09863 20.7987 6.99352 21.8019C10.114 25.2938 12.4675 29.4556 14.8006 33.5161L15.1609 33.4774C18.569 25.8833 22.4449 18.4827 27.207 11.6834L28.5988 12.6807L28.5523 31.2566L14.6611 39.7348L13.9493 39.7586L0 31.0631L0.0610153 12.892L14.0975 4.18457L14.8848 4.31853L23.5984 9.78711L23.5955 9.78414Z" fill="#03AEF2"/>
              <path d="M23.8839 10.0403C28.0218 6.0683 33.3045 2.65194 38.3519 0C38.5699 0.235205 36.0127 2.06393 35.7541 2.29913C32.6536 5.10984 29.9193 8.50561 27.5016 11.919C22.739 18.6341 18.8626 25.9432 15.4541 33.4433L15.0938 33.4815C12.7604 29.4712 10.4067 25.361 7.28586 21.9123C6.38796 20.9215 2.98235 18.1108 2.83124 17.1318C2.41571 14.4769 5.29828 11.7103 7.83215 13.0098C8.54408 13.3744 10.3253 15.5206 10.9501 16.238C12.4611 17.9756 13.7775 19.8866 15.2158 21.6801C17.6189 17.4758 20.3911 13.4038 23.8897 10.0433L23.8839 10.0403Z" fill="#07344B"/>
              <path d="M64.9032 32.8124C64.0104 32.9585 63.4417 33.7474 62.5403 33.9753C55.4687 35.7576 56.3985 24.5993 56.7312 20.3598C57.1662 14.7938 62.8759 15.0421 67.0358 15.6557C67.542 15.7317 68.0367 15.9567 68.2386 16.4738L68.358 37.7151C68.2187 41.9897 63.1033 43.5061 59.8646 41.9576L59.5519 41.0781L59.8646 40.4587C60.8542 39.1936 64.9061 40.6369 64.9061 37.8028V32.8124H64.9032ZM62.1621 18.1042C60.9935 18.2561 60.3679 18.9281 60.2115 20.1085C60.0409 21.3853 60.0523 29.3764 60.4134 30.2938C61.1158 32.082 64.1924 31.8628 64.8975 30.1477L64.8151 18.3993C63.945 18.2123 63.0635 17.9844 62.1593 18.1012L62.1621 18.1042Z" fill="#07344B"/>
              <path d="M44.828 16.3327C47.4971 14.9773 51.2101 14.4065 52.9229 17.4246C53.9155 19.1723 53.9216 28.909 53.2074 30.8411C51.7942 34.6673 46.093 34.398 42.6674 33.8886C42.1802 33.8154 41.702 33.6427 41.4085 33.2387L41.1543 32.5508L41.1694 8.35542C41.3328 7.36009 42.162 6.88584 43.1455 6.9883C43.8778 6.95024 44.8311 7.74066 44.8311 8.44031V16.3356L44.828 16.3327ZM44.8432 31.2656C46.5257 31.5203 49.5216 31.8657 49.921 29.6233C50.1661 28.2533 50.1601 20.9698 49.9361 19.5646C49.5427 17.0821 45.4454 17.3368 44.7736 19.5031L44.8432 31.2656Z" fill="#07344B"/>
              <path d="M79.9485 30.6181C80.2789 30.2927 80.3172 29.9205 80.3644 29.4867C80.7626 25.7936 79.7272 20.424 80.2907 16.9713C80.5915 15.1365 82.8217 14.7554 83.7037 16.3411V38.7018C82.9426 42.3421 78.0989 43.283 75.0958 42.0139C73.7861 39.2675 77.5561 40.1204 78.9071 39.6368C81.1609 38.8308 80.1697 34.5251 80.27 32.7108C79.2641 32.9453 78.5089 33.7982 77.4882 34.0151C75.32 34.4753 73.0781 33.3996 72.317 31.3069C71.8125 29.9176 71.7329 18.6742 71.9836 16.8511C72.258 14.8492 75.1224 14.9284 75.4469 16.6899C75.9985 19.6649 74.7123 28.4052 75.7625 30.5008C76.5147 31.9986 78.9337 31.6791 79.9514 30.6181H79.9485Z" fill="#07344B"/>
              <path d="M91.4207 15.4722C99.9113 14.435 99.1454 19.9219 98.9334 26.595C98.7638 31.9388 97.8678 34.7085 91.8503 34.095C87.2686 33.6275 87.3449 29.9433 87.2856 26.2181C87.2206 22.2417 86.3613 16.0916 91.4235 15.4722H91.4207ZM92.4099 18.0813C91.4037 18.2536 90.8639 18.9665 90.731 19.9833C90.5756 21.1841 90.601 29.4846 90.9232 30.2968C91.6355 32.1053 95.1205 31.8979 95.4795 29.7388C95.7282 28.2429 95.6914 21.561 95.4992 19.9716C95.4568 19.6239 95.3579 19.2762 95.2166 18.9578C94.7163 18.0374 93.3172 17.9235 92.4099 18.0813Z" fill="#07344B"/>
              <path d="M104.294 14.6807C105.42 14.463 105.799 15.5962 106.446 15.7125C107.198 15.6439 108.165 15.8288 108.883 15.5873C109.308 15.4441 109.692 14.8209 110.131 14.7046C111.585 14.3199 113.766 15.9481 112.731 17.5197C111.696 19.0913 108.358 17.9641 106.899 17.8895C106.594 17.8657 106.48 18.0058 106.335 18.2504C105.707 19.3061 106.491 30.4833 106.121 32.7826C105.984 33.6414 105.24 34.1574 104.448 34.1782C102.25 34.1991 102.689 30.9276 102.663 29.2695C102.615 25.9563 102.35 19.4403 102.774 16.4312C102.88 15.6767 103.59 14.8149 104.291 14.6807H104.294Z" fill="#07344B"/>
              <path d="M35.7674 15.3821C36.3571 15.2882 36.9226 15.3704 37.419 15.6931C37.8522 16.0364 38.0357 16.5645 38.1019 17.0897C38.4178 19.6071 38.49 30.3516 38.0899 32.7223C37.78 34.5649 34.7145 34.7233 34.4468 32.8309C34.1038 30.4279 34.0767 19.0555 34.4498 16.7171C34.5581 16.0364 35.0665 15.4965 35.7704 15.3851L35.7674 15.3821Z" fill="#07344B"/>
              <path d="M35.7097 7.03168C39.0525 6.39137 39.3092 11.3545 36.0794 11.1539C33.6839 11.0034 33.5464 7.44773 35.7097 7.03168Z" fill="#07344B"/>
            </svg>
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
              className="hidden lg:flex px-8 py-2.5 bg-[#03AEF2] text-white font-semibold rounded-full shadow-lg transition-all hover:opacity-90 active:scale-95 text-ui"
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
                className="w-full py-5 bg-[#03AEF2] text-white font-semibold rounded-full shadow-lg text-center text-body-md"
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
