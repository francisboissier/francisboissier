"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TextLink } from "./TextLink";

const sections = [
  { label: "Photography", href: "/photography" },
  { label: "Film", href: "/film" },
];

const contact = { label: "Information & Contact", href: "/information" };

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="masthead">
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

      <nav className="masthead-sections" aria-label="Work">
        <ul>
          {sections.map((item) => (
            <li key={item.href}>
              <TextLink
                href={item.href}
                label={item.label}
                current={pathname === item.href}
              />
            </li>
          ))}
        </ul>
      </nav>

      <nav className="masthead-contact" aria-label="Contact">
        <TextLink
          href={contact.href}
          label={contact.label}
          current={pathname === contact.href}
        />
      </nav>
    </header>
  );
}
