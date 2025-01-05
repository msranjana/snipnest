import { getSnippet } from "@/lib/snippets";

import type { SnippetParams } from "@/app/snippets/[language]/[category]/[name]/page";

export async function GET(_: unknown, { params }: SnippetParams) {
  try {
    const { language, category, name } = await params;

    const snippet = await getSnippet(language, category, name);

    return new Response(JSON.stringify(snippet), {
      status: 200,
    });
  } catch (e) {
    return new Response(
      JSON.stringify({
        status: 404,
        message: "Snippet not found.",
      }),
      {
        status: 404,
      }
    );
  }
}
