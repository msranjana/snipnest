import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default async function HomePage() {
  return (
    <div className="flex mx-auto text-center flex-col h-screen max-w-3xl justify-center items-center gap-6">
      <div className="space-y-4">
        <h1 className="lg:text-4xl text-3xl font-bold">
          Code Smarter, Not Harder.
        </h1>
        <p className="lg:text-lg text-base text-muted-foreground">
          Stuck on something? Find ready-to-use snippets that actually work. Got
          a cool solution? Share it and help someone out. It's like trading
          ideas, but for code.
        </p>
      </div>
      <div className="flex gap-4">
        <Button
          className="w-fit"
          asChild
        >
          <Link href="/snippets">
            Explore Snippets <ArrowRightIcon className="size-4" />
          </Link>
        </Button>
        <Button
          className="w-fit"
          variant="secondary"
          asChild
        >
          <Link
            href="https://github.com/itsbrunodev/snipnest"
            target="_blank"
          >
            Submit a Snippet
          </Link>
        </Button>
      </div>
    </div>
  );
}
