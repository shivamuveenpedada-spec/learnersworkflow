import type { NextConfig } from "next";

// GITHUB_PAGES is only set by .github/workflows/deploy-pages.yml, which builds a static
// preview served from a /learnersworkflow subpath. Vercel (the intended production host)
// never sets it, so that build stays a normal server-rendered Next.js app.
const isGithubPagesBuild = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  ...(isGithubPagesBuild ? { output: "export", basePath, assetPrefix: basePath } : {}),
  images: {
    // Placeholder content assets are locally-authored SVGs (see scripts/gen-placeholders.mjs).
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
    unoptimized: isGithubPagesBuild,
  },
};

export default nextConfig;
