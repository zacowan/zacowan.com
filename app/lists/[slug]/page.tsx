import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListsShell } from "@/components/lists-shell";
import { Rating } from "@/components/rating";
import { readList } from "@/lib/lists/data";
export const dynamic = "force-dynamic";
export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const list = await readList(slug);
	return list
		? {
				title: `${list.name} · Lists · Zach Cowan`,
				description:
					list.description || `Zach Cowan's ${list.name.toLowerCase()} list.`,
				alternates: {
					canonical: `/lists/${slug}`,
					types: { "text/markdown": `/lists/${slug}.md` },
				},
			}
		: { title: "List not found" };
}
export default async function ListPage({
	params,
	searchParams,
}: {
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ sort?: string }>;
}) {
	const { slug } = await params;
	const { sort = "recent" } = await searchParams;
	const list = await readList(slug, sort);
	if (!list) notFound();
	return (
		<ListsShell>
			<header className="pt-12 pb-10">
				<p className="font-tech break-all text-sm text-zinc-400">
					$ cat lists/{slug}
				</p>
				<h1 className="font-pixel mt-4 break-words text-4xl text-white sm:text-5xl">
					{list.name}
				</h1>
				{list.description && (
					<p className="mt-6 max-w-2xl whitespace-pre-wrap text-lg leading-8 text-zinc-300">
						{list.description}
					</p>
				)}
				<p className="mt-4 text-sm text-zinc-400">
					{list.entries.length}{" "}
					{list.entries.length === 1 ? "entry" : "entries"} · Ratings out of
					ten, shown as five stars.
				</p>
			</header>
			<nav
				aria-label="Sort entries"
				className="mb-6 flex flex-wrap items-center gap-5 text-sm text-zinc-400"
			>
				<span>Sort:</span>
				{[
					["recent", "Recent"],
					["rating", "Top rated"],
					["name", "Name"],
				].map(([value, label]) => (
					<a
						key={value}
						href={`?sort=${value}`}
						aria-current={
							sort === value ||
							(value === "recent" && !["rating", "name"].includes(sort))
								? "page"
								: undefined
						}
						className="underline-offset-4 hover:text-white aria-[current=page]:text-white aria-[current=page]:underline focus-visible:outline-2 focus-visible:outline-offset-4"
					>
						{label}
					</a>
				))}
			</nav>
			{list.entries.length === 0 ? (
				<p className="border-t border-zinc-800 py-8 text-zinc-400">
					No entries yet.
				</p>
			) : (
				<ol className="divide-y divide-zinc-800 border-y border-zinc-800">
					{list.entries.map((entry) => (
						<li key={entry.id} id={`entry-${entry.id}`} className="py-8">
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
									<p className="mt-4 max-w-2xl whitespace-pre-wrap leading-7 text-zinc-300">
										{entry.review}
									</p>
								)}
								<div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-400">
									{entry.experiencedOn && (
										<time dateTime={entry.experiencedOn}>
											{entry.experiencedOn}
										</time>
									)}
									{entry.tags.map((tag) => (
										<span key={tag}>#{tag}</span>
									))}
								</div>
							</article>
						</li>
					))}
				</ol>
			)}
		</ListsShell>
	);
}
