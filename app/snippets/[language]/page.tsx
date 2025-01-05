"use client";

import { SearchSnippetButton } from "@/components/search/button";

export default function SnippetLanguagePage() {
  return (
    <div className="flex flex-col gap-4 mt-52 items-center mx-auto max-w-96 text-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-medium">Select a category</h1>
        <p className="text-muted-foreground text-sm">
          Choose a category from the sidebar, or search for a specific snippet.
        </p>
      </div>
      <SearchSnippetButton />
    </div>
  );
}
