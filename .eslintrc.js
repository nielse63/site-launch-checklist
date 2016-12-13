module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "mocha": true
    },
    "extends": "airbnb",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
      "semi": ["error", "never"],
      "no-param-reassign": "warn",
      "arrow-parens": ["error", "as-needed"],
      "consistent-return": ["error", { "treatUndefinedAsUnspecified": true }],
      "max-statements": ["error", 10]
    }
};
