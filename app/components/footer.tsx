import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-16 text-neutral-600 dark:text-neutral-300 text-xs space-y-16">
      <ul className="flex flex-wrap gap-8 underline">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/blog">Blog</Link>
        </li>
      </ul>
      <p>© {new Date().getFullYear()} Zachary Cowan</p>
    </footer>
  );
}
