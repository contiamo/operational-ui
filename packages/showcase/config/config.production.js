const webpackMerge = require("webpack-merge")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const baseConfig = require("./config.base")
const { resolve } = require("path")

module.exports = webpackMerge(baseConfig, {
  plugins: [
    new CopyWebpackPlugin([
      {
        from: resolve(__dirname, "..", "public", "img"),
        to: resolve(__dirname, "..", "dist", "img")
      },
      {
        from: resolve(__dirname, "..", "public", "fonts"),
        to: resolve(__dirname, "..", "dist", "fonts")
      }
    ])
  ]
})
