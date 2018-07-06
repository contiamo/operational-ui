// DO NOT DELETE THIS FILE (styleguidist needs it)

const path = require("path")

module.exports = env => ({
  mode: process.env.NODE_ENV,
  devtool: "inline-source-map",
  entry: {
    bundle: [path.resolve(__dirname, "./src/index.ts")],
  },
  context: path.resolve(__dirname, "./src"),
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
              allowTsInNodeModules: true,
              configFile: path.resolve(__dirname, env === "package" ? "tsconfig.json" : "tsconfig.styleguide.json"),
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
})
