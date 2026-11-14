import type { ReactNode } from "react";
export function ListsShell({ children }: { children: ReactNode }) {
	return (
		<>
			<a
				href="#main-content"
				className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:text-black"
			>
				Skip to content
			</a>
			<main id="main-content" className="terminal-surface min-h-screen">
				<div className="mx-auto w-full max-w-4xl px-6 pb-24 sm:px-8">
					<nav
						aria-label="Breadcrumb"
						className="font-tech flex min-h-20 flex-wrap items-center gap-2 text-sm text-zinc-400"
					>
						<a
							href="/"
							className="hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4"
						>
							~ / zacowan
						</a>
						<span aria-hidden="true">/</span>
						<a
							href="/lists"
							className="hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4"
						>
							lists
						</a>
					</nav>
					{children}
					<footer className="mt-20 text-sm text-zinc-400">
						<a href="/" className="underline underline-offset-4">
							Zach Cowan
						</a>
						<span className="mx-3" aria-hidden="true">
							/
						</span>
						Personal opinions, subject to change.
					</footer>
				</div>
			</main>
		</>
	);
}
