"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRightIcon } from "lucide-react";

import type { Snippet } from "@/lib/snippets";
import { search } from "@/lib/search";
import { useSearch } from "@/hooks/use-search";

import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "../extendui/command";

function Highlighted({ children }: { children: React.ReactNode }) {
  return <span className="bg-primary/50">{children}</span>;
}

export function SearchDialog({ snippetList }: { snippetList: Snippet[] }) {
  const [isSearchOpen, setIsSearchOpen] = useSearch();

  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setIsSearchOpen]);

  const results = search(searchQuery, snippetList);

  return (
    <CommandDialog
      shouldFilter={false}
      open={isSearchOpen}
      onOpenChange={setIsSearchOpen}
    >
      <CommandInput
        placeholder="Search for a snippet..."
        onValueChange={setSearchQuery}
      />
      <CommandList className="p-2 min-h-80">
        {results.length === 0 && <CommandEmpty>No results found.</CommandEmpty>}
        {results.map((result) => {
          const name = result[0].highlight((m, i) => (
            <Highlighted key={i}>{m}</Highlighted>
          ));

          const description = result[1].highlight((m, i) => (
            <Highlighted key={i}>{m}</Highlighted>
          ));

          const language = result[2].highlight((m, i) => (
            <Highlighted key={i}>{m}</Highlighted>
          ));

          const category = result[3].highlight((m, i) => (
            <Highlighted key={i}>{m}</Highlighted>
          ));

          const path = `/${result.obj.path.replace(".mdx", "")}`;

          return (
            <CommandItem
              className="flex flex-col items-start gap-1 data-[selected='true']:bg-muted data-[selected=true]:text-foreground !px-4"
              onSelect={() => {
                router.push(path);
                setIsSearchOpen(false);
              }}
              key={path}
            >
              <h1 className="font-medium">
                {name.length === 0 ? result.obj.metadata.name : name}
              </h1>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {description.length === 0
                  ? result.obj.metadata.description
                  : description}
              </p>
              <div className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                <span>
                  {language.length === 0 ? result.obj.language : language}
                </span>
                <ChevronRightIcon className="!size-3" />
                <span>
                  {category.length === 0 ? result.obj.category : category}
                </span>
              </div>
            </CommandItem>
          );
        })}
      </CommandList>
    </CommandDialog>
  );
}
