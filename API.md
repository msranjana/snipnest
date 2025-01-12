# API Documentation

Here's everything you need to know about using the SnipNest API.

## 🚦 Rate Limit

You can make up to **100 requests per minute**. If you go over that, you'll get a 429 error.

## 🔗 Available Endpoints

### `GET` [/api/languages](https://snipnest.dev/api/languages)

Gives you a list of all programming languages we support, as an array of strings.

```json
["string"]
```

### `GET` [/api/[language]](https://snipnest.dev/api/[language])

Shows you all categories for a specific language, as an array of strings.

```json
["string"]
```

### `GET` [/api/[language]/[category]](https://snipnest.dev/api/[language]/[category])

Lists all snippets in a category.

```json
[
  {
    "language": "string",
    "category": "string",
    "name": "string",
    "metadata": {
      "name": "string",
      "description": "string",
      "keywords": ["string"],
      "contributors": ["string"]
    }
  }
]
```

### `GET` [/api/[language]/[category]/[name]](https://snipnest.dev/api/[language]/[category]/[name])

Returns a single snippet with all its details.

```json
{
  "language": "string",
  "category": "string",
  "name": "string",
  "metadata": {
    "name": "string",
    "description": "string",
    "keywords": ["string"],
    "contributors": ["string"]
  }
}
```

### `GET` [/api/[language]/[category]/[name]/raw](https://snipnest.dev/api/[language]/[category]/[name]/raw)

Just the code, nothing else.

```text
function delay(ms: number): Promise<void> {
  ...
```

### `GET` [/api/search?query=[query]](https://snipnest.dev/api/search?query=[query])

Find snippets across the whole site. Works with names, descriptions, and keywords.

```json
[
  {
    "language": "string",
    "category": "string",
    "name": "string",
    "metadata": {
      "name": "string",
      "description": "string",
      "keywords": ["string"],
      "contributors": ["string"]
    }
  }
]
```

## 🚨 Errors

Every endpoint which has an error will return an object like this:

```json
{
  "status": 404,
  "message": "Snippet not found."
}
```
