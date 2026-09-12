import type { Metadata } from "next";
import { FilmTile } from "../components/FilmTile";
import { getProjects } from "../lib/content";

export const metadata: Metadata = {
  title: "Film, Francis Boissier",
};

export default async function FilmPage() {
  const films = (await getProjects())
    .filter((project) => project.kind === "motion" && project.cover)
    .map((project) => project.cover!);

  const rows = films.reduce<(typeof films)[]>((acc, film, index) => {
    if (index % 2 === 0) acc.push([film]);
    else acc[acc.length - 1].push(film);
    return acc;
  }, []);

  return (
    <>
      <div className="gallery">
        {rows.map((row) => (
          <div key={row[0].src} className="gallery-row">
            {row.map((film) => (
              <FilmTile key={film.src} film={film} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
