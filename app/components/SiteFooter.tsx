import { TextLink } from "./TextLink";

export function SiteFooter() {
  return (
    <footer className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pt-[clamp(4rem,9vw,9rem)]">
      <span>&copy; Francis Boissier {new Date().getFullYear()}</span>

      <nav>
        <ul className="flex flex-wrap gap-x-5 gap-y-1">
          <li>
            <TextLink href="/contact" label="Contact" />
          </li>
          <li>
            <TextLink
              href="https://www.instagram.com/fboissier/"
              label="FO—Wave"
              external
            />
          </li>
        </ul>
      </nav>
    </footer>
  );
}
