import type { Metadata } from "next";
import { PhotographyView } from "../components/PhotographyView";
import { getPhotography, packRows } from "../lib/content";

export const metadata: Metadata = {
  title: "Photography",
  description:
    "Photography by Francis Boissier for Arena Homme+, POP, Hero, Heroine, Manner and Replica Man, alongside campaign and portrait work.",
  alternates: { canonical: "/photography" },
};

export default async function PhotographyPage() {
  const projects = (await getPhotography()).filter((project) => project.cover);

  return (
    <>
      <h1 className="sr-only">Photography</h1>

      <PhotographyView
        rows={packRows(projects.map((project) => project.cover!))}
        shoots={projects.map((project) => ({
          slug: project.slug,
          title: project.title,
        }))}
      />
    </>
  );
}
