import { z } from "zod";

export const TITLE = "Zach's Portfolio";
export const DESCRIPTION =
  "A minimal blog and landing page to get connected with me.";
export const RELATIVE_SITE_LINKS = {
  HOME: "/",
  BLOG: "/blog",
  BLOG_POST: (slug: string) => `/blog/${slug}`,
} as const;

export const EXTERNAL_LINKS = {
  AMEX_CAREERS: "https://www.americanexpress.com/en-us/careers/",
  LINKEDIN: "https://www.linkedin.com/in/zacowan/",
  GITHUB: "https://github.com/zacowan",
  TWITTER: "https://x.com/zacowan_",
  THREADS: "https://www.threads.net/@zacowan",
  INSTAGRAM: "https://www.instagram.com/zacowan/",
  BLUESKY: "https://bsky.app/profile/zacowan.bsky.social",
  MASTODON: "https://mastodon.social/@zacowan",
} as const;

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
  } catch {
    return LOCAL_URL;
  }
};

export const BASE_URL = getBaseUrl();

export const CHALLENGE_SOLUTION = "Officer K-D-six-dash-three-dot-seven";
