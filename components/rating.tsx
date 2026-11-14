import { StarIcon } from "lucide-react";
import { ratingLabel } from "@/lib/lists/validation";
export function Rating({ rating }: { rating: number | null }) {
	if (rating === null)
		return <span className="text-sm text-muted-foreground">Unrated</span>;
	return (
		<span
			className="inline-flex items-center gap-3 whitespace-nowrap"
			role="img"
			aria-label={`${rating / 2} out of 10, ${rating / 4} out of 5 stars`}
		>
			<span aria-hidden="true" className="inline-flex gap-1">
				{[0, 1, 2, 3, 4].map((star) => (
					<span key={star} className="relative inline-flex size-4">
						<StarIcon
							className="size-4 text-muted-foreground/70"
							strokeWidth={1.5}
						/>
						<span
							className="absolute inset-y-0 left-0 overflow-hidden"
							style={{
								width: `${Math.max(0, Math.min(1, rating / 4 - star)) * 100}%`,
							}}
						>
							<StarIcon
								className="size-4 fill-foreground text-foreground"
								strokeWidth={1.5}
							/>
						</span>
					</span>
				))}
			</span>
			<span
				aria-hidden="true"
				className="text-sm tabular-nums text-muted-foreground"
			>
				{ratingLabel(rating)}
			</span>
		</span>
	);
}
