// styleguide.config.js
const { join } = require("path")
const { parse: propsParser } = require("react-docgen-typescript")

module.exports = {
  propsParser,
  components: join(__dirname, "src/**/*.tsx"),
  ignore: ["/**/*test*", "**/Internals/**", "/**/utils/**", "**/*.*.{ts,tsx}"],
  theme: {
    fontFamily: {
      base: "inherit",
    },
  },
  styleguideComponents: {
    Wrapper: join(__dirname, "styleguide/Wrapper"),
    StyleGuideRenderer: join(__dirname, "styleguide/StyleGuideRenderer"),
    TableOfContentsRenderer: join(__dirname, "styleguide/TableOfContentsRenderer"),
    ComponentsListRenderer: join(__dirname, "styleguide/ComponentsListRenderer"),
    ReactComponentRenderer: join(__dirname, "styleguide/ReactComponentRenderer"),
    SectionHeadingRenderer: join(__dirname, "styleguide/SectionHeadingRenderer"),
    HeadingRenderer: join(__dirname, "styleguide/HeadingRenderer"),
    TabButtonRenderer: join(__dirname, "styleguide/TabButtonRenderer"),
  },
  webpackConfig: {
    resolve: {
      extensions: [".js", ".tsx", ".ts"],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)/,
          include: [join(__dirname, "src"), join(__dirname, "styleguide")],
          use: {
            loader: "ts-loader",
            options: {
              compilerOptions: {
                declaration: false,
              },
            },
          },
        },
      ],
    },
  },
}
