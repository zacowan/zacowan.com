import { getBlogPosts } from "app/blog/utils";
import { z } from "zod";

const vercelEnvironmentSchema = z.object({
  VERCEL_PROJECT_PRODUCTION_URL: z.string(),
});

const LOCAL_URL = "localhost:3000";

const getBaseUrl = () => {
  try {
    const safeEnv = vercelEnvironmentSchema.parse(process.env);
    console.log(`Using ${safeEnv.VERCEL_PROJECT_PRODUCTION_URL} as base url`);
    return safeEnv.VERCEL_PROJECT_PRODUCTION_URL;
  } catch (error) {
    console.log(
      `No vercel environment variables found, using ${LOCAL_URL} as base url:`,
      error
    );
    return LOCAL_URL;
  }
};

export const BASE_URL = getBaseUrl();

export default async function sitemap() {
  const blogs = getBlogPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.metadata.publishDate,
  }));

  const routes = ["", "/blog"].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
