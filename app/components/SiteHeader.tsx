"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TextLink } from "./TextLink";

const nav = [
  { label: "Photography", href: "/photography" },
  { label: "Film", href: "/film" },
  { label: "Information & Contact", href: "/information" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="masthead flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
      <p className="masthead-name">
        <Link href="/" className="text-link">
          <span className="swap">
            <span className="roman">Francis Boissier</span>
            <span className="cursive" aria-hidden="true">
              Francis Boissier
            </span>
          </span>
        </Link>
      </p>

      <nav>
        <ul className="flex gap-y-1">
          {nav.map((item) => (
            <li key={item.label}>
              <TextLink
                href={item.href}
                label={item.label}
                current={pathname === item.href}
              />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
