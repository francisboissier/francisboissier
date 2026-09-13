import { groq } from "next-sanity";
import { client } from "../../sanity/lib/client";

export type GalleryItem = {
  kind: "image" | "video";
  slug: string;
  title: string;
  src: string;
  poster?: string;
  tile?: string;
  href?: string;
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
  leadWith: "photography" | "film";
  hasCounterpart: boolean;
};

export type Shoot = {
  title: string;
  photography: Project;
  film: Project;
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
  "video": video.asset->url,
  "films": films[]{
    "poster": poster ${IMAGE},
    "video": video.asset->url,
    "tile": tile.asset->url
  }
`;

function posterUrl(url: string) {
  return `${url}?w=1200&q=78&auto=format&fit=max`;
}


function toItem(
  raw: RawImage,
  slug: string,
  title: string,
  video?: string,
  tile?: string,
): GalleryItem | null {
  if (!raw?.url || !raw.width || !raw.height) return null;

  return {
    kind: video ? "video" : "image",
    slug,
    title,
    src: video ?? raw.url,
    poster: video ? posterUrl(raw.url) : undefined,
    tile: tile ?? undefined,
    width: raw.width,
    height: raw.height,
    ratio: Number((raw.width / raw.height).toFixed(4)),
  };
}

type RawClip = {
  poster: RawImage;
  video: string | null;
  tile: string | null;
};

type RawProject = {
  slug: string | null;
  title: string | null;
  kind: "stills" | "motion" | null;
  images: RawImage[] | null;
  poster: RawImage;
  video: string | null;
  films: RawClip[] | null;
  leadWith?: "photography" | "film" | null;
  counterpartSlug?: string | null;
  counterpart?: RawProject | null;
};

const SHOOT_FIELDS = groq`
  ${PROJECT_FIELDS},
  leadWith,
  "counterpart": counterpart-> { ${PROJECT_FIELDS}, leadWith }
`;

function shapeProject(raw: RawProject): Project {
  const slug = raw.slug ?? "";
  const title = raw.title ?? "Untitled";
  const kind = raw.kind ?? "stills";

  const clips = raw.films?.length
    ? raw.films
    : [{ poster: raw.poster, video: raw.video, tile: null }];

  const items =
    kind === "motion"
      ? (clips
          .map((clip) =>
            toItem(
              clip.poster,
              slug,
              title,
              clip.video ?? undefined,
              clip.tile ?? undefined,
            ),
          )
          .filter(Boolean) as GalleryItem[])
      : ((raw.images ?? [])
          .map((image) => toItem(image, slug, title))
          .filter(Boolean) as GalleryItem[]);

  return {
    slug,
    title,
    kind,
    cover: items[0] ?? null,
    items,
    leadWith: raw.leadWith ?? "photography",
    hasCounterpart: Boolean(raw.counterpart ?? raw.counterpartSlug),
  };
}

export async function getShoot(slug: string): Promise<Shoot | null> {
  const raw = await client.fetch<RawProject | null>(
    groq`*[_type == "project" && slug.current == $slug][0] { ${SHOOT_FIELDS} }`,
    { slug },
  );

  if (!raw?.counterpart) return null;

  const project = shapeProject(raw);
  const counterpart = shapeProject(raw.counterpart);
  const photography = project.kind === "stills" ? project : counterpart;
  const film = project.kind === "motion" ? project : counterpart;

  if (!photography.items.length || !film.items.length) return null;

  return { title: project.title, photography, film };
}

export async function getShootSlugs(): Promise<string[]> {
  const slugs = await client.fetch<string[] | null>(
    groq`*[_type == "project" && defined(counterpart) && kind == "stills"
      && defined(slug.current)].slug.current`,
  );
  return slugs ?? [];
}

export async function getProjects(): Promise<Project[]> {
  const raw = await client.fetch<RawProject[] | null>(
    groq`*[_type == "project" && defined(slug.current)] | order(_createdAt asc) { ${PROJECT_FIELDS} }`,
  );
  return (raw ?? []).map(shapeProject).filter((project) => project.slug !== "");
}

export async function getProject(slug: string): Promise<Project | null> {
  const raw = await client.fetch<RawProject | null>(
    groq`*[_type == "project" && slug.current == $slug][0] {
      ${PROJECT_FIELDS},
      "counterpartSlug": counterpart->slug.current
    }`,
    { slug },
  );
  return raw ? shapeProject(raw) : null;
}

async function getGalleryProjects(): Promise<Project[]> {
  const raw = await client.fetch<RawProject[] | null>(
    groq`*[_type == "homepage"][0].gallery[]-> { ${PROJECT_FIELDS} }`,
  );

  return (raw ?? []).map(shapeProject).filter((project) => project.slug !== "");
}

export async function getPhotography(): Promise<Project[]> {
  return (await getGalleryProjects()).filter(
    (project) => project.kind === "stills",
  );
}

export async function getFilms(): Promise<Project[]> {
  return (await getGalleryProjects()).filter(
    (project) => project.kind === "motion",
  );
}

export async function getHomeItems(): Promise<GalleryItem[]> {
  const raw = await client.fetch<RawProject[] | null>(
    groq`*[_type == "homepage"][0].gallery[]-> {
      ${PROJECT_FIELDS},
      "counterpartSlug": counterpart->slug.current
    }`,
  );

  const seen = new Set<string>();
  const items: GalleryItem[] = [];

  for (const entry of raw ?? []) {
    const project = shapeProject(entry);
    if (!project.cover || seen.has(project.slug)) continue;

    seen.add(project.slug);
    if (entry.counterpartSlug) seen.add(entry.counterpartSlug);

    const shootSlug =
      project.kind === "stills" ? project.slug : entry.counterpartSlug;

    items.push(
      project.hasCounterpart && shootSlug
        ? { ...project.cover, href: `/projects/${shootSlug}/all` }
        : project.cover,
    );
  }

  return items;
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

  if (current.length) {
    if (sum < 1 && rows.length) rows[rows.length - 1].push(...current);
    else rows.push(current);
  }

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
