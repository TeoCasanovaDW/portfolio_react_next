import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 100],
  },
  experimental: {
    // Seule convention qui permet une 404 complète quand le layout racine vit sous `[locale]`.
    globalNotFound: true,
  },
};

export default nextConfig;
