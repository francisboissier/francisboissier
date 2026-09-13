import { TextLink } from "./components/TextLink";

export default function NotFound() {
  return (
    <>
      <div className="page-intro">
        <h1>Not found</h1>
      </div>

      <section className="info-section">
        <div className="prose">
          <p>This page has moved, or it never existed.</p>
        </div>

        <TextLink href="/" label="Return home" />
      </section>
    </>
  );
}
