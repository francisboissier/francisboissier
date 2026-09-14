"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { PreloaderImage } from "../lib/content";

function place(index: number) {
  const noise = (salt: number) => {
    const value = Math.sin((index + 1) * 12.9898 + salt * 78.233) * 43758.5453;
    return value - Math.floor(value);
  };

  const columns = 4;
  const cell = index % (columns * 3);
  const column = cell % columns;
  const row = Math.floor(cell / columns);

  const width = 18 + noise(1) * 12;
  const left = column * 25 + noise(2) * 13 - 5;
  const top = row * 30 + noise(3) * 15 - 5;

  return {
    "--x": left.toFixed(2),
    "--y": top.toFixed(2),
    "--w": width.toFixed(2),
  } as React.CSSProperties;
}

export function Preloader({ images }: { images: PreloaderImage[] }) {
  const pathname = usePathname();
  const [done, setDone] = useState(false);

  if (done || pathname !== "/" || images.length === 0) return null;

  return (
    <div
      className="preloader"
      style={{ "--frames": images.length } as React.CSSProperties}
      onAnimationEnd={(event) => {
        if (event.animationName === "preloader-out") setDone(true);
      }}
    >
      {images.map((image, position) => (
        <div
          key={image.src}
          className="preloader-frame"
          style={{ "--i": position, ...place(position) } as React.CSSProperties}
        >
          <Image
            src={image.src}
            width={image.width}
            height={image.height}
            alt=""
            priority={position === 0}
            sizes="(max-width: 600px) 82vw, 70vw"
          />
        </div>
      ))}

      <p className="preloader-name">Francis Boissier</p>
    </div>
  );
}
