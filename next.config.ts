import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Pin the workspace root to this project so Next never mistakes a stray
    // lockfile in a parent directory (e.g. a user's home folder) for the root.
    root: __dirname,
  },
  compiler: {
    // Strip console.* from production builds (keep errors/warnings).
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },
};

export default nextConfig;
