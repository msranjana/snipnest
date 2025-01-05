"use client";

import { SearchIcon } from "lucide-react";

import { useSearch } from "@/hooks/use-search";

import { Button } from "../ui/button";

export function SearchSnippetButton() {
  const [_, setOpen] = useSearch();

  return (
    <Button
      className="w-fit"
      size="sm"
      onClick={() => setOpen(true)}
    >
      <SearchIcon className="size-4" /> Search Snippet
    </Button>
  );
}
