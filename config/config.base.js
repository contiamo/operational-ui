const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // We use babel-polyfill for async/await
  entry: ['babel-polyfill', path.resolve('./src/index.jsx')],
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
        test: /\.(png|eot|svg|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: path.resolve('public', 'index.html') })],
  resolve: {
    extensions: ['.jsx', '.js'],
  },
};
