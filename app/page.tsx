import Link from "next/link";
import { formatDate, getBlogPosts } from "@/lib/blog/utils";
import { BadgeLink } from "@/components/composite/badge-link";
import { ProfilePicture } from "@/components/composite/profile-picture/profile-picture";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FaLinkedin,
  FaGithub,
  FaLocationDot,
  FaBriefcase,
  FaArrowRight,
  FaThreads,
  FaInstagram,
  FaBluesky,
  FaMastodon,
  FaXTwitter,
  FaQuestion,
} from "react-icons/fa6";
import { EXTERNAL_LINKS, RELATIVE_SITE_LINKS } from "@/lib/constants";
import {
  CardActionable,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/composite/card-actionable";
import { ChallengeDialog } from "@/components/challenge-dialog";

export default function Page() {
  const blogPosts = getBlogPosts();

  return (
    <section>
      <div className="flex flex-col w-full pb-8 md:pb-16 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl mb-4">Zach Cowan</h1>
          <span className="flex items-center space-x-2 text-sm">
            <FaLocationDot className="fill-foreground" />
            <h2>Orlando, FL</h2>
          </span>
          <span className="flex items-center space-x-2 text-sm">
            <FaBriefcase className="fill-foreground" />
            <h2>
              Engineer x Design Systems @{" "}
              <a href={EXTERNAL_LINKS.AMEX_CAREERS} className="underline">
                American Express
              </a>
            </h2>
          </span>
          <span className="flex items-center space-x-2 text-sm relative">
            <FaQuestion className="fill-foreground" />
            <ChallengeDialog />
          </span>
        </div>
        <ProfilePicture className="order-first mb-2 md:order-none md:mb-0" />
      </div>
      <div className="pb-8">
        <h3 className="text-lg mb-4">What I Do</h3>
        <div className="space-y-4 text-sm">
          <p>
            I&apos;m a software engineer with a passion for design and developer
            experience in the frontend engineering space. I currently work at
            American Express on the web design system and the microfrontend core
            React framework,{" "}
            <a
              className="underline"
              href="https://github.com/americanexpress/one-app"
            >
              One App
            </a>
            . I&apos;ve previously worked at Lockheed Martin and done small
            contract work.
          </p>
          <p>
            Some of my most impactful projects in the frontend space have been:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Transitioning the Amex design system from a JavaScript polyrepo
              npm package ecosystem into a{" "}
              <b>TypeScript-first, scalable monorepo</b>
            </li>
            <li>
              Developing a <b>GitHub repo scraper</b> to gather design system
              data using the JavaScript AST data structure
            </li>
            <li>
              Delivering a user-focused <b>data dashboard</b> that loads SQLite
              data and allows querying the data without API responses using Web
              Assembly (WASM)
            </li>
            <li>
              Engineering a <b>large-scale Codemod framework</b> to
              automatically migrate breaking changes in microfrontend projects
              from old versions of the design system to a new major version
            </li>
            <li>
              Building <b>accessible React components</b> for the next
              generation of the Amex design system using TypeScript
            </li>
            <li>
              <b>Optimizing CSS bundling for Webpack and esbuild</b> plugins
              used in Amex&apos;s One App bundler
            </li>
            <li>
              Using the Web Assembly build of esbuild to{" "}
              <b>compile and execute React code on-the-fly</b> in the browser
            </li>
          </ul>
        </div>
      </div>
      <div className="space-y-8">
        {blogPosts.length > 0 && (
          <div>
            <div className="mb-4 flex justify-between">
              <h3 className="text-lg">Blog</h3>
              <Link
                href={RELATIVE_SITE_LINKS.BLOG}
                className="flex items-center space-x-1 text-xs group underline"
              >
                <span>See All</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {blogPosts.slice(0, Math.min(2, blogPosts.length)).map((post) => (
                <CardActionable
                  key={post.slug}
                  asElement="link"
                  href={RELATIVE_SITE_LINKS.BLOG_POST(post.slug)}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {post.metadata.title}
                    </CardTitle>
                    <CardDescription className="flex flex-col space-y-1.5 text-xs">
                      <span>{formatDate(post.metadata.publishDate)}</span>
                      <span>{post.metadata.summary}</span>
                    </CardDescription>
                  </CardHeader>
                </CardActionable>
              ))}
            </div>
          </div>
        )}
        <div>
          <h3 className="text-lg mb-4">Professional Links</h3>
          <ul className="flex flex-wrap items-center gap-4">
            <li>
              <BadgeLink
                variant="default"
                href={EXTERNAL_LINKS.GITHUB}
                startSlot={<FaGithub />}
              >
                GitHub
              </BadgeLink>
            </li>
            <li>
              <BadgeLink
                href={EXTERNAL_LINKS.LINKEDIN}
                startSlot={<FaLinkedin />}
              >
                LinkedIn
              </BadgeLink>
            </li>
          </ul>
        </div>
        <div>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Personal Socials</AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-wrap items-center gap-4">
                  <li>
                    <BadgeLink
                      href={EXTERNAL_LINKS.TWITTER}
                      startSlot={<FaXTwitter />}
                    >
                      Twitter
                    </BadgeLink>
                  </li>
                  <li>
                    <BadgeLink
                      href={EXTERNAL_LINKS.THREADS}
                      startSlot={<FaThreads />}
                    >
                      Threads
                    </BadgeLink>
                  </li>
                  <li>
                    <BadgeLink
                      href={EXTERNAL_LINKS.BLUESKY}
                      startSlot={<FaBluesky />}
                    >
                      Bluesky
                    </BadgeLink>
                  </li>
                  <li>
                    <BadgeLink
                      href={EXTERNAL_LINKS.MASTODON}
                      startSlot={<FaMastodon />}
                    >
                      Mastodon
                    </BadgeLink>
                  </li>
                  <li>
                    <BadgeLink
                      href={EXTERNAL_LINKS.INSTAGRAM}
                      startSlot={<FaInstagram />}
                    >
                      Instagram
                    </BadgeLink>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
