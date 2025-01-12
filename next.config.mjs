import nextMDX from "@next/mdx";

import rehypePrettyCode from "rehype-pretty-code";
import { transformerColorHighlight } from "shiki-transformer-color-highlight";

import packageJson from "./package.json" with { type: "json" };

/** @type {import('rehype-pretty-code').Options} */
const options = {
  theme: {
    dark: "github-dark",
    light: "github-light",
  },
  transformers: [transformerColorHighlight()],
  keepBackground: false,
  bypassInlineCode: false,
};

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [[rehypePrettyCode, options]],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["mdx", "ts", "tsx"],
  reactStrictMode: false,
  env: {
    VERSION: packageJson.version,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/itsbrunodev/snipnest/refs/heads/main/assets/**",
        search: "",
      },
    ],
  },
};

export default withMDX(nextConfig);
