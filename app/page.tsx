import WaveCanvas from "@/components/wave-canvas";

export default function Home() {
	return (
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
						<WaveCanvas />
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
	);
}
