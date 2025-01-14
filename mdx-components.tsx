import type { MDXComponents } from "mdx/types";
import reactToString from "react-to-string";
import type { JSX } from "react";

import { CopyButton } from "./components/copy-button";
import {
  Code,
  CodeExample,
  CodeSnippet,
  type CodeTabProps,
} from "./components/code-tabs";

export function useMDXComponents(components: MDXComponents) {
  return {
    ...components,
    pre: (
      props: JSX.IntrinsicElements["pre"] & { "data-language"?: string }
    ) => (
      <>
        <figcaption className="flex items-center justify-between bg-card border text-sm border-border rounded-t-md px-4 py-2">
          <span className="text-muted-foreground">
            {props["data-language"]}
          </span>
          <CopyButton content={reactToString(props.children)} />
        </figcaption>
        <pre
          className="relative bg-card border border-border border-t-0 rounded-b-md px-0 py-4 focus-visible:outline-none"
          {...props}
        />
      </>
    ),
    Code: (props: CodeTabProps) => <Code {...props} />,
    Snippet: (props: CodeTabProps) => <CodeSnippet {...props} />,
    Example: (props: CodeTabProps) => <CodeExample {...props} />,
  };
}
