# Contributing to SnipNest 🤝

Hey there! Thanks for stopping by and considering contributing to this project. Whether you're fixing bugs, improving the code, or adding cool new snippets, your help means a lot. Before diving in, let's go over a few things to keep everything smooth and consistent.

## 👀 What We're Looking For

- Share a better way to write something.
- Fixing bugs is always appreciated and makes a big difference.
- Submitting useful snippet ideas helps the entire community.

The only thing we ask is that you follow the rules below to keep everything tidy and easy to work with.

## 📝 Snippet Guidelines

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

### 📄 What Goes Inside

Each snippet file needs two things: **metadata** and **code blocks**.

#### 📋 1. Metadata

At the very top of the file, include this export with the same order of properties:

```javascript
export const metadata = {
  name: "Name of the snippet", // Short and clear
  description: "What the snippet does in a sentence or two", // Describe what the snippet does, clearly and concisely
  keywords: ["keyword1", "keyword2", "keyword3"], // Add at least the category name in the array, please keep it short and clear and use kebab-case, within a reasonable amount
  contributors: ["your-username"], // Everyone who helped/contributed, as GitHub usernames
};
```

#### ⚙️ 2. Code Blocks

Your snippet must have **two code blocks**:

1. **Snippet**: This is the actual code. Make sure to annotate it with the language for syntax highlighting, please use the ID or alias of the language found in the [supported languages](https://shiki.style/languages) list.

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

- **No Duplicates**: Don't submit a snippet that does something the target language already has built-in.
- **Stick to the Rules**: Use the proper casing and formats for folder and file names.
- **Only Metadata and Code**: Don't add any markdown related content other than the metadata and code blocks.

### 📘 JavaScript and TypeScript

If you're planning on submitting a snippet for TypeScript, please check if it already exists for JavaScript. If it does, only submit it if it has major differences, e.g., generics, type annotations. For example, adding a TypeScript equivalent for [To Kebab Case](https://snipnest.dev/javascript/string/to-kebab-case) isn't needed as the only difference is the function parameter type.

If you're unsure whether you should submit such a snippet, submit it anyway and we'll check it out.

## 🛠️ How to Contribute

### 🆕 Adding a Snippet

1. Find the right folder for the language and category. If it doesn't exist, create it (refer to [Adding Languages or Categories](#adding-languages-or-categories)).
2. Add a new `.mdx` file for your snippet.
3. Follow the format we outlined above.
4. Submit your work via a pull request (refer to [Submitting Your Work](#submitting-your-work)).

### ✏️ Editing a Snippet

1. Open the file you want to tweak.
2. Make your changes while keeping the format intact.
3. Submit a pull request (refer to [Submitting Your Work](#submitting-your-work)).

## ➕ Adding Languages or Categories

### 🌐 New Language

1. Create a new folder in `snippets/` with the language name in lowercase.
   - For example: `javascript`, `python`, `cpp`.
2. Add categories and snippets as needed.
3. Update the list of languages in `lib/languages.ts`. (strictly only use icons from the `devicons-react` package just like other icons or `lucide-react`)

### 📂 New Category

1. Go to the language folder.
2. Create a new folder for the category in kebab-case.
   - For example: `data-structures`, `file-handling`.
3. Add your snippets inside.

## Submitting Your Work

1. Fork the repo and create a new branch for your changes.
2. Make sure your snippet follows all the rules.
3. Write a clear and descriptive pull request title.
4. Add an explanation of your changes.
5. Be ready to respond to feedback during the review.

Thanks again for contributing! If you have questions or need help, don't hesitate to reach out.
