import chalk from "chalk";

import { getGroupedSnippets } from "@/lib/snippets";
import { formatLanguage, toTitleCase } from "@/lib/utils";

/**
 * List all snippets
 */
export async function listSnippets() {
  const groupedSnippets = await getGroupedSnippets();

  for (const [language, categories] of Object.entries(groupedSnippets)) {
    console.log(`${chalk.bgYellow(formatLanguage(language))}`);
    for (const [category, snippets] of Object.entries(categories)) {
      console.log(`  ${chalk.yellow(toTitleCase(category))}`);
      for (const snippet of snippets) {
        console.log(
          `    ${snippets.indexOf(snippet) + 1}. ${snippet.metadata.name}`
        );
      }
    }
  }

  console.log(
    `\nYou've scrolled through ${Object.keys(groupedSnippets).length} languages, ${Object.values(groupedSnippets).reduce((acc, categories) => acc + Object.keys(categories).length, 0)} categories and ${Object.values(groupedSnippets).reduce((acc, categories) => acc + Object.values(categories).reduce((acc, snippets) => acc + snippets.length, 0), 0)} snippets in total.`
  );
}
