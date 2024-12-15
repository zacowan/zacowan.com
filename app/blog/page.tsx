import Link from "next/link";
import { getBlogPosts } from "app/blog/utils";
import { formatDate } from "app/blog/utils";
import { PAGE_LINKS } from "app/constants";

type BlogPostData = ReturnType<typeof getBlogPosts>[number];

const newestFirst = (a: BlogPostData, b: BlogPostData): -1 | 0 | 1 => {
  if (new Date(a.metadata.publishDate) > new Date(b.metadata.publishDate)) {
    return -1;
  }
  return 1;
};

export const metadata = {
  title: "Blog",
  description: "A collection of my thoughts on various topics.",
};

export default function Page() {
  const blogPosts = getBlogPosts();

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="border p-16 font-mono uppercase gap-8 flex flex-col max-w-xl">
        <h1>/blog</h1>
        <ul className="text-xs flex flex-col gap-2">
          {blogPosts.sort(newestFirst).map((post) => (
            <li key={post.slug}>
              <Link
                key={post.slug}
                href={PAGE_LINKS.BLOG_POST(post.slug)}
                className="flex gap-8"
              >
                <span className="min-w-22 opacity-50">
                  {formatDate(post.metadata.publishDate)}
                </span>
                <span>{post.metadata.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
