"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState, type ComponentProps } from "react";

const ALPHABET =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const hackText = (text: string) => {
  return text
    .split("")
    .map((char) =>
      ALPHABET.includes(char)
        ? ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
        : char,
    )
    .join("");
};

function HackedText({
  className,
  children,
  ...otherProps
}: Omit<ComponentProps<"div">, "children"> & { children: string }) {
  const [hackedText, setHackedText] = useState(hackText(children));
  const [isHovered, setIsHovered] = useState(false);
  const [resolvedTextIndex, setResolvedTextIndex] = useState(0);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => setHackedText(hackText(children)), 50);
      return () => clearInterval(interval);
    } else {
      const interval = setInterval(() => {
        setHackedText(() => {
          const lettersFromOriginal = children.slice(0, resolvedTextIndex);
          const lettersFromHacked = hackText(
            children.slice(resolvedTextIndex, children.length),
          );
          const resolved = lettersFromOriginal + lettersFromHacked;
          if (resolved === children) {
            clearInterval(interval);
          }
          return `${lettersFromOriginal}${lettersFromHacked}`;
        });
        setResolvedTextIndex((prev) => prev + 1);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [children, isHovered, resolvedTextIndex]);

  return (
    <div
      {...otherProps}
      className={cn(className)}
      // Because we are using Math.random, the random number will be different on the server and client
      suppressHydrationWarning
      onMouseEnter={() => {
        setIsHovered(true);
        setResolvedTextIndex(0);
      }}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={children}
    >
      {hackedText}
    </div>
  );
}

export { HackedText };
