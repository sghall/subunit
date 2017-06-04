module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    sourceType: "module"
  },
  rules: {
    'indent': ['error', 2],
    'no-var': 'error',
    'prefer-const': 'error',
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'object-curly-spacing': ['error', 'always']
  }
};
