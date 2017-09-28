module.exports = env => {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader", // creates style nodes from JS strings
          },
          // {
          //   loader: "css-loader", // translates CSS into CommonJS
          // },
          {
            loader: "less-loader", // compiles Less to CSS
          },
        ],
      },
    ]
  }
}
