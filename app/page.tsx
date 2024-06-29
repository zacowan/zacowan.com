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
} from "react-icons/fa6";

const AMEX_CAREERS_HREF = "https://www.americanexpress.com/en-us/careers/";
const THREADS_HREF = "https://www.threads.net/@zacowan";
const INSTAGRAM_HREF = "https://www.instagram.com/zacowan/";
const LINKEDIN_HREF = "https://www.linkedin.com/in/zacowan/";
const GITHUB_HREF = "https://github.com/zacowan";

export default function Page() {
  return (
    <section className="mt-20 min-h-[60vh]">
      <div className="flex flex-col w-full pb-16 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl mb-4">Zach Cowan</h1>
          <span className="flex items-center space-x-2 text-sm font-light">
            <FaLocationDot className="dark:fill-slate-300 fill-slate-600" />
            <h2>Orlando, FL</h2>
          </span>
          <span className="flex items-center space-x-2 font-light text-sm">
            <FaBriefcase className="dark:fill-slate-300 fill-slate-600" />
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
      <ul className="flex flex-wrap items-center gap-4">
        <li>
          <CallToAction startSlot={<FaReadme />} href="/blog">
            Blog
          </CallToAction>
        </li>
        <li>
          <BadgeLink href={GITHUB_HREF} startSlot={<FaGithub />}>
            GitHub
          </BadgeLink>
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
    </section>
  );
}
