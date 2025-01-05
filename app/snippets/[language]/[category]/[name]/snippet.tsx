import type { SnippetParams } from "./page";

export async function Snippet({ params }: SnippetParams) {
  const { language, category, name } = await params;

  const { default: Code } = await import(
    `@/snippets/${language}/${category}/${name}.mdx`
  );

  return <Code />;
}
