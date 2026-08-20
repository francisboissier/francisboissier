import type { Metadata } from "next";
import { TextLink } from "../components/TextLink";

export const metadata: Metadata = {
  title: "Information, Francis Boissier",
};

const clients = [
  "Lorem Ipsum",
  "Dolor Sit",
  "Consectetur",
  "Adipiscing",
  "Tempor Labore",
  "Magna Aliqua",
];

const publications = [
  "Lorem Quarterly, 2026",
  "Ipsum Review, 2025",
  "Dolor Journal, 2025",
  "Consectetur Annual, 2024",
];

export default function InformationPage() {
  return (
    <>
      <div className="page-intro pt-[clamp(2.5rem,5vw,5rem)]">
        <h2>Information</h2>
      </div>

      <div className="information stagger">
        <div className="info" style={{ "--i": 0 } as React.CSSProperties}>
          <div className="prose">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.
            </p>
          </div>

          <div className="meta">
            <section>
              <h3>Clients</h3>
              <ul>
                {clients.map((client) => (
                  <li key={client}>{client}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3>Publications</h3>
              <ul>
                {publications.map((publication) => (
                  <li key={publication}>{publication}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        <section
          className="info-section"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          <h3>FO&mdash;Wave</h3>

          <div className="prose">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              ipsum suspendisse ultrices gravida, risus commodo viverra maecenas
              accumsan lacus vel facilisis.
            </p>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt.
            </p>
          </div>

          <TextLink
            href="https://www.instagram.com/fo__wave/"
            label="@fo__wave"
            external
          />
        </section>
      </div>
    </>
  );
}
