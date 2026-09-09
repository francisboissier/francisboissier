import type { Metadata } from "next";
import { StillsView } from "../components/StillsView";
import { chunkGroupRows, getProjects } from "../lib/content";

export const metadata: Metadata = {
  title: "Stills, Francis Boissier",
};

export default async function StillsPage() {
  const groups = (await getProjects())
    .filter((project) => project.kind === "stills" && project.items.length > 0)
    .map((project) => ({
      slug: project.slug,
      title: project.title,
      rows: chunkGroupRows(project.items),
    }));

  return <StillsView groups={groups} />;
}
