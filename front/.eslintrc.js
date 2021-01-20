// module.exports = {
//   env: {
//     browser: true,
//     es2021: true,
//     node: true,
//   },
//   extends: [
//     'plugin:react/recommended',
//     'airbnb',
//   ],
//   parserOptions: {
//     ecmaFeatures: {
//       jsx: true,
//     },
//     ecmaVersion: 12,
//     sourceType: 'module',
//   },
//   plugins: [
//     'react',
//     'import',
//   ],
//   rules: {
//     'import/prefer-default-export': 'off',
//     'linebreak-style': 0,
//     'react/prop-types': 0,
//     'react/jsx-props-no-spreading': 'off',
//     'import/no-unresolved': 'off',
//     'import/order': [
//       'error',
//       {
//         groups: [
//           'builtin',
//           'external',
//           ['internal', 'parent', 'sibling', 'index'],
//         ],
//         pathGroups: [
//           {
//             pattern: 'react+(|-redux|-router-dom|-dom|-hook-form)',
//             group: 'external',
//             position: 'before',
//           },
//           {
//             pattern: 'redux+(|-devtools-extension|-thunk)',
//             group: 'external',
//             position: 'before',
//           },
//           {
//             pattern: '+(api|components|config|constants|pages|redux|utils)',
//             group: 'internal',
//           },
//           {
//             pattern: '+(api|components|config|constants|pages|redux|utils)/**',
//             group: 'internal',
//           },
//         ],
//         pathGroupsExcludedImportTypes: ['react'],
//         'newlines-between': 'always',
//         alphabetize: {
//           order: 'asc',
//           caseInsensitive: true,
//         },
//       },
//     ],
//   },
// };
