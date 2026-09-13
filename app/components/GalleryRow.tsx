import Image from "next/image";
import Link from "next/link";
import type { GalleryItem } from "../lib/content";

function Media({
  item,
  priority,
  sizes,
}: {
  item: GalleryItem;
  priority: boolean;
  sizes: string;
}) {
  if (item.kind === "video") {
    return (
      <video
        src={item.tile ?? item.src}
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
      alt={item.title}
      priority={priority}
      sizes={sizes}
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
  const totalRatio = items.reduce((sum, item) => sum + item.ratio, 0);

  return (
    <div className="gallery-row reveal">
      {items.map((item) => {
        const share = Math.ceil((item.ratio / totalRatio) * 90);
        const frame = (
          <span className="frame">
            <Media
              item={item}
              priority={priority}
              sizes={`(max-width: 600px) 100vw, ${share}vw`}
            />
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
              <Link href={item.href ?? `/projects/${item.slug}`}>
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
