"use client";

import Link from "next/link";
import { useState } from "react";
import { useMountEffect } from "../hooks/useMountEffect";

const links = [
  { label: "Home", href: "/", active: true },
  { label: "Stills", href: "/stills" },
  { label: "Motion", href: "/motion" },
  { label: "Information", href: "/information" },
  { label: "Contact", href: "/contact" },
];

const instagram = "https://www.instagram.com/fboissier/";
const foWave = "https://www.instagram.com/fo__wave/";

const instagramIcon = (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    aria-hidden="true"
  >
    <rect x="2.75" y="2.75" width="18.5" height="18.5" rx="5" />
    <circle cx="12" cy="12" r="4.4" />
    <circle cx="17.5" cy="6.5" r="1.05" fill="currentColor" stroke="none" />
  </svg>
);

export function SiteNav() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useMountEffect(() => {
    const reveal = requestAnimationFrame(() => setVisible(true));

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      document.documentElement.classList.remove("overflow");
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(reveal);
      document.removeEventListener("keydown", onKeyDown);
      document.documentElement.classList.remove("overflow");
    };
  });

  const toggle = () => {
    const next = !open;
    setOpen(next);
    document.documentElement.classList.toggle("overflow", next);
  };

  const close = () => {
    setOpen(false);
    document.documentElement.classList.remove("overflow");
  };

  return (
    <nav
      className={`content_menu${visible ? " show" : ""}${open ? " open" : ""}`}
      id="contentMenu"
    >
      <button
        type="button"
        className={`btn_burger${open ? " open" : ""}`}
        aria-expanded={open}
        aria-controls="bigNavigation"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={toggle}
      >
        <span className="bars" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      <button
        type="button"
        className="btn_burger_mobile"
        aria-expanded={open}
        aria-controls="bigNavigation"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={toggle}
      >
        <span aria-hidden="true" />
      </button>

      <Link href="/" className="logo vertical_type">
        Francis Boissier
      </Link>

      <ul className="content_social">
        <li>
          <a href={instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
            {instagramIcon}
          </a>
        </li>
        <li>
          <a
            href={foWave}
            target="_blank"
            rel="noreferrer"
            className="studio_link vertical_type"
          >
            FO—WAVE
          </a>
        </li>
      </ul>

      <section className="content_big_navigation" id="bigNavigation">
        <ul className="row content_links">
          {links.map((link, position) => (
            <li key={link.label} className={`row item${link.active ? " active" : ""}`}>
              <Link href={link.href} className="link" onClick={close}>
                <span className="index" aria-hidden="true">
                  {String(position + 1).padStart(2, "0")}
                </span>
                <span className="mask">
                  <span className="label">{link.label}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="row content_bottom">
          <ul className="content_social_mobile">
            <li>
              <a href={instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                {instagramIcon}
              </a>
            </li>
            <li>
              <a href={foWave} target="_blank" rel="noreferrer" className="studio_link">
                FO—WAVE
              </a>
            </li>
          </ul>
        </div>
      </section>
    </nav>
  );
}
