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
      "semi": 0,
      "no-param-reassign": 1,
      "arrow-parens": ["error", "as-needed"],
      "consistent-return": ["error", { "treatUndefinedAsUnspecified": true }]
    }
};
