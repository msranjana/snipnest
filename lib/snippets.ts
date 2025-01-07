import { cache } from "react";

import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";

import type { SnippetMetadata } from "./types";
import { getSnippetList, parseMetadata } from "./utils";

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
) => Promise<(Omit<Snippet, "path"> & { snippet: string }) | null> = cache(
  async (language, category, name) => {
    try {
      const path = join(basePath, language, category, `${name}.mdx`);

      const exists = existsSync(path);

      if (!exists) {
        return null;
      }

      const content = await readFile(path, { encoding: "utf-8" });

      if (!content) {
        return null;
      }

      const snippet = content.replace(
        /export\s+const\s+metadata\s*=\s*\{[^}]*\};(\r\n){2}|```\w*\r\n/g,
        ""
      );

      return {
        language,
        category,
        name,
        metadata: parseMetadata(content),
        snippet,
      };
    } catch (e) {
      console.error(e);
      return null;
    }
  }
);

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

  return await getSnippet(
    snippetData.language,
    snippetData.category,
    snippetData.name
  );
}
