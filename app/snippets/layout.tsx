import type { Metadata } from "next";

import { getGroupedSnippets } from "@/lib/snippets";
import { getSnippetList } from "@/lib/utils";

import { GroupedSnippetsContent } from "@/components/grouped-snippets/content";
import { GroupedSnippetsList } from "@/components/grouped-snippets/list";

export const metadata: Metadata = {
  title: "Snippets - SnipNest",
  description: "A collection of useful snippets provided by the community.",
};

export default async function SnippetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const groupedSnippets = await getGroupedSnippets();
  const snippetList = getSnippetList(groupedSnippets);

  return (
    <div className="flex lg:flex-row flex-col gap-6">
      <GroupedSnippetsList groupedSnippets={groupedSnippets} />
      <GroupedSnippetsContent snippetList={snippetList}>
        {children}
      </GroupedSnippetsContent>
    </div>
  );
}
