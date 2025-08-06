"use client";

import { easeOut } from "motion";
import { motion } from "motion/react";
import Link from "next/link";
import InstagramIcon from "@/components/icons/instagram";
import LinkedInIcon from "@/components/icons/linkedin";
import TwitterIcon from "@/components/icons/twitter";
import LiquidGlassLink from "@/components/LiquidGlassLink";

export default function Home() {
	const mainGroupVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.8,
				ease: easeOut,
				delay: 0.25,
			},
		},
	};

	const socialContainerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				delayChildren: 1.25,
			},
		},
	};

	const socialItemVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				ease: easeOut,
			},
		},
	};

	return (
		<main className="min-h-screen flex items-center justify-center">
			<div className="text-white">
				<motion.div
					variants={mainGroupVariants}
					initial="hidden"
					animate="visible"
					className="flex flex-col items-center justify-center gap-6"
				>
					<h1 className="text-5xl">zacOS</h1>
					<hr className="w-48" />
					<LiquidGlassLink href="/os">Launch</LiquidGlassLink>
				</motion.div>

				<motion.div
					variants={socialContainerVariants}
					initial="hidden"
					animate="visible"
					className="flex items-center justify-center gap-6 pt-24"
				>
					<motion.div variants={socialItemVariants}>
						<Link href="https://x.com/zacowan_">
							<TwitterIcon />
						</Link>
					</motion.div>
					<motion.div variants={socialItemVariants}>
						<Link href="https://www.instagram.com/zacowan/">
							<InstagramIcon />
						</Link>
					</motion.div>
					<motion.div variants={socialItemVariants}>
						<Link href="https://www.linkedin.com/in/zacowan/">
							<LinkedInIcon />
						</Link>
					</motion.div>
				</motion.div>
			</div>
		</main>
	);
}
