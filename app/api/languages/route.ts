import { NextResponse } from "next/server";

import { handleApiError } from "@/lib/utils";
import { LANGUAGES } from "@/lib/languages";

export const dynamic = "force-static";

export async function GET() {
  try {
    return NextResponse.json(
      LANGUAGES.flatMap((x) => x.value),
      {
        status: 200,
      }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
