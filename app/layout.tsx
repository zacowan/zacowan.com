import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { VercelToolbar } from "@vercel/toolbar/next";
import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import type React from "react";
import "./globals.css";
import Link from "next/link";
import InstagramIcon from "@/components/icons/instagram";
import LinkedInIcon from "@/components/icons/linkedin";
import TwitterIcon from "@/components/icons/twitter";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
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
		<html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
			<body className="font-sans antialiased min-h-screen flex flex-col px-4 py-8 md:px-8 md:py-12">
				<nav className="w-full flex justify-center items-center pb-12">
					<Link 
						href="/" 
						className="font-mono text-sm tracking-widest uppercase text-muted-foreground hover:text-accent transition-colors"
					>
						Zach Cowan
					</Link>
				</nav>
				<div className="flex-1 flex items-center justify-center">
					{children}
				</div>
				<footer className="w-full pt-24">
					<ul className="flex items-center justify-center gap-8">
						<li>
							<a 
								href="https://x.com/zacowan_"
								className="text-muted hover:text-accent transition-colors"
								aria-label="Twitter"
							>
								<TwitterIcon />
							</a>
						</li>
						<li>
							<a 
								href="https://linkedin.com/in/zacowan"
								className="text-muted hover:text-accent transition-colors"
								aria-label="LinkedIn"
							>
								<LinkedInIcon />
							</a>
						</li>
						<li>
							<a 
								href="https://instagram.com/zacowan"
								className="text-muted hover:text-accent transition-colors"
								aria-label="Instagram"
							>
								<InstagramIcon />
							</a>
						</li>
					</ul>
				</footer>
				<Analytics />
				<SpeedInsights />
				{shouldInjectToolbar && <VercelToolbar />}
			</body>
		</html>
	);
}
