import { NextResponse } from "next/server";

import { getLanguageCategories } from "@/lib/snippets";
import { handleApiError } from "@/lib/utils";

import type { SnippetParams } from "@/app/snippets/[language]/[category]/[name]/page";

export const dynamic = "force-static";

export async function GET(_: unknown, { params }: SnippetParams) {
  try {
    const { language } = await params;

    const languageCategories = await getLanguageCategories(language);

    return NextResponse.json(languageCategories, {
      status: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
