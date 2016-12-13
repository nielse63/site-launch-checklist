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
  "rules": {
    "semi": ["error", "never"],
    "no-param-reassign": "warn",
    "arrow-parens": ["error", "as-needed"],
    "consistent-return": "warn",
    "max-statements": ["error", 10],
  }
};
