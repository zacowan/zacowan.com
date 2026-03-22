import type { ReactElement } from "react";

const gridLine = "rgba(255, 255, 255, 0.045)";
const muted = "#71717a";

export const ogSize = {
	width: 1200,
	height: 630,
};

export const ogAlt =
	"Zach Cowan preview image with monochrome editorial name card.";

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
				fontFamily: "serif",
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
					fontFamily: "monospace",
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
						fontFamily: "monospace",
						fontSize: 20,
						letterSpacing: "0.28em",
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
						fontFamily: "serif",
						fontSize: 112,
						fontWeight: 700,
						lineHeight: 0.9,
						letterSpacing: "-0.04em",
					}}
				>
					<div style={{ display: "flex" }}>Zach</div>
					<div style={{ display: "flex" }}>Cowan</div>
				</div>
			</div>
		</div>
	);
}
