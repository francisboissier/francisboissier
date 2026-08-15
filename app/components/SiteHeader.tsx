import Link from "next/link";
import { TextLink } from "./TextLink";

const nav = [
  { label: "Stills", href: "/stills" },
  { label: "Motion", href: "/motion" },
  { label: "Information", href: "/information" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  return (
    <header className="masthead flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
      <h1>
        <Link href="/" className="text-link">
          <span className="swap">
            <span className="roman">Francis Boissier</span>
            <span className="cursive" aria-hidden="true">
              Francis Boissier
            </span>
          </span>
        </Link>
      </h1>

      <nav>
        <ul className="flex gap-y-1">
          {nav.map((item) => (
            <li key={item.label}>
              <TextLink href={item.href} label={item.label} />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
