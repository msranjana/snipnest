import { getGroupedSnippets } from "@/lib/snippets";

export async function GET() {
  try {
    const groupedSnippets = await getGroupedSnippets();

    const languages = Object.keys(groupedSnippets);

    return new Response(JSON.stringify(languages), {
      status: 200,
    });
  } catch (e) {
    return new Response(
      JSON.stringify({
        status: 500,
        message: "Something went wrong while fetching languages.",
      }),
      {
        status: 500,
      }
    );
  }
}
