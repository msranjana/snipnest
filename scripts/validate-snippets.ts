import { readdirSync, readFileSync, statSync } from "node:fs";
import { basename, extname, join, relative, resolve, sep } from "node:path";

import { METADATA_REGEX } from "@/lib/utils";
import type { RegexGroups } from "@/lib/types";

const snippetsDir = resolve(__dirname, "../snippets");

const FOLDER_NAME_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const CODE_BLOCK_REGEX = /```([a-zA-Z0-9-_#+]+)\s*[\s\S]*?```/g;

const validPaths: string[] = [];
const invalidPaths: { path: string; reason: string }[] = [];

function validateFolderStructure(snippetPath: string) {
  const relativePath = relative(snippetsDir, snippetPath);
  const parts = relativePath.split(sep);

  if (parts.length !== 3) {
    throw new Error(
      "Invalid folder structure. The correct structure is: snippets/language/category/snippet.mdx"
    );
  }

  const [language, category] = parts.slice(0, 2);

  if (!FOLDER_NAME_REGEX.test(language)) {
    throw new Error(
      `Invalid language folder name: ${language}. It must be in kebab-case (lowercase letters and hyphens).`
    );
  }

  if (!FOLDER_NAME_REGEX.test(category)) {
    throw new Error(
      `Invalid category folder name: ${category}. It must be in kebab-case (lowercase letters and hyphens).`
    );
  }
}

function validateFileName(filePath: string) {
  const fileName = basename(filePath);
  const fileExtension = extname(fileName);

  if (fileExtension !== ".mdx") {
    throw new Error("File must have a .mdx extension.");
  }

  if (!fileName.split(".")[0].match(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)) {
    throw new Error(
      `Invalid file name: ${fileName}. It must use kebab-case (lowercase letters and hyphens).`
    );
  }
}

function validateMdxFile(filePath: string) {
  const fileContent = readFileSync(filePath, "utf-8");

  const metadataMatch = fileContent.match(METADATA_REGEX);

  if (!metadataMatch) {
    throw new Error(
      "Metadata is missing or does not match the expected format."
    );
  }

  const { name, description, keywords, contributors } =
    metadataMatch.groups as unknown as RegexGroups;

  if (!name) {
    throw new Error('Metadata field "name" is missing or incorrect.');
  }

  if (!description) {
    throw new Error('Metadata field "description" is missing or incorrect.');
  }

  if (!keywords) {
    throw new Error(
      'Metadata field "keywords" is missing or incorrect. (add at least the category name in the array)'
    );
  }

  if (!contributors) {
    throw new Error('Metadata field "contributors" is missing or incorrect.');
  }

  const codeBlocks = [...fileContent.matchAll(CODE_BLOCK_REGEX)];

  if (codeBlocks.length === 1) {
    console.warn(
      `Snippet ${basename(filePath)} has only one code block. It's fine to have only one if it's self-explanatory and is a "one-liner".`
    );
  }

  for (const [match, language] of codeBlocks) {
    if (!language || !/^[a-zA-Z0-9-_#+]+$/.test(language)) {
      throw new Error(`Invalid or missing language in code block: "${match}".`);
    }
  }
}

function validateSnippetsInDirectory(directory: string) {
  const items = readdirSync(directory);

  for (const item of items) {
    const itemPath = join(directory, item);
    const relativePath = join(relative(snippetsDir, directory), item);
    const stats = statSync(itemPath);

    if (stats.isDirectory()) {
      validateSnippetsInDirectory(itemPath);
    } else if (stats.isFile()) {
      try {
        validateFolderStructure(itemPath);
        validateFileName(itemPath);
        validateMdxFile(itemPath);
        validPaths.push(relativePath);
      } catch (error) {
        invalidPaths.push({
          path: relativePath,
          reason: (error as { message: string }).message,
        });
      }
    }
  }
}

function displayValidationResults() {
  const startTime = performance.now();

  validateSnippetsInDirectory(snippetsDir);

  const endTime = performance.now();
  const duration = endTime - startTime;

  console.log(
    `Checked ${validPaths.length + invalidPaths.length} snippets in ${duration.toFixed(1)}ms.`
  );

  if (invalidPaths.length > 0) {
    console.log("\nInvalid snippets:");
    for (const { path, reason } of invalidPaths) {
      console.log(`- ${path}: ${reason}`);
    }

    process.exit(1);
  } else {
    console.log("All snippets are valid.");
    process.exit(0);
  }
}

displayValidationResults();
