"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useMountEffect } from "../hooks/useMountEffect";
import type { PreloaderImage } from "../lib/content";

type Placed = PreloaderImage & { order: number };

type Row = { images: Placed[]; span: number };

function scatter(images: PreloaderImage[]): Placed[] {
  return images
    .map((image, order) => ({
      image: { ...image, order },
      seed: Math.abs(Math.sin((order + 1) * 97.13) * 43758.5453) % 1,
    }))
    .sort((a, b) => a.seed - b.seed)
    .map((entry) => entry.image);
}

function evenRows(prefix: number[], count: number, rowCount: number) {
  const target = prefix[count] / rowCount;
  const cost: number[][] = [];
  const from: number[][] = [];

  for (let i = 0; i <= count; i += 1) {
    cost.push(new Array(rowCount + 1).fill(Infinity));
    from.push(new Array(rowCount + 1).fill(-1));
  }
  cost[0][0] = 0;

  for (let taken = 1; taken <= rowCount; taken += 1) {
    for (let end = taken; end <= count; end += 1) {
      for (let start = taken - 1; start < end; start += 1) {
        if (cost[start][taken - 1] === Infinity) continue;

        const drift = prefix[end] - prefix[start] - target;
        const total = cost[start][taken - 1] + drift * drift;

        if (total < cost[end][taken]) {
          cost[end][taken] = total;
          from[end][taken] = start;
        }
      }
    }
  }

  if (cost[count][rowCount] === Infinity) return null;

  const cuts: number[][] = [];
  let end = count;
  for (let taken = rowCount; taken > 0; taken -= 1) {
    const start = from[end][taken];
    cuts.unshift([start, end]);
    end = start;
  }

  return cuts;
}

function bestRows(images: Placed[], width: number, height: number): Row[] {
  const count = images.length;
  const prefix = [0];
  for (const image of images) {
    prefix.push(prefix[prefix.length - 1] + image.ratio);
  }

  let best: { rows: Row[]; drift: number } | null = null;

  for (let rowCount = 1; rowCount <= count; rowCount += 1) {
    const cuts = evenRows(prefix, count, rowCount);
    if (!cuts) continue;

    const rows = cuts.map(([start, end]) => ({
      images: images.slice(start, end),
      span: prefix[end] - prefix[start],
    }));

    const natural = rows.reduce((sum, row) => sum + width / row.span, 0);
    const drift = Math.abs(Math.log(height / natural));

    if (!best || drift < best.drift) best = { rows, drift };
  }

  return best ? best.rows : [];
}

export function Preloader({ images }: { images: PreloaderImage[] }) {
  const pathname = usePathname();
  const [done, setDone] = useState(false);
  const [viewport, setViewport] = useState<{ w: number; h: number } | null>(
    null,
  );

  useMountEffect(() => {
    setViewport({ w: window.innerWidth, h: window.innerHeight });
  });

  if (done || pathname !== "/" || images.length === 0) return null;

  const rows = viewport
    ? bestRows(scatter(images), viewport.w, viewport.h)
    : null;
  const natural = rows
    ? rows.reduce((sum, row) => sum + (viewport as { w: number }).w / row.span, 0)
    : 0;
  const scale = rows && natural ? (viewport as { h: number }).h / natural : 1;

  return (
    <div
      className="preloader"
      style={{ "--frames": images.length } as React.CSSProperties}
      onAnimationEnd={(event) => {
        if (event.animationName === "preloader-out") setDone(true);
      }}
    >
      {rows && viewport ? (
        <div className="preloader-mosaic">
          {rows.map((row) => (
            <div
              key={row.images[0].src}
              className="preloader-row"
              style={{
                height: `${((viewport.w / row.span) * scale).toFixed(3)}px`,
              }}
            >
              {row.images.map((image) => (
                <div
                  key={image.src}
                  className="preloader-cell"
                  style={
                    {
                      "--ratio": image.ratio,
                      "--i": image.order,
                    } as React.CSSProperties
                  }
                >
                  <Image
                    src={image.src}
                    width={image.width}
                    height={image.height}
                    alt=""
                    priority={image.order < 4}
                    sizes="(max-width: 600px) 60vw, 34vw"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : null}

      <p className="preloader-name">Francis Boissier</p>
    </div>
  );
}
