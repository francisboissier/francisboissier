import Image from "next/image";
import type { GalleryItem } from "../lib/projects";

export function Plate({
  item,
  priority = false,
}: {
  item: GalleryItem;
  priority?: boolean;
}) {
  return (
    <figure
      className="plate reveal"
      style={{ "--ratio": item.ratio } as React.CSSProperties}
    >
      <span className="frame">
        {item.kind === "video" ? (
          <video
            src={item.src}
            poster={item.poster}
            width={item.width}
            height={item.height}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
        ) : (
          <Image
            src={item.src}
            width={item.width}
            height={item.height}
            alt=""
            priority={priority}
            sizes="(max-width: 600px) 100vw, 80vw"
          />
        )}
      </span>
    </figure>
  );
}
