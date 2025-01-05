# SnipNest

### Code Smarter, Not Harder.

Stuck on something? Find ready-to-use snippets that actually work. Got a cool solution? Share it and help someone out. It's like trading ideas, but for code.

## What is SnipNest?

SnipNest is a community-driven hub for code snippets. Whether you’re looking for a quick fix, a clever way to optimize your code, or just some inspiration, you’ll find it here.

And if you’ve got a snippet that’s worth sharing, we’d love to see it! Contribute your solutions and help grow the collection.

## Why SnipNest?

- **Save Time**: No more hunting through forums or guessing what works. These snippets are tested and ready to go.
- **Learn and Share**: Discover new approaches and help others by sharing your expertise.
- **Stay Organized**: Snippets are categorized by language and purpose, so it’s easy to find what you need.

## Getting Started

### Finding Snippets

Visit the [SnipNest website](https://snipnest.dev) to explore categorized snippets for your favorite languages.

Each snippet includes:

- The code itself.
- An example to show how it works.

### Contributing

Got something awesome to add? Check out our [Contributing Guidelines](./CONTRIBUTING.md) for all the details on how to:

- Add features and fix bugs
- Add new snippets
- Edit existing ones
- Create new languages or categories

## Running Locally

To run this project locally, first clone the repository

```
git clone https://github.com/itsbrunodev/snipnest.git
```

Add the environment variables you can find in `.env.example` to `.env.local`. (this project uses `@vercel/kv`, but you can use any other Redis provider you prefer)

Install the dependencies (this project uses pnpm as the package manager, but you can use any other package manager you prefer)

```
pnpm install
```

Then, run the project in the development environment

```
pnpm dev
```

If you want to run the project in the production environment

```
pnpm build
pnpm start
```

## Let’s Build This Together

SnipNest is all about the community. Every snippet you share could be exactly what someone else needs.
