import fs from "fs";
import path from "path";
import fm from "front-matter";
import { z } from "zod";

const metadataSchema = z.object({
  title: z.string().trim(),
  publishDate: z.string().date(),
  summary: z.string(),
  tags: z.array(z.string()).default([]),
});

export type Metadata = z.infer<typeof metadataSchema>;

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { attributes, body: content } = fm(rawContent);
  try {
    const metadata = metadataSchema.parse(attributes);
    return {
      metadata,
      content,
    };
  } catch (error) {
    throw new Error(`Invalid metadata for post at ${filePath}: ${error}`);
  }
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), "app", "blog", "posts"));
}

export function formatDate(date: string, includeRelative = false) {
  const currentDate = new Date();
  const dateWithTime = date.includes("T") ? date : `${date}T00:00:00`;
  const targetDate = new Date(dateWithTime);

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  const daysAgo = currentDate.getDate() - targetDate.getDate();

  let relativeDate = "";

  if (yearsAgo > 0) {
    relativeDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    relativeDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    relativeDate = `${daysAgo}d ago`;
  } else {
    relativeDate = "Today";
  }

  const fullDate = targetDate.toLocaleString("en-us", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${relativeDate})`;
}
