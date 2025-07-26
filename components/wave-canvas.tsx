"use client";

import { useEffect, useRef } from "react";

export default function WaveCanvas() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		// Set canvas size
		canvas.width = 64;
		canvas.height = 64;

		let animationId: number;
		let time = 0;

		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// Set orange color
			ctx.fillStyle = "#f4a261";

			// Create wave effect
			ctx.beginPath();

			// Draw wave using sine function
			const amplitude = 8; // Wave height
			const frequency = 0.02; // Wave frequency
			const speed = 0.05; // Animation speed
			const baseHeight = canvas.height * 0.6; // Base water level

			ctx.moveTo(0, canvas.height);

			// Create wave points
			for (let x = 0; x <= canvas.width; x++) {
				const y =
					baseHeight +
					Math.sin(x * frequency + time * speed) * amplitude +
					Math.sin(x * frequency * 2 + time * speed * 1.5) * (amplitude * 0.5);
				ctx.lineTo(x, y);
			}

			// Complete the shape
			ctx.lineTo(canvas.width, canvas.height);
			ctx.lineTo(0, canvas.height);
			ctx.closePath();
			ctx.fill();

			// Add some splash effects
			ctx.fillStyle = "#f4a261";
			const splashX = 32 + Math.sin(time * speed * 2) * 15;
			const splashY = baseHeight - 5 + Math.cos(time * speed * 3) * 3;
			const splashSize = 2 + Math.abs(Math.sin(time * speed * 4)) * 2;

			ctx.beginPath();
			ctx.arc(splashX, splashY, splashSize, 0, Math.PI * 2);
			ctx.fill();

			time++;
			animationId = requestAnimationFrame(animate);
		};

		animate();

		return () => {
			if (animationId) {
				cancelAnimationFrame(animationId);
			}
		};
	}, []);

	return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
