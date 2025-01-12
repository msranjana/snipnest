import { getGroupedSnippets } from "@/lib/snippets";
import { handleApiError } from "@/lib/utils";

export async function GET() {
  try {
    const groupedSnippets = await getGroupedSnippets();

    const languages = Object.keys(groupedSnippets);

    return new Response(JSON.stringify(languages), {
      status: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
