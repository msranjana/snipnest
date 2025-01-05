import { getGroupedSnippets } from "@/lib/snippets";

import type { SnippetParams } from "@/app/snippets/[language]/[category]/[name]/page";

export async function GET(_: unknown, { params }: SnippetParams) {
  try {
    const { language, category } = await params;

    const groupedSnippets = await getGroupedSnippets();

    const snippetsOfCategory = groupedSnippets[language][category].map(
      ({ path, ...rest }) => rest,
    );

    return new Response(JSON.stringify(snippetsOfCategory), {
      status: 200,
    });
  } catch (e) {
    return new Response(
      JSON.stringify({
        status: 404,
        message: "Category not found.",
      }),
      {
        status: 404,
      },
    );
  }
}
