module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 2021,
  },
  extends: [
    // ESLint
    'eslint:recommended',
    // TypeScript
    'plugin:@typescript-eslint/recommended',
    // Prettier
    'plugin:prettier/recommended',
  ],
  plugins: [],
  rules: {
    'prettier/prettier': 'error',
    // "@next/next/no-html-link-for-pages": "off",
    // "react/jsx-key": "off",
  },
};
