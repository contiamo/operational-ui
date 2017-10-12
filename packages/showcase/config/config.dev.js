const webpackMerge = require("webpack-merge")
const webpack = require("webpack")
const { resolve } = require("path")

const config = require("./config.base")
module.exports = webpackMerge(config, {
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({ 
      "process.env.NODE_ENV": JSON.stringify("development")
    })
  ],
  devServer: {
    contentBase: resolve(__dirname, "..", "public"),
    historyApiFallback: true,
    publicPath: "/"
  },
  devtool: 'inline-source-map',
})
