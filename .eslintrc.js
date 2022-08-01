// https://eslint.org/docs/latest/user-guide/configuring/configuration-files#extending-configuration-files
module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-custom`
  extends: ['@sysuke/eslint-config-base'],
  // settings: {
  //   next: {
  //     rootDir: ["apps/*/"],
  //   },
  // },
};
