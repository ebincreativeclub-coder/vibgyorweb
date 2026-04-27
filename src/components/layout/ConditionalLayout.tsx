"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <SmoothScroll>
      <Navigation />
      {children}
      <Footer />
    </SmoothScroll>
  );
}
