import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Plate } from "../../components/Plate";
import { TextLink } from "../../components/TextLink";
import { getProject, getProjects } from "../../lib/content";

export async function generateStaticParams() {
  const projects = await getProjects();
  if (projects.length === 0) return [{ slug: "none" }];
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = await getProject(slug);

  return {
    title: project
      ? `${project.title}, Francis Boissier`
      : "Francis Boissier Photography",
  };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = await getProject(slug);

  if (!project) notFound();

  const projects = await getProjects();
  const position = projects.findIndex((entry) => entry.slug === slug);
  const previous = projects[(position - 1 + projects.length) % projects.length];
  const next = projects[(position + 1) % projects.length];
  const index = project.kind === "motion" ? "/motion" : "/stills";

  return (
    <>
      <div className="page-intro flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h2>{project.title}</h2>
        <TextLink href={index} label="Close" />
      </div>

      <div className="plates">
        {project.items.map((item, order) => (
          <Plate key={item.src} item={item} priority={order === 0} />
        ))}
      </div>

      <nav className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pt-[clamp(4rem,9vw,9rem)]">
        {previous && previous.slug !== slug ? (
          <TextLink href={`/projects/${previous.slug}`} label={previous.title} />
        ) : (
          <span />
        )}
        {next && next.slug !== slug ? (
          <TextLink href={`/projects/${next.slug}`} label={next.title} />
        ) : (
          <span />
        )}
      </nav>
    </>
  );
}
