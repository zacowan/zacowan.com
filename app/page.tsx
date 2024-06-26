import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        My Portfolio
      </h1>
      <p className="mb-4">
        {`I'm Zach, a software engineer who loves design, math, and data. TypeScript is my jam,
        bundlers are my peanut butter, and excellent web development tooling makes this a whole PB&J sandwich. While
        web dev is my home, I love exploring new ways of developing, like Rust for CLI programming and Swift
        for mobile development.`}
      </p>
      <p className="mb-4">
        {`That's all, but I'll leave you with one of my favorite quotes from Denis Villeneuve's adaption of
        Dune: "The mystery of life isn't a problem to solve, but a reality to experience."`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
