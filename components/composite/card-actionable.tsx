import * as React from "react";
import {
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  cardClasses,
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

const cardActionableClasses = cn(
  cardClasses,
  "cursor-pointer hover:shadow-md transition-shadow",
);

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
        className={cn(cardActionableClasses, className)}
        {...(props as React.ComponentPropsWithoutRef<typeof Link>)}
      >
        {children}
      </Link>
    ) : (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={cn(cardActionableClasses, className)}
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
