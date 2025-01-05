"use client";

import { useRouter } from "next/navigation";

import { SearchSnippetButton } from "@/components/search/button";
import { Button } from "@/components/ui/button";

// import type { Metadata } from "next";
// import dynamic from "next/dynamic";

// import { NotFound } from "@/components/not-found";

/* const NotFoundWithNoSSR = dynamic(
  () => import("../components/not-found").then((x) => x.NotFound),
  {
    ssr: false,
  },
); */

/* export const metadata: Metadata = {
  title: "Not Found - SnipNest",
}; */

export default function NotFoundPage() {
  // return <NotFound />;

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
