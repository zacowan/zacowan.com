"use client";

import {
	ArrowRightIcon,
	SearchIcon,
	SlidersHorizontalIcon,
} from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import type { FeedFilters } from "@/lib/lists/feed-filters";

type ListType = { slug: string; name: string; count: number };
const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function ListsControls({
	filters,
	types,
}: {
	filters: FeedFilters;
	types: ListType[];
}) {
	const enhanced = useSyncExternalStore(
		subscribe,
		clientSnapshot,
		serverSnapshot,
	);
	const [selected, setSelected] = useState(filters.types);
	const clearHref = filters.query
		? `/lists?q=${encodeURIComponent(filters.query)}`
		: "/lists";
	const filterLabel = (
		<>
			<SlidersHorizontalIcon aria-hidden="true" />
			Filter{selected.length > 0 ? ` (${selected.length})` : ""}
		</>
	);
	const actions = (
		<>
			<Separator className="my-4" />
			<div className="flex items-center justify-between gap-2">
				<Button asChild variant="ghost" size="sm">
					<a href={clearHref}>Clear</a>
				</Button>
				<Button type="submit" form="lists-controls" size="sm">
					Apply filters
				</Button>
			</div>
		</>
	);
	return (
		<search aria-label="Search and filter ratings">
			<form
				id="lists-controls"
				action="/lists"
				method="get"
				className="mb-8 flex items-start gap-3"
			>
				<Label htmlFor="lists-search" className="sr-only">
					Search entries
				</Label>
				<InputGroup className="h-11 min-w-0 flex-1 rounded-lg bg-muted/30 shadow-none">
					<InputGroupAddon>
						<SearchIcon aria-hidden="true" />
					</InputGroupAddon>
					<InputGroupInput
						id="lists-search"
						name="q"
						type="search"
						defaultValue={filters.query}
						placeholder="Search entries…"
						maxLength={200}
						className="h-11 text-base md:text-sm"
					/>
					<InputGroupAddon align="inline-end">
						<InputGroupButton
							type="submit"
							size="icon-sm"
							aria-label="Search entries"
						>
							<ArrowRightIcon aria-hidden="true" />
						</InputGroupButton>
					</InputGroupAddon>
				</InputGroup>
				{enhanced ? (
					<>
						{selected.map((type) => (
							<input key={type} type="hidden" name="type" value={type} />
						))}
						<Popover>
							<PopoverTrigger asChild>
								<Button
									type="button"
									variant="outline"
									className="h-11 rounded-lg bg-muted/30 px-4 shadow-none"
								>
									{filterLabel}
								</Button>
							</PopoverTrigger>
							<PopoverContent
								align="end"
								sideOffset={8}
								className="w-72 max-w-[calc(100vw-3rem)] rounded-xl p-4"
							>
								<fieldset>
									<legend className="mb-2 text-sm font-medium">
										List types
									</legend>
									<div className="max-h-64 overflow-y-auto">
										{types.map((type) => (
											<Label
												key={type.slug}
												htmlFor={`list-type-${type.slug}`}
												className="flex min-h-11 cursor-pointer items-center gap-3 rounded-md px-2 py-2 hover:bg-accent"
											>
												<Checkbox
													id={`list-type-${type.slug}`}
													checked={selected.includes(type.slug)}
													onCheckedChange={(checked) =>
														setSelected((current) =>
															checked === true
																? [...current, type.slug]
																: current.filter((slug) => slug !== type.slug),
														)
													}
												/>
												<span className="min-w-0 flex-1 break-words">
													{type.name}
												</span>
												<span className="text-xs tabular-nums text-muted-foreground">
													{type.count}
												</span>
											</Label>
										))}
									</div>
								</fieldset>
								{actions}
							</PopoverContent>
						</Popover>
					</>
				) : (
					<details className="relative shrink-0">
						<summary
							className={`${buttonVariants({ variant: "outline" })} h-11 list-none rounded-lg bg-muted/30 px-4 shadow-none [&::-webkit-details-marker]:hidden`}
						>
							{filterLabel}
						</summary>
						<div className="absolute right-0 z-50 mt-2 w-72 max-w-[calc(100vw-3rem)] rounded-xl border bg-popover p-4 text-popover-foreground">
							<fieldset>
								<legend className="mb-2 text-sm font-medium">List types</legend>
								<div className="max-h-64 overflow-y-auto">
									{types.map((type) => (
										<Label
											key={type.slug}
											htmlFor={`native-list-type-${type.slug}`}
											className="flex min-h-11 cursor-pointer items-center gap-3 rounded-md px-2 py-2 hover:bg-accent"
										>
											<input
												id={`native-list-type-${type.slug}`}
												type="checkbox"
												name="type"
												value={type.slug}
												defaultChecked={filters.types.includes(type.slug)}
												className="size-4 shrink-0 rounded border-input accent-primary"
											/>
											<span className="min-w-0 flex-1 break-words">
												{type.name}
											</span>
											<span className="text-xs tabular-nums text-muted-foreground">
												{type.count}
											</span>
										</Label>
									))}
								</div>
							</fieldset>
							{actions}
						</div>
					</details>
				)}
			</form>
		</search>
	);
}
