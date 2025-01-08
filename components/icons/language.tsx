import { createElement } from "react";

import { cn } from "@/lib/utils";

export function LanguageIcon({
  icon,
  className,
  isColored,
}: {
  icon: React.FunctionComponent<{ className: string }>;
  className?: string;
  isColored: boolean;
}) {
  return createElement(icon, {
    className: cn(
      "size-4 rounded-[2px]",
      !isColored && "fill-foreground",
      className
    ),
  });
}
