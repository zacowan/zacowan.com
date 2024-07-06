import "./global.css";
import { Rubik } from "next/font/google";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { BASE_URL } from "./sitemap";
import { cn } from "./utils/cn";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Zach's Portfolio",
    template: "%s | Zach's Portfolio",
  },
  description: "A minimal blog and landing page to get connected with me.",
  openGraph: {
    title: "Zach's Portfolio",
    description: "A minimal blog and landing page to get connected with me.",
    url: BASE_URL,
    siteName: "Zach's Portfolio",
    locale: "en_US",
    type: "website",
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
      className={cn(
        "text-black bg-white dark:text-white dark:bg-black",
        rubik.className
      )}
    >
      <body className="max-w-xl mx-4 mt-8 md:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <div className="mt-20 min-h-[60vh]">{children}</div>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
