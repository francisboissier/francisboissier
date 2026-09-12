import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { TextLink } from "../components/TextLink";
import { getInformation } from "../lib/content";
import type { PortableTextBlock } from "@portabletext/types";

export const metadata: Metadata = {
  title: "Information & Contact",
  description:
    "About Francis Boissier, photographer and director based in London. Clients, publications, representation and contact details.",
  alternates: { canonical: "/information" },
};

function MetaSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3>{heading}</h3>
      <ul>{children}</ul>
    </section>
  );
}

export default async function InformationPage() {
  const info = await getInformation();
  const wave = info?.wave;

  return (
    <>
      <div className="page-intro">
        <h1>Information &amp; Contact</h1>
      </div>

      <div className="information stagger">
        <div className="info" style={{ "--i": 0 } as React.CSSProperties}>
          <div className="prose">
            {info?.intro ? (
              <PortableText value={info.intro as PortableTextBlock[]} />
            ) : null}
          </div>

          <div className="meta">
            {info?.email && (
              <MetaSection heading="Email">
                <li>
                  <TextLink href={`mailto:${info.email}`} label={info.email} external />
                </li>
              </MetaSection>
            )}

            {info?.representation && (
              <MetaSection heading="Representation">
                <li>{info.representation}</li>
              </MetaSection>
            )}

            {info?.studio && (
              <MetaSection heading="Studio">
                <li>{info.studio}</li>
              </MetaSection>
            )}

            {info?.instagram && (
              <MetaSection heading="Instagram">
                <li>
                  <TextLink
                    href={info.instagram}
                    label={`@${info.instagram.replace(/\/$/, "").split("/").pop()}`}
                    external
                  />
                </li>
              </MetaSection>
            )}

            {info?.clients?.length ? (
              <MetaSection heading="Clients">
                {info.clients.map((client) => (
                  <li key={client}>{client}</li>
                ))}
              </MetaSection>
            ) : null}

            {info?.publications?.length ? (
              <MetaSection heading="Publications">
                {info.publications.map((publication) => (
                  <li key={publication}>{publication}</li>
                ))}
              </MetaSection>
            ) : null}
          </div>

          {wave?.heading && (
            <section className="info-section">
              <h3>{wave.heading}</h3>

              {wave.body ? (
                <div className="prose">
                  <PortableText value={wave.body as PortableTextBlock[]} />
                </div>
              ) : null}

              {wave.linkUrl && (
                <TextLink
                  href={wave.linkUrl}
                  label={wave.linkLabel ?? wave.linkUrl}
                  external
                />
              )}
            </section>
          )}
        </div>
      </div>
    </>
  );
}
