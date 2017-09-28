const { resolve } = require("path")

module.exports = {
  entry: resolve(__dirname, "../index.ts"),
  output: {
    path: resolve(__dirname, "../lib"),
    filename: "index.js",
    library: "contiamo-visualizations",
    libraryTarget: "commonjs",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "awesome-typescript-loader",
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader", // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
          },
          {
            loader: "less-loader", // compiles Less to CSS
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
}
