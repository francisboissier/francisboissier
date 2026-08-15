import Link from "next/link";

export function TextLink({
  href,
  label,
  external = false,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  const inner = (
    <span className="swap">
      <span className="roman">{label}</span>
      <span className="cursive" aria-hidden="true">
        {label}
      </span>
    </span>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="text-link">
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className="text-link">
      {inner}
    </Link>
  );
}
