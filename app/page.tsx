import { GalleryRow } from "./components/GalleryRow";
import { galleryRows } from "./lib/projects";

export default function Home() {
  return (
    <div className="gallery gallery-lead">
      {galleryRows.map((items, position) => (
        <GalleryRow
          key={items[0].src}
          items={items}
          priority={position === 0}
        />
      ))}
    </div>
  );
}
