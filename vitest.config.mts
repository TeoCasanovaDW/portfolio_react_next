import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

/**
 * Configuration des tests ciblés de la spec 08.
 * L'alias reprend `paths` de `tsconfig.json` : pas de plugin Vite supplémentaire,
 * les deux versions de Vite présentes dans l'arbre de dépendances entrant sinon en conflit.
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
