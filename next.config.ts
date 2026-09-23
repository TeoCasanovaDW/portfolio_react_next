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
 * Syntax highlighting of the fenced code blocks, at build time: the pages are prerendered,
 * so the visitor receives already coloured HTML and no highlighting script.
 * The plugin is named as a string, the only form Turbopack can serialize for its loaders.
 *
 * `langs` is listed explicitly so the build only loads these grammars instead of every one
 * Shiki ships. A block written in a language missing from this list still renders, simply
 * without colour: if that happens in an article, add the language here.
 * `theme` accepts any VS Code theme bundled with Shiki, so it swaps in one string.
 */
const rehypeShiki: [name: string, options: Record<string, unknown>] = [
  '@shikijs/rehype',
  {
    theme: 'tokyo-night',
    langs: ['ts', 'tsx', 'js', 'jsx', 'json', 'css', 'html', 'bash', 'yaml', 'sql', 'diff', 'md'],
  },
]

/**
 * Compiles `.mdx` imports into React components.
 * Shiki colours the tokens; the frame around a block stays in `mdx-components.tsx`.
 */
export default createMDX({ options: { rehypePlugins: [rehypeShiki] } })(nextConfig)
