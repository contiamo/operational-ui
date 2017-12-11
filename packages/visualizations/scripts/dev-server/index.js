const path = require("path")
const webpack = require("webpack")
const WebpackDevServer = require("webpack-dev-server")

const config = {
  entry: path.resolve(__dirname, "site.tsx"),
  output: {
    path: path.resolve(__dirname),
    publicPath: "/",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)/,
        loader: "awesome-typescript-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: []
}

const compiler = webpack(config)
const server = new WebpackDevServer(compiler, {
  contentBase: path.resolve(__dirname),
  historyApiFallback: true
})

server.listen(8080)
