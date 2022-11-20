const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['@ee-lint', 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint'],
});
