"use client";

import { useRef } from "react";
import type { Film } from "../lib/projects";

export function FilmTile({ film }: { film: Film }) {
  const video = useRef<HTMLVideoElement>(null);

  const play = () => {
    const element = video.current;
    if (!element) return;
    element.play().catch(() => undefined);
  };

  const stop = () => {
    const element = video.current;
    if (!element) return;
    element.pause();
    element.currentTime = 0;
  };

  const toggle = () => {
    const element = video.current;
    if (!element) return;
    if (element.paused) play();
    else stop();
  };

  return (
    <article
      className="gallery-item reveal"
      style={{ "--ratio": film.ratio } as React.CSSProperties}
    >
      <button
        type="button"
        className="film"
        aria-label={`Play ${film.title}`}
        onMouseEnter={play}
        onMouseLeave={stop}
        onFocus={play}
        onBlur={stop}
        onClick={toggle}
      >
        <span className="frame">
          <video
            ref={video}
            src={film.src}
            poster={film.poster}
            width={film.width}
            height={film.height}
            muted
            loop
            playsInline
            preload="none"
          />
        </span>
      </button>
      <span className="caption">{film.title}</span>
    </article>
  );
}
