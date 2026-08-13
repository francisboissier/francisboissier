import { SiteNav } from "./components/SiteNav";

export default function Home() {
  return (
    <>
      <SiteNav />

      <div className="row wrapper">
        <header className="row content_hero">
          <article className="row">
            <picture className="row content_bg_video">
              <video
                id="video_background_hero"
                src="/Website-Video_1.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />
            </picture>
          </article>
        </header>
      </div>
    </>
  );
}
