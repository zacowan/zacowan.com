import { ImageResponse } from "next/og";

export const size = {
	width: 1200,
	height: 630,
};

export const contentType = "image/png";

export default async function Image() {
	return new ImageResponse(
		<div
			style={{
				backgroundColor: "#000000",
				color: "#ffffff",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				width: "100%",
				height: "100%",
				padding: "80px",
			}}
		>
			<div
				style={{
					fontSize: 72,
					letterSpacing: -1.5,
					lineHeight: 1.1,
				}}
			>
				Zach Cowan
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "flex-end",
				}}
			>
				<div
					style={{
						fontSize: 36,
						maxWidth: "72%",
						opacity: 0.8,
						lineHeight: 1.3,
					}}
				>
					The operating system built for me.
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: 12,
						alignItems: "flex-end",
					}}
				>
					<div style={{ fontSize: 28 }}>zacowan.com</div>
					<div style={{ fontSize: 24, opacity: 0.65 }}>@zacowan_</div>
				</div>
			</div>
		</div>,
		{
			...size,
		},
	);
}
