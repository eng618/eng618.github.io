module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['@babel', 'react', 'jsx-a11y', 'prettier'],
  ignorePatterns: [
    '**/node_modules/',
    '**/public/',
    '**/.cache/',
    '**/build/',
    '**/_this_is_virtual_fs_path_/',
  ],
  rules: {
    'react/jsx-filename-extension': 0,
    'import/no-anonymous-default-export': 0,
    'react/jsx-props-no-spreading': 0,
  },
};
