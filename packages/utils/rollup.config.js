import resolve from "rollup-plugin-node-resolve"
import commonjs from "rollup-plugin-commonjs"
import image from "rollup-plugin-image"
import babel from "rollup-plugin-babel"
import flow from "rollup-plugin-flow"

export default {
  input: "./index.js",
  plugins: [
    resolve({ extensions: [".js"], jsnext: true, main: true }),
    commonjs({
      esnext: true,
      main: true
    }),
    image(),
    babel({
      exclude: "node_modules/**" // only transpile our source code
    }),
    flow()
  ],
  external: ["jest"],
  output: {
    format: "cjs",
    file: "./lib/utils.js" // equivalent to --output
  }
}
