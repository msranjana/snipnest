# API Documentation

Welcome to the SnipNest API! This documentation outlines the available endpoints and their structure. Use these endpoints to retrieve snippets, categories, or languages for your projects.

## Rate Limiting

The API has a rate limit of **100 requests per minute**. If you exceed this limit, you will receive a 429 (Too Many Requests) response.

## Endpoints

### `GET` /api/[language]/[category]/[name]

Fetches a specific snippet based on language, category, and name.

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
  },
  "snippet": "string"
}
```

### `GET` /api/[language]/[category]

Returns all snippets in a specific category.

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

### `GET` /api/[language]

Returns all categories available for a specific programming language.

```json
["string"]
```

### `GET` /api/search?query=[query]

Performs full-text search across all snippets.

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

## Error Responses

```json
{
  "status": "number",
  "message": "string"
}
```
