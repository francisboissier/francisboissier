import type { Metadata } from "next";
import { StillsView } from "../components/StillsView";
import { getStills, packRows } from "../lib/content";

export const metadata: Metadata = {
  title: "Stills, Francis Boissier",
};

export default async function StillsPage() {
  const projects = (await getStills()).filter((project) => project.cover);

  return (
    <StillsView
      rows={packRows(projects.map((project) => project.cover!))}
      shoots={projects.map((project) => ({
        slug: project.slug,
        title: project.title,
      }))}
    />
  );
}
