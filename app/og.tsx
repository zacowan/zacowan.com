import { readFile } from "node:fs/promises";
import path from "node:path";
import type { ImageResponseOptions } from "next/server";
import type { ReactElement } from "react";
import { profile } from "@/lib/site-content";

const muted = "#71717a";
const subtle = "#a1a1aa";
const ember = "#ff3b1f";

export const ogSize = {
	width: 1200,
	height: 630,
};

export const ogAlt =
	"Zach Cowan's terminal-style profile beside two ember-lit cubes.";

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
	const visualWidth = (1200 - 72 * 2) * 0.42;
	const cube = visualWidth * 0.15;

	return (
		<div
			style={{
				height: "100%",
				width: "100%",
				display: "flex",
				flexDirection: "column",
				backgroundColor: "#000",
				color: "#fafafa",
				fontFamily: "Geist Mono",
				padding: "58px 72px",
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					fontSize: 20,
					color: muted,
				}}
			>
				<div style={{ display: "flex" }}>
					<span style={{ color: "#fafafa" }}>~</span>
					<span>&nbsp;/ zacowan</span>
				</div>
				<div style={{ display: "flex" }}>NYC / ONLINE</div>
			</div>

			<div style={{ display: "flex", flex: 1, marginTop: 34 }}>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						width: "58%",
						paddingRight: 44,
					}}
				>
					<div style={{ display: "flex", fontSize: 20, color: muted }}>
						<span style={{ color: subtle }}>$</span>
						<span>&nbsp;whoami</span>
					</div>
					<div
						style={{
							display: "flex",
							marginTop: 18,
							fontSize: 72,
							fontFamily: "Geist Pixel Square",
							fontWeight: 500,
							lineHeight: 1,
						}}
					>
						{profile.name}
					</div>
					<div
						style={{
							display: "flex",
							marginTop: 22,
							maxWidth: 520,
							fontFamily: "Geist Sans",
							fontSize: 27,
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
						alignItems: "center",
						justifyContent: "center",
						width: "42%",
						gap: visualWidth * 0.22 - cube,
					}}
				>
					{["left", "right"].map((side) => (
						<div
							key={side}
							style={{
								display: "flex",
								width: cube,
								height: cube,
								background: ember,
							}}
						/>
					))}
				</div>
			</div>

			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					width: "100%",
					marginTop: 24,
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
