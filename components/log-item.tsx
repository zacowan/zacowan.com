import type { Log } from "@/types/log";

export default function LogItem({ log }: { log: Log }) {
	const timestamp = new Date(log.timestamp * 1000).toISOString();
	const badgeBase = "text-[10px] px-2 py-0.5 border rounded leading-none";
	const badgeTone =
		log.severity === "error"
			? "border-red-500 text-red-300"
			: log.severity === "warning"
				? "border-amber-500 text-amber-300"
				: "border-white/30 text-white/80";

	return (
		<li className="border border-white/15 rounded-md p-4 bg-black text-white">
			<div className="flex items-center justify-between gap-3">
				<time className="text-xs text-white/70">{timestamp}</time>
				<span className={`${badgeBase} ${badgeTone}`}>
					{log.severity.toUpperCase()}
				</span>
			</div>
			<p className="mt-2 text-sm">{log.message}</p>
			{log.stack?.length ? (
				<pre className="mt-3 text-xs text-white/80 overflow-x-auto whitespace-pre-wrap">
					{log.stack.join("\n")}
				</pre>
			) : null}
		</li>
	);
}
