"use client";

import { useEffect, useRef, useState } from "react";
import { createRenderer } from "@/agent-radiance-cascades/renderer";

const isWebGpuUnavailable = (error: unknown) =>
	error instanceof Error &&
	"code" in error &&
	error.code === "VGPU-RING1-UNSUPPORTED";

export function CubesHero() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [rendering, setRendering] = useState(false);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		let active = true;
		const renderer = createRenderer({ canvas });
		renderer.ready.then(
			() => {
				if (active) setRendering(true);
			},
			(error: unknown) => {
				if (active) setRendering(false);
				if (!isWebGpuUnavailable(error)) console.error(error);
			},
		);
		return () => {
			active = false;
			renderer.dispose();
		};
	}, []);

	return (
		<div className="flare-stage" data-rendering={rendering ? "true" : "false"}>
			<div className="flare-fallback" aria-hidden="true">
				<span className="flare-cube flare-cube-left" />
				<span className="flare-cube flare-cube-right" />
			</div>
			<canvas
				ref={canvasRef}
				className="flare-canvas"
				aria-label="Animated two-cube radiance cascade rendered with WebGPU"
			/>
		</div>
	);
}
