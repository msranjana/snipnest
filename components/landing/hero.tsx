import { ArrowRightIcon /* , PackageIcon */ } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { CodePreview } from "@/components/code-preview";

import { getRandomSnippet } from "@/lib/snippets";
import { formatPath } from "@/lib/utils";
import { LANGUAGES } from "@/lib/languages";
// import { EXTENSIONS } from "@/lib/extensions";

import { LanguageIcon } from "../icons/language";
// import { Badge } from "../badge";

export async function Hero() {
  const randomSnippet = await getRandomSnippet();

  const randomSnippetLanguage = LANGUAGES.find(
    (x) => x.value === randomSnippet.snippet!.language.toLowerCase()
  )!;

  return (
    <div className="h-[77vh] w-full flex xl:flex-row flex-col xl:justify-between justify-center items-center xl:gap-0 gap-12">
      <div className="flex flex-col gap-6 text-left xl:w-[512px] w-full">
        {/* <Badge
          href={EXTENSIONS.vscode.link}
          target="_blank"
          prefix={PackageIcon}
        >
          New! Visual Studio Code extension
        </Badge> */}
        <div className="space-y-4">
          <h1 className="lg:text-4xl text-3xl font-bold">
            Code Smarter, Not Harder.
          </h1>
          <p className="lg:text-lg text-base text-muted-foreground">
            Need code that works? Grab a snippet. Made something cool? Share it
            back. Simple as that.
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
              href="https://github.com/itsbrunodev/snipnest/blob/main/CONTRIBUTING.md"
              target="_blank"
            >
              Submit a Snippet
            </Link>
          </Button>
        </div>
      </div>
      {randomSnippet.content && randomSnippet.snippet && (
        <div className="flex flex-col gap-3 md:w-[640px] w-full">
          <div className="aspect-[5/3] w-[inherit] rounded-lg bg-accent border border-border overflow-hidden md:pt-12 pt-4 md:pl-12 pl-4 relative shadow-sm dark:shadow-none">
            <CodePreview
              className="z-10 relative h-full bg-card rounded-tl-md text-left pt-4 border-l border-t border-border"
              code={`\`\`\`${
                randomSnippetLanguage?.alias || randomSnippetLanguage.value
              }\n${randomSnippet.content}\n\`\`\``}
            />
          </div>
          <Link
            className="text-xs text-muted-foreground ml-auto pr-4 inline-flex items-center hover:underline"
            href={`/snippets/${formatPath(
              randomSnippet.snippet.language,
              randomSnippet.snippet.category,
              randomSnippet.snippet.name
            )}`}
          >
            <LanguageIcon
              icon={randomSnippetLanguage!.icon}
              isColored={randomSnippetLanguage!.isColored}
              className="size-3.5 mb-0.5 mr-1.5"
            />
            {randomSnippet.snippet.metadata.name}
            <ArrowRightIcon className="size-3 ml-1" />
          </Link>
        </div>
      )}
    </div>
  );
}
