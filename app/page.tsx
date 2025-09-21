import Vercel from "@/components/icons/vercel";

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-center space-y-4">
			<div className="text-6xl">Engineering in NYC.</div>
			<div className="text-5xl text-neutral-400">
				Exploring design & experience.
			</div>
			<div className="flex flex-col text-2xl gap-4 mt-12 items-center">
				<div className="space-x-4">
					<span>Currently building at</span>
					<a
						href="https://vercel.com/careers"
						className="border-neutral-800 border rounded-full px-5 py-3 inline-flex items-center justify-center hover:bg-neutral-900"
					>
						<Vercel />
					</a>
				</div>
				<div className="space-x-2 text-neutral-400 text-lg">
					<span>Previously at</span>
					<span className="border-neutral-800 border rounded-full px-3 py-1 inline-flex items-center justify-center">
						American Express
					</span>
					<span className="border-neutral-800 border rounded-full px-3 py-1 inline-flex items-center justify-center">
						Lockheed Martin
					</span>
				</div>
			</div>
		</main>
	);
}
