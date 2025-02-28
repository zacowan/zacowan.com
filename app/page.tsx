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
import { HackedText } from "@/components/ui/hacked-text";

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
              Software Engineer @
              <HackedText className="inline">Unknown</HackedText>
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
            experience in the frontend engineering space. Over the past 2 years,
            I&apos;ve worked extensively on design systems using React and
            contributed to Amex&apos;s microfrontend React framework One App,
            where I gained experience with monorepos, JS/TS bundlers, JS/TS
            codemods, WebAssembly, and more.
          </p>
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
