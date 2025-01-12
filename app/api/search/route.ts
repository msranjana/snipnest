import { NextResponse, type NextRequest } from "next/server";

import { getGroupedSnippets } from "@/lib/snippets";
import { getSnippetList, handleApiError } from "@/lib/utils";
import { search } from "@/lib/search";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");

    if (!query) {
      throw new Error("Search query is required. (?query=...)", {
        cause: {
          status: 400,
        },
      });
    }

    const groupedSnippets = await getGroupedSnippets();
    const snippetList = getSnippetList(groupedSnippets);

    const results = search(query, snippetList).map((result) => result.obj);

    return NextResponse.json(results, {
      status: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
