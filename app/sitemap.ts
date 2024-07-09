import { getBlogPosts } from "app/blog/utils";
import { z } from "zod";

// https://vercel.com/docs/projects/environment-variables/system-environment-variables#system-environment-variables
const vercelEnvironmentSchema = z.object({
  VERCEL_ENV: z
    .literal("production")
    .or(z.literal("preview"))
    .or(z.literal("development")),
  VERCEL_PROJECT_PRODUCTION_URL: z.string(),
  VERCEL_BRANCH_URL: z.string(),
  VERCEL_URL: z.string(),
});

const LOCAL_URL = "localhost:3000";

const getBaseUrl = () => {
  try {
    const safeEnv = vercelEnvironmentSchema.parse(process.env);
    switch (safeEnv.VERCEL_ENV) {
      case "development":
      case "preview":
        return `https://${safeEnv.VERCEL_URL}`;
      default:
        return `https://${safeEnv.VERCEL_PROJECT_PRODUCTION_URL}`;
    }
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
