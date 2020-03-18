module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'node': true,
    'mocha': true,
  },
  'extends': [
    'google',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'rules': {
    'comma-dangle': 0,
    'linebreak-style': [2, (require('os').EOL === '\r\n' ? 'windows' : 'unix')],
  },
};
