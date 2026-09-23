import { next } from '@gv-tech/oxc-config/next';
import { vite } from '@gv-tech/oxc-config/vite';
import { defineConfig } from 'oxlint';

/**
 * Oxlint configuration for Next.js projects. Uses @gv-tech/oxc-config for sensible defaults. For more information on
 * configuration options, see: https://github.com/Garcia-Ventures/oxc-config
 */
export default defineConfig({
  extends: [vite, next],
  rules: {
    // Automatic JSX runtime (tsconfig `jsx: react-jsx`, React 19) — no React import needed.
    'react/react-in-jsx-scope': 'off',
  },
  overrides: [
    {
      // CLI scripts intentionally log and use loose types. The shared preset means to
      // ignore these entirely, but its ignorePatterns don't apply through the TS-config
      // extends chain, so scope them down here instead.
      files: ['scripts/**'],
      rules: { 'eslint/no-console': 'off', 'typescript/no-explicit-any': 'off' },
    },
    {
      // Intentional logging: analytics pipeline, Supabase client, game audio fallbacks.
      files: ['src/lib/analytics.ts', 'src/lib/supabase.ts', 'src/app/not-found.tsx'],
      rules: { 'eslint/no-console': 'off' },
    },
  ],
});
