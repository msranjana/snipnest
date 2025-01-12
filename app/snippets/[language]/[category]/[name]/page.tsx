import { Fragment } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { getSnippet } from "@/lib/snippets";

import { Snippet } from "./snippet";

export interface SnippetParams {
  params: Promise<{ language: string; category: string; name: string }>;
}

export async function generateMetadata({
  params,
}: SnippetParams): Promise<Metadata> {
  const { language, category, name } = await params;

  const snippet = await getSnippet(language, category, name);

  if (!snippet) {
    notFound();
  }

  const title = `${snippet.metadata.name} - SnipNest`;

  return {
    title,
    description: snippet.metadata.description,
    keywords: snippet.metadata.keywords,
    openGraph: {
      title,
      description: snippet.metadata.description,
    },
  };
}

export default async function SnippetPage({ params }: SnippetParams) {
  const { language, category, name } = await params;

  const snippet = await getSnippet(language, category, name);

  if (!snippet) {
    notFound();
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold font-sans">
            {snippet.metadata.name}
          </h1>
          <p className="text-muted-foreground">
            {snippet.metadata.description}
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          Contributed by{" "}
          {snippet.metadata.contributors.map((contributor, i) => (
            <Fragment key={contributor}>
              <Link
                className="hover:underline text-foreground"
                href={`https://github.com/${contributor}`}
                target="_blank"
              >
                @{contributor}
              </Link>
              {i < snippet.metadata.contributors.length - 1 && ", "}
            </Fragment>
          ))}
        </p>
      </div>
      <Snippet params={params} />
      {snippet.metadata.keywords.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-lg font-medium">Keywords</h2>
          <div className="flex gap-1 flex-wrap">
            {snippet.metadata.keywords.map((keyword) => (
              <div
                key={keyword}
                className="text-sm text-muted-foreground bg-card border border-border rounded-md py-0.5 px-2 shadow-sm dark:shadow-none"
              >
                {keyword}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
