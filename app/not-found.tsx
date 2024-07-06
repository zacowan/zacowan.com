import { BadgeLink } from "./components/badge-link";
import { FaReadme, FaHouse } from "react-icons/fa6";

export default function NotFound() {
  return (
    <section>
      <h1 className="mb-8 text-2xl">404 - Page Not Found</h1>
      <p className="text-sm font-light">
        {`It's an empty desert out here. Maybe what you're looking for is elsewhere.`}
      </p>
      <ul className="flex flex-wrap items-center gap-4 mt-12">
        <li>
          <BadgeLink startSlot={<FaHouse />} href="/">
            Home
          </BadgeLink>
        </li>
        <li>
          <BadgeLink href="/blog" startSlot={<FaReadme />}>
            Blog
          </BadgeLink>
        </li>
      </ul>
    </section>
  );
}
