import type { Metadata } from "next";
import { GalleryRow } from "../components/GalleryRow";
import { getFilms, packRows } from "../lib/content";

export const metadata: Metadata = {
  title: "Film",
  description:
    "Moving image and film direction by Francis Boissier, including fashion campaigns, editorial films and behind the scenes work.",
  alternates: { canonical: "/film" },
};

export default async function FilmPage() {
  const covers = (await getFilms())
    .filter((project) => project.cover?.poster)
    .map((project) => ({
      ...project.cover!,
      kind: "image" as const,
      src: project.cover!.poster!,
    }));

  return (
    <>
      <h1 className="sr-only">Film</h1>

      <div className="gallery">
        {packRows(covers).map((items, position) => (
          <GalleryRow
            key={items[0].src}
            items={items}
            priority={position === 0}
          />
        ))}
      </div>
    </>
  );
}
