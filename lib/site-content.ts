export const SITE_URL = "https://zacowan.com";

export const profile = {
	name: "Zach Cowan",
	role: "Software engineer, Core Platform at Vercel",
	description:
		"Zach Cowan is a software engineer on Vercel's Core Platform team focused on databases, caching, observability, alerting, and incident response in the world of agents.",
	summary: [
		"I'm a software engineer on Vercel's Core Platform team, with a focus on databases, caching, observability, alerting, and incident response in the world of agents.",
		"Before Vercel, I worked on web-framework engineering at American Express and embedded-systems engineering at Lockheed Martin.",
	],
} as const;

export const links = [
	{
		command: "open github",
		href: "https://github.com/zacowan",
		label: "github.com/zacowan",
	},
	{
		command: "open linkedin",
		href: "https://linkedin.com/in/zacowan",
		label: "linkedin.com/in/zacowan",
	},
	{
		command: "open x",
		href: "https://x.com/zacowan_",
		label: "x.com/zacowan_",
	},
] as const;

export const experience = [
	["current", "Vercel", "Software engineering, core platform"],
	["previous", "American Express", "Software engineering, web frameworks"],
	["previous", "Lockheed Martin", "Software engineering, embedded systems"],
] as const;

export const recentShips = [
	{
		label: "template",
		title: "SRE incident response eve template",
		href: "https://x.com/eve/status/2092310036462944710",
		description:
			"An agent workflow for investigating and resolving production incidents across observability tools.",
	},
	{
		label: "article",
		title: "Making agent-friendly pages with content negotiation",
		href: "https://vercel.com/blog/making-agent-friendly-pages-with-content-negotiation",
		description:
			"A practical guide to serving Markdown to agents from the same URL that serves HTML to people.",
	},
] as const;

export const homepageMarkdown = `# ${profile.name}

${profile.role}

${profile.summary.join("\n\n")}

The homepage includes an animated two-cube radiance field, rendered with the [vgpu](https://vgpu.sh) Agent Radiance Cascades pipeline. The profile content remains available in the server-rendered page and Markdown representation when WebGPU is unavailable.

## Experience

${experience.map(([, company, role]) => `- **${company}**: ${role}`).join("\n")}

## Recent work

${recentShips
	.map((ship) => `- [${ship.title}](${ship.href}): ${ship.description}`)
	.join("\n")}

## Profiles

${links.map((link) => `- [${link.label}](${link.href})`).join("\n")}
`;

export const notFoundMarkdown = `# 404: Page not found

The requested path does not exist on Zach Cowan's site.

- [Homepage](${SITE_URL}/)
- [Agent overview](${SITE_URL}/llms.txt)
- [Sitemap](${SITE_URL}/sitemap.xml)
`;

export const personJsonLd = {
	"@context": "https://schema.org",
	"@type": "Person",
	"@id": `${SITE_URL}/#person`,
	name: profile.name,
	url: SITE_URL,
	description: profile.description,
	jobTitle: "Software Engineer, Core Platform",
	worksFor: {
		"@type": "Organization",
		name: "Vercel",
		url: "https://vercel.com",
	},
	knowsAbout: [
		"Software engineering",
		"Databases",
		"Caching",
		"Observability",
		"Alerting",
		"Incident response",
		"AI agents",
	],
	sameAs: links.map((link) => link.href),
} as const;

export const llmsText = `# Zach Cowan

> Personal site for Zach Cowan, a software engineer on Vercel's Core Platform team focused on databases, caching, observability, alerting, and incident response in the world of agents.

Use the homepage Markdown representation for the canonical biography, experience, recent work, and verified profile links.

## Main

- [Homepage](${SITE_URL}/index.md): Canonical profile, work history, recent work, and public profiles in Markdown.

## Optional

- [Sitemap](${SITE_URL}/sitemap.xml): Index of human-readable pages.
- [GitHub](https://github.com/zacowan): Public source code and projects.
- [LinkedIn](https://linkedin.com/in/zacowan): Professional profile.
`;
