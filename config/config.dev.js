const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const webpack = require('webpack');
const path = require('path');

const config = require('./config.base');

module.exports = webpackMerge(config, {
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve('src', 'App.html') }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new DashboardPlugin(),
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'https://app.contiamo.com',
        secure: false,
      },
    },
  },
});
