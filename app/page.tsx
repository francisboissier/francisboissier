import { GalleryRow } from "./components/GalleryRow";
import { getHomeItems, packRows } from "./lib/content";

export default async function Home() {
  const rows = packRows(await getHomeItems());

  return (
    <div className="gallery gallery-lead">
      {rows.map((items, position) => (
        <GalleryRow
          key={items[0].src}
          items={items}
          priority={position === 0}
        />
      ))}
    </div>
  );
}
