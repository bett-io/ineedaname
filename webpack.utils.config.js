const fs = require('fs');
const path = require('path');

module.exports = {
  entry: [
    'babel-polyfill',
    './utils/prob_calculator.js',
  ],

  output: {
    path: path.join(__dirname, '/bin'),
    libraryTarget: 'commonjs2',
    filename: 'prob_calculator.js',
  },

  target: 'node',

  externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
    'react-dom/server', 'react/addons',
  ]).reduce((ext, mod) => {
    ext[mod] = `commonjs ${mod}`;
    return ext;
  }, {}),

  node: {
    __filename: false,
    __dirname: false,
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
