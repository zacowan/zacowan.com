import { VercelToolbar } from "@vercel/toolbar/next";
import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import type React from "react";
import "./globals.css";
import Link from "next/link";
import InstagramIcon from "@/components/icons/instagram";
import LinkedInIcon from "@/components/icons/linkedin";
import TwitterIcon from "@/components/icons/twitter";

const instrumentSerif = Instrument_Serif({ weight: "400", subsets: ["latin"] });
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
		<html lang="en" className="bg-black text-white px-4 py-8 md:px-8 md:py-12">
			<body className={`${instrumentSerif.className}`}>
				<nav className="w-full flex justify-center items-center pb-12">
					<Link href="/">Zach Cowan</Link>
				</nav>
				{children}
				<footer className="w-full pt-24">
					<ul className="flex items-center justify-center gap-6">
						<li>
							<a href="https://x.com/zacowan_">
								<TwitterIcon />
							</a>
						</li>
						<li>
							<a href="https://linkedin.com/in/zacowan">
								<LinkedInIcon />
							</a>
						</li>
						<li>
							<a href="https://instagram.com/zaocwan">
								<InstagramIcon />
							</a>
						</li>
					</ul>
				</footer>
				{shouldInjectToolbar && <VercelToolbar />}
			</body>
		</html>
	);
}
