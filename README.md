# SnipNest 🪺

### Code Smarter, Not Harder.

Need code that works? Grab a snippet. Made something cool? Share it back. Simple as that.

[![License](https://badgen.net/github/license/itsbrunodev/snipnest?color=green&label=License)](LICENSE)
[![Stars](https://badgen.net/github/stars/itsbrunodev/snipnest?color=orange&label=Stars)](https://github.com/itsbrunodev/snipnest/stargazers)
[![Issues](https://badgen.net/github/open-issues/itsbrunodev/snipnest?label=Open+Issues)](https://github.com/itsbrunodev/snipnest/issues)

## 🚀 What's Inside

- **Working Snippets**: Code that's tested and ready to use
- **Many Languages**: Pick your favorite - JavaScript, Python, and more
- **Built Together**: Made by developers, for developers

## 🎯 Get Started

Head over to [snipnest.dev](https://snipnest.dev) and start exploring.

```sh
# Clone the repository
git clone https://github.com/itsbrunodev/snipnest.git

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## 📦 Extensions

Integration with your favorite tools to make SnipNest available when you need it most.

- [SnipNest for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=itsbrunodev.snipnest) ([repository](https://github.com/itsbrunodev/snipnest-vscode))
- Is your favorite extension missing? [Open an issue](https://github.com/itsbrunodev/snipnest/issues/new?assignees=&labels=enhancement%2Cfeature&projects=&template=features.yml&title=%5Bfeature%5D+-+)

## 💻 Local Setup

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn

### Environment Variables

For rate limiting in production, you'll need Upstash Redis:

1. Copy `.env.example` to `.env.local`
2. Add your Upstash details ([Get them here](https://upstash.com/docs/redis/overall/getstarted))

> Note: Don't worry about rate limiting on localhost or in development mode - it's off by default.

### Going Live

```bash
pnpm build
pnpm start
```

## 🤝 Want to Help?

Check out our [Contributing Guidelines](./CONTRIBUTING.md). You can:

- Add snippets
- Fix bugs
- Add new features

## 📚 API Docs

Want to build something with our API? [Check the docs](./API.md)

## 🌟 Need Help?

- [Found a bug?](https://github.com/itsbrunodev/snipnest/issues)
- [Have an idea?](https://github.com/itsbrunodev/snipnest/issues)
- [Discussions](https://github.com/itsbrunodev/snipnest/discussions)

## 📜 License

SnipNest is under the [MIT license](./LICENSE).
