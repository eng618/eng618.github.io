import { nextjs } from '@gv-tech/eslint-config';

/**
 * ESLint configuration for Next.js projects. Uses @gv-tech/eslint-config for sensible defaults. For more information on
 * configuration options, see: https://github.com/Garcia-Ventures/eslint-config
 */
export default [
  ...nextjs,
  // Add project-specific overrides here
  {
    ignores: ['eslint.config.mjs'],
  },
];
