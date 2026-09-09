import { groq } from "next-sanity";
import { client } from "../../sanity/lib/client";

export type GalleryItem = {
  kind: "image" | "video";
  slug: string;
  title: string;
  src: string;
  poster?: string;
  width: number;
  height: number;
  ratio: number;
};

export type Project = {
  slug: string;
  title: string;
  kind: "stills" | "motion";
  cover: GalleryItem | null;
  items: GalleryItem[];
};

export type Information = {
  intro: unknown[] | null;
  email: string | null;
  representation: string | null;
  studio: string | null;
  instagram: string | null;
  clients: string[] | null;
  publications: string[] | null;
  wave: {
    heading: string | null;
    body: unknown[] | null;
    linkLabel: string | null;
    linkUrl: string | null;
  } | null;
};

type RawImage = {
  url?: string;
  width?: number;
  height?: number;
} | null;

const IMAGE = groq`{
  "url": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height
}`;

const PROJECT_FIELDS = groq`
  "slug": slug.current,
  title,
  kind,
  "images": images[] ${IMAGE},
  "poster": poster ${IMAGE},
  "video": video.asset->url
`;

function posterUrl(url: string) {
  return `${url}?w=1200&q=78&auto=format&fit=max`;
}

function toItem(
  raw: RawImage,
  slug: string,
  title: string,
  video?: string,
): GalleryItem | null {
  if (!raw?.url || !raw.width || !raw.height) return null;

  return {
    kind: video ? "video" : "image",
    slug,
    title,
    src: video ?? raw.url,
    poster: video ? posterUrl(raw.url) : undefined,
    width: raw.width,
    height: raw.height,
    ratio: Number((raw.width / raw.height).toFixed(4)),
  };
}

type RawProject = {
  slug: string | null;
  title: string | null;
  kind: "stills" | "motion" | null;
  images: RawImage[] | null;
  poster: RawImage;
  video: string | null;
};

function shapeProject(raw: RawProject): Project {
  const slug = raw.slug ?? "";
  const title = raw.title ?? "Untitled";
  const kind = raw.kind ?? "stills";

  const items =
    kind === "motion"
      ? ([toItem(raw.poster, slug, title, raw.video ?? undefined)].filter(
          Boolean,
        ) as GalleryItem[])
      : ((raw.images ?? [])
          .map((image) => toItem(image, slug, title))
          .filter(Boolean) as GalleryItem[]);

  return { slug, title, kind, cover: items[0] ?? null, items };
}

export async function getProjects(): Promise<Project[]> {
  const raw = await client.fetch<RawProject[] | null>(
    groq`*[_type == "project" && defined(slug.current)] | order(_createdAt asc) { ${PROJECT_FIELDS} }`,
  );
  return (raw ?? []).map(shapeProject).filter((project) => project.slug !== "");
}

export async function getProject(slug: string): Promise<Project | null> {
  const raw = await client.fetch<RawProject | null>(
    groq`*[_type == "project" && slug.current == $slug][0] { ${PROJECT_FIELDS} }`,
    { slug },
  );
  return raw ? shapeProject(raw) : null;
}

export async function getHomeItems(): Promise<GalleryItem[]> {
  const raw = await client.fetch<
    { image: RawImage; slug: string | null; title: string | null }[] | null
  >(groq`*[_type == "homepage"][0].gallery[]{
      "image": image ${IMAGE},
      "slug": project->slug.current,
      "title": project->title
    }`);

  return ((raw ?? [])
    .map((tile) => toItem(tile.image, tile.slug ?? "", tile.title ?? ""))
    .filter(Boolean) as GalleryItem[]);
}

export async function getInformation(): Promise<Information | null> {
  return client.fetch<Information | null>(groq`*[_type == "information"][0]{
      intro, email, representation, studio, instagram,
      clients, publications,
      wave { heading, body, linkLabel, linkUrl }
    }`);
}

export async function getSettings() {
  return client.fetch<{ name: string | null; description: string | null } | null>(
    groq`*[_type == "siteSettings"][0]{ name, description }`,
  );
}

const ROW_TARGETS = [2.9, 4.3, 3.3, 4.6];

export function packRows(items: GalleryItem[]): GalleryItem[][] {
  const rows: GalleryItem[][] = [];
  let current: GalleryItem[] = [];
  let sum = 0;
  let index = 0;

  for (const item of items) {
    current.push(item);
    sum += item.ratio;
    if (sum >= ROW_TARGETS[index % ROW_TARGETS.length]) {
      rows.push(current);
      current = [];
      sum = 0;
      index += 1;
    }
  }

  if (current.length) rows.push(current);
  return rows;
}

export function chunkGroupRows(items: GalleryItem[]): GalleryItem[][] {
  const rows: GalleryItem[][] = [];
  let rest = items;
  let wide = true;

  while (rest.length) {
    let size = wide ? 4 : 3;
    if (rest.length - size === 1) size += 1;
    if (rest.length < size) size = rest.length;
    rows.push(rest.slice(0, size));
    rest = rest.slice(size);
    wide = !wide;
  }

  return rows;
}
