import type { Metadata } from "next";
import { StillsView } from "../components/StillsView";
import { getStills, packRows } from "../lib/content";

export const metadata: Metadata = {
  title: "Stills",
  description:
    "Photography by Francis Boissier for Arena Homme+, POP, Hero, Heroine, Manner and Replica Man, alongside campaign and portrait work.",
  alternates: { canonical: "/stills" },
};

export default async function StillsPage() {
  const projects = (await getStills()).filter((project) => project.cover);

  return (
    <>
      <h1 className="sr-only">Stills</h1>

      <StillsView
        rows={packRows(projects.map((project) => project.cover!))}
        shoots={projects.map((project) => ({
          slug: project.slug,
          title: project.title,
        }))}
      />
    </>
  );
}
