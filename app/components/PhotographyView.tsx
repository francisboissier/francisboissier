"use client";

import Link from "next/link";
import { useState } from "react";
import { flushSync } from "react-dom";
import type { GalleryItem } from "../lib/content";
import { GalleryRow } from "./GalleryRow";

type Shoot = {
  slug: string;
  title: string;
};

const views = [
  { id: "grid", label: "Grid" },
  { id: "list", label: "List" },
] as const;

type View = (typeof views)[number]["id"];

export function PhotographyView({
  rows,
  shoots,
}: {
  rows: GalleryItem[][];
  shoots: Shoot[];
}) {
  const [view, setView] = useState<View>("grid");
  const [leaving, setLeaving] = useState<View | null>(null);

  const select = (next: View) => {
    if (leaving) {
      setLeaving(next === view ? null : next);
      return;
    }

    if (next === view) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (still || view === "list") {
      setView(next);
      return;
    }

    setLeaving(next);
  };

  const commit = (next: View) => {
    const start = document.startViewTransition?.bind(document);
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!start || still) {
      setView(next);
      setLeaving(null);
      return;
    }

    start(() => {
      flushSync(() => {
        setView(next);
        setLeaving(null);
      });
    });
  };

  const onRetracted = (event: React.AnimationEvent<HTMLDivElement>) => {
    if (!leaving) return;
    if ((event.target as HTMLElement).dataset.last !== "true") return;
    commit(leaving);
  };

  return (
    <>
      <div className="view-toggle page-intro">
        {views.map((option) => (
          <button
            key={option.id}
            type="button"
            className="text-link toggle-option"
            aria-pressed={view === option.id}
            onClick={() => select(option.id)}
          >
            <span className="swap">
              <span className="roman">{option.label}</span>
              <span className="cursive" aria-hidden="true">
                {option.label}
              </span>
            </span>
          </button>
        ))}
      </div>

      {view === "grid" ? (
        <div
          key="grid"
          className={`gallery ${leaving ? "view-exit" : "view-enter"}`}
          onAnimationEnd={onRetracted}
        >
          {rows.map((items, position) => (
            <div
              key={items[0].src}
              className="gallery-slot"
              style={{ "--i": position } as React.CSSProperties}
              data-last={position === rows.length - 1}
            >
              <GalleryRow items={items} priority={position === 0} />
            </div>
          ))}
        </div>
      ) : (
        <ul key="list" className="photography-list">
          {shoots.map((shoot) => (
            <li key={shoot.slug}>
              <Link
                href={`/projects/${shoot.slug}`}
                className="text-link"
                style={{ viewTransitionName: `shoot-${shoot.slug}` }}
              >
                <span className="swap">
                  <span className="roman">{shoot.title}</span>
                  <span className="cursive" aria-hidden="true">
                    {shoot.title}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
