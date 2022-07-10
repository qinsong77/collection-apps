module.exports = {
  // ESLint will stop looking in parent folders once it finds a configuration with "root": true.
  root: true,
  extends: ["custom", "plugin:react/recommended"],
  settings: {
    react: {
      version: "detect",
    },
  },
};
