"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

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

  // Reset scroll to top on route change
  useEffect(() => {
    if (lenisInst) {
      lenisInst.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);
  }, [pathname, lenisInst]);

  // Dynamically recalculate scroll limits when page height changes
  // (Fixes the bug where scrolling gets 'stuck' if images load or accordions expand)
  useEffect(() => {
    if (!lenisInst) return;

    const resizeObserver = new ResizeObserver(() => {
      lenisInst.resize();
    });

    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
    };
  }, [lenisInst]);

  return <>{children}</>;
}
