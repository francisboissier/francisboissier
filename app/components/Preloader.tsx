"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { PreloaderImage } from "../lib/content";

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
          style={{ "--i": position } as React.CSSProperties}
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
