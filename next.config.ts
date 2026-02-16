import type { NextConfig } from "next";

const repoName = "JesseGong";
const isProd = process.env.NODE_ENV === "production";

const basePath = isProd ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  // Static export (required for GitHub Pages)
  output: "export", // :contentReference[oaicite:2]{index=2}

  // GitHub Pages project site is served from /<repoName>/
  basePath, // :contentReference[oaicite:3]{index=3}
  assetPrefix: basePath,

  // GitHub Pages likes directory-style URLs
  trailingSlash: true, // :contentReference[oaicite:4]{index=4}

  // next/image optimization needs a server; disable for static export
  images: { unoptimized: true },
};

export default nextConfig;
