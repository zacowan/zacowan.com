import type { ReactElement } from "react";

const gridLine = "rgba(255, 255, 255, 0.045)";
const muted = "#71717a";
const body = "#d4d4d8";

export const ogSize = {
	width: 1200,
	height: 630,
};

export const ogAlt =
	"Zach Cowan preview image with name and description on a monochrome editorial background.";

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
				fontFamily:
					'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
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
					fontFamily:
						'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
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
						fontFamily:
							'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
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
						fontFamily: 'Georgia, "Times New Roman", serif',
						fontSize: 122,
						lineHeight: 0.88,
						letterSpacing: "-0.05em",
					}}
				>
					<div style={{ display: "flex" }}>Zach</div>
					<div style={{ display: "flex" }}>Cowan</div>
				</div>
				<div
					style={{
						display: "flex",
						marginTop: 42,
						fontFamily:
							'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
						fontSize: 18,
						letterSpacing: "0.2em",
						color: muted,
					}}
				>
					DESCRIPTION
				</div>
				<div
					style={{
						display: "flex",
						marginTop: 18,
						maxWidth: 820,
						fontSize: 34,
						lineHeight: 1.35,
						color: body,
					}}
				>
					Designing systems for core infrastructure reliability and agentic
					guardrails for shipping safe, production-ready code.
				</div>
			</div>
		</div>
	);
}
