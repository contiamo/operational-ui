const webpackMerge = require("webpack-merge")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const baseConfig = require("./config.base")

module.exports = webpackMerge(baseConfig, {
  plugins: [
    new CopyWebpackPlugin([
      { from: "public/img", to: "img" },
      { from: "public/fonts", to: "fonts" },
    ]),
  ],
})
