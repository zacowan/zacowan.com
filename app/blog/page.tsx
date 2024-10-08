import { BadgeLink } from "app/components/badge-link";
import { BlogPosts } from "app/components/posts";
import { FaArrowLeft } from "react-icons/fa6";

export const metadata = {
  title: "Blog",
  description: "A collection of my thoughts on various topics.",
};

export default function Page() {
  return (
    <section>
      <BadgeLink startSlot={<FaArrowLeft />} href="/">
        Home
      </BadgeLink>
      <h1 className="text-2xl mb-12 mt-8 font-normal">Blog</h1>
      <BlogPosts />
    </section>
  );
}
