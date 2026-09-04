import { CubesHero } from "@/components/cubes-hero";
import {
	experience,
	links,
	personJsonLd,
	profile,
	recentShips,
} from "@/lib/site-content";

export default function Home() {
	return (
		<>
			{/* The JSON-LD object is locally defined, contains no user input, and escapes HTML openers. */}
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: static structured data is escaped before insertion
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
				}}
			/>
			<a
				href="#main-content"
				className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:text-black"
			>
				Skip to content
			</a>
			<main id="main-content" className="terminal-surface">
				<div className="mx-auto w-full max-w-6xl px-6 pb-24 sm:px-8 lg:px-10">
					<div className="site-path font-tech flex h-16 items-center justify-between px-5 text-xs text-zinc-500">
						<p>
							<span className="text-white">~</span> / zacowan
						</p>
						<p className="hidden sm:block">NYC / ONLINE</p>
					</div>

					<header className="hero-grid">
						<div className="hero-copy flex min-h-[18rem] items-center p-6 sm:min-h-[22rem] sm:p-10 lg:min-h-[38rem] lg:p-12">
							<div>
								<p className="font-tech text-sm text-zinc-500">
									<span className="text-zinc-300">$</span> whoami
								</p>
								<h1 className="font-pixel mt-4 text-5xl tracking-[0.01em] text-white sm:text-6xl lg:text-7xl">
									{profile.name}
								</h1>
								<p className="mt-5 max-w-md text-lg leading-8 text-zinc-300">
									{profile.role}
								</p>
							</div>
						</div>

						<div className="hero-visual relative min-h-[28rem] overflow-hidden lg:min-h-0">
							<CubesHero />
						</div>
					</header>

					<article className="mx-auto max-w-3xl pt-20">
						<section className="mt-16">
							<h2 className="font-tech text-sm text-zinc-400">
								<span className="text-zinc-300">$</span> profile --summary
							</h2>
							<div className="mt-5 space-y-4 text-base leading-7 text-zinc-300">
								{profile.summary.map((paragraph) => (
									<p key={paragraph}>{paragraph}</p>
								))}
							</div>
						</section>

						<section className="mt-16">
							<h2 className="font-tech text-sm text-zinc-400">
								<span className="text-zinc-300">$</span> work --history
							</h2>
							<div className="mt-5">
								{experience.map(([status, company, role]) => (
									<div
										key={`${status}-${company}`}
										className="grid gap-1 py-4 sm:grid-cols-[7rem_1fr] sm:gap-4"
									>
										<p className="font-tech text-sm text-zinc-500">{status}</p>
										<div>
											<p className="font-medium text-zinc-100">{company}</p>
											<p className="mt-1 text-sm leading-6 text-zinc-500">
												{role}
											</p>
										</div>
									</div>
								))}
							</div>
						</section>

						<section className="mt-16">
							<h2 className="font-tech text-sm text-zinc-400">
								<span className="text-zinc-300">$</span> ships --recent
							</h2>
							<div className="mt-5">
								{recentShips.map((ship) => (
									<a
										key={ship.href}
										href={ship.href}
										target="_blank"
										rel="noreferrer"
										className="group grid gap-2 py-4 transition-colors sm:grid-cols-[7rem_1fr] sm:gap-4"
									>
										<p className="font-tech text-sm text-zinc-500">
											{ship.label}
										</p>
										<div>
											<p className="font-medium text-zinc-100 transition-colors group-hover:text-white">
												{ship.title}
												<span aria-hidden="true" className="ml-2 text-zinc-600">
													↗
												</span>
											</p>
											<p className="mt-1 text-sm leading-6 text-zinc-500">
												{ship.description}
											</p>
										</div>
									</a>
								))}
							</div>
						</section>

						<nav aria-labelledby="profiles-heading" className="mt-16">
							<h2
								id="profiles-heading"
								className="font-tech text-sm text-zinc-400"
							>
								<span className="text-zinc-300">$</span> profiles --verified
							</h2>
							<div className="mt-5 space-y-3">
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
						</nav>
					</article>
				</div>
			</main>
		</>
	);
}
