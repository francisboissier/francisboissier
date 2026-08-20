"use client";

import Link from "next/link";
import { useState } from "react";
import { flushSync } from "react-dom";
import type { GalleryItem } from "../lib/projects";
import { GalleryRow } from "./GalleryRow";

type Group = {
  slug: string;
  title: string;
  rows: GalleryItem[][];
};

const views = [
  { id: "grid", label: "Grid" },
  { id: "list", label: "List" },
] as const;

type View = (typeof views)[number]["id"];

export function StillsView({ groups }: { groups: Group[] }) {
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
          className={`groups ${leaving ? "view-exit" : "view-enter"}`}
          onAnimationEnd={onRetracted}
        >
          {groups.map((group, groupPosition) => (
            <section
              key={group.slug}
              className="group"
              style={{ "--i": groupPosition } as React.CSSProperties}
            >
              <Link
                href={`/projects/${group.slug}`}
                className="text-link"
                style={{ viewTransitionName: `shoot-${group.slug}` }}
              >
                <span className="swap">
                  <span className="roman">{group.title}</span>
                  <span className="cursive" aria-hidden="true">
                    {group.title}
                  </span>
                </span>
              </Link>

              <div
                className="gallery gallery-tight"
                data-last={groupPosition === groups.length - 1}
              >
                {group.rows.map((items, position) => (
                  <GalleryRow
                    key={items[0].src}
                    items={items}
                    priority={groupPosition === 0 && position === 0}
                    plain
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <ul key="list" className="stills-list">
          {groups.map((group) => (
            <li key={group.slug}>
              <Link
                href={`/projects/${group.slug}`}
                className="text-link"
                style={{ viewTransitionName: `shoot-${group.slug}` }}
              >
                <span className="swap">
                  <span className="roman">{group.title}</span>
                  <span className="cursive" aria-hidden="true">
                    {group.title}
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
