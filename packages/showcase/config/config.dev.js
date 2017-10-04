const webpackMerge = require("webpack-merge"),
  DashboardPlugin = require("webpack-dashboard/plugin"),
  webpack = require("webpack"),
  { resolve } = require("path")

const config = require("./config.base")
module.exports = webpackMerge(config, {
  plugins: [new webpack.NamedModulesPlugin(), new DashboardPlugin()],
  devServer: {
    contentBase: resolve(__dirname, "..", "public"),
    historyApiFallback: true,
    publicPath: "/"
  },
  devtool: 'inline-source-map',
})
