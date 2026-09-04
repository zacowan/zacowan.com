"use client";

import { useEffect, useRef } from "react";
import { createRenderer } from "@/agent-radiance-cascades/renderer";

export function RadianceCascadesHero() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const renderer = createRenderer({ canvas });
		void renderer.ready;
		return () => renderer.dispose();
	}, []);

	return (
		<div className="flare-stage">
			<canvas
				ref={canvasRef}
				className="flare-canvas"
				aria-label="Animated two-cube radiance cascade rendered with WebGPU"
			/>
		</div>
	);
}
