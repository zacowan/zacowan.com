import {
  CardActionable,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/composite/card-actionable";
import { formatDate, getBlogPosts } from "@/lib/blog/utils";
import { RELATIVE_SITE_LINKS } from "@/lib/constants";

export const metadata = {
  title: "Blog",
  description: "A collection of my thoughts on various topics.",
};

export default function Page() {
  const blogPosts = getBlogPosts();

  return (
    <section>
      <h1 className="text-2xl mb-12 mt-8">Blog</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {blogPosts.map((post) => (
          <CardActionable
            key={post.slug}
            asElement="link"
            href={RELATIVE_SITE_LINKS.BLOG_POST(post.slug)}
          >
            <CardHeader>
              <CardTitle>{post.metadata.title}</CardTitle>
              <CardDescription className="flex flex-col space-y-1.5">
                <span>{formatDate(post.metadata.publishDate)}</span>
                <span>{post.metadata.summary}</span>
              </CardDescription>
            </CardHeader>
          </CardActionable>
        ))}
      </div>
    </section>
  );
}
