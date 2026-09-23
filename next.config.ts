import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 100],
  },
  experimental: {
    // Only convention that allows a complete 404 when the root layout lives under `[locale]`.
    globalNotFound: true,
  },
};

export default nextConfig;
