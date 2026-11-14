import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
export function ListsShell({ children }: { children: ReactNode }) {
	return (
		<>
			<a
				href="#main-content"
				className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:text-black"
			>
				Skip to content
			</a>
			<div className="terminal-surface">
				<div className="mx-auto w-full max-w-6xl px-6 pb-24 sm:px-8 lg:px-10">
					<SiteHeader active="lists" />
					<main id="main-content" className="mx-auto max-w-3xl pt-12 sm:pt-16">
						{children}
						<footer className="mt-16 text-sm text-zinc-400">
							Rated out of ten, shown as five stars. Personal opinions, subject
							to change.
						</footer>
					</main>
				</div>
			</div>
		</>
	);
}
