import inquirer from "inquirer";

import { LANGUAGES } from "@/lib/languages";
import { getFileExtension, toKebabCase } from "@/lib/utils";

/**
 * Prompt the user to select a language
 */
export async function languagePrompt(): Promise<string> {
  const { language } = await inquirer.prompt<{
    language: string;
  }>({
    type: "list",
    name: "language",
    message: "Select the language for the new snippet:",
    choices: [...LANGUAGES.map((x) => x.value), "Other (new language)"],
  });

  return language;
}

/**
 * Prompt the user to create a new language
 */
export async function newLanguagePrompt(): Promise<string> {
  const { newLanguage } = await inquirer.prompt<{
    newLanguage: string;
  }>({
    type: "input",
    required: true,
    name: "newLanguage",
    message: "Enter the name of the new language:",
  });

  return toKebabCase(newLanguage);
}

/**
 * Prompt the user to continue
 */
export async function continuePrompt(message: string) {
  await inquirer.prompt({
    type: "confirm",
    name: "continue",
    message,
  });
}

/**
 * Prompt the user to select a category
 */
export async function categoryPrompt(): Promise<string> {
  const { category } = await inquirer.prompt<{
    category: string;
  }>({
    type: "input",
    required: true,
    name: "category",
    message: "Enter the category for the new snippet:",
  });

  return toKebabCase(category);
}

/**
 * Prompt the user to enter the snippet name
 */
export async function snippetNamePrompt(): Promise<string> {
  const { name } = await inquirer.prompt<{
    name: string;
  }>({
    type: "input",
    required: true,
    name: "name",
    message: "Enter the name for the new snippet:",
  });

  return toKebabCase(name);
}

/**
 * Prompt the user to enter the snippet description
 */
export async function snippetDescriptionPrompt(): Promise<string> {
  const { description } = await inquirer.prompt<{
    description: string;
  }>({
    type: "input",
    required: true,
    name: "description",
    message: "Enter the description for the new snippet:",
  });

  return description;
}

export async function snippetKeywordsPrompt(): Promise<string[]> {
  const { keywords } = await inquirer.prompt<{
    keywords: string;
  }>({
    type: "input",
    required: true,
    name: "keywords",
    message:
      "Enter the keywords for the new snippet, separated by commas (e.g. keyword1, keyword2):",
  });

  return keywords.split(",").map((x) => x.trim());
}

export async function snippetContributorsPrompt(): Promise<string[]> {
  const { contributors } = await inquirer.prompt<{
    contributors: string;
  }>({
    type: "input",
    required: true,
    name: "contributors",
    message:
      "Enter the contributors for the new snippet, separated by commas (e.g. contributor1, contributor2):",
  });

  return contributors.split(",").map((x) => x.trim());
}

/**
 * Prompt the user to enter the snippet code/example
 */
export async function snippetEditorPrompt(
  type: "code" | "example",
  language: string,
  required = true
): Promise<string> {
  const { snippet } = await inquirer.prompt<{ snippet: string }>({
    type: "editor",
    postfix: `.${getFileExtension(language)}`,
    name: "snippet",
    message: `Enter the code for the new snippet's ${type}${required ? " (required)" : " (optional)"}:`,
  });

  return snippet.trim();
}
