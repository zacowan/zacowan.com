import type { ReactElement } from "react";

const gridLine = "rgba(255, 255, 255, 0.05)";
const borderLine = "rgba(255, 255, 255, 0.12)";
const muted = "#71717a";
const subtle = "#a1a1aa";
const card = "rgba(36, 36, 39, 0.92)";

export const ogSize = {
	width: 1200,
	height: 630,
};

export const ogAlt =
	"Zach Cowan homepage preview with monochrome editorial design and telemetry panel.";

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
					color: subtle,
				}}
			>
				ZACOWAN
			</div>

			<div
				style={{
					position: "absolute",
					left: 120,
					top: 150,
					width: 620,
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
						marginTop: 24,
						flexDirection: "column",
						fontFamily: 'Georgia, "Times New Roman", serif',
						fontSize: 116,
						lineHeight: 0.9,
						letterSpacing: "-0.05em",
					}}
				>
					<div style={{ display: "flex" }}>Zach</div>
					<div style={{ display: "flex" }}>Cowan</div>
				</div>
				<div
					style={{
						display: "flex",
						marginTop: 44,
						fontFamily:
							'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
						fontSize: 18,
						letterSpacing: "0.2em",
						color: muted,
					}}
				>
					NODE[0]
				</div>
				<div
					style={{
						display: "flex",
						marginTop: 16,
						alignItems: "center",
						gap: 18,
						fontSize: 26,
						color: "#e4e4e7",
					}}
				>
					<div style={{ display: "flex" }}>Core platform engineering at</div>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							padding: "12px 18px",
							border: `1px solid ${borderLine}`,
							background: "#18181b",
							fontWeight: 700,
						}}
					>
						Vercel
					</div>
				</div>
				<div
					style={{
						display: "flex",
						marginTop: 42,
						gap: 48,
					}}
				>
					<div style={{ display: "flex", flexDirection: "column", width: 260 }}>
						<div
							style={{
								display: "flex",
								fontFamily:
									'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
								fontSize: 18,
								letterSpacing: "0.2em",
								color: muted,
							}}
						>
							NODE[1]
						</div>
						<div style={{ display: "flex", marginTop: 14, fontSize: 24, color: "#d4d4d8" }}>
							American Express
						</div>
						<div
							style={{
								display: "flex",
								marginTop: 14,
								fontFamily:
									'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
								fontSize: 16,
								letterSpacing: "0.14em",
								color: muted,
							}}
						>
							SOFTWARE_ENGINEERING
						</div>
					</div>
					<div style={{ display: "flex", flexDirection: "column", width: 260 }}>
						<div
							style={{
								display: "flex",
								fontFamily:
									'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
								fontSize: 18,
								letterSpacing: "0.2em",
								color: muted,
							}}
						>
							NODE[2]
						</div>
						<div style={{ display: "flex", marginTop: 14, fontSize: 24, color: "#d4d4d8" }}>
							Lockheed Martin
						</div>
						<div
							style={{
								display: "flex",
								marginTop: 14,
								fontFamily:
									'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
								fontSize: 16,
								letterSpacing: "0.14em",
								color: muted,
							}}
						>
							SOFTWARE_ENGINEERING
						</div>
					</div>
				</div>
			</div>

			<div
				style={{
					position: "absolute",
					right: 120,
					top: 164,
					width: 330,
					padding: 28,
					display: "flex",
					flexDirection: "column",
					background: card,
					border: `1px solid ${borderLine}`,
				}}
			>
				<div
					style={{
						display: "flex",
						fontFamily:
							'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
						fontSize: 18,
						letterSpacing: "0.2em",
						color: muted,
					}}
				>
					TELEMETRY
				</div>
				{[
					["REGION", "US_EAST_1-NY"],
					["ROLE", "SOFTWARE_ENGINEER"],
					["PROTOCOL", "RELIABILITY"],
				].map(([label, value]) => (
					<div
						key={label}
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginTop: 24,
							paddingBottom: 12,
							borderBottom: `1px solid ${borderLine}`,
							fontFamily:
								'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
							fontSize: 16,
							letterSpacing: "0.14em",
							color: subtle,
						}}
					>
						<div style={{ display: "flex" }}>{label}</div>
						<div style={{ display: "flex" }}>{value}</div>
					</div>
				))}
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						marginTop: 22,
						fontFamily:
							'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
						fontSize: 16,
						letterSpacing: "0.14em",
					}}
				>
					<div style={{ display: "flex", alignItems: "center", gap: 10 }}>
						<div style={{ display: "flex", width: 10, height: 10, background: "white" }} />
						<div style={{ display: "flex" }}>ACTIVE</div>
					</div>
					<div style={{ display: "flex", color: subtle }}>100%</div>
				</div>
				<div style={{ display: "flex", gap: 2, marginTop: 16 }}>
					{Array.from({ length: 48 }).map((_, index) => (
						<div
							key={index}
							style={{
								display: "flex",
								flex: 1,
								height: 6,
								background: "white",
							}}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
