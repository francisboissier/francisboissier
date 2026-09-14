"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { PreloaderImage } from "../lib/content";

function buildFrames(images: PreloaderImage[]): PreloaderImage[][] {
  const frames: PreloaderImage[][] = [];
  let pending: PreloaderImage | null = null;

  for (const image of images) {
    if (image.ratio > 1.2) {
      if (pending) {
        frames.push([pending]);
        pending = null;
      }
      frames.push([image]);
    } else if (pending) {
      frames.push([pending, image]);
      pending = null;
    } else {
      pending = image;
    }
  }

  if (pending) frames.push([pending]);

  return frames;
}

export function Preloader({ images }: { images: PreloaderImage[] }) {
  const pathname = usePathname();
  const [done, setDone] = useState(false);

  if (done || pathname !== "/" || images.length === 0) return null;

  const frames = buildFrames(images);

  return (
    <div
      className="preloader"
      style={{ "--frames": frames.length } as React.CSSProperties}
      onAnimationEnd={(event) => {
        if (event.animationName === "preloader-out") setDone(true);
      }}
    >
      {frames.map((frame, position) => (
        <div
          key={frame[0].src}
          className="preloader-frame"
          style={{ "--i": position } as React.CSSProperties}
        >
          {frame.map((image) => (
            <Image
              key={image.src}
              src={image.src}
              width={image.width}
              height={image.height}
              alt=""
              priority={position === 0}
              sizes="(max-width: 600px) 60vw, 40vw"
            />
          ))}
        </div>
      ))}

      <p className="preloader-name">Francis Boissier</p>
    </div>
  );
}
