import Link from "next/link";

export default function NotFound() {
	return (
		<main className="terminal-surface">
			<section className="mx-auto grid min-h-screen w-full max-w-5xl content-center px-6 py-20 sm:px-8 lg:px-10">
				<div className="max-w-2xl">
					<p className="font-tech text-sm text-zinc-500">
						<span className="text-zinc-300">$</span> resolve --path
					</p>
					<h1 className="font-pixel mt-3 text-4xl text-white sm:text-5xl">
						404: Page not found
					</h1>
					<p className="mt-6 text-base leading-7 text-zinc-300">
						The requested path does not exist on Zach Cowan&apos;s site. Use one
						of these indexes to recover.
					</p>
					<nav aria-label="Recovery links" className="mt-8 grid gap-3 text-sm">
						<Link className="text-zinc-300 hover:text-white" href="/">
							Homepage
						</Link>
						<a className="text-zinc-300 hover:text-white" href="/llms.txt">
							Agent overview
						</a>
						<a className="text-zinc-300 hover:text-white" href="/sitemap.xml">
							Sitemap
						</a>
					</nav>
				</div>
			</section>
		</main>
	);
}
