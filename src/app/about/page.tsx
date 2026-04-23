"use client";

import { AboutHero } from "@/components/about/AboutHero";
import { WhoAreWe } from "@/components/about/WhoAreWe";
import { MissionVision } from "@/components/about/MissionVision";
import { TeamSection } from "@/components/about/TeamSection";
import { AboutVision } from "@/components/home/AboutVision";

export default function AboutPage() {
  return (
    <main className="bg-white">
      <AboutHero />
      <WhoAreWe />
      <MissionVision />
      <TeamSection />
      <AboutVision showBanner={false} />
    </main>
  );
}
