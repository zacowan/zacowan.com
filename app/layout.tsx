import "./global.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { BASE_URL } from "./sitemap";
import { DESCRIPTION, EXTERNAL_LINKS, PAGE_LINKS, TITLE } from "./constants";
import { FaLinkedin, FaGithub } from "react-icons/fa6";
import Link from "next/link";
import SlidingTextList from "components/sliding-text-list";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: TITLE,
    template: `%s | ${TITLE}`,
  },
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: BASE_URL,
    siteName: TITLE,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${BASE_URL}/og`,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={"text-slate-950 bg-yellow-300 min-h-screen"}>
      <body>
        <header className="border-b border-slate-950 flex h-24 fixed w-full">
          {/* HOME */}
          <h1 className="border-r h-full flex items-center justify-center">
            <Link
              aria-label="Zachary Cowan"
              className="p-4 block text-4xl"
              href="/"
            >
              ZC
            </Link>
          </h1>
          {/* DYNAMIC */}
          <div className="border-r h-full text-xs flex items-center w-full">
            <SlidingTextList
              items={[
                "identifying attack vector...",
                "bypassing file permissions...",
                "executing...",
                "0x0010100001000010001010101000101111",
              ]}
            />
          </div>
          {/* NAV */}
          <nav className="border-r h-full flex items-center gap-8 p-8 text-sm">
            <Link href={PAGE_LINKS.ABOUT}>ABOUT</Link>
            <Link href={PAGE_LINKS.BLOG}>BLOG</Link>
          </nav>
          {/* EXTERNAL LINKS */}
          <div className="h-full">
            <Link className="border-b block" href={EXTERNAL_LINKS.GITHUB}>
              <FaGithub className="w-12 h-12 p-4" />
            </Link>
            <Link className="block" href={EXTERNAL_LINKS.LINKEDIN}>
              <FaLinkedin className="w-12 h-12 p-4" />
            </Link>
          </div>
        </header>
        <main>{children}</main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
