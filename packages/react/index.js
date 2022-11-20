module.exports = {
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    '@ee-lint/ts',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
};
