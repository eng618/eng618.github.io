import fs from 'node:fs';
import path from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vitest/config';

const GV_TECH_ROOT = path.resolve(__dirname, 'node_modules/@gv-tech');
const GV_TECH_PACKAGES = ['ui-web', 'ui-core', 'design-tokens'];

/**
 * Resolves the `@gv-tech/<pkg>/src` directory when the importing file lives
 * inside that package. The `@gv-tech/*` packages source their components via
 * `@/./button`-style imports that are meant to resolve within their own `src`,
 * not the host project's `src`.
 */
function gvTechSrcRoot(importer: string | undefined): string | null {
  if (!importer) return null;
  const normalized = path.normalize(importer);
  const marker = path.join('node_modules', '@gv-tech') + path.sep;
  const idx = normalized.indexOf(marker);
  if (idx === -1) return null;
  const pkg = normalized.slice(idx + marker.length).split(path.sep)[0];
  if (!GV_TECH_PACKAGES.includes(pkg)) return null;
  return path.resolve(GV_TECH_ROOT, pkg, 'src');
}

function tryResolveFile(candidate: string): string | null {
  if (fs.existsSync(candidate)) return candidate;
  for (const ext of ['.ts', '.tsx', '.js', '.jsx', '.mjs']) {
    const withExt = candidate + ext;
    if (fs.existsSync(withExt)) return withExt;
  }
  for (const name of ['index.ts', 'index.tsx', 'index.js', 'index.jsx', 'index.mjs']) {
    const indexFile = path.join(candidate, name);
    if (fs.existsSync(indexFile)) return indexFile;
  }
  return null;
}

/**
 * Package-aware `@/` alias resolver.
 *
 * - `@/` imports from within `node_modules/@gv-tech/<pkg>/...` resolve to `node_modules/@gv-tech/<pkg>/src` (the
 *   package's own source root).
 * - All other `@/` imports resolve to the host project's `src`.
 *
 * Replaces a global `@` alias, which cannot mean two different roots at once.
 */
const resolvePackageAwareAtAlias: Plugin = {
  name: 'resolve-package-aware-at-alias',
  enforce: 'pre',
  async resolveId(id, importer, options) {
    if (typeof id !== 'string' || !id.startsWith('@/')) return null;

    const root = gvTechSrcRoot(importer) ?? path.resolve(__dirname, 'src');
    // Strip the leading '@/' and resolve relative to the package/project src root.
    const candidate = path.resolve(root, id.slice(2));

    // Delegate to vite's normal resolution so extensions and index files are handled,
    // skipping self to avoid re-entering this plugin.
    const resolved = await this.resolve(candidate, importer, {
      skipSelf: true,
      ...options,
    });
    if (resolved) return resolved;

    const fallback = tryResolveFile(candidate);
    return fallback ? { id: fallback } : null;
  },
};

export default defineConfig({
  plugins: [react(), resolvePackageAwareAtAlias],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      // Point at the shipped src/ to bypass the dist bundles, which contain
      // rolldown's require() shims that break vitest's ESM-only jsdom env.
      '@gv-tech/ui-web': path.resolve(__dirname, 'node_modules/@gv-tech/ui-web/src/index.ts'),
      '@gv-tech/ui-core': path.resolve(__dirname, 'node_modules/@gv-tech/ui-core/src/index.ts'),
      '@gv-tech/design-tokens': path.resolve(__dirname, 'node_modules/@gv-tech/design-tokens/src/index.ts'),
    },
  },
});
