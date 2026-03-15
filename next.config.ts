import type { NextConfig } from "next";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dir = dirname(__filename);

const nextConfig: NextConfig = {
  transpilePackages: ["@neighborhood/ui"],
  turbopack: {
    root: __dir,
    resolveAlias: {
      "@neighborhood/ui": "./node_modules/@neighborhood/ui/dist/index.js",
      "@neighborhood/ui/tokens.css": "./node_modules/@neighborhood/ui/src/tokens.css",
    },
  },
};

export default nextConfig;
