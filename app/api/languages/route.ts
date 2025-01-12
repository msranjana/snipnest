import { NextResponse } from "next/server";

import { getGroupedSnippets } from "@/lib/snippets";
import { handleApiError } from "@/lib/utils";

export async function GET() {
  try {
    const groupedSnippets = await getGroupedSnippets();

    const languages = Object.keys(groupedSnippets);

    return NextResponse.json(languages, {
      status: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
