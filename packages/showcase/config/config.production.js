const webpack = require("webpack")
const webpackMerge = require("webpack-merge")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const baseConfig = require("./config.base")
const { resolve } = require("path")

module.exports = webpackMerge(baseConfig, {
  plugins: [
    new CopyWebpackPlugin([
      {
        from: resolve(__dirname, "..", "public", "favicons"),
        to: resolve(__dirname, "..", "dist", "favicons")
      }
    ]),
    new webpack.DefinePlugin({ 
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
})
