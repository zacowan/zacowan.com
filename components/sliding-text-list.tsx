import { type ComponentProps } from "react";

export interface SlidingTextListProps extends ComponentProps<"div"> {
  items?: string[];
}

export default function SlidingTextList({ items = [] }: SlidingTextListProps) {
  const lastItem = items.at(-1);
  const restOfItems = items.slice(0, -1);

  return (
    <div className="p-4 overflow-clip flex flex-col justify-end uppercase">
      {restOfItems.map((item, index) => (
        <div key={item + index} className="text-slate-950 opacity-30">
          {item}
        </div>
      ))}
      <div>{lastItem}</div>
    </div>
  );
}
