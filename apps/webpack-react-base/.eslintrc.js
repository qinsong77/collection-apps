module.exports = {
  // ESLint will stop looking in parent folders once it finds a configuration with "root": true.
  root: true,
  extends: ['custom', 'plugin:react/recommended', 'plugin:react/jsx-runtime'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },
};
