"use client";

import { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

// Support dynamic position lock interval to counter layout shifts during animation frames
const lockToHashTarget = (hashString: string, lenis: Lenis) => {
  const target = document.querySelector(hashString) as HTMLElement | null;
  if (!target) return;

  // Use an optimal offset of -100px so the section wrapper sits exactly 100px below the top of the viewport.
  // Since the inner text heading has pt-[49px], it starts beautifully clear below the fixed white navbar.
  lenis.scrollTo(target, { offset: -100, duration: 1.0 });

  // Continuously monitor the target's actual rendered position on screen every 150ms
  // If elements above expand or animate into view, rect.top shifts. We smoothly realign until stable.
  const interval = setInterval(() => {
    const currentTarget = document.querySelector(hashString) as HTMLElement | null;
    if (currentTarget) {
      const rect = currentTarget.getBoundingClientRect();
      if (Math.abs(rect.top - 100) > 12) {
        lenis.scrollTo(currentTarget, { offset: -100, duration: 0.5 });
      }
    }
  }, 150);

  // Clear tracking interval after all entrance reveal animations completely settle
  setTimeout(() => {
    clearInterval(interval);
    const finalTarget = document.querySelector(hashString) as HTMLElement | null;
    if (finalTarget) {
      lenis.scrollTo(finalTarget, { offset: -100, duration: 0.4 });
    }
  }, 1500);
};

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [lenisInst, setLenisInst] = useState<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      infinite: false,
    });
    
    setLenisInst(lenis);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const lastPathname = useRef(pathname);
  // Reset scroll to top on route change (but NOT on initial refresh)
  useEffect(() => {
    if (lastPathname.current !== pathname) {
      lastPathname.current = pathname;
      
      setTimeout(() => {
        if (window.location.hash && lenisInst) {
          lockToHashTarget(window.location.hash, lenisInst);
        } else if (window.location.hash) {
          const target = document.querySelector(window.location.hash);
          if (target) target.scrollIntoView({ behavior: "smooth" });
        } else {
          if (lenisInst) {
            lenisInst.scrollTo(0, { immediate: true });
          }
          window.scrollTo(0, 0);
        }
      }, 100);
    } else if (window.location.hash && lenisInst) {
      setTimeout(() => {
        lockToHashTarget(window.location.hash, lenisInst);
      }, 50);
    }
  }, [pathname, lenisInst]);

  // Handle initial page load with hash
  useEffect(() => {
    if (lenisInst && window.location.hash) {
      setTimeout(() => {
        lockToHashTarget(window.location.hash, lenisInst);
      }, 200);
    }
  }, [lenisInst]);

  // Dynamically recalculate scroll limits ONLY when absolute scroll height changes
  // Prevents aggressive ResizeObserver thrashing when embedded maps or CSS transforms fire.
  useEffect(() => {
    if (!lenisInst) return;

    let lastHeight = document.body.scrollHeight;
    const resizeObserver = new ResizeObserver(() => {
      const newHeight = document.body.scrollHeight;
      if (newHeight !== lastHeight) {
        lastHeight = newHeight;
        lenisInst.resize();
      }
    });

    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
    };
  }, [lenisInst]);

  return <>{children}</>;
}
