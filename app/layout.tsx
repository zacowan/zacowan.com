import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { VercelToolbar } from "@vercel/toolbar/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import Link from "next/link";
import type React from "react";
import GitHubIcon from "@/components/icons/github";
import InstagramIcon from "@/components/icons/instagram";
import LinkedInIcon from "@/components/icons/linkedin";
import TwitterIcon from "@/components/icons/twitter";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
	weight: "400",
	subsets: ["latin"],
	variable: "--font-display",
});

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-copy",
});

const geistMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-tech",
});

const deploymentUrl =
	process.env.NEXT_PUBLIC_SITE_URL ??
	(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);
const baseUrl = deploymentUrl ?? "http://localhost:3000";

export const metadata: Metadata = {
	metadataBase: new URL(baseUrl),
	title: "Zach Cowan",
	description: "All about me.",
	openGraph: {
		title: "Zach Cowan",
		description: "All about me.",
		type: "website",
		siteName: "Zach Cowan",
		url: baseUrl,
		images: [
			{
				url: "/opengraph-image.png",
				width: 1200,
				height: 630,
				alt: "Zach Cowan",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Zach Cowan",
		description: "All about me.",
		images: ["/opengraph-image.png"],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const shouldInjectToolbar = process.env.NODE_ENV === "development";

	return (
		<html
			lang="en"
			className={`bg-neutral-950 text-white ${instrumentSerif.variable} ${geist.variable} ${geistMono.variable}`}
		>
			<body className="technical-grid min-h-screen bg-neutral-950 text-white antialiased">
				<nav className="border-b border-white/10">
					<div className="mx-auto flex w-full max-w-7xl items-center px-12 py-5 md:px-[4.5rem] lg:px-24">
						<Link
							href="/"
							className="font-tech text-[11px] uppercase tracking-[0.28em] text-zinc-300"
						>
							ZACOWAN
						</Link>
					</div>
				</nav>
				<div className="relative mx-auto w-full max-w-7xl px-8 md:px-12 lg:px-16">
					<div className="pointer-events-none absolute left-8 top-0 bottom-0 hidden w-px bg-white/5 md:block md:left-12 lg:left-16" />
					<div className="pointer-events-none absolute right-8 top-0 bottom-0 hidden w-px bg-white/5 md:block md:right-12 lg:right-16" />
					{children}
					<footer className="border-t border-white/10 py-10">
						<div className="px-4 md:px-6 lg:px-8">
							<div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
								<div className="space-y-3">
									<p className="font-tech text-[10px] uppercase tracking-[0.24em] text-zinc-500">
										SIGTERM
									</p>
									<pre className="max-w-md overflow-x-auto border border-white/10 bg-neutral-900 p-4 font-tech text-[10px] tracking-[0.18em] text-zinc-300">
										<code>kubectl rollout restart deployment/zacowan</code>
									</pre>
								</div>
								<div className="flex items-center gap-5 text-zinc-400">
									<a
										href="https://github.com/zacowan"
										className="border border-white/10 bg-neutral-900 p-3 transition-colors hover:bg-zinc-800 hover:text-white"
									>
										<GitHubIcon />
									</a>
									<a
										href="https://linkedin.com/in/zacowan"
										className="border border-white/10 bg-neutral-900 p-3 transition-colors hover:bg-zinc-800 hover:text-white"
									>
										<LinkedInIcon />
									</a>
									<a
										href="https://x.com/zacowan_"
										className="border border-white/10 bg-neutral-900 p-3 transition-colors hover:bg-zinc-800 hover:text-white"
									>
										<TwitterIcon />
									</a>
									<a
										href="https://instagram.com/zacowan"
										className="border border-white/10 bg-neutral-900 p-3 transition-colors hover:bg-zinc-800 hover:text-white"
									>
										<InstagramIcon />
									</a>
								</div>
							</div>
						</div>
					</footer>
				</div>
				<Analytics />
				<SpeedInsights />
				{shouldInjectToolbar && <VercelToolbar />}
			</body>
		</html>
	);
}
