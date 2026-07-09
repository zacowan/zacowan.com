import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { VercelToolbar } from "@vercel/toolbar/next";
import { GeistPixelSquare } from "geist/font/pixel";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type React from "react";
import GitHubIcon from "@/components/icons/github";
import InstagramIcon from "@/components/icons/instagram";
import LinkedInIcon from "@/components/icons/linkedin";
import TwitterIcon from "@/components/icons/twitter";
import "./globals.css";

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
	description:
		"Designing systems for core infrastructure reliability and agentic guardrails for shipping safe, production-ready code.",
	openGraph: {
		title: "Zach Cowan",
		description:
			"Designing systems for core infrastructure reliability and agentic guardrails for shipping safe, production-ready code.",
		type: "website",
		siteName: "Zach Cowan",
		url: baseUrl,
	},
	twitter: {
		card: "summary_large_image",
		title: "Zach Cowan",
		description:
			"Designing systems for core infrastructure reliability and agentic guardrails for shipping safe, production-ready code.",
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
			className={`bg-black text-white ${geist.variable} ${geistMono.variable} ${GeistPixelSquare.variable}`}
		>
			<body className="min-h-screen bg-black text-white antialiased">
				<div>
					{children}
					<footer className="border-t border-white/10">
						<div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-8 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
							<p className="font-tech inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
								<span className="size-1.5 rounded-full bg-emerald-400" />
								All systems operational
							</p>
							<div className="flex items-center gap-2 text-zinc-500">
								<a
									href="https://github.com/zacowan"
									aria-label="GitHub"
									className="flex size-9 items-center justify-center rounded-md border border-white/10 transition-colors hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
								>
									<GitHubIcon />
								</a>
								<a
									href="https://linkedin.com/in/zacowan"
									aria-label="LinkedIn"
									className="flex size-9 items-center justify-center rounded-md border border-white/10 transition-colors hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
								>
									<LinkedInIcon />
								</a>
								<a
									href="https://x.com/zacowan_"
									aria-label="X"
									className="flex size-9 items-center justify-center rounded-md border border-white/10 transition-colors hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
								>
									<TwitterIcon />
								</a>
								<a
									href="https://instagram.com/zacowan"
									aria-label="Instagram"
									className="flex size-9 items-center justify-center rounded-md border border-white/10 transition-colors hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
								>
									<InstagramIcon />
								</a>
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
