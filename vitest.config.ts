import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Point at the shipped src/ to bypass the dist bundles, which contain
      // rolldown's require() shims that break vitest's ESM-only jsdom env.
      '@gv-tech/ui-web': path.resolve(__dirname, 'node_modules/@gv-tech/ui-web/src/index.ts'),
      '@gv-tech/ui-core': path.resolve(__dirname, 'node_modules/@gv-tech/ui-core/src/index.ts'),
      '@gv-tech/design-tokens': path.resolve(__dirname, 'node_modules/@gv-tech/design-tokens/src/index.ts'),
    },
  },
});
