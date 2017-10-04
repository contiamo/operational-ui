const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = { ...require("./webpack.base"), devtool: "inline-source-map", plugins: [new HtmlWebpackPlugin()] }
