import { cache } from "react";

import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";

import type { SnippetMetadata } from "./types";
import { formatPath, getSnippetList, parseMetadata } from "./utils";

export interface Snippet {
  language: string;
  category: string;
  name: string;
  metadata: SnippetMetadata;
}

export type GroupedSnippets = Record<string, Record<string, Snippet[]>>;

const basePath = join(process.cwd(), "snippets");

export const getSnippet: (
  language: string,
  category: string,
  name: string
) => Promise<Snippet | null> = cache(async (language, category, name) => {
  try {
    const path = join(basePath, `${formatPath(language, category, name)}.mdx`);

    const exists = existsSync(path);

    if (!exists) {
      return null;
    }

    const content = await readFile(path, { encoding: "utf-8" });

    if (!content) {
      return null;
    }

    return {
      language,
      category,
      name,
      metadata: parseMetadata(content),
    };
  } catch (e) {
    return null;
  }
});

export const getSnippetContent: (
  language: string,
  category: string,
  name: string
) => Promise<string | null> = cache(async (language, category, name) => {
  const path = join(basePath, `${formatPath(language, category, name)}.mdx`);

  const exists = existsSync(path);

  if (!exists) {
    return null;
  }

  const content = await readFile(path, { encoding: "utf-8" });

  return (
    content
      // todo: although this works fine for now, we need to improve this
      .replace(
        /export\s+const\s+metadata\s*=\s*\{[^}]*\};|(?:\r?\n){3,}|```\w*/g,
        ""
      )
      .replace(/^[\r\n]+|[\r\n]+$/g, "")
      .replace(/(?:\r\n|\n){3,}/g, "\n\n")
  );
});

export const getGroupedSnippets: () => Promise<GroupedSnippets> = cache(
  async () => {
    try {
      const files = (await readdir(basePath, { recursive: true })) as string[];

      const snippets = files
        .filter((file) => file.endsWith(".mdx"))
        .map(async (file) => {
          const path = resolve(basePath, file);

          const relativePath = path
            .replace(process.cwd(), "")
            .replace(/\\/g, "/");

          const parts = relativePath.replace("/snippets/", "").split("/");
          const language = parts[0];
          const category = parts[1];
          const name = parts[2].replace(".mdx", "");

          const fileContent = await readFile(path, { encoding: "utf-8" });

          const metadata = parseMetadata(fileContent);

          return { language, category, name, metadata };
        });

      const resolvedSnippets = await Promise.all(snippets);

      const groupedSnippets = resolvedSnippets.reduce((acc, snippet) => {
        const { language, category, name, metadata } = snippet;

        if (!acc[language]) {
          acc[language] = {};
        }

        if (!acc[language][category]) {
          acc[language][category] = [];
        }

        acc[language][category].push({
          language,
          category,
          name,
          metadata,
        });

        return acc;
      }, {} as GroupedSnippets);

      return groupedSnippets;
    } catch (e) {
      console.error(e);
      return {};
    }
  }
);

export async function getRandomSnippet() {
  const groupedSnippets = await getGroupedSnippets();
  const snippetList = getSnippetList(groupedSnippets);

  const snippetData =
    snippetList[Math.floor(Math.random() * snippetList.length)];

  const snippet = await getSnippet(
    snippetData.language,
    snippetData.category,
    snippetData.name
  );

  const content = await getSnippetContent(
    snippetData.language,
    snippetData.category,
    snippetData.name
  );

  return {
    snippet,
    content,
  };
}
