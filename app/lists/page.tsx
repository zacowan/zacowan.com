import type { Metadata } from "next";
import { ListsShell } from "@/components/lists-shell";
import { readLists } from "@/lib/lists/data";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
	title: "Lists · Zach Cowan",
	description:
		"Places, movies, and other things, with personal ratings and notes from Zach Cowan.",
	alternates: { canonical: "/lists", types: { "text/markdown": "/lists.md" } },
};
export default async function ListsPage() {
	const lists = await readLists();
	return (
		<ListsShell>
			<header className="pt-12 pb-12">
				<p className="font-tech text-sm text-zinc-400">$ ls --personal</p>
				<h1 className="font-pixel mt-4 text-5xl text-white sm:text-6xl">
					Lists
				</h1>
				<p className="mt-6 max-w-xl text-lg leading-8 text-zinc-300">
					Places, movies, and other things. My ratings and a few notes along the
					way.
				</p>
				<p className="mt-3 text-sm text-zinc-400">
					Rated out of ten, shown as five stars.
				</p>
			</header>
			<section aria-label="Personal lists">
				{lists.length === 0 ? (
					<p className="border-t border-zinc-800 py-8 text-zinc-400">
						Nothing here yet. The first list is on its way.
					</p>
				) : (
					<ul className="divide-y divide-zinc-800 border-y border-zinc-800">
						{lists.map((list) => (
							<li key={list.id}>
								<a
									href={`/lists/${list.slug}`}
									className="group block py-7 focus-visible:outline-2 focus-visible:outline-offset-4"
								>
									<div className="flex items-baseline justify-between gap-6">
										<h2 className="text-xl text-zinc-100 group-hover:underline underline-offset-4">
											{list.name}
										</h2>
										<span className="font-tech shrink-0 text-sm tabular-nums text-zinc-400">
											{list.count} {list.count === 1 ? "entry" : "entries"}
										</span>
									</div>
									{list.description && (
										<p className="mt-2 max-w-2xl whitespace-pre-wrap leading-7 text-zinc-400">
											{list.description}
										</p>
									)}
								</a>
							</li>
						))}
					</ul>
				)}
			</section>
		</ListsShell>
	);
}
