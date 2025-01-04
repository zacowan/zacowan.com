import Link from "next/link";

export default function Header() {
  return (
    <header className="text-sm flex justify-between items-center w-full relative shrink-0">
      <Link href="/">zacowan</Link>
      {/* TODO: why does this cause the width of the body to change to 0? */}
      {/* <ModeToggle /> */}
    </header>
  );
}
