import { NextResponse } from "next/server";

import { getGroupedSnippets } from "@/lib/snippets";
import { handleApiError } from "@/lib/utils";

import type { SnippetParams } from "@/app/snippets/[language]/[category]/[name]/page";

export async function GET(_: unknown, { params }: SnippetParams) {
  try {
    const { language } = await params;

    const groupedSnippets = await getGroupedSnippets();

    const languageCategories = Object.keys(groupedSnippets[language]);

    return NextResponse.json(languageCategories, {
      status: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
