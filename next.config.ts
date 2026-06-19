import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Pin the workspace root to this project so Next never mistakes a stray
    // lockfile in a parent directory (e.g. a user's home folder) for the root.
    root: __dirname,
  },
};

export default nextConfig;
