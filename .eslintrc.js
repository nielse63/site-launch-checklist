module.exports = {
  "root": true,
  "env": {
    "es6": true,
    "node": true
  },
  "extends": "airbnb",
  "parserOptions": {
    "sourceType": "module"
  },
  "parser": "babel-eslint",
  "rules": {
    "semi": ["error", "never"],
    "no-param-reassign": "warn",
    "arrow-parens": ["error", "as-needed"],
    "consistent-return": "warn",
    "max-statements": ["error", 10],
    "max-len": ["error", {
      "ignoreStrings": true,
      "ignoreTemplateLiterals": true,
      "ignoreComments": true
    }],
    "consistent-return": "off",
    "max-nested-callbacks": ["error", 3],
    "complexity": ["error", 4]
  }
};
