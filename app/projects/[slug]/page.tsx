import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Plate } from "../../components/Plate";
import { TextLink } from "../../components/TextLink";
import { getNeighbours, getProject, projects } from "../../lib/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);

  return {
    title: project
      ? `${project.title}, Francis Boissier`
      : "Francis Boissier Photography",
  };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);

  if (!project) notFound();

  const { previous, next } = getNeighbours(slug);

  return (
    <>
      <div className="page-intro flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pt-[clamp(2.5rem,5vw,5rem)]">
        <h2>{project.title}</h2>
        <TextLink href="/" label="Close" />
      </div>

      <div className="plates">
        {project.items.map((item, position) => (
          <Plate key={item.src} item={item} priority={position === 0} />
        ))}
      </div>

      <nav className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pt-[clamp(4rem,9vw,9rem)]">
        {previous ? (
          <TextLink
            href={`/projects/${previous.slug}`}
            label={previous.title}
          />
        ) : (
          <span />
        )}
        {next ? (
          <TextLink href={`/projects/${next.slug}`} label={next.title} />
        ) : (
          <span />
        )}
      </nav>
    </>
  );
}
