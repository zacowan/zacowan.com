import Link from "next/link";

const TECH = [
  "typescript",
  "react",
  "node",
  "sqlite",
  "Web Assembly (WASM)",
  "javascript bundlers",
  "python",
  "github actions",
] as const;

export default function Page() {
  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="border p-16 font-mono uppercase gap-8 flex flex-col max-w-96">
        <h1>/whoami</h1>
        <ul className="text-xs gap-2 flex flex-col">
          <li>
            Engineer x Design Systems @
            <Link className="underline" href="https://www.americanexpress.com">
              Amex
            </Link>
          </li>
          <li>
            B.S. Computer Science @
            <Link className="underline" href="https://www.ufl.edu">
              UF
            </Link>
          </li>
          <li>Orlando, FL, United States</li>
        </ul>
        <h2>/tech</h2>
        <ul className="text-xs flex flex-wrap space-x-4 space-y-2">
          {TECH.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
