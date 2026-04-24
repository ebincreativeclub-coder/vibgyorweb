"use client";

import { ProjectsHero } from "@/components/sections/ProjectsHero";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { Companies } from "@/components/home/Companies";

export default function ProjectsPage() {
  return (
    <main className="bg-white">
      <ProjectsHero />
      <ProjectsGrid />
      <Companies />
    </main>
  );
}
