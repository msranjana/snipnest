import { cache } from "react";

import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

import type { SnippetMetadata } from "./types";
import { parseMetadata } from "./utils";

export interface Snippet {
  language: string;
  category: string;
  name: string;
  metadata: SnippetMetadata;
  path: string;
}

export type GroupedSnippets = Record<string, Record<string, Snippet[]>>;

const basePath = join(process.cwd(), "snippets");

export async function getSnippet(
  language: string,
  category: string,
  name: string,
): Promise<(Omit<Snippet, "path"> & { snippet: string }) | null> {
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

    console.log("content", content, "path", path);

    const snippet = content.replace(
      /export\s+const\s+metadata\s*=\s*\{[^}]*\};(\r\n){2}|```\w*\r\n/g,
      "",
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

export const getGroupedSnippets: () => Promise<GroupedSnippets> = cache(
  async () => {
    try {
      const files = (await readdir(basePath, { recursive: true })) as string[];

      const snippets = files
        .filter((file) => file.endsWith(".mdx"))
        .map(async (file) => {
          console.log("file", file);

          const relativePath = file.replace(`${basePath}/`, "");
          const path = join("./", basePath, file);

          const parts = relativePath.split("\\");
          const language = parts[0];
          const category = parts[1];
          const name = parts[2].replace(".mdx", "");

          const fileContent = await readFile(path, { encoding: "utf-8" });

          const metadata = parseMetadata(fileContent);

          return { language, category, name, metadata, path };
        });

      const resolvedSnippets = await Promise.all(snippets);

      const groupedSnippets = resolvedSnippets.reduce((acc, snippet) => {
        const { language, category, name, metadata, path } = snippet;

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
          path,
        });

        return acc;
      }, {} as GroupedSnippets);

      return groupedSnippets;
    } catch (e) {
      console.error(e);
      return {};
    }
  },
);
