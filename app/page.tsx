import WaveCanvas from "@/components/wave-canvas";

export default function Home() {
	return (
		<main className="min-h-screen bg-stone-100 px-8 py-16">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-5xl md:text-7xl lg:text-8xl font-normal text-black mb-16 leading-tight">
					Zach in NYC
				</h1>

				<div className="flex justify-between gap-8 mb-16">
					<div className="text-2xl md:text-3xl text-black leading-relaxed">
						<div className="mb-1">
							building <a href="https://vercel.com/careers">Vercel</a>
						</div>
						<div className="mb-1">drinking coffee</div>
						<div>meeting people</div>
					</div>

					<div className="w-16 h-16 border-x-2 border-b-2 border-orange-500 flex-shrink-0 mt-2 relative overflow-hidden">
						<WaveCanvas />
					</div>
				</div>

				<div className="flex gap-8 text-xl md:text-2xl text-black">
					<a href="https://www.instagram.com/zacowan/">ig</a>
					<a href="https://x.com/zacowan_">bird</a>
					<a href="https://github.com/zacowan">octocat</a>
					<a href="https://www.linkedin.com/in/zacowan/">b2b saas</a>
				</div>
			</div>
		</main>
	);
}
