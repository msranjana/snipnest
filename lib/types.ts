import type { Icon } from "lucide-react";

import type { LanguageIcon } from "@/components/icons/language";

export interface SnippetMetadata {
  name: string;
  description: string;
  keywords: string[];
  contributors: string[];
}

export interface RegexGroups {
  name: string;
  description: string;
  keywords: string;
  contributors: string;
}

export interface Language {
  name: string;
  value: string;
  alias?: string;
  icon: LanguageIcon | typeof Icon;
  isColored: boolean;
}
