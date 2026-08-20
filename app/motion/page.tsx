import type { Metadata } from "next";
import { FilmTile } from "../components/FilmTile";
import { filmRows } from "../lib/projects";

export const metadata: Metadata = {
  title: "Motion, Francis Boissier",
};

export default function MotionPage() {
  return (
    <>
      <div className="page-intro">
        <h2>Motion</h2>
      </div>

      <div className="gallery">
        {filmRows.map((row) => (
          <div key={row[0].slug} className="gallery-row">
            {row.map((film) => (
              <FilmTile key={film.slug} film={film} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
