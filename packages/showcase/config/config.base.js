const { resolve } = require("path"),
  webpack = require("webpack"),
  HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  // We use babel-polyfill for async/await
  entry: ["regenerator-runtime/runtime", resolve(__dirname, "..", "index.tsx")],
  output: {
    publicPath: "/",
    path: resolve(__dirname, "..", "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)/,
        oneOf: [
          // Documentation snippets
          {
            test: /\.snippet/,
            loader: "raw-loader",
            exclude: /node_modules/,
          },
          // All other TS
          {
            test: /.*/,
            loader: "awesome-typescript-loader",
            exclude: /node_modules/,
          },
        ],
      },
      {
        test: /\.(png|eot|svg|ttf|woff|woff2)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]",
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: resolve(__dirname, "..", "public", "index.html"),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: function(module) {
        // This prevents stylesheet resources with the .css or .scss extension
        // from being moved from their original chunk to the vendor chunk
        if (module.resource && /^.*\.(css|scss)$/.test(module.resource)) {
          return false
        }
        return module.context && module.context.indexOf("node_modules") !== -1
      },
    }),
  ],
  resolve: {
    extensions: [".jsx", ".js", ".tsx", ".ts"],
  },
}
