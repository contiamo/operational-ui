const webpackMerge = require("webpack-merge"),
  CopyWebpackPlugin = require("copy-webpack-plugin"),
  baseConfig = require("./config.base"),
  { resolve } = require("path")

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
