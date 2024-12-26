import * as React from "react";
import {
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link, { type LinkProps } from "next/link";

type CardActionableButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asElement?: "button";
    href?: never;
  };

type CardActionableLinkProps = React.PropsWithChildren<LinkProps> & {
  asElement: "link";
  href: string;
  className?: string;
};

type CardActionableProps = CardActionableButtonProps | CardActionableLinkProps;

const CardActionable = React.forwardRef<HTMLElement, CardActionableProps>(
  (
    {
      asElement = "button",
      className,
      children,
      ...props
    }: CardActionableProps,
    ref,
  ) => {
    return asElement === "link" && props.href ? (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={cn(
          "rounded-lg border bg-card text-card-foreground shadow-sm",
          className,
          "cursor-pointer",
        )}
        {...(props as React.ComponentPropsWithoutRef<typeof Link>)}
      >
        {children}
      </Link>
    ) : (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={cn(
          "rounded-lg border bg-card text-card-foreground shadow-sm",
          className,
          "cursor-pointer",
        )}
        {...(props as React.ComponentPropsWithoutRef<"button">)}
      >
        {children}
      </button>
    );
  },
);

CardActionable.displayName = "CardActionable";

export {
  CardActionable,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
