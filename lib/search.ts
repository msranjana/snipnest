import fuzzysort from "fuzzysort";

import type { Snippet } from "./snippets";

export function search(query: string, snippetList: Snippet[]) {
  return fuzzysort.go(query, snippetList, {
    keys: [
      "metadata.name",
      "metadata.description",
      "language",
      "category",
      (o) => o.metadata.contributors.join(", "),
      (o) => o.metadata.keywords.join(", "),
    ],
    threshold: 0.5,
  });
}
