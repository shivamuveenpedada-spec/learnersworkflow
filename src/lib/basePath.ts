// next/link and next/image auto-prefix basePath; raw <audio src> tags don't, so asset
// paths passed straight to <audio> need this helper. See next.config.ts for context.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string) {
  return `${BASE_PATH}${path}`;
}
