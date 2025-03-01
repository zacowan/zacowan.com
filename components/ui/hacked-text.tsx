"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState, type ComponentProps } from "react";

const ALPHABET =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const hackText = (text: string) => {
  return text
    .split("")
    .map((char) =>
      ALPHABET.includes(char) && Math.random() > 0.2 // 20% chance to keep the original character
        ? ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
        : char,
    )
    .join("");
};

const HACK_UPDATE_INTERVAL_MS = 75;
const UNHACK_UPDATE_INTERVAL_MS = 75;
const RANDOM_SCALAR_MS = 50;

const getIntervalWithRandomScalar = (baseInterval: number) => {
  const sign = Math.random() > 0.5 ? 1 : -1;
  const randomScalar = Math.random() * RANDOM_SCALAR_MS;
  return baseInterval + sign * randomScalar;
};

function HackedText({
  className,
  children,
  forceUnhack,
  shouldUnhackOnHover,
  ...otherProps
}: Omit<ComponentProps<"div">, "children"> & {
  children: string;
  shouldUnhackOnHover?: boolean;
  forceUnhack?: boolean;
}) {
  const hackInterval = getIntervalWithRandomScalar(HACK_UPDATE_INTERVAL_MS);
  const unhackInterval = getIntervalWithRandomScalar(UNHACK_UPDATE_INTERVAL_MS);
  const [hackedText, setHackedText] = useState(hackText(children));
  const [isHovered, setIsHovered] = useState(false);
  const [resolvedTextIndex, setResolvedTextIndex] = useState(0);

  useEffect(() => {
    if (forceUnhack) {
      setHackedText(children);
      return;
    }

    if (!isHovered) {
      const interval = setInterval(
        () => setHackedText(hackText(children)),
        hackInterval,
      );
      return () => clearInterval(interval);
    } else if (shouldUnhackOnHover) {
      const interval = setInterval(() => {
        setHackedText(() => {
          const middleIndex = Math.floor(children.length / 2);
          const start = Math.max(middleIndex - resolvedTextIndex, 0);
          const end = Math.min(
            middleIndex + resolvedTextIndex,
            children.length,
          );
          const lettersFromOriginal = children.slice(start, end);
          const lettersFromHackedStart = hackText(children.slice(0, start));
          const lettersFromHackedEnd = hackText(
            children.slice(end, children.length),
          );
          const resolved =
            lettersFromHackedStart + lettersFromOriginal + lettersFromHackedEnd;
          if (resolved === children) {
            clearInterval(interval);
          }
          return resolved;
        });
        setResolvedTextIndex((prev) => prev + 1);
      }, unhackInterval);
      return () => clearInterval(interval);
    }
  }, [
    children,
    isHovered,
    resolvedTextIndex,
    forceUnhack,
    shouldUnhackOnHover,
    hackInterval,
    unhackInterval,
  ]);

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
