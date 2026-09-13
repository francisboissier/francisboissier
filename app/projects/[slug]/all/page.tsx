import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Plate } from "../../../components/Plate";
import { TextLink } from "../../../components/TextLink";
import { getShoot, getShootSlugs } from "../../../lib/content";

export async function generateStaticParams() {
  const slugs = await getShootSlugs();
  if (slugs.length === 0) return [{ slug: "none" }];
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]/all">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const shoot = await getShoot(slug);

  if (!shoot) return {};

  const description = `${shoot.title} — photography and film by Francis Boissier, photographer and director based in London.`;

  return {
    title: shoot.title,
    description,
    alternates: { canonical: `/projects/${slug}/all` },
  };
}

export default async function ShootPage(
  props: PageProps<"/projects/[slug]/all">,
) {
  const { slug } = await props.params;
  const shoot = await getShoot(slug);

  if (!shoot) notFound();

  const filmFirst = shoot.photography.leadWith === "film";
  const items = filmFirst
    ? [...shoot.film.items, ...shoot.photography.items]
    : [...shoot.photography.items, ...shoot.film.items];

  return (
    <>
      <div className="page-intro flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h1>{shoot.title}</h1>
        <TextLink href="/" label="Close" />
      </div>

      <div className="plates">
        {items.map((item, order) => (
          <Plate key={item.src} item={item} priority={order === 0} />
        ))}
      </div>

      <nav className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pt-[clamp(4rem,9vw,9rem)]">
        <TextLink
          href={`/projects/${shoot.photography.slug}`}
          label="Photography"
        />
        <TextLink href={`/projects/${shoot.film.slug}`} label="Film" />
      </nav>
    </>
  );
}
