import "./global.css";
import { Rubik } from "next/font/google";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "../components/composite/footer";
import { BASE_URL } from "./sitemap";
import { DESCRIPTION, TITLE } from "./constants";
import Header from "../components/composite/header";
import { cn } from "@/lib/utils";

const rubik = Rubik({ subsets: ["latin"] });

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
    <html
      lang="en"
      className={cn("bg-background text-foreground", rubik.className)}
    >
      <body className="max-w-xl mx-4 mt-8 md:mx-auto px-2 md:px-0">
        <Header />
        <main className="flex-auto min-w-0 flex flex-col py-16 min-h-[60vh]">
          {children}
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
