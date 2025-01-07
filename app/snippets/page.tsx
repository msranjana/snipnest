"use client";

import { SearchSnippetButton } from "@/components/search/button";

export default function SnippetsPage() {
  return (
    <div className="flex flex-col gap-4 mt-52 items-center mx-auto max-w-96 text-center !min-h-[100vh]">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-medium">Select a language or category</h1>
        <p className="text-muted-foreground text-sm">
          Choose a language or category from the sidebar, or search for a
          specific snippet.
        </p>
      </div>
      <SearchSnippetButton />
    </div>
  );
}
