import Vercel from "@/components/icons/vercel";

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-center gap-8">
			<div className="text-center space-y-3">
				<h1 className="text-4xl md:text-6xl font-medium tracking-tight text-balance">
					Engineering in NYC.
				</h1>
				<p className="text-2xl md:text-4xl text-muted tracking-tight">
					Designing tools, infra, & reliability.
				</p>
			</div>
			
			<div className="flex flex-col gap-6 items-center mt-8">
				<div className="flex items-center gap-4">
					<span className="text-lg md:text-xl text-muted-foreground font-mono text-sm uppercase tracking-wider">
						Building at
					</span>
					<a
						href="https://vercel.com/careers"
						className="bg-card backdrop-blur-sm border border-border rounded-[--radius] px-6 py-3 inline-flex items-center justify-center hover:border-accent/50 hover:bg-card/80 transition-all duration-300 group"
					>
						<span className="group-hover:text-accent transition-colors">
							<Vercel />
						</span>
					</a>
				</div>
				
				<div className="flex flex-col md:flex-row items-center gap-3 text-muted">
					<span className="font-mono text-xs uppercase tracking-wider">
						Previously at
					</span>
					<div className="flex gap-2">
						<span className="bg-card/40 backdrop-blur-sm border border-border rounded-[--radius] px-4 py-2 text-sm font-mono hover:border-accent/30 transition-colors">
							American Express
						</span>
						<span className="bg-card/40 backdrop-blur-sm border border-border rounded-[--radius] px-4 py-2 text-sm font-mono hover:border-accent/30 transition-colors">
							Lockheed Martin
						</span>
					</div>
				</div>
			</div>
		</main>
	);
}
