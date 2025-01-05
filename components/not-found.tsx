"use client";

import { useRouter } from "next/navigation";

import { Button } from "./ui/button";
import { SearchSnippetButton } from "./search/button";

export function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 text-center">
          <h1 className="text-3xl font-bold">This page was not found</h1>
          <div>
            <p>The link may be broken, or the page may be removed.</p>
            <p>Make sure the link you are trying to open is correct.</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <SearchSnippetButton />
          <Button
            variant="link"
            size="sm"
            onClick={() => router.back()}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
