/* eslint-env node */
module.exports = {
  extends: ["next/core-web-vitals", "plugin:@typescript-eslint/strict"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  root: true,
  rules: {
    "@typescript-eslint/consistent-type-imports": "error",
  },
};
