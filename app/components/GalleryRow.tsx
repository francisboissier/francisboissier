import Image from "next/image";
import Link from "next/link";
import type { GalleryItem } from "../lib/projects";

function Media({ item, priority }: { item: GalleryItem; priority: boolean }) {
  if (item.kind === "video") {
    return (
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
    );
  }

  return (
    <Image
      src={item.src}
      width={item.width}
      height={item.height}
      alt=""
      priority={priority}
      sizes="(max-width: 600px) 100vw, 45vw"
    />
  );
}

export function GalleryRow({
  items,
  priority = false,
  plain = false,
}: {
  items: GalleryItem[];
  priority?: boolean;
  plain?: boolean;
}) {
  return (
    <div className="gallery-row reveal">
      {items.map((item) => {
        const frame = (
          <span className="frame">
            <Media item={item} priority={priority} />
          </span>
        );

        return (
          <article
            key={item.src}
            className="gallery-item"
            style={{ "--ratio": item.ratio } as React.CSSProperties}
          >
            {plain ? (
              frame
            ) : (
              <Link href={`/projects/${item.slug}`}>
                {frame}
                <span className="caption">{item.title}</span>
              </Link>
            )}
          </article>
        );
      })}
    </div>
  );
}
