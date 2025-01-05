"use client";

import { MDXProvider, useMDXComponents } from "@mdx-js/react";
import type { MDXComponents } from "mdx/types";
import type { JSX } from "react";

export function MdxProvider({ children }: { children: React.ReactNode }) {
  const components = useMDXComponents({
    pre: (
      props: JSX.IntrinsicElements["pre"] & { "data-language"?: string },
    ) => {
      return (
        <>
          <figcaption className="flex items-center justify-between bg-card px-4 py-2">
            <span className="bg-card bg-black">{props["data-language"]}</span>
          </figcaption>
          <pre
            className="relative bg-card rounded-b-md px-0 py-4"
            {...props}
          />
        </>
      );
    },
  } as MDXComponents);

  return <MDXProvider components={components}>{children}</MDXProvider>;
}
