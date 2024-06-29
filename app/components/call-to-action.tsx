import { cn } from "app/utils/cn";
import Link, { LinkProps } from "next/link";
import { PropsWithChildren, ReactNode } from "react";

export function CallToAction({
  className,
  children,
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
        "bg-blue-600 hover:bg-blue-700 active:bg-blue-600 text-white underline rounded-full px-4 py-2 font-light min-w-11 min-h-11 inline-flex items-center space-x-2 transition-colors",
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
