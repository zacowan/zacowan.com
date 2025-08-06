import Link from "next/link";
import type { ReactNode } from "react";

interface LiquidGlassLinkProps {
	href: string;
	children: ReactNode;
	className?: string;
}

export default function LiquidGlassLink({
	href,
	children,
	className = "",
}: LiquidGlassLinkProps) {
	return (
		<Link
			href={href}
			className={`group relative inline-flex items-center justify-center px-8 py-3 rounded-3xl bg-gradient-to-br from-blue-400/20 to-purple-500/20 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:from-blue-400/30 hover:to-purple-500/30 ${className}`}
		>
			{/* Liquid glass effect overlay */}
			<div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

			{/* Content */}
			<div className="relative z-10">
				<span className="text-white group-hover:text-blue-200 transition-colors duration-300 font-medium text-sm">
					{children}
				</span>
			</div>

			{/* Glow effect */}
			<div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
		</Link>
	);
}
