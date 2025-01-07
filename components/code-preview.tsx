import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";

async function highlightCode(code: string) {
  const file = await unified()
    .use(remarkParse, {
      fragment: true,
    })
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      theme: {
        dark: "github-dark",
        light: "github-light",
      },
      // transformers: [transformerColorHighlight()],
      keepBackground: false,
      bypassInlineCode: false,
    })
    .use(rehypeStringify)
    .process(code);

  return String(file);
}

export async function CodePreview({ code }: { code: string }) {
  const highlightedCode = await highlightCode(code);

  return (
    <pre
      className="z-10 relative h-full bg-card rounded-tl-md text-left pt-4 border-l border-t border-border !overflow-hidden [&>figure>pre>code>span]:!pr-0 [&>figure>pre]:!overflow-hidden select-none"
      /* biome-ignore lint: another option could be to use the rehype-react package, though it would be need to be implemented in a client component which introduces a slight flash on page load */
      dangerouslySetInnerHTML={{
        __html: highlightedCode,
      }}
    />
  );
}
