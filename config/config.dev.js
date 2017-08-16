const webpackMerge = require('webpack-merge');
const DashboardPlugin = require('webpack-dashboard/plugin');
const webpack = require('webpack');
const path = require('path');

const config = require('./config.base');

module.exports = webpackMerge(config, {
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new DashboardPlugin(),
  ],
  devServer: {
    contentBase: './public',
    hot: true,
    historyApiFallback: true,
  },
});
