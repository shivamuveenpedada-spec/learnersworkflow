import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder content assets are locally-authored SVGs (see scripts/gen-placeholders.mjs).
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
  },
};

export default nextConfig;
