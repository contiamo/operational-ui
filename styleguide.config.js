// styleguide.config.js
const { join, resolve } = require("path")
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin")

const { version } = require("./package.json")

const { styles, theme } = require("./styleguide/styles.js")
const { sections } = require("./styleguide/sections.js")
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")

const path = require("path")
const fs = require("fs")

module.exports = {
  title: "Operational UI",
  version,
  // We are skipping the props docs generation in dev to speed-up the dev server
  propsParser: process.env.NODE_ENV === "development" ? undefined : require("react-docgen-typescript").parse,
  styles,
  theme,
  sections,
  pagePerSection: true,
  template: {
    favicon: "./styleguide/favicon.ico",
  },
  moduleAliases: {
    "@operational/components": resolve(__dirname, "src"),
  },
  styleguideComponents: {
    SectionRenderer: join(__dirname, "styleguide/SectionRenderer"),
    Wrapper: join(__dirname, "styleguide/Wrapper"),
    StyleGuideRenderer: join(__dirname, "styleguide/StyleGuideRenderer"),
    TableOfContentsRenderer: join(__dirname, "styleguide/TableOfContentsRenderer"),
    ComponentsListRenderer: join(__dirname, "styleguide/ComponentsListRenderer"),
    Playground: join(__dirname, "styleguide/Playground"),
    ReactExample: join(__dirname, "styleguide/ReactExample"),
    ReactComponentRenderer: join(__dirname, "styleguide/ReactComponentRenderer"),
    SectionHeadingRenderer: join(__dirname, "styleguide/SectionHeadingRenderer"),
    HeadingRenderer: join(__dirname, "styleguide/HeadingRenderer"),
    TabButtonRenderer: join(__dirname, "styleguide/TabButtonRenderer"),
  },
  context: {
    styled: "@emotion/styled",
  },

  skipComponentsWithoutExample: true,
  getExampleFilename(componentPath) {
    const { dir, name: fileName } = path.parse(componentPath)
    const folderName = path.basename(dir)

    if (fileName === "index" || fileName === folderName) return path.join(dir, "README.md")
    const maybeMD = path.join(dir, fileName + ".md")

    try {
      if (fs.existsSync(maybeMD)) {
        return maybeMD
      }
    } catch (err) {
      return null
    }
  },
  dangerouslyUpdateWebpackConfig(webpackConfig) {
    webpackConfig.output = {
      path: join(__dirname, "dist"),
    }
    return webpackConfig
  },
  webpackConfig: {
    node: {
      fs: "empty",
      module: "empty",
    },
    resolve: {
      extensions: [".js", ".tsx", ".ts"],
    },
    plugins: [new ForkTsCheckerWebpackPlugin(), new MonacoWebpackPlugin()],
    optimization: {
      removeAvailableModules: false,
      removeEmptyChunks: false,
      splitChunks: false,
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)/,
          use: {
            loader: "ts-loader",
            options: {
              transpileOnly: true, // don't type-check on the main thread
              compilerOptions: {
                declaration: false,
              },
            },
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
  },
}
