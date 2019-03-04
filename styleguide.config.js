// styleguide.config.js
const { join, resolve } = require("path")
const { parse: propsParser } = require("react-docgen-typescript")
const { version } = require("./package.json")

module.exports = {
  title: "Operational UI",
  version,
  propsParser,
  pagePerSection: true,
  moduleAliases: {
    "@operational/components": resolve(__dirname, "src"),
  },
  sections: [
    /// Should add an Intro Page to be first loaded after splash
    { name: "Hooks", components: "src/use*/*.ts", sectionDepth: 1 },
    {
      name: "Components",
      components: "src/**/*.tsx",
      ignore: [
        "/**/*test*",
        "**/Internals/**",
        "**/hooks/**",
        "**/utils/**",
        "**/Typography/**",
        "**/Debug/makeRows*",
        "**/*.*.{ts,tsx}",
      ],
      sectionDepth: 1,
    },

    { name: "Typography", components: "src/Typography/*.tsx", sectionDepth: 1 },
  ],
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
  context: {
    styled: "@emotion/styled",
  },
  dangerouslyUpdateWebpackConfig(webpackConfig, env) {
    webpackConfig.output = {
      path: join(__dirname, "dist"),
    }
    return webpackConfig
  },
  webpackConfig: {
    resolve: {
      extensions: [".js", ".tsx", ".ts"],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)/,
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
