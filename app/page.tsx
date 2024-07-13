import Link from "next/link";
import { formatDate, getBlogPosts } from "./blog/utils";
import { BadgeLink } from "./components/badge-link";
import { CallToAction } from "./components/call-to-action";
import { ProfilePicture } from "./components/profile-picture";
import {
  FaThreads,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaLocationDot,
  FaBriefcase,
  FaReadme,
  FaArrowRight,
} from "react-icons/fa6";

const AMEX_CAREERS_HREF = "https://www.americanexpress.com/en-us/careers/";
const THREADS_HREF = "https://www.threads.net/@zacowan";
const INSTAGRAM_HREF = "https://www.instagram.com/zacowan/";
const LINKEDIN_HREF = "https://www.linkedin.com/in/zacowan/";
const GITHUB_HREF = "https://github.com/zacowan";

const FEATURED_BLOG_POST_SLUG = "ml-eye-tracking";

export default function Page() {
  const featuredPost = getBlogPosts().find(
    (post) => post.slug === FEATURED_BLOG_POST_SLUG
  );

  return (
    <section>
      <div className="flex flex-col w-full pb-8 md:pb-16 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl mb-4">Zach Cowan</h1>
          <span className="flex items-center space-x-2 text-sm font-light">
            <FaLocationDot className="dark:fill-neutral-300 fill-neutral-600" />
            <h2>Orlando, FL</h2>
          </span>
          <span className="flex items-center space-x-2 font-light text-sm">
            <FaBriefcase className="dark:fill-neutral-300 fill-neutral-600" />
            <h2>
              Engineer x Design Systems @{" "}
              <a href={AMEX_CAREERS_HREF} className="underline">
                American Express
              </a>
            </h2>
          </span>
        </div>
        <ProfilePicture className="order-first mb-2 md:order-none md:mb-0" />
      </div>
      <div className="space-y-8">
        {featuredPost && (
          <div>
            <h3 className="text-lg mb-4">Blog</h3>
            <div className="grid grid-cols-2 gap-4 font-light">
              <Link
                className="dark:hover:bg-neutral-900 dark:active:bg-neutral-950 dark:border-neutral-700 hover:bg-neutral-100 active:bg-neutral-50 border-neutral-300 border p-4 rounded-3xl"
                href={`/blog/${featuredPost.slug}`}
              >
                {featuredPost ? (
                  <div className="space-y-2">
                    <p className="tracking-tight">
                      {featuredPost.metadata.title}
                    </p>
                    <p className="dark:text-neutral-300 text-neutral-600 tabular-nums text-sm">
                      {formatDate(featuredPost.metadata.publishDate)}
                    </p>
                  </div>
                ) : (
                  "TODO"
                )}
              </Link>
              <Link
                className="dark:hover:bg-neutral-900 dark:active:bg-neutral-950 dark:border-neutral-700 hover:bg-neutral-100 active:bg-neutral-50 border-neutral-300 border p-4 rounded-3xl flex items-center justify-center gap-8"
                href="/blog"
              >
                <span>All Posts</span>
                <FaArrowRight className="dark:fill-neutral-300 fill-neutral-600" />
              </Link>
            </div>
          </div>
        )}
        <div>
          <h3 className="text-lg mb-4">Links</h3>
          <ul className="flex flex-wrap items-center gap-4">
            <li>
              <CallToAction href={GITHUB_HREF} startSlot={<FaGithub />}>
                GitHub
              </CallToAction>
            </li>
            <li>
              <BadgeLink href={LINKEDIN_HREF} startSlot={<FaLinkedin />}>
                LinkedIn
              </BadgeLink>
            </li>
            <li>
              <BadgeLink href={THREADS_HREF} startSlot={<FaThreads />}>
                Threads
              </BadgeLink>
            </li>
            <li>
              <BadgeLink href={INSTAGRAM_HREF} startSlot={<FaInstagram />}>
                Instagram
              </BadgeLink>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
