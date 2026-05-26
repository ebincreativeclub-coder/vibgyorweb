import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { projectBySlugQuery } from "@/sanity/lib/queries";
import { ProjectDetailClient } from "@/components/sections/ProjectDetailClient";

export const revalidate = 60; // Revalidate every minute

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await client.fetch(projectBySlugQuery, { slug });

  if (!data) {
    notFound();
  }

  // Combine mainImage and gallery images, filtering out any items without a valid asset
  const images = [data.mainImage, ...(data.images || [])].filter((img: any) => img && img.asset);
  const project = { ...data, images };

  return <ProjectDetailClient project={project} />;
}
