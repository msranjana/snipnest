import Javascript from "devicons-react/lib/icons/JavascriptOriginal";
import Typescript from "devicons-react/lib/icons/TypescriptOriginal";
import Rust from "devicons-react/lib/icons/RustOriginal";
import Python from "devicons-react/lib/icons/PythonOriginal";
import React from "devicons-react/lib/icons/ReactOriginal";

/**
 * List of languages, the order doesn't matter as it will be alphabetically sorted
 */
export const LANGUAGES = [
  {
    name: "JavaScript",
    value: "javascript",
    icon: Javascript,
    isColored: true,
  },
  {
    name: "TypeScript",
    value: "typescript",
    icon: Typescript,
    isColored: true,
  },
  {
    name: "Rust",
    value: "rust",
    icon: Rust,
    isColored: false,
  },
  {
    name: "Python",
    value: "python",
    icon: Python,
    isColored: true,
  },
  /**
   * Languages below aren't languages, but for the
   * sake of simplicity they are considered languages.
   */
  {
    name: "React",
    value: "react",
    icon: React,
    isColored: true,
  },
];
