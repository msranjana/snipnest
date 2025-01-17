import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { createElement } from "react";

export function Badge({
  children,
  className,
  prefix,
  href,
  target = "_blank",
}: {
  children: React.ReactNode;
  className?: string;
  prefix?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  href: string;
  target?: string;
}) {
  return (
    <Link
      className={cn(
        "inline-flex w-fit gap-2 items-center rounded-full px-4 py-1.5 text-sm font-medium hover:bg-muted/50 transition-colors border border-border dark:border-muted group",
        className
      )}
      href={href}
      target={target}
    >
      {prefix &&
        createElement(prefix, {
          className:
            "size-4 text-foreground/80 group-hover:text-foreground transition-colors",
          strokeWidth: 2,
        })}
      {children}
      <ChevronRightIcon className="size-4 text-foreground/60" />
    </Link>
  );
}
