import Link from "next/link";
import { PAGE_LINKS } from "./constants";

export default function NotFound() {
  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="border p-16 font-mono uppercase gap-8 flex flex-col max-w-xl w-full">
        <h1>/404</h1>
        <ul className="text-xs gap-8 flex underline">
          <li>
            <Link href={PAGE_LINKS.HOME}>Home</Link>
          </li>
          <li>
            <Link href={PAGE_LINKS.ABOUT}>About</Link>
          </li>
          <li>
            <Link href={PAGE_LINKS.BLOG}>Blog</Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
