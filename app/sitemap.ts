import { getBlogPosts } from "app/blog/utils";

// TODO: update
export const BASE_URL = "localhost:3000";

export default async function sitemap() {
  let blogs = getBlogPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.metadata.publishDate,
  }));

  let routes = ["", "/blog"].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
