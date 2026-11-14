import { notFound, permanentRedirect } from "next/navigation";
import { readLists } from "@/lib/lists/data";
export const dynamic = "force-dynamic";
// Preserve existing links while keeping one public lists page.
export default async function ListPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	if (!(await readLists()).some((list) => list.slug === slug)) notFound();
	permanentRedirect(`/lists?type=${encodeURIComponent(slug)}`);
}
