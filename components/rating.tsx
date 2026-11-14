import { ratingLabel } from "@/lib/lists/validation";
export function Rating({ rating }: { rating: number | null }) {
	if (rating === null)
		return <span className="text-sm text-zinc-400">Unrated</span>;
	return (
		<span
			className="flex flex-wrap items-center gap-3 whitespace-nowrap"
			role="img"
			aria-label={`${rating / 2} out of 10, ${rating / 4} out of 5 stars`}
		>
			<span
				aria-hidden="true"
				className="relative inline-block text-xl tracking-[0.08em] text-zinc-600"
			>
				<span>☆☆☆☆☆</span>
				<span
					className="absolute inset-y-0 left-0 overflow-hidden whitespace-nowrap text-zinc-100"
					style={{ width: `${rating * 5}%` }}
				>
					★★★★★
				</span>
			</span>
			<span
				aria-hidden="true"
				className="font-tech text-sm tabular-nums text-zinc-400"
			>
				{ratingLabel(rating)}
			</span>
		</span>
	);
}
