module.exports = {
  env: {
    node: true,
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'airbnb', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: ['autofix', 'prettier'],
  rules: {
    'object-curly-spacing': ['error', 'always'],
    'autofix/no-debugger': 'error',
    semi: 2,
    quotes: [2, 'single'],
    'eol-last': 2,
    indent: ['error', 2],
    curly: [2, 'multi-line'],
    'array-bracket-spacing': [2, 'never'],
    'brace-style': 2,
  },
};
