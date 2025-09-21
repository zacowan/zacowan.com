import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import type React from "react";
import "./globals.css";
import Link from "next/link";
import InstagramIcon from "@/components/icons/instagram";
import LinkedInIcon from "@/components/icons/linkedin";
import TwitterIcon from "@/components/icons/twitter";

const instrumentSerif = Instrument_Serif({ weight: "400", subsets: ["latin"] });

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
		<html
			lang="en"
			className="bg-black text-white min-h-screen px-4 py-8 md:px-8 md:py-12"
		>
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
			</body>
		</html>
	);
}
