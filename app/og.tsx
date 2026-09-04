import { readFile } from "node:fs/promises";
import path from "node:path";
import type { ImageResponseOptions } from "next/server";
import type { ReactElement } from "react";
import { profile } from "@/lib/site-content";

const muted = "#71717a";
const subtle = "#a1a1aa";
const rule = "rgba(255, 255, 255, 0.15)";

export const ogSize = {
	width: 1200,
	height: 630,
};

export const ogAlt =
	"Terminal-style preview for Zach Cowan, Software engineer on Vercel's Core Platform team.";

export async function getOgFonts(): Promise<ImageResponseOptions["fonts"]> {
	const [geistSans, geistMono, geistPixel] = await Promise.all([
		readFile(path.join(process.cwd(), "app/og-fonts/geist.ttf")),
		readFile(path.join(process.cwd(), "app/og-fonts/geist-mono.ttf")),
		readFile(path.join(process.cwd(), "app/og-fonts/geist-pixel-square.ttf")),
	]);

	return [
		{
			name: "Geist Sans",
			data: geistSans,
			style: "normal" as const,
			weight: 400,
		},
		{
			name: "Geist Mono",
			data: geistMono,
			style: "normal" as const,
			weight: 400,
		},
		{
			name: "Geist Pixel Square",
			data: geistPixel,
			style: "normal" as const,
			weight: 500,
		},
	] as ImageResponseOptions["fonts"];
}

export function OgCard(): ReactElement {
	return (
		<div
			style={{
				height: "100%",
				width: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				backgroundColor: "#000",
				color: "#fafafa",
				fontFamily: "Geist Mono",
				padding: "72px 96px",
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					fontSize: 22,
					color: muted,
				}}
			>
				<span style={{ color: "#34d399" }}>~</span>
				<span>&nbsp;/ zacowan</span>
			</div>

			<div
				style={{
					display: "flex",
					flexDirection: "column",
					marginTop: 58,
				}}
			>
				<div style={{ display: "flex", fontSize: 22, color: muted }}>
					<span style={{ color: subtle }}>$</span>
					<span>&nbsp;whoami</span>
				</div>
				<div
					style={{
						display: "flex",
						marginTop: 18,
						fontSize: 82,
						fontFamily: "Geist Pixel Square",
						fontWeight: 500,
						lineHeight: 1,
						letterSpacing: "0.01em",
					}}
				>
					{profile.name}
				</div>
				<div
					style={{
						display: "flex",
						marginTop: 22,
						fontFamily: "Geist Sans",
						fontSize: 30,
						lineHeight: 1.35,
						color: "#d4d4d8",
					}}
				>
					{profile.role}
				</div>
			</div>

			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					width: "100%",
					marginTop: 68,
					paddingTop: 24,
					borderTop: `1px solid ${rule}`,
					fontSize: 20,
					color: muted,
				}}
			>
				<div style={{ display: "flex" }}>
					<span style={{ color: subtle }}>$</span>
					<span>&nbsp;profile --summary</span>
				</div>
				<div style={{ display: "flex", color: subtle }}>zacowan.com</div>
			</div>
		</div>
	);
}
