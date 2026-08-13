import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const grotesk = Inter({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Francis Boissier",
  description: "Francis Boissier is a photographer based in London.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${grotesk.variable} h-full`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
