import { readFile } from "node:fs/promises";
import path from "node:path";
import type { ImageResponseOptions } from "next/server";
import type { ReactElement } from "react";

const gridLine = "rgba(255, 255, 255, 0.045)";
const muted = "#71717a";

export const ogSize = {
	width: 1200,
	height: 630,
};

export const ogAlt =
	"Zach Cowan preview image with monochrome editorial name card.";

export async function getOgFonts(): Promise<ImageResponseOptions["fonts"]> {
	const [instrumentSerif, geistSans, geistMono] = await Promise.all([
		readFile(path.join(process.cwd(), "app/og-fonts/instrument-serif.woff2")),
		readFile(path.join(process.cwd(), "app/og-fonts/geist.woff2")),
		readFile(path.join(process.cwd(), "app/og-fonts/geist-mono.woff2")),
	]);

	return [
		{
			name: "OgDisplay",
			data: instrumentSerif,
			style: "normal" as const,
			weight: 400,
		},
		{
			name: "OgSans",
			data: geistSans,
			style: "normal" as const,
			weight: 400,
		},
		{
			name: "OgMono",
			data: geistMono,
			style: "normal" as const,
			weight: 400,
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
				position: "relative",
				backgroundColor: "#0a0a0a",
				color: "white",
				fontFamily: "OgSans",
			}}
		>
			<div
				style={{
					position: "absolute",
					inset: 0,
					backgroundImage: `
						linear-gradient(to right, ${gridLine} 1px, transparent 1px),
						linear-gradient(to bottom, ${gridLine} 1px, transparent 1px)
					`,
					backgroundSize: "24px 24px",
				}}
			/>
			<div
				style={{
					position: "absolute",
					left: 72,
					right: 72,
					top: 0,
					bottom: 0,
					borderLeft: `1px solid ${gridLine}`,
					borderRight: `1px solid ${gridLine}`,
				}}
			/>
			<div
				style={{
					position: "absolute",
					left: 0,
					right: 0,
					top: 78,
					height: 1,
					background: gridLine,
				}}
			/>
			<div
				style={{
					position: "absolute",
					left: 120,
					top: 52,
					display: "flex",
					fontFamily: "OgMono",
					fontSize: 22,
					letterSpacing: "0.28em",
					color: "#a1a1aa",
				}}
			>
				ZACOWAN
			</div>

			<div
				style={{
					position: "absolute",
					left: 120,
					right: 120,
					top: 154,
					display: "flex",
					flexDirection: "column",
				}}
			>
				<div
					style={{
						display: "flex",
						fontFamily: "OgMono",
						fontSize: 20,
						letterSpacing: "0.24em",
						color: muted,
					}}
				>
					MANIFEST
				</div>
				<div
					style={{
						display: "flex",
						marginTop: 30,
						flexDirection: "column",
						fontFamily: "OgDisplay",
						fontSize: 122,
						lineHeight: 0.88,
						letterSpacing: "-0.05em",
					}}
				>
					<div style={{ display: "flex" }}>Zach</div>
					<div style={{ display: "flex" }}>Cowan</div>
				</div>
			</div>
		</div>
	);
}
