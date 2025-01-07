"use client";

import { useEffect, useState } from "react";
import { AlignJustifyIcon, SearchIcon } from "lucide-react";
import Link from "next/link";

import { useSearch } from "@/hooks/use-search";

import { ThemeToggle } from "./theme/toggle";
import { GitHubIcon } from "./github-icon";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Logo } from "./logo";

function SearchInput({
  isDrawerOpen,
  setIsDrawerOpen,
}: {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isOpen: boolean) => void;
}) {
  const [_, setIsSearchOpen] = useSearch();

  const isMac =
    typeof window !== "undefined"
      ? navigator.userAgent.toUpperCase().indexOf("MAC") >= 0
      : false;

  return (
    <button
      className="text-muted-foreground hover:text-foreground inline-flex justify-between items-center bg-card py-1 rounded-md border border-border lg:w-48 w-full"
      onClick={() => {
        if (isDrawerOpen) setIsDrawerOpen(false);
        setIsSearchOpen(true);
      }}
      type="button"
    >
      <span className="gap-2 inline-flex items-center ml-2">
        <SearchIcon className="size-4" /> Search
      </span>
      <kbd className="text-xs bg-zinc-200 dark:bg-zinc-800 px-1 py-0.5 rounded mr-1 lg:opacity-100 opacity-0">
        {isMac ? "⌘" : "Ctrl"} K
      </kbd>
    </button>
  );
}

export function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (isDrawerOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen]);

  return (
    <nav className="w-full border-b border-b-border h-12 flex items-center 2xl:px-0 px-4 fixed bg-background z-50">
      <div className="max-w-7xl mx-auto w-full flex justify-between">
        <Link
          className="font-semibold text-lg inline-flex gap-2 items-center hover:opacity-90 transition-opacity"
          href="/"
        >
          <Logo />
          SnipNest
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <div className="lg:flex hidden gap-[inherit] text-sm items-center [&>a]:transition-colors">
            <SearchInput
              isDrawerOpen={isDrawerOpen}
              setIsDrawerOpen={setIsDrawerOpen}
            />
            <Link
              className="text-muted-foreground hover:text-foreground"
              href="/snippets"
            >
              Snippets
            </Link>
            <Link
              className="fill-muted-foreground hover:fill-foreground"
              href="https://github.com/itsbrunodev/snipnest"
              target="_blank"
              aria-label="GitHub"
            >
              <GitHubIcon />
            </Link>
          </div>
          <ThemeToggle />
          <Drawer
            shouldScaleBackground
            setBackgroundColorOnScale={false}
            open={isDrawerOpen}
            onOpenChange={setIsDrawerOpen}
          >
            <DrawerTrigger
              className="inline-flex lg:hidden"
              asChild
            >
              <button
                className="size-fit transition-opacity hover:opacity-80"
                aria-label="Open bottom drawer"
                type="button"
              >
                <AlignJustifyIcon className="size-4" />
              </button>
            </DrawerTrigger>
            <DrawerPortal>
              <DrawerOverlay className="fixed inset-0 bg-black/80" />
              <DrawerContent className="fixed bottom-0 left-0 right-0 mt-24 flex h-full max-h-[40%] flex-col rounded-t-lg">
                <DrawerHeader className="sr-only">
                  <DrawerTitle>Menu</DrawerTitle>
                  <DrawerDescription>
                    Here you can find some useful links.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="relative flex-1 rounded-t-[inherit] bg-background p-4">
                  <div className="flex flex-col items-end gap-4 [&>a]:transition-colors">
                    <Link
                      className="text-muted-foreground hover:text-foreground"
                      href="/snippets"
                    >
                      Snippets
                    </Link>
                    <Link
                      className="text-muted-foreground hover:text-foreground"
                      href="https://github.com/itsbrunodev/snipnest"
                      target="_blank"
                    >
                      GitHub
                    </Link>
                    <SearchInput
                      isDrawerOpen={isDrawerOpen}
                      setIsDrawerOpen={setIsDrawerOpen}
                    />
                  </div>
                </div>
              </DrawerContent>
            </DrawerPortal>
          </Drawer>
        </div>
      </div>
    </nav>
  );
}
