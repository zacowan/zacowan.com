import { MeshGradient } from "@paper-design/shaders-react";
import type React from "react";

interface AnimatedBackgroundProps {
	children: React.ReactNode;
}

export default function AnimatedBackground({
	children,
}: AnimatedBackgroundProps) {
	return (
		<div className="min-h-screen bg-black relative overflow-hidden">
			{/* SVG Filters */}
			<svg className="absolute inset-0 w-0 h-0" aria-hidden="true">
				<defs>
					<filter
						id="glass-effect"
						x="-50%"
						y="-50%"
						width="200%"
						height="200%"
					>
						<feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
						<feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
						<feColorMatrix
							type="matrix"
							values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
							result="tint"
						/>
					</filter>
					<filter
						id="gooey-filter"
						x="-50%"
						y="-50%"
						width="200%"
						height="200%"
					>
						<feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
						<feColorMatrix
							in="blur"
							mode="matrix"
							values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
							result="gooey"
						/>
						<feComposite in="SourceGraphic" in2="gooey" operator="atop" />
					</filter>
				</defs>
			</svg>

			{/* Background Shaders */}
			<MeshGradient
				className="absolute inset-0 w-full h-full"
				colors={["#0a0a23", "#1a1a4b", "#16213e", "#0f3460", "#1e3a8a"]}
				speed={0.6}
			/>
			<MeshGradient
				className="absolute inset-0 w-full h-full opacity-60"
				colors={["#0a0a23", "#1e3a8a", "#1a1a4b", "#0f3460"]}
				speed={0.4}
			/>

			<div className="relative">{children}</div>
		</div>
	);
}
