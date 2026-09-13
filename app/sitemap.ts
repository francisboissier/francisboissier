import type { MetadataRoute } from "next";
import { getProjects, getShootSlugs } from "./lib/content";
import { siteUrl } from "./lib/site";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const projects = await getProjects();
  const shoots = await getShootSlugs();

  return [
    { url: `${siteUrl}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    {
      url: `${siteUrl}/photography`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/film`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/information`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...projects.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...shoots.map((slug) => ({
      url: `${siteUrl}/projects/${slug}/all`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
