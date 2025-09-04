import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import type React from "react";
import "./globals.css";
import Link from "next/link";

const ibmPlexMono = IBM_Plex_Mono({
	subsets: ["latin"],
	weight: "400",
});

export const metadata: Metadata = {
	title: "zacOS",
	description: "The operating system built for me.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="bg-black text-white">
			<body className={`${ibmPlexMono.className}`}>
				<header className="flex items-center justify-center py-4 px-8 w-full space-x-4 pb-20">
					<Link href="/">zacowan</Link>
				</header>
				{children}
			</body>
		</html>
	);
}
