module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    env: {
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended'
    ],
    ignorePatterns:    [
        '*.min.*',
        '*.d.ts',
        'CHANGELOG.md',
        'dist',
        'doc',
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
    rules: {
        quotes: ['error', 'single'],
        'no-var': 'warn',
    }
};