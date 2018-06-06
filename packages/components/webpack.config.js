// DO NOT DELETE THIS FILE (styleguidist needs it)

const path = require("path")

module.exports = {
  entry: {
    bundle: [path.resolve(__dirname, "./src/index.ts")],
  },
  context: path.resolve(__dirname),
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "temp"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "awesome-typescript-loader",
            options: {
              configFileName: "./tsconfig.styleguide.json",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
}
