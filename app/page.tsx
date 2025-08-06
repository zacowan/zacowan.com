import Link from "next/link";
import InstagramIcon from "@/components/icons/instagram";
import LinkedInIcon from "@/components/icons/linkedin";
import TwitterIcon from "@/components/icons/twitter";
import LiquidGlassLink from "@/components/LiquidGlassLink";

export default function Home() {
	return (
		<main className="min-h-screen flex items-center justify-center">
			<div className="text-white">
				<div className="flex flex-col items-center justify-center gap-6">
					<h1 className="text-5xl">zacOS</h1>
					<hr className="w-48" />
					<LiquidGlassLink href="/wip">Launch</LiquidGlassLink>
				</div>
				<div className="flex items-center justify-center gap-6 pt-24">
					<Link href="https://x.com/zacowan_">
						<TwitterIcon />
					</Link>
					<Link href="https://www.instagram.com/zacowan/">
						<InstagramIcon />
					</Link>
					<Link href="https://www.linkedin.com/in/zacowan/">
						<LinkedInIcon />
					</Link>
				</div>
			</div>
		</main>
	);
}
