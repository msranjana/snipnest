import type { MetadataRoute } from "next";

import { getGroupedSnippets } from "@/lib/snippets";
import { getSnippetList, toKebabCase } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const groupedSnippets = await getGroupedSnippets();
  const snippetList = getSnippetList(groupedSnippets);

  return [
    {
      url: "https://snipnest.dev",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    ...snippetList.map((snippet) => {
      return {
        url: `https://snipnest.dev/snippets/${snippet.language.toLowerCase}/${toKebabCase(snippet.category)}/${toKebabCase(snippet.name)}`,
        lastModified: new Date(),
        changeFrequency: "always" as const,
        priority: 0.9,
      };
    }),
  ];
}
