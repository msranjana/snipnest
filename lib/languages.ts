import JavascriptIcon from "devicons-react/lib/icons/JavascriptOriginal";
import TypescriptIcon from "devicons-react/lib/icons/TypescriptOriginal";
import RustIcon from "devicons-react/lib/icons/RustOriginal";
import PythonIcon from "devicons-react/lib/icons/PythonOriginal";
import ReactIcon from "devicons-react/lib/icons/ReactOriginal";

import { RegexIcon } from "lucide-react";

/**
 * List of languages, the order doesn't matter as it will be alphabetically sorted
 */
export const LANGUAGES = [
  {
    name: "JavaScript",
    value: "javascript",
    icon: JavascriptIcon,
    isColored: true,
  },
  {
    name: "TypeScript",
    value: "typescript",
    icon: TypescriptIcon,
    isColored: true,
  },
  {
    name: "Rust",
    value: "rust",
    icon: RustIcon,
    isColored: false,
  },
  {
    name: "Python",
    value: "python",
    icon: PythonIcon,
    isColored: true,
  },
  {
    name: "Regex",
    value: "regex",
    icon: RegexIcon,
    isColored: false,
  },
  /**
   * Languages below aren't languages, but for the
   * sake of simplicity they are considered languages.
   */
  {
    name: "React",
    value: "react",
    icon: ReactIcon,
    isColored: true,
  },
];
