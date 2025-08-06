import LiquidGlassLink from "@/components/LiquidGlassLink";

export default function Wip() {
	return (
		<main className="min-h-screen flex items-center justify-center">
			<div className="text-white text-center max-w-md flex flex-col gap-6 items-center">
				<h1 className="text-5xl">Work in Progress</h1>
				<p>WebAssembly and video games are coming soon.</p>
				<LiquidGlassLink href="/">Go Back</LiquidGlassLink>
			</div>
		</main>
	);
}
