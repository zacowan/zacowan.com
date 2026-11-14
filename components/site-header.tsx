export function SiteHeader({ active }: { active?: "lists" }) {
	return (
		<header className="site-path font-tech flex h-16 items-center justify-between px-5 text-xs text-zinc-500">
			<a
				href="/"
				className="hover:text-zinc-300 focus-visible:outline-2 focus-visible:outline-offset-4"
			>
				<span className="text-white">~</span> / zacowan
			</a>
			<nav aria-label="Main">
				<a
					href="/lists"
					aria-current={active === "lists" ? "page" : undefined}
					className="text-zinc-300 hover:text-white underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
				>
					Lists
				</a>
			</nav>
		</header>
	);
}
