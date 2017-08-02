const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const config = require('./config.base');

module.exports = webpackMerge(config, {
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve('src', 'App.html') }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
  },
});
