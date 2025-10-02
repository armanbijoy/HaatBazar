import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* your existing config options here */

  eslint: {
    // This allows deployment even if ESLint reports errors
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
