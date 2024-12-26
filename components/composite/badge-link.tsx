import { cn } from "@/lib/utils";
import type { LinkProps } from "next/link";
import Link from "next/link";
import type { PropsWithChildren, ReactNode } from "react";
import { badgeVariants } from "../ui/badge";
import type { VariantProps } from "class-variance-authority";

export function BadgeLink({
  children,
  className,
  startSlot,
  endSlot,
  variant = "outline",
  ...otherProps
}: LinkProps &
  VariantProps<typeof badgeVariants> &
  PropsWithChildren & {
    className?: string;
    startSlot?: ReactNode;
    endSlot?: ReactNode;
  }) {
  return (
    <Link
      className={cn(
        badgeVariants({ variant }),
        "space-x-1 min-w-11 min-h-11 inline-flex items-center",
        className,
      )}
      {...otherProps}
    >
      {startSlot && <span>{startSlot}</span>}
      <span>{children}</span>
      {endSlot && <span>{endSlot}</span>}
    </Link>
  );
}
