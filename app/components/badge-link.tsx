import { cn } from "app/utils/cn";
import Link, { LinkProps } from "next/link";
import { PropsWithChildren, ReactNode } from "react";

export function BadgeLink({
  children,
  className,
  startSlot,
  endSlot,
  ...otherProps
}: LinkProps &
  PropsWithChildren & {
    className?: string;
    startSlot?: ReactNode;
    endSlot?: ReactNode;
  }) {
  return (
    <Link
      className={cn(
        "rounded-full px-4 py-2 border min-w-11 min-h-11 inline-flex items-center space-x-2 border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 active:bg-neutral-50 dark:hover:bg-neutral-900 dark:active:bg-neutral-950",
        className
      )}
      {...otherProps}
    >
      {startSlot && <span>{startSlot}</span>}
      <span>{children}</span>
      {endSlot && <span>{endSlot}</span>}
    </Link>
  );
}
