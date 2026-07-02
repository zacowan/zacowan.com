const socials = [
	{ href: "https://x.com/zacowan_", label: "X" },
	{ href: "https://linkedin.com/in/zacowan", label: "Li" },
	{ href: "https://github.com/zacowan", label: "GH" },
];

export default function Home() {
	return (
		<main className="flex min-h-screen items-center px-6 py-16 md:px-12">
			<div className="w-full max-w-2xl">
				<h1 className="text-2xl leading-tight tracking-tight md:text-4xl">
					Zach Cowan
				</h1>
				<ul className="mt-8 flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground md:text-base">
					<li>Core platform engineering at Vercel</li>
					<li>Prev. American Express, Lockheed Martin</li>
					<li className="flex items-center gap-2">
						{socials.map((social, index) => (
							<span key={social.label} className="flex items-center gap-2">
								{index > 0 && <span aria-hidden="true">*</span>}
								<a
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
								>
									{social.label}
								</a>
							</span>
						))}
					</li>
				</ul>
			</div>
		</main>
	);
}
