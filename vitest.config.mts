import mdx from '@mdx-js/rollup'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

/**
 * Configuration for the targeted tests of spec 08 and 09.
 * The alias mirrors `paths` from `tsconfig.json`: no extra Vite plugin for it, since the two
 * Vite versions present in the dependency tree would otherwise conflict.
 * `@mdx-js/rollup` only depends on `rollup`, not `vite`, so it carries no such risk: without it,
 * Vitest cannot parse the `.mdx` files that `lib/blog.ts` pulls in, and any test importing it
 * (even transitively, through `app/sitemap.ts`) fails before it runs.
 */
export default defineConfig({
  plugins: [mdx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.{ts,tsx}'],
  },
})
