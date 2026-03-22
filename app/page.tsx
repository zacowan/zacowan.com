import Vercel from "@/components/icons/vercel";

const uptimeBarsSmall = Array.from({ length: 72 }, () => "bg-white");
const uptimeBarsMedium = Array.from({ length: 96 }, () => "bg-white");
const uptimeBarsWide = Array.from({ length: 48 }, () => "bg-white");

const links = [
	{
		href: "https://github.com/zacowan",
		index: "01",
		label: "GitHub",
		code: "GH",
		route: "US_EAST_1-MH",
	},
	{
		href: "https://linkedin.com/in/zacowan",
		index: "02",
		label: "LinkedIn",
		code: "LI",
		route: "US_EAST_1-BK",
	},
	{
		href: "https://x.com/zacowan_",
		index: "03",
		label: "X",
		code: "X",
		route: "US_EAST_1-SI",
	},
];

export default function Home() {
	return (
		<main className="pb-20 pt-10 md:pb-28 md:pt-14">
			<section className="grid gap-12 border-b border-white/10 pb-20 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_26rem] md:pb-24">
				<div className="px-4 md:px-6 lg:px-8">
					<p className="font-tech text-[10px] uppercase tracking-[0.28em] text-zinc-500">
						MANIFEST
					</p>
					<h1 className="font-display mt-6 text-6xl leading-[0.86] tracking-[-0.04em] text-white sm:text-7xl md:text-[7.5rem] lg:text-[9rem]">
						Zach
						<br />
						Cowan
					</h1>
					<div className="mt-10 max-w-2xl space-y-8">
						<div className="space-y-2">
							<p className="font-tech text-[10px] uppercase tracking-[0.24em] text-zinc-500">
								NODE[0]
							</p>
							<p className="font-copy text-lg leading-8 text-zinc-200 md:text-xl">
								Core platform engineering at{" "}
								<a
									href="https://vercel.com/careers"
									className="ml-4 inline-flex items-center border border-white/10 bg-neutral-900 px-4 py-3 text-white transition-colors hover:bg-zinc-800"
								>
									<Vercel />
								</a>
							</p>
						</div>
						<div className="grid gap-6 pt-8 md:grid-cols-2">
							<div>
								<p className="font-tech text-[10px] uppercase tracking-[0.24em] text-zinc-500">
									NODE[1]
								</p>
								<p className="font-copy mt-2 text-base text-zinc-300">American Express</p>
								<p className="font-tech mt-2 text-[10px] uppercase tracking-[0.2em] text-zinc-600">
									SOFTWARE_ENGINEERING
								</p>
							</div>
							<div>
								<p className="font-tech text-[10px] uppercase tracking-[0.24em] text-zinc-500">
									NODE[2]
								</p>
								<p className="font-copy mt-2 text-base text-zinc-300">Lockheed Martin</p>
								<p className="font-tech mt-2 text-[10px] uppercase tracking-[0.2em] text-zinc-600">
									SOFTWARE_ENGINEERING
								</p>
							</div>
						</div>
						<div className="pt-8">
							<p className="font-tech text-[10px] uppercase tracking-[0.24em] text-zinc-500">
								DESCRIPTION
							</p>
							<p className="font-copy mt-4 max-w-xl text-sm leading-7 text-zinc-400 md:text-base">
								Designing systems for core infrastructure reliability and agentic
								guardrails for shipping safe, production-ready code.
							</p>
						</div>
					</div>
				</div>
				<div className="px-4 md:px-6 lg:pt-4 lg:px-8">
					<div className="glass-panel border border-white/10 bg-zinc-900/70 p-6">
						<p className="font-tech text-[10px] uppercase tracking-[0.26em] text-zinc-500">
							TELEMETRY
						</p>
						<div className="mt-6 space-y-3 font-tech text-[9px] uppercase tracking-[0.14em] text-zinc-400 md:text-[10px] md:tracking-[0.18em]">
							<div className="grid grid-cols-[5.75rem_minmax(0,1fr)] items-center gap-3 border-b border-white/10 pb-3">
								<span>Region</span>
								<span className="overflow-hidden text-right text-zinc-300 whitespace-nowrap">
									US_EAST_1-NY
								</span>
							</div>
							<div className="grid grid-cols-[5.75rem_minmax(0,1fr)] items-center gap-3 border-b border-white/10 pb-3">
								<span>Role</span>
								<span className="overflow-hidden text-right text-zinc-300 whitespace-nowrap">
									SOFTWARE_ENGINEER
								</span>
							</div>
							<div className="grid grid-cols-[5.75rem_minmax(0,1fr)] items-center gap-3 border-b border-white/10 pb-3">
								<span>Protocol</span>
								<span className="overflow-hidden text-right text-zinc-300 whitespace-nowrap">
									RELIABILITY
								</span>
							</div>
							<div className="grid grid-cols-[5.75rem_minmax(0,1fr)] items-center gap-3 text-white">
								<span className="flex items-center gap-2">
									<span className="status-pulse inline-block size-2 bg-white" />
									Active
								</span>
								<span className="text-right text-zinc-300 whitespace-nowrap">100%</span>
							</div>
							<div className="pt-1">
								<div className="grid grid-cols-[repeat(72,minmax(0,1fr))] gap-px md:hidden">
									{uptimeBarsSmall.map((bar, index) => (
										<div key={`telemetry-small-${index}`} className={`h-1.5 ${bar}`} />
									))}
								</div>
								<div className="hidden grid-cols-[repeat(96,minmax(0,1fr))] gap-px md:grid lg:hidden">
									{uptimeBarsMedium.map((bar, index) => (
										<div key={`telemetry-medium-${index}`} className={`h-1.5 ${bar}`} />
									))}
								</div>
								<div className="hidden grid-cols-[repeat(48,minmax(0,1fr))] gap-px lg:grid">
									{uptimeBarsWide.map((bar, index) => (
										<div key={`telemetry-wide-${index}`} className={`h-1.5 ${bar}`} />
									))}
								</div>
							</div>
						</div>
					</div>
					<div className="mt-6 hidden font-tech text-[10px] uppercase leading-6 tracking-[0.24em] text-zinc-600 lg:block">
						<p>Fig_01</p>
						<p>Monochrome_Editorial_System</p>
						<p>Sharp_Edges / Tonal_Layers / Low_Noise</p>
					</div>
				</div>
			</section>

			<section className="py-20 md:py-24">
				<div className="px-4 md:px-6 lg:px-8">
					<div className="mb-10 flex items-end justify-between gap-6">
						<div>
							<p className="font-tech text-[10px] uppercase tracking-[0.24em] text-zinc-500">
								NETWORKING
							</p>
							<h2 className="font-display mt-4 text-4xl tracking-[-0.04em] text-white md:text-5xl">
								Signals and links.
							</h2>
						</div>
						<p className="font-tech hidden text-[10px] uppercase tracking-[0.24em] text-zinc-600 md:block">
							ACTIVE_POPS
						</p>
					</div>
					<div className="grid gap-px bg-white/10 md:grid-cols-3">
						{links.map((link) => (
							<a
								key={link.label}
								href={link.href}
								className="group flex aspect-[4/3] flex-col justify-between bg-neutral-950 p-6 transition-colors hover:bg-zinc-900 md:aspect-square"
							>
								<span className="font-tech text-[10px] uppercase tracking-[0.24em] text-zinc-500 transition-colors group-hover:text-zinc-300">
									{link.index} / {link.label}
								</span>
								<div className="flex items-end justify-between">
									<span className="font-copy text-3xl text-white md:text-4xl">{link.code}</span>
									<span className="font-tech text-[10px] uppercase tracking-[0.24em] text-zinc-600 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">
										{link.route}
									</span>
								</div>
							</a>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}
