import type { FeedFilters } from "@/lib/lists/feed-filters";
export function ListsControls({
	filters,
	types,
}: {
	filters: FeedFilters;
	types: { slug: string; name: string; count: number }[];
}) {
	return (
		<search>
			<form
				action="/lists"
				method="get"
				className="mb-8 flex items-start gap-3"
			>
				<label htmlFor="lists-search" className="sr-only">
					Search entries
				</label>
				<input
					id="lists-search"
					name="q"
					type="search"
					defaultValue={filters.query}
					placeholder="Search entries…"
					maxLength={200}
					className="min-w-0 flex-1 rounded border border-zinc-700 bg-black px-4 py-3 text-base text-zinc-100 placeholder:text-zinc-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
				/>
				<button
					type="submit"
					className="sr-only focus:not-sr-only focus:px-3 focus:py-3"
				>
					Search
				</button>
				<details className="relative shrink-0">
					<summary className="cursor-pointer list-none rounded border border-zinc-700 px-4 py-3 text-base text-zinc-200 hover:border-zinc-400 focus-visible:outline-2 focus-visible:outline-offset-2 [&::-webkit-details-marker]:hidden">
						Filter{filters.types.length > 0 ? ` (${filters.types.length})` : ""}
					</summary>
					<div className="absolute right-0 z-10 mt-2 w-64 max-w-[calc(100vw-3rem)] rounded border border-zinc-700 bg-black p-5">
						<fieldset>
							<legend className="mb-3 text-sm text-zinc-400">List types</legend>
							<div className="max-h-64 space-y-3 overflow-y-auto">
								{types.map((type) => (
									<label
										key={type.slug}
										className="flex cursor-pointer items-center gap-3 text-base text-zinc-200"
									>
										<input
											name="type"
											type="checkbox"
											value={type.slug}
											defaultChecked={filters.types.includes(type.slug)}
											className="size-4 shrink-0 accent-white focus-visible:outline-2 focus-visible:outline-offset-2"
										/>
										<span className="min-w-0 flex-1 break-words">
											{type.name}
										</span>
										<span className="text-sm tabular-nums text-zinc-400">
											{type.count}
										</span>
									</label>
								))}
							</div>
						</fieldset>
						<button
							type="submit"
							className="mt-5 w-full rounded bg-zinc-100 px-3 py-2 text-sm font-medium text-black hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
						>
							Apply filters
						</button>
						<a
							href={
								filters.query
									? `/lists?q=${encodeURIComponent(filters.query)}`
									: "/lists"
							}
							className="mt-3 block text-center text-sm text-zinc-400 underline underline-offset-4 hover:text-white"
						>
							Clear filters
						</a>
					</div>
				</details>
			</form>
		</search>
	);
}
