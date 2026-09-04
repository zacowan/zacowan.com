import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { VercelToolbar } from "@vercel/toolbar/next";
import { GeistPixelSquare } from "geist/font/pixel";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type React from "react";
import { profile, SITE_URL } from "@/lib/site-content";
import "./globals.css";

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-copy",
});

const geistMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-tech",
});

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: "Zach Cowan | Software Engineer at Vercel",
	description: profile.description,
	alternates: {
		canonical: "/",
		types: {
			"text/markdown": "/index.md",
		},
	},
	authors: [{ name: profile.name, url: SITE_URL }],
	creator: profile.name,
	robots: {
		index: true,
		follow: true,
	},
	openGraph: {
		title: "Zach Cowan | Software Engineer at Vercel",
		description: profile.description,
		type: "website",
		siteName: "Zach Cowan",
		url: SITE_URL,
	},
	twitter: {
		card: "summary_large_image",
		title: "Zach Cowan | Software Engineer at Vercel",
		description: profile.description,
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
				{children}
				<Analytics />
				<SpeedInsights />
				{shouldInjectToolbar && <VercelToolbar />}
			</body>
		</html>
	);
}
