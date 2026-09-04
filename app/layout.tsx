import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { VercelToolbar } from "@vercel/toolbar/next";
import { GeistPixelSquare } from "geist/font/pixel";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type React from "react";
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
				{children}
				<Analytics />
				<SpeedInsights />
				{shouldInjectToolbar && <VercelToolbar />}
			</body>
		</html>
	);
}
