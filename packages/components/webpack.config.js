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
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(__dirname, "tsconfig.styleguide.json"),
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
