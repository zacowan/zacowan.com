const links = [
	{
		command: "open github",
		href: "https://github.com/zacowan",
		label: "github.com/zacowan",
	},
	{
		command: "open linkedin",
		href: "https://linkedin.com/in/zacowan",
		label: "linkedin.com/in/zacowan",
	},
	{
		command: "open x",
		href: "https://x.com/zacowan_",
		label: "x.com/zacowan_",
	},
];

const experience = [
	["n - 1", "American Express", "Software engineering, web frameworks"],
	["n - 2", "Lockheed Martin", "Software engineering, embedded systems"],
];

export default function Home() {
	return (
		<main className="terminal-surface">
			<section className="mx-auto grid min-h-screen w-full max-w-5xl content-center px-6 py-20 sm:px-8 lg:px-10">
				<div className="max-w-3xl -translate-y-8">
					<p className="font-tech text-sm text-zinc-500">
						<span className="text-emerald-400">~</span> / zacowan
					</p>

					<div className="mt-10 space-y-7">
						<div>
							<p className="font-tech text-sm text-zinc-500">
								<span className="text-zinc-300">$</span> whoami
							</p>
							<h1 className="font-pixel mt-3 text-4xl tracking-[0.01em] text-white sm:text-5xl md:text-6xl">
								Zach Cowan
							</h1>
						</div>
					</div>

					<div className="mt-12 rounded-lg border border-white/10 bg-white/[0.025]">
						<div className="border-b border-white/10 px-4 py-3">
							<p className="font-tech text-sm text-zinc-500">
								<span className="text-zinc-300">$</span> work --current
							</p>
						</div>
						<div className="px-4 py-5">
							<div>
								<p className="font-medium text-zinc-100">Vercel</p>
								<p className="mt-1 text-sm text-zinc-500">
									Software engineering, core platform
								</p>
							</div>
						</div>
					</div>

					<div className="mt-4 rounded-lg border border-white/10 bg-black/30">
						<div className="border-b border-white/10 px-4 py-3">
							<p className="font-tech text-sm text-zinc-500">
								<span className="text-zinc-300">$</span> work --previous
							</p>
						</div>
						<div className="divide-y divide-white/10">
							{experience.map(([status, company, role]) => (
								<div
									key={`${status}-${company}`}
									className="grid gap-1 px-4 py-4 sm:grid-cols-[7rem_1fr] sm:gap-4"
								>
									<p className="font-tech text-sm text-zinc-500">{status}</p>
									<div>
										<p className="font-medium text-zinc-100">{company}</p>
										<p className="mt-1 text-sm text-zinc-500">{role}</p>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="mt-10 space-y-3">
						{links.map((link) => (
							<a
								key={link.href}
								href={link.href}
								className="group grid gap-1 text-sm sm:grid-cols-[9rem_1fr] sm:gap-4"
							>
								<span className="font-tech text-zinc-500 transition-colors group-hover:text-zinc-300">
									$ {link.command}
								</span>
								<span className="text-zinc-300 transition-colors group-hover:text-white">
									{link.label}
								</span>
							</a>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}
