import { NextResponse } from "next/server";

import { getSnippetContent } from "@/lib/snippets";
import { handleApiError } from "@/lib/utils";

import type { SnippetParams } from "@/app/snippets/[language]/[category]/[name]/page";

export async function GET(_: unknown, { params }: SnippetParams) {
  try {
    const { language, category, name } = await params;

    const snippet = await getSnippetContent(language, category, name);

    return NextResponse.json(snippet, {
      status: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
