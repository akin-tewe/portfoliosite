import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@neighborhood/ui"],
  turbopack: {
    root: ".",
    resolveAlias: {
      "@neighborhood/ui": "./node_modules/@neighborhood/ui/dist/index.js",
      "@neighborhood/ui/tokens.css": "./node_modules/@neighborhood/ui/src/tokens.css",
    },
  },
};

export default nextConfig;
