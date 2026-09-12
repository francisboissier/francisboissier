import Image from "next/image";
import type { GalleryItem } from "../lib/content";

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
            src={item.sources ? undefined : item.src}
            poster={item.poster}
            width={item.width}
            height={item.height}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          >
            {item.sources ? (
              <>
                <source
                  src={item.sources.av1}
                  type='video/mp4; codecs="av01.0.05M.08"'
                />
                <source src={item.sources.h264} type="video/mp4" />
              </>
            ) : null}
          </video>
        ) : (
          <Image
            src={item.src}
            width={item.width}
            height={item.height}
            alt=""
            priority={priority}
            sizes="(max-width: 600px) 100vw, 90vw"
          />
        )}
      </span>
    </figure>
  );
}
