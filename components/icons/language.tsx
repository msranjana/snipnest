import { createElement } from "react";

import { cn } from "@/lib/utils";
import type { Language } from "@/lib/types";

export type LanguageIcon = React.FunctionComponent<{ className: string }>;

export function LanguageIcon({
  icon,
  className,
  isColored,
}: {
  icon: Language["icon"];
  className?: string;
  isColored: boolean;
}) {
  return createElement(icon as LanguageIcon, {
    className: cn(
      "size-4 rounded-[2px]",
      !isColored && "fill-foreground",
      className
    ),
  });
}
