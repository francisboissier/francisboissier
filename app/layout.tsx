import type { Metadata, Viewport } from "next";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { getSettings } from "./lib/content";
import { siteDescription, siteName, siteUrl } from "./lib/site";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const name = settings?.name ?? siteName;
  const description = settings?.description ?? siteDescription;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${name}, Photographer and Director`,
      template: `%s, ${name}`,
    },
    description,
    alternates: { canonical: "/" },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },
    manifest: "/manifest.webmanifest",
    openGraph: {
      type: "website",
      locale: "en_GB",
      siteName: name,
      url: siteUrl,
      title: `${name}, Photographer and Director`,
      description,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${name}, Photographer and Director`,
      description,
      images: ["/og.png"],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

const boot = `(function(){var d=document,done=false;function reveal(){if(done)return;done=true;d.documentElement.dataset.ready="true";}
setTimeout(reveal,1500);function go(){var f=d.images[0],m=f&&f.decode?f.decode().catch(function(){}):null;
Promise.all([d.fonts&&d.fonts.ready,m]).then(reveal,reveal);}
if(d.readyState==="loading"){d.addEventListener("DOMContentLoaded",go);}else{go();}})();`

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="" />
        <link rel="stylesheet" href="https://use.typekit.net/imh4mdl.css" />
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <noscript>
          <style>{`main { opacity: 1 !important }`}</style>
        </noscript>
      </head>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
