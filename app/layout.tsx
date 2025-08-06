import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import type React from "react";
import "./globals.css";

const josefin = Josefin_Sans({ subsets: ["latin"] });

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
		<html lang="en">
			<body
				className={`${josefin.className} bg-gradient-to-br from-slate-950 to-blue-950`}
			>
				{children}
			</body>
		</html>
	);
}
