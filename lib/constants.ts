import Javascript from "devicons-react/lib/icons/JavascriptOriginal";
import Typescript from "devicons-react/lib/icons/TypescriptOriginal";
import React from "devicons-react/lib/icons/ReactOriginal";

/**
 * List of languages, the order doesn't matter as it will be alphabetically sorted
 */
export const LANGUAGES = [
  {
    name: "JavaScript",
    value: "javascript",
    icon: Javascript,
  },
  {
    name: "TypeScript",
    value: "typescript",
    icon: Typescript,
  },
  /**
   * Languages below aren't languages, but for the
   * sake of simplicity they are considered languages.
   */
  {
    name: "React",
    value: "react",
    icon: React,
  },
];
