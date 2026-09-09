type LoaderArgs = { src: string; width: number; quality?: number };

export default function sanityImageLoader({ src, width, quality }: LoaderArgs) {
  if (!src.startsWith("https://cdn.sanity.io/")) return src;
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 78));
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "max");
  return url.toString();
}
