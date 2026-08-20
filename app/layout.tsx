import type { Metadata, Viewport } from "next";
import { Newsreader } from "next/font/google";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import "./globals.css";

const serif = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Francis Boissier Photography",
  description: "Francis Boissier is a photographer based in London.",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

const boot = `(function(){var d=document,done=false;function reveal(){if(done)return;done=true;d.documentElement.dataset.ready="true";}
setTimeout(reveal,1500);function go(){var f=d.images[0],m=f&&f.decode?f.decode().catch(function(){}):null;
Promise.all([d.fonts&&d.fonts.ready,m]).then(reveal,reveal);}
if(d.readyState==="loading"){d.addEventListener("DOMContentLoaded",go);}else{go();}})();`

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={serif.variable} suppressHydrationWarning>
      <head>
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
