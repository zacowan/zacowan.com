import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import type React from "react";
import "./globals.css";

// Configure Rubik font
const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Zach in NYC",
	description: "Personal website of Zach in NYC",
	generator: "v0.dev",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={rubik.className}>{children}</body>
		</html>
	);
}
