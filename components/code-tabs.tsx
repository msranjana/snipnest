"use client";

import { Children, useState } from "react";
import { Button } from "./ui/button";

export interface CodeTabProps {
  children: React.ReactNode;
}

export function Code({ children }: CodeTabProps) {
  const validTabs = Children.toArray(
    children
  ) as React.ReactElement<CodeTabProps>[];

  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="flex gap-2 mb-2">
        {validTabs.map((_, i) => {
          const isActive = i === activeTab;

          return (
            <Button
              className="h-fit rounded-md px-3 py-1.5"
              variant={isActive ? "secondary" : "ghost"}
              onClick={() => setActiveTab(i)}
              /* biome-ignore lint/suspicious/noArrayIndexKey: there is nothing else that could be used as a key */
              key={i}
            >
              {i === 0 ? "Snippet" : "Example"}
            </Button>
          );
        })}
      </div>
      <div>{validTabs[activeTab]}</div>
    </div>
  );
}

export function CodeSnippet({ children }: CodeTabProps) {
  return <>{children}</>;
}

export function CodeExample({ children }: CodeTabProps) {
  return <>{children}</>;
}
