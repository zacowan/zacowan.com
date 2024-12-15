import { notFound } from "next/navigation";
import { CustomMDX } from "app/components/mdx";
import { formatDate, getBlogPosts } from "app/blog/utils";
import { BASE_URL } from "app/sitemap";
import { BadgeLink } from "app/components/badge-link";
import { FaArrowLeft } from "react-icons/fa6";

export async function generateStaticParams() {
  const posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

type StaticParams = Awaited<ReturnType<typeof generateStaticParams>>[number];

export async function generateMetadata(props: {
  params: Promise<StaticParams>;
}) {
  const params = await props.params;
  const post = getBlogPosts().find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  const {
    title,
    publishDate: publishedTime,
    summary: description,
  } = post.metadata;
  const ogImage = `${BASE_URL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${BASE_URL}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog(props: { params: Promise<StaticParams> }) {
  const params = await props.params;
  const post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishDate,
            dateModified: post.metadata.publishDate,
            description: post.metadata.summary,
            image: `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${BASE_URL}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: "Zachary Cowan",
            },
          }),
        }}
      />
      <BadgeLink href="/blog" startSlot={<FaArrowLeft />}>
        All Posts
      </BadgeLink>
      <h1 className="title text-2xl mt-8 font-normal">{post.metadata.title}</h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm dark:text-neutral-300 text-neutral-600">
          {formatDate(post.metadata.publishDate)}
        </p>
      </div>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
