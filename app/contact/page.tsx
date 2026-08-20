import type { Metadata } from "next";
import { TextLink } from "../components/TextLink";

export const metadata: Metadata = {
  title: "Contact, Francis Boissier",
};

export default function ContactPage() {
  return (
    <>
      <div className="page-intro pt-[clamp(2.5rem,5vw,5rem)]">
        <h2>Contact</h2>
      </div>

      <div className="contact stagger">
        <dl className="contact-list" style={{ "--i": 0 } as React.CSSProperties}>
          <dt>General</dt>
          <dd>
            <TextLink
              href="mailto:hello@francisboissier.com"
              label="hello@francisboissier.com"
              external
            />
          </dd>

          <dt>Representation</dt>
          <dd>Lorem Ipsum Agency, London</dd>

          <dt>Studio</dt>
          <dd>Lorem ipsum dolor 24, London</dd>

          <dt>Instagram</dt>
          <dd>
            <TextLink
              href="https://www.instagram.com/fboissier/"
              label="@fboissier"
              external
            />
          </dd>
        </dl>

        <p className="prose" style={{ "--i": 1 } as React.CSSProperties}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris.
        </p>
      </div>
    </>
  );
}
