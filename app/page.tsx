import Link from "next/link";
import { GiDaemonSkull } from "react-icons/gi";
import { getBlogPosts } from "./blog/utils";

export default function Page() {
  const blogPosts = getBlogPosts();
  const latestPost = blogPosts.at(0);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex items-center">
        <span className="text-6xl sm:text-9xl">PWN</span>
        <GiDaemonSkull className="w-36 h-36 sm:w-48 sm:h-48" />
      </div>
      {latestPost && (
        <div className="text-xs space-x-1 px-4 pt-8 font-mono uppercase">
          <span>Latest blog post:</span>
          <Link className="underline" href={`/blog/${latestPost.slug}`}>
            {latestPost.metadata.title}
          </Link>
        </div>
      )}
    </section>
  );
}
