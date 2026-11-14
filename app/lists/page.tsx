import type { Metadata } from "next";
import { ListsControls } from "@/components/lists-controls";
import { ListsShell } from "@/components/lists-shell";
import { Rating } from "@/components/rating";
import { readFeed, readLists } from "@/lib/lists/data";
import { type FeedSearchParams, feedFilters } from "@/lib/lists/feed-filters";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
	title: "Lists · Zach Cowan",
	description:
		"Places, movies, and other things I've rated, most recently rated first.",
	alternates: { canonical: "/lists", types: { "text/markdown": "/lists.md" } },
};
const dateFormat = new Intl.DateTimeFormat("en-US", {
	dateStyle: "medium",
	timeZone: "UTC",
});
export default async function ListsPage({
	searchParams,
}: {
	searchParams: Promise<FeedSearchParams>;
}) {
	const filters = feedFilters(await searchParams);
	const [items, types] = await Promise.all([readFeed(filters), readLists()]);
	const filtered = Boolean(filters.query || filters.types.length);
	return (
		<ListsShell>
			<header className="mb-8">
				<h1 className="font-pixel text-4xl tracking-[0.01em] text-white sm:text-5xl">
					Lists
				</h1>
				<p className="mt-4 leading-7 text-zinc-400">
					Places, movies, and other things I&apos;ve rated.
				</p>
			</header>
			<ListsControls filters={filters} types={types} />
			<div className="mb-4 flex flex-wrap items-baseline justify-between gap-3 text-sm text-zinc-400">
				<p>
					{items.length} {items.length === 1 ? "entry" : "entries"} · Most
					recently rated
				</p>
				{filtered && (
					<a
						href="/lists"
						className="underline underline-offset-4 hover:text-white"
					>
						Clear search and filters
					</a>
				)}
			</div>
			{items.length === 0 ? (
				<p className="border-t border-zinc-800 py-8 leading-7 text-zinc-400">
					{filtered
						? "No entries match your search and filters."
						: "No ratings yet. Check back soon."}
				</p>
			) : (
				<ol
					aria-label="Entries, most recently rated first"
					className="divide-y divide-zinc-800 border-y border-zinc-800"
				>
					{items.map((entry) => (
						<li key={entry.id} id={`entry-${entry.id}`} className="py-7">
							<article>
								<div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-baseline sm:gap-8">
									<h2 className="min-w-0 break-words text-xl text-zinc-100">
										{entry.url ? (
											<a
												href={entry.url}
												rel="noreferrer"
												className="underline underline-offset-4 hover:text-white"
											>
												{entry.name}
											</a>
										) : (
											entry.name
										)}
									</h2>
									<div className="shrink-0">
										<Rating rating={entry.rating} />
									</div>
								</div>
								<div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-zinc-400">
									<span>{entry.listName}</span>
									{entry.ratedAt && (
										<span>
											Rated{" "}
											<time dateTime={entry.ratedAt.toISOString()}>
												{dateFormat.format(entry.ratedAt)}
											</time>
										</span>
									)}
								</div>
								{Object.keys(entry.details).length > 0 && (
									<dl className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-zinc-400">
										{Object.entries(entry.details).map(([key, value]) => (
											<div key={key} className="min-w-0 break-words">
												<dt className="inline">{key}: </dt>
												<dd className="inline">{value}</dd>
											</div>
										))}
									</dl>
								)}
								{entry.review && (
									<p className="mt-4 max-w-2xl whitespace-pre-wrap break-words leading-7 text-zinc-300">
										{entry.review}
									</p>
								)}
								{(entry.experiencedOn || entry.tags.length > 0) && (
									<div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-400">
										{entry.experiencedOn && (
											<span>
												Experienced{" "}
												<time dateTime={entry.experiencedOn}>
													{entry.experiencedOn}
												</time>
											</span>
										)}
										{entry.tags.map((tag) => (
											<span key={tag}>#{tag}</span>
										))}
									</div>
								)}
							</article>
						</li>
					))}
				</ol>
			)}
		</ListsShell>
	);
}
