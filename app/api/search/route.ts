import type { NextRequest } from "next/server";

import { getGroupedSnippets } from "@/lib/snippets";
import { getSnippetList } from "@/lib/utils";
import { search } from "@/lib/search";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");

    if (!query) {
      return new Response(
        JSON.stringify({
          status: 400,
          message: "Search query is required. (?query=...)",
        }),
        {
          status: 400,
        },
      );
    }

    const groupedSnippets = await getGroupedSnippets();
    const snippetList = getSnippetList(groupedSnippets);

    const results = search(query, snippetList)
      .map((result) => result.obj)
      .map(({ path, ...rest }) => rest);

    return new Response(JSON.stringify(results), {
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
