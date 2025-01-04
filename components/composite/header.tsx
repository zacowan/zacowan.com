import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

export default function Header() {
  return (
    <header className="text-sm flex justify-between items-center w-full">
      <Link href="/">zacowan</Link>
      <ModeToggle />
    </header>
  );
}
