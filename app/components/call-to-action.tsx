import { cn } from "@/lib/utils";
import type { LinkProps } from "next/link";
import Link from "next/link";
import type { PropsWithChildren, ReactNode } from "react";

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
        "bg-blue-600 hover:bg-blue-700 active:bg-blue-600 text-white rounded-full px-4 py-2 min-w-11 min-h-11 inline-flex items-center space-x-2",
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
