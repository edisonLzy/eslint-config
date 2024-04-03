const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  root: true,
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    // Please note that configuration will not enable any of the plugin’s rules by default
    'plugin:import/recommended',
    // https://github.com/prettier/eslint-plugin-prettier#recommended-configuration
    'plugin:prettier/recommended',
  ],
  plugins: ['unused-imports'],
  ignorePatterns: [
    '*.min.*',
    '*.d.ts',
    'CHANGELOG.md',
    'dist',
    'docs',
    'LICENSE*',
    'output',
    'coverage',
    'public',
    'temp',
    'package-lock.json',
    'pnpm-lock.yaml',
    'yarn.lock',
    '__snapshots__',
    '!.github',
    '!.vitepress',
    '!.vscode',
  ],
  overrides: [
    {
      files: ['*.d.ts'],
      rules: {
        'import/no-duplicates': 'off',
      },
    },
  ],
  rules: {
    // https://eslint.org/docs/latest/rules/padding-line-between-statements
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: ['function', 'export'] },
    ],
    // prettier
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        jsxSingleQuote: true,
        bracketSpacing: true,
      },
    ],
    // import: eslint-plugin-import
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'type',
        ],
      },
    ],
    'import/first': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-unresolved': 'off',
    'import/no-absolute-path': 'off',
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    // avoid phantom dependencies
    'import/no-extraneous-dependencies': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
});
