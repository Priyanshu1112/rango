import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,   // extra React warnings in dev
  eslint: {
    ignoreDuringBuilds: false, // enforce lint checks
  },
  typescript: {
    ignoreBuildErrors: false, // enforce TS checks
  },
};

export default nextConfig;
