import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { categoryBySlugQuery } from "@/sanity/lib/queries";
import CategoryDetailClient from "@/components/sections/CategoryDetailClient";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const data = await client.fetch(categoryBySlugQuery, { category: categorySlug });
  
  if (!data) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${data.title} | Vibgyor Engineering Products`,
    description: data.description || `Explore ${data.title} products from Vibgyor Engineering WLL.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: categorySlug } = await params;
  
  const category = await client.fetch(categoryBySlugQuery, { category: categorySlug });

  if (!category) {
    notFound();
  }

  return <CategoryDetailClient category={category} />;
}
