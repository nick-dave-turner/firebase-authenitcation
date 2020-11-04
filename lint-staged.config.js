module.exports = {
  "**/*.{css,html,json,md,yaml,yml}": ["prettier --write", "git add"],
  "**/*.{ts,tsx}": [
    "prettier --write",
    "eslint --cache --ext '.ts,.tsx'",
    "git add"
  ]
};
