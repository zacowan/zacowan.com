import Link from "next/link";
import InstagramIcon from "@/components/icons/instagram";
import LinkedInIcon from "@/components/icons/linkedin";
import TwitterIcon from "@/components/icons/twitter";
import LogItem from "@/components/log-item";
import type { Log } from "@/types/log";

const logs: Log[] = [
	{
		id: "1",
		timestamp: 1754049600, // 2025-08-01T12:00:00Z
		message: "Blog: Shipping zacOS v1",
		severity: "info",
		env: "production",
		stack: [
			"at publishPost (app/blog/publish.ts:42:13)",
			"at generateStaticParams (app/blog/[slug]/page.tsx:21:7)",
			"at build (scripts/build.ts:88:5)",
		],
	},
	{
		id: "2",
		timestamp: 1747310400, // 2025-05-15T12:00:00Z
		message: "Project: Redesigned zacowan.com",
		severity: "warning",
		env: "production",
		stack: [
			"at runLighthouse (scripts/ci/perf.ts:114:19)",
			"at renderToStream (app/(site)/layout.tsx:67:11)",
			"at tailwindCompile (scripts/build/css.ts:33:4)",
		],
	},
	{
		id: "3",
		timestamp: 1731240000, // 2024-11-10T12:00:00Z
		message: "Career: Joined ExampleCorp as Senior Engineer",
		severity: "error",
		env: "production",
		stack: [
			"at onboard (org/onboarding.ts:12:2)",
			"at provisionAccess (infra/iam.ts:53:10)",
			"at bootstrapWorkspace (scripts/dev/setup.ts:75:8)",
		],
	},
	{
		id: "4",
		timestamp: 1710936000, // 2024-03-20T12:00:00Z
		message: "Project: Released boxd CLI (Rust)",
		severity: "warning",
		env: "production",
		stack: [
			"at releaseCrate (rust/boxd/src/main.rs:120:9)",
			"at tagVersion (scripts/release.ts:41:3)",
			"at publishGitHub (scripts/release.ts:78:7)",
		],
	},
	{
		id: "5",
		timestamp: 1701432000, // 2023-12-01T12:00:00Z
		message: "Blog: Type-safe i18n in Next.js",
		severity: "info",
		env: "production",
		stack: [
			"at validateTranslations (lib/i18n/validate.ts:32:15)",
			"at getStaticProps (app/blog/typesafe-i18n-nextjs/page.tsx:18:7)",
			"at render (node_modules/react-dom/cjs/react-dom-server-legacy.browser.development.js:4521:12)",
		],
	},
	{
		id: "6",
		timestamp: 1686312000, // 2023-06-09T12:00:00Z
		message: "Career: Promoted to Staff Engineer at PreviousCo",
		severity: "error",
		env: "production",
		stack: [
			"at announcePromotion (org/people/changes.ts:9:6)",
			"at updateOrgChart (org/people/orgchart.ts:48:14)",
			"at sendNewsletter (scripts/comms.ts:27:5)",
		],
	},
];

export default function Home() {
	return (
		<main className="max-w-2xl mx-auto w-full px-4">
			<h1 className="text-xl font-semibold tracking-tight mb-4">Logs</h1>
			<ul className="space-y-3">
				{logs.map((log) => (
					<LogItem key={log.id} log={log} />
				))}
			</ul>
		</main>
	);
}
