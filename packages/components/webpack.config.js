// DO NOT DELETE THIS FILE (styleguidist needs it)

const path = require("path")

module.exports = {
  mode: process.env.NODE_ENV || "development",
  devtool: "inline-source-map",
  entry: {
    bundle: [path.resolve(__dirname, "./src/index.ts")],
  },
  context: path.resolve(__dirname),
  output: {
    filename: "index.js",
    path: path.join(__dirname, "lib"),
    library: "@operational/components",
    libraryTarget: "umd",
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
              configFile: path.resolve(
                __dirname,
                process.env.PURPOSE === "build" ? "tsconfig.json" : "tsconfig.styleguide.json",
              ),
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
