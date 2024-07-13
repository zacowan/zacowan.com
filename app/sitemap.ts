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

const LOCAL_URL = "https://localhost:3000";

const getBaseUrl = () => {
  try {
    const safeEnv = vercelEnvironmentSchema.parse(process.env);
    const url =
      safeEnv.VERCEL_ENV === "production"
        ? `https://${safeEnv.VERCEL_PROJECT_PRODUCTION_URL}`
        : `https://${safeEnv.VERCEL_URL}`;
    console.log(`Vercel environment variables found, using ${url} as base url`);
    return url;
  } catch (error) {
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
