import { getGroupedSnippets } from "@/lib/snippets";
import { handleApiError } from "@/lib/utils";

import type { SnippetParams } from "@/app/snippets/[language]/[category]/[name]/page";

export async function GET(_: unknown, { params }: SnippetParams) {
  try {
    const { language, category } = await params;

    const groupedSnippets = await getGroupedSnippets();

    const snippetsOfCategory = groupedSnippets[language][category];

    return new Response(JSON.stringify(snippetsOfCategory), {
      status: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
