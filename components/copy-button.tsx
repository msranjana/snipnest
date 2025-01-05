"use client";

import { CopyCheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

export function CopyButton({
  className,
  content,
}: {
  className?: string;
  content: string;
}) {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);

    setHasCopied(true);
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  return (
    <button
      className={cn("font-sans transition-opacity hover:opacity-80", className)}
      aria-label="Copy code to clipboard"
      title="Copy code to clipboard"
      onClick={() => handleCopy()}
      type="button"
    >
      {hasCopied ? (
        <CopyCheckIcon className="size-4 text-green-600 dark:text-green-500" />
      ) : (
        <CopyIcon className="size-4" />
      )}
    </button>
  );
}
