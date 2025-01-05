import { getGroupedSnippets } from "@/lib/snippets";

import type { SnippetParams } from "@/app/snippets/[language]/[category]/[name]/page";

export async function GET(_: unknown, { params }: SnippetParams) {
  try {
    const { language } = await params;

    const groupedSnippets = await getGroupedSnippets();

    const languageCategories = Object.keys(groupedSnippets[language]);

    return new Response(JSON.stringify(languageCategories), {
      status: 200,
    });
  } catch (e) {
    return new Response(
      JSON.stringify({
        status: 404,
        message: "Language not found.",
      }),
      {
        status: 404,
      },
    );
  }
}
