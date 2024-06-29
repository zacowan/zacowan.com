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
        "rounded-full px-4 py-2 underline border font-light min-w-11 min-h-11 inline-flex items-center space-x-2 border-slate-600 dark:border-slate-300 hover:bg-slate-100 active:bg-slate-50 dark:hover:bg-slate-900 dark:active:bg-slate-950 transition-colors",
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
