import { cache } from "react";

import { existsSync, readdirSync, readFileSync } from "node:fs";
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

    const content = readFileSync(path, "utf-8");

    if (!content) {
      return null;
    }

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
  } catch {
    return null;
  }
}

export const getGroupedSnippets: () => Promise<GroupedSnippets> = cache(
  async () => {
    try {
      const files = readdirSync(basePath, { recursive: true }) as string[];

      const snippets = files
        .filter((file) => file.endsWith(".mdx"))
        .map((file) => {
          const relativePath = file.replace(`${basePath}/`, "");
          const path = join("./", basePath, file);

          const parts = relativePath.split("\\");
          const language = parts[0];
          const category = parts[1];
          const name = parts[2].replace(".mdx", "");

          const metadata = parseMetadata(readFileSync(path, "utf-8"));

          return { language, category, name, metadata, path };
        });

      const groupedSnippets = snippets.reduce((acc, snippet) => {
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
      return {};
    }
  },
);
