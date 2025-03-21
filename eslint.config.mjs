import { fixupPluginRules } from '@eslint/compat';
import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import html from 'eslint-plugin-html';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      '**/dist/**',
      '**/public/**',
      '**/node_modules/**',
      '**/.cache/**',
      'prettier.config.js',
      'commitlint.config.js',
      'packages/example/gatsby-config.js',
    ],
  },
  {
    plugins: {
      reactHooks: fixupPluginRules(pluginReactHooks),
    },
  },
  {
    files: ['**/*.html'],
    plugins: { html },
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: {
      'jsx-a11y': jsxA11y,
    },
  },
  { languageOptions: { globals: globals.browser } },
  // Add this config for commonJS files
  {
    files: ['gatsby-config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        sourceType: 'commonjs',
      },
    },
  },
  // Add this config for node files
  {
    files: ['*.cjs', '*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  eslintPluginPrettierRecommended,
  eslintConfigPrettier,

  {
    settings: {
      react: {
        version: '18',
      },
    },
    rules: {
      'react/prop-types': 0,
      'react/jsx-no-useless-fragment': 1,
      'no-useless-escape': 0,
      'prettier/prettier': 'error',
    },
  },
];
