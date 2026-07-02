import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { VercelToolbar } from "@vercel/toolbar/next";
import { GeistPixelSquare } from "geist/font/pixel";
import type { Metadata } from "next";
import type React from "react";
import "./globals.css";

const deploymentUrl =
	process.env.NEXT_PUBLIC_SITE_URL ??
	(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);
const baseUrl = deploymentUrl ?? "http://localhost:3000";

export const metadata: Metadata = {
	metadataBase: new URL(baseUrl),
	title: "Zach Cowan",
	description: "Core platform engineering at Vercel.",
	openGraph: {
		title: "Zach Cowan",
		description: "Core platform engineering at Vercel.",
		type: "website",
		siteName: "Zach Cowan",
		url: baseUrl,
	},
	twitter: {
		card: "summary_large_image",
		title: "Zach Cowan",
		description: "Core platform engineering at Vercel.",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const shouldInjectToolbar = process.env.NODE_ENV === "development";

	return (
		<html lang="en" className={`bg-black ${GeistPixelSquare.variable}`}>
			<body className="min-h-screen bg-black text-white antialiased">
				{children}
				<Analytics />
				<SpeedInsights />
				{shouldInjectToolbar && <VercelToolbar />}
			</body>
		</html>
	);
}
