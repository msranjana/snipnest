"use client";

import { createElement, useEffect, useState } from "react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";

import type { GroupedSnippets } from "@/lib/snippets";
import { cn, toTitleCase } from "@/lib/utils";
import { LANGUAGES } from "@/lib/constants";

import type { SnippetParams } from "@/app/snippets/[language]/[category]/[name]/page";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../extendui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";

function SelectMenu({
  languages,
  languageValue,
  setLanguageValue,
}: {
  languages: (keyof GroupedSnippets)[];
  languageValue: string;
  setLanguageValue: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const findElement = (value: string) => {
    const languageFound = languages.find((x) => x === value);

    const language = LANGUAGES.find((x) => x.value === languageFound);

    return (
      <div className="flex items-center gap-2">
        {createElement(language!.icon, {
          className: "size-4 rounded-[2px]",
        })}
        {language?.name}
      </div>
    );
  };

  return (
    <div className="space-y-2 w-full">
      <Popover
        open={open}
        onOpenChange={setOpen}
      >
        <PopoverTrigger asChild>
          <Button
            className="justify-between px-3 font-normal w-[inherit]"
            variant="secondary"
            aria-expanded={open}
            disabled={false}
          >
            <span
              className={cn(
                "truncate",
                !languageValue && "text-muted-foreground",
              )}
            >
              {languageValue ? (
                findElement(languageValue)
              ) : (
                <>Select a language</>
              )}
            </span>
            <ChevronDownIcon
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="p-0 w-[--radix-popover-trigger-width]"
        >
          <Command>
            <CommandInput placeholder="Search for a language" />
            <CommandList>
              <CommandEmpty>Language not found.</CommandEmpty>
              <CommandGroup>
                {languages
                  .sort((a, b) => a.localeCompare(b))
                  .map((x) => {
                    const language = LANGUAGES.find((y) => y.value === x)!;

                    return (
                      <CommandItem
                        value={language.value}
                        key={language.name}
                        onSelect={(currentValue) => {
                          setLanguageValue(currentValue);
                          setOpen(false);
                        }}
                      >
                        <div className="flex items-center gap-2">
                          {createElement(language.icon, {
                            className: "size-4 rounded-[2px]",
                          })}
                          {language.name}
                        </div>
                        <CheckIcon
                          className={cn(
                            "ml-auto",
                            languageValue === language.value
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    );
                  })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function GroupedSnippetsList({
  groupedSnippets,
}: {
  groupedSnippets: GroupedSnippets;
}) {
  const params = useParams<Awaited<SnippetParams["params"]>>();

  const [currentLanguage, setCurrentLanguage] = useState<string>(
    params.language || LANGUAGES[0].value,
  );

  useEffect(() => {
    setCurrentLanguage(params.language || LANGUAGES[0].value);
  }, [params.language]);

  if (!groupedSnippets[currentLanguage]) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-4 lg:pl-1 pl-4 p-4 lg:w-80 w-full lg:h-screen h-80 lg:fixed static overflow-y-auto lg:bg-transparent bg-card lg:mt-0 mt-4 lg:rounded-none rounded-md border-r lg:border-y-0 border-y lg:border-l-0 border-l border-border">
      <div className="pb-4 border-b border-border w-full">
        <SelectMenu
          languages={Object.keys(groupedSnippets) as (keyof GroupedSnippets)[]}
          languageValue={currentLanguage}
          setLanguageValue={setCurrentLanguage}
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-muted-foreground text-xs font-medium mb-2">
          Categories
        </p>
        {Object.keys(groupedSnippets[currentLanguage]).map((category) => (
          <Button
            className="w-full justify-between"
            variant={params.category === category ? "default" : "ghost"}
            size="sm"
            key={category}
            asChild
          >
            <Link href={`/snippets/${currentLanguage}/${category}`}>
              <span>{toTitleCase(category)}</span>
              <span
                className={cn(
                  "text-sm font-normal tabular-nums",
                  params.category !== category ? "text-muted-foreground" : "",
                )}
              >
                {groupedSnippets[currentLanguage][category].length}
              </span>
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
