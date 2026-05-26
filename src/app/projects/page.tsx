import { ProjectsHero } from "@/components/sections/ProjectsHero";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { Companies } from "@/components/home/Companies";
import { client } from "@/sanity/lib/client";
import { projectsQuery } from "@/sanity/lib/queries";

export const revalidate = 60; // Revalidate every minute for ISR

export default async function ProjectsPage() {
  const initialProjects = await client.fetch(projectsQuery);

  return (
    <main className="bg-white">
      <ProjectsHero />
      <ProjectsGrid initialProjects={initialProjects} />
      <Companies showBackground={false} compact={true} />
    </main>
  );
}
