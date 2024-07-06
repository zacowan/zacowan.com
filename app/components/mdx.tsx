import Link from "next/link";
import Image, { ImageProps } from "next/image";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import { highlight } from "sugar-high";
import React, {
  ComponentPropsWithoutRef,
  PropsWithChildren,
  ReactNode,
} from "react";

function Table({
  data,
}: {
  data: {
    headers: ReactNode[];
    rows: ReactNode[][];
  };
}) {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ));
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function CustomLink({
  href,
  children,
  ...otherProps
}: ComponentPropsWithoutRef<"a"> & PropsWithChildren) {
  if (href?.startsWith("/")) {
    return (
      <Link href={href} {...otherProps}>
        {children}
      </Link>
    );
  }

  if (href?.startsWith("#")) {
    return (
      <a href={href} {...otherProps}>
        {children}
      </a>
    );
  }

  return (
    <a target="_blank" rel="noopener noreferrer" href={href} {...otherProps}>
      {children}
    </a>
  );
}

function RoundedImage({ alt, ...otherProps }: ImageProps) {
  return <Image alt={alt} className="rounded-lg" {...otherProps} />;
}

function Code({
  children,
  ...props
}: ComponentPropsWithoutRef<"code"> & PropsWithChildren) {
  if (typeof children !== "string") {
    throw new Error(
      `Cannot render code because it is not a string: ${children}`
    );
  }
  const codeHTML = highlight(children);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level: number) {
  const Heading = ({ children }: PropsWithChildren) => {
    if (typeof children !== "string") {
      throw new Error(
        `Cannot render heading because it is not a string: ${children}`
      );
    }
    const slug = slugify(children);
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

const components: MDXRemoteProps["components"] = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Table,
};

export function CustomMDX({
  components: componentsProp,
  ...otherProps
}: MDXRemoteProps) {
  return (
    <MDXRemote
      {...otherProps}
      components={{ ...components, ...componentsProp }}
    />
  );
}
