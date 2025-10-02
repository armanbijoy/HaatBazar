import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* your existing config */

  eslint: {
    ignoreDuringBuilds: true, // ignore ESLint errors
  },

  typescript: {
    // Ignore TS errors during production build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
