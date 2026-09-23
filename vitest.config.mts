import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

/**
 * Configuration for the targeted tests of spec 08.
 * The alias mirrors `paths` from `tsconfig.json`: no extra Vite plugin, since the two
 * Vite versions present in the dependency tree would otherwise conflict.
 */
export default defineConfig({
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
