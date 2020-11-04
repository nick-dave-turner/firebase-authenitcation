module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname
  },
  plugins: ["@typescript-eslint", "jest", "promise", "unicorn"],
  extends: [
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "plugin:promise/recommended",
    "plugin:unicorn/recommended",
    "prettier",
    "prettier/react",
    "prettier/@typescript-eslint"
  ],
  env: {
    node: true,
    browser: true,
    jest: true
  },
  rules: {
    // https://github.com/iamturns/create-exposed-app/blob/master/.eslintrc.js
    "react/prop-types": 0,
    "import/prefer-default-export": "off",
    "unicorn/prevent-abbreviations": "off",
    "unicorn/no-abusive-eslint-disable": "off",
    "unicorn/consistent-function-scoping": "off"
  }
};
