import { getBlogPosts } from "@/lib/blog/utils";
import { BASE_URL, RELATIVE_SITE_LINKS } from "@/lib/constants";

export default async function sitemap() {
  const blogs = getBlogPosts().map((post) => ({
    url: `${BASE_URL}${RELATIVE_SITE_LINKS.BLOG_POST(post.slug)}`,
    lastModified: post.metadata.publishDate,
  }));

  const routes = [
    RELATIVE_SITE_LINKS.HOME.replace("/", " "),
    RELATIVE_SITE_LINKS.BLOG,
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
