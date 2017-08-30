const webpackMerge = require("webpack-merge")
const DashboardPlugin = require("webpack-dashboard/plugin")
const webpack = require("webpack")
const path = require("path")

const config = require("./config.base")
console.log("hi", __dirname)
module.exports = webpackMerge(config, {
  plugins: [new webpack.NamedModulesPlugin(), new DashboardPlugin()],
  devServer: {
    contentBase: "./public",
    historyApiFallback: true
  },
  resolve: {
    alias: {
      "contiamo-ui-components": path.resolve(
        __dirname,
        "..",
        "..",
        "ui-components/dist/components.js"
      )
    }
  }
})
