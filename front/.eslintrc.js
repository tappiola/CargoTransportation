module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  // "parser": "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'sort-imports-es6-autofix',
  ],
  rules: {
    'import/prefer-default-export': 'off',
    'linebreak-style': 0,
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 'off',
    'import/no-unresolved': 'off',
    'import/order': 'off',
    'sort-imports-es6-autofix/sort-imports-es6': [2, {
      ignoreCase: false,
      ignoreMemberSort: false,
      memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
    }],
  },
};
