/* eslint-disable no-undef */

module.exports = {
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2022,
  },
  plugins: ["prettier"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    "prettier/prettier": "error",
    "react/prop-types": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
