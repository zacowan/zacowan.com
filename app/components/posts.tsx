import Link from "next/link";
import { formatDate, getBlogPosts } from "app/blog/utils";

type BlogPostData = ReturnType<typeof getBlogPosts>[number];

const newestFirst = (a: BlogPostData, b: BlogPostData): -1 | 0 | 1 => {
  if (new Date(a.metadata.publishDate) > new Date(b.metadata.publishDate)) {
    return -1;
  }
  return 1;
};

export function BlogPosts() {
  const blogPosts = getBlogPosts();

  return (
    <div>
      {blogPosts.sort(newestFirst).map((post) => (
        <Link
          key={post.slug}
          className="flex flex-col space-y-1 mb-4"
          href={`/blog/${post.slug}`}
        >
          <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
            <p className="dark:text-neutral-300 text-neutral-600 font-light w-[100px] tabular-nums">
              {formatDate(post.metadata.publishDate, false)}
            </p>
            <p className="tracking-tight">{post.metadata.title}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
