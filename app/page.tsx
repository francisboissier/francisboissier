import type { Metadata } from "next";
import { GalleryRow } from "./components/GalleryRow";
import { getHomeItems, getInformation, packRows } from "./lib/content";
import { siteDescription, siteName, siteUrl } from "./lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function Home() {
  const rows = packRows(await getHomeItems());
  const info = await getInformation();

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteName,
    url: siteUrl,
    jobTitle: "Photographer and Director",
    description: siteDescription,
    address: {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressCountry: "GB",
    },
    ...(info?.email ? { email: `mailto:${info.email}` } : {}),
    ...(info?.instagram ? { sameAs: [info.instagram] } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />

      <h1 className="sr-only">{siteName}, photographer and director</h1>

      <div className="gallery gallery-lead">
        {rows.map((items, position) => (
          <GalleryRow
            key={items[0].src}
            items={items}
            priority={position === 0}
          />
        ))}
      </div>
    </>
  );
}
