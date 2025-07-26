"use client";

import { useEffect, useRef } from "react";

export default function Home() {
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

	return (
		<>
			<main className="min-h-screen bg-[#f5f3f0] px-8 py-16">
				<div className="max-w-4xl mx-auto">
					{/* Main heading */}
					<h1 className="text-6xl md:text-7xl lg:text-8xl font-normal text-black mb-16 leading-tight">
						Zach in NYC
					</h1>

					{/* Description section with wave animation */}
					<div className="flex items-start gap-8 mb-16">
						<div className="text-2xl md:text-3xl text-black leading-relaxed">
							<div className="mb-1">
								building{" "}
								<a
									href="https://vercel.com"
									className="underline hover:no-underline transition-all"
								>
									Vercel
								</a>
							</div>
							<div className="mb-1">drinking coffee</div>
							<div>meeting people</div>
						</div>

						{/* Canvas wave animation */}
						<div className="w-16 h-16 border-2 border-[#f4a261] flex-shrink-0 mt-2 relative overflow-hidden">
							<canvas
								ref={canvasRef}
								className="absolute inset-0 w-full h-full"
							/>
						</div>
					</div>

					{/* Work link - made "work" clickable */}
					<div className="text-2xl md:text-3xl text-black mb-32">
						see my{" "}
						<a href="#" className="underline hover:no-underline transition-all">
							work
						</a>
					</div>

					{/* Bottom links */}
					<div className="flex gap-8 text-xl md:text-2xl text-black">
						<a href="#" className="underline hover:no-underline transition-all">
							ig
						</a>
						<a href="#" className="underline hover:no-underline transition-all">
							bird
						</a>
						<a href="#" className="underline hover:no-underline transition-all">
							b2b saas
						</a>
					</div>
				</div>
			</main>
		</>
	);
}
