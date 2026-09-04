"use client";

import { useEffect, useRef, useState } from "react";
import { createRenderer } from "@/agent-radiance-cascades/renderer";

export function RadianceCascadesHero() {
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
			() => {
				if (active) setRendering(false);
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
