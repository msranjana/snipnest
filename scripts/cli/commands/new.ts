import chalk from "chalk";

import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";

import { LANGUAGES } from "@/lib/languages";
import { getGroupedSnippets } from "@/lib/snippets";
import { getSnippetList } from "@/lib/utils";

import {
  languagePrompt,
  newLanguagePrompt,
  continuePrompt,
  categoryPrompt,
  snippetNamePrompt,
  snippetDescriptionPrompt,
  snippetKeywordsPrompt,
  snippetContributorsPrompt,
  snippetEditorPrompt,
} from "./new.prompts";

/**
 * Get all LANGUAGES values from the languages.ts file
 */
async function getFileLanguageValues(): Promise<string[]> {
  const fileContent = await readFile(
    join(process.cwd(), "lib", "languages.ts"),
    "utf-8"
  );
  const regex = /value: "(?<language>.+)"/g;
  const matches = [...fileContent.matchAll(regex)];
  return matches.map((match) => match[1]);
}

/**
 * Create a file with the given path and content
 */
async function createFileWithDirectories(filePath: string, content: string) {
  const directory = dirname(filePath);

  if (!existsSync(directory)) {
    mkdirSync(directory, { recursive: true });
  }

  writeFileSync(filePath, content, "utf-8");
}

export async function newSnippet() {
  const groupedSnippets = await getGroupedSnippets();

  // Get all languages in /snippets
  const languages = Object.keys(groupedSnippets);

  let selectedLanguage = await languagePrompt();

  // If the user selected "Other (new language)"
  if (selectedLanguage === "Other (new language)") {
    const newLanguage = await newLanguagePrompt();

    // Check if the new language already exists
    if (languages.includes(newLanguage)) {
      console.log(
        `${chalk.bold.yellow("!")} Language ${chalk.cyan(newLanguage)} already exists at ${chalk.cyan("/snippets")}, setting the language to ${chalk.cyan(newLanguage)}.`
      );
    } else if (!LANGUAGES.find((x) => x.value === newLanguage)) {
      console.log(
        `${chalk.bold.yellow("!")} As you've selected ${chalk.cyan(newLanguage)} as a new language, it must be added by hand in the ${chalk.cyan("/lib/languages.ts")} file (${chalk.cyan("LANGUAGES")} and ${chalk.cyan("LANGUAGE_EXTENSIONS")}).`
      );

      await continuePrompt(
        `Have you added the new language in the ${chalk.blue("/lib/languages.ts")} file?`
      );
    }

    selectedLanguage = newLanguage;
  }

  // const { LANGUAGES } = await import("@/lib/languages");
  const languageValues = await getFileLanguageValues();

  if (!languageValues.find((x) => x === selectedLanguage)) {
    console.error(
      `${chalk.bold.red(
        "✘"
      )} Language "${selectedLanguage}" is not a valid language. Valid languages are: ${languageValues.join(", ")}.`
    );

    process.exit(1);
  }

  const languageCategories = Object.keys(groupedSnippets[selectedLanguage]);

  const selectedCategory = await categoryPrompt();

  // Check if the category already exists
  if (languageCategories.includes(selectedCategory)) {
    console.warn(
      `${chalk.bold.yellow("!")} Category "${selectedCategory}" already exists in language "${selectedLanguage}", setting the category to "${selectedCategory}".`
    );
  }

  const snippetName = await snippetNamePrompt();

  const snippetList = getSnippetList(groupedSnippets);

  // Check if a snippet with the same name already exists
  if (snippetList.find((snippet) => snippet.name === snippetName)) {
    console.error(
      `${chalk.bold.red(
        "✘"
      )} A snippet with the name "${snippetName}" in language "${selectedLanguage}" and category "${selectedCategory}" already exists.`
    );

    process.exit(1);
  }

  const snippetDescription = await snippetDescriptionPrompt();

  // Prompt the user for the snippet keywords
  const snippetKeywords = await snippetKeywordsPrompt();

  // Prompt the user for the snippet contributors
  const snippetContributors = await snippetContributorsPrompt();

  const metadataString = `export const metadata = {
  name: "${snippetName}",
  description: ${snippetDescription.includes('"') ? `'${snippetDescription}'` : `"${snippetDescription}"`},
  keywords: ${JSON.stringify(snippetKeywords)},
  contributors: ${JSON.stringify(snippetContributors)},
};`;

  const snippetCode = await snippetEditorPrompt("code", selectedLanguage);
  const snippetExample = await snippetEditorPrompt(
    "example",
    selectedLanguage,
    false
  );

  const file = `${metadataString}  

\`\`\`${""}
${snippetCode}
\`\`\`${snippetExample.length > 0 ? `\n\n\`\`\`\n${snippetExample}\n\`\`\`` : ""}`;

  createFileWithDirectories(
    join(
      process.cwd(),
      "snippets",
      selectedLanguage,
      selectedCategory,
      `${snippetName}.mdx`
    ),
    file
  );

  console.log(
    `${chalk.bold.green("✔")} Snippet created at ${chalk.cyan(
      join(
        process.cwd(),
        "snippets",
        selectedLanguage,
        selectedCategory,
        `${snippetName}.mdx`
      )
    )}`
  );
}
