# Contributing to SnipNest 🤝

Hey there! Thanks for stopping by and considering contributing to this project. Whether you're fixing bugs, improving the code, or adding cool new snippets, your help means a lot. Before diving in, let's go over a few things to keep everything smooth and consistent.

## 📚 Table of Contents

- [Contributing to SnipNest 🤝](#contributing-to-snipnest-)
  - [📚 Table of Contents](#-table-of-contents)
  - [👀 What We're Looking For](#-what-were-looking-for)
  - [🖋️ Snippet Guidelines](#️-snippet-guidelines)
    - [📂 Folder Structure](#-folder-structure)
    - [🗃️ File Type](#️-file-type)
    - [🔄 What Goes Inside](#-what-goes-inside)
      - [📋 1. Metadata](#-1-metadata)
      - [⚙️ 2. Code Blocks](#️-2-code-blocks)
    - [❗ Important Notes](#-important-notes)
    - [📘 JavaScript and TypeScript](#-javascript-and-typescript)
  - [🛠️ How to Contribute](#️-how-to-contribute)
    - [✔️ Submitting Snippets](#️-submitting-snippets)
      - [🔧 CLI (Beta)](#-cli-beta)
      - [✍️ Manually](#️-manually)
    - [➕ Adding Languages or Categories](#-adding-languages-or-categories)
      - [🌐 New Language](#-new-language)
      - [📂 New Category](#-new-category)
    - [Submitting Your Work](#submitting-your-work)

## 👀 What We're Looking For

- Share a better way to write something.
- Fixing bugs is always appreciated and makes a big difference.
- Submitting useful snippet ideas helps the entire community.

The only thing we ask is that you follow the rules below to keep everything tidy and easy to work with.

## 🖋️ Snippet Guidelines

### 📂 Folder Structure

Snippets live in this structure:

```
snippets/language/category/snippet.mdx
```

Here's how it breaks down:

- **`language`**: Lowercase only. For example:
  - `JavaScript` -> `javascript`
  - `c++` → `cpp`
  - `c#` → `cs`
- **`category` and `snippet`**: Use [kebab-case](https://developer.mozilla.org/en-US/docs/Glossary/Kebab_case). For example: `lorem-ipsum`.

### 🗃️ File Type

Every snippet must be a `.mdx` file.

### 🔄 What Goes Inside

Each snippet file needs two things: **metadata** and **code blocks**.

#### 📋 1. Metadata

At the very top of the file, include this export with the same order of properties, please check if another snippet has the same functionality but in another language, if so, please use the same name and description:

```javascript
export const metadata = {
  name: "Name of the snippet", // Use short and clear names.
  description: "What the snippet does in a sentence or two", // Be concise and accurate.
  keywords: ["keyword1", "keyword2", "keyword3"], // Add relevant keywords in kebab-case.
  contributors: ["username"], // GitHub usernames only. Do not include @ symbols.
}; // Don't omit the semicolon.
```

#### ⚙️ 2. Code Blocks

Your snippet must have **two code blocks** (you **can** use only one, that being the actual snippet, if it's really short, an example is useful for example for pasting the snippet using the Visual Studio Code extension as it pastes the snippet and the example at the same time):

1. **Snippet**: This is the actual code. Annotate it with the language for syntax highlighting (use the [supported languages](https://shiki.style/languages) list, react snippets that have HTML tags should use `tsx`).

   Example:

   ````markdown
   ```javascript
   const add = (a, b) => a + b;
   ```
   ````

2. **Example**: Show how the snippet works with an example.

   Example:

   ````markdown
   ```javascript
   add(2, 3); // 5
   ```
   ````

### ❗ Important Notes

- **No Duplicates**: Don't submit a snippet that duplicates built-in language functionality.
- **Clear Grammar**: Ensure any error messages or text in the code is grammatically correct.
- **Consistent Naming**: Use precise and relevant terms (e.g., `element` instead of `item` for dictionaries), do not include the name of the category in the snippet's file name (e.g., `chunk.mdx` instead of `chunk-array.mdx`).
- **File Naming**: File names should match the snippet name (in kebab-case). For instance, a snippet named `Random Element` should have a file named `random-element.mdx`.
- **Only Metadata and Code**: Don't add unrelated markdown content outside of the required metadata and code blocks.
- **Trailing Newline**: Make sure the file **does not** end with a trailing newline.

If you're unsure about for example what the name of the snippet's file should be, ask in the [Discussions](https://github.com/itsbrunodev/snipnest/discussions) or check out the other snippets.

### 📘 JavaScript and TypeScript

If you're planning to submit a TypeScript snippet, check if it already exists for JavaScript. Only submit it if it has significant differences, like generics or type annotations.

Please use a regular function, not an arrow function.

If unsure, submit it anyway, and we'll help decide.

## 🛠️ How to Contribute

### ✔️ Submitting Snippets

You can submit snippets in two ways: **via CLI** or **manually**.

#### 🔧 CLI (Beta)

The CLI simplifies generating new snippet files.

> [!NOTE]
> The CLI is in beta but safe to use. It may change in future releases.

1. Clone the repository.
2. Install dependencies with `pnpm install`.
3. Run the CLI:
   ```bash
   pnpm snipnest --new
   ```
4. Follow the prompts to create your snippet.
5. Review the generated `.mdx` file and make adjustments as needed.
6. Submit your work via a pull request.

#### ✍️ Manually

1. Navigate to the appropriate folder for the language and category. Create them if they don't exist.
2. Add a `.mdx` file for your snippet.
3. Follow the guidelines above to structure and format your file.
4. Submit your work via a pull request.

### ➕ Adding Languages or Categories

#### 🌐 New Language

1. Create a folder in `snippets/` with the language name in lowercase.
   - For example: `javascript`, `python`, `cpp`.
2. Add categories and snippets as needed.
3. Update the language list in `lib/languages.ts`. Only use icons from `devicons-react` or `lucide-react`.

#### 📂 New Category

1. Go to the appropriate language folder.
2. Create a folder for the category in kebab-case.
   - For example: `data-structures`, `file-handling`.
3. Add snippets inside.

### Submitting Your Work

1. Fork the repo and create a new branch for your changes.
2. Make sure your snippet follows all the rules.
3. Write a clear and descriptive pull request title.
4. Add an explanation of your changes.
5. Be ready to respond to feedback during the review.

Thanks again for contributing! If you have questions or need help, don't hesitate to reach out. 😊
