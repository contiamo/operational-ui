const path = require('path');

module.exports = {
  // We use babel-polyfill for async/await
  entry: ['babel-polyfill', path.resolve('demos.jsx')],
  output: {
    path: path.resolve('dist'),
    filename: 'app.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.png$/,
        use: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js'],
  },
};
