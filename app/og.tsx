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
	"Zach Cowan's terminal-style profile with two ember-lit radiance-cascade cubes.";

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
				backgroundColor: "#000",
				color: "#fafafa",
				fontFamily: "Geist Mono",
				padding: "58px 72px",
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
					flex: 1,
					marginTop: 34,
					border: `1px solid ${rule}`,
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						width: "58%",
						padding: "44px",
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
						position: "relative",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						width: "42%",
						borderLeft: `1px solid ${rule}`,
						overflow: "hidden",
					}}
				>
					<div
						style={{
							position: "absolute",
							left: 96,
							top: 80,
							display: "flex",
							width: 360,
							height: 2,
							background: "#ef4444",
							opacity: 0.25,
							transform: "rotate(-18deg)",
						}}
					/>
					{[150, 282].map((left) => (
						<div
							key={left}
							style={{
								position: "absolute",
								left,
								top: 160,
								display: "flex",
								width: 82,
								height: 82,
								background: "#ef4444",
								border: "2px solid #fecaca",
							}}
						/>
					))}
					<div
						style={{
							position: "absolute",
							top: 20,
							right: 20,
							display: "flex",
							fontSize: 14,
							color: muted,
						}}
					>
						CASCADES / 01
					</div>
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
