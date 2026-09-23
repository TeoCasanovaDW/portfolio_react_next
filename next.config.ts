import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 100],
  },
  experimental: {
    // Only convention that allows a complete 404 when the root layout lives under `[locale]`.
    globalNotFound: true,
  },
}

/**
 * Compiles `.mdx` imports into React components.
 * No remark or rehype plugin: the styling lives entirely in `mdx-components.tsx`.
 */
export default createMDX()(nextConfig)
