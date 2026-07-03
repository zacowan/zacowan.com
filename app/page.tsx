const socials = [
	{ href: "https://x.com/zacowan_", label: "X", title: "X" },
	{ href: "https://linkedin.com/in/zacowan", label: "Li", title: "LinkedIn" },
	{ href: "https://github.com/zacowan", label: "Gh", title: "GitHub" },
];

export default function Home() {
	return (
		<main className="mx-auto flex min-h-screen max-w-3xl items-end px-6 py-12 md:items-center md:px-12 md:py-16">
			<div className="w-full">
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
									title={social.title}
									aria-label={social.title}
									className="relative inline-flex items-center underline-offset-4 transition-colors before:absolute before:left-1/2 before:top-1/2 before:h-11 before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] hover:text-foreground hover:underline"
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
