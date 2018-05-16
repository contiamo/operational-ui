const path = require("path")
const glob = require("glob")

module.exports = {
  title: "Operational UI",
  components: function() {
    return glob.sync(path.resolve(__dirname, "src/**/*.tsx")).filter(function(module) {
      return /\/[A-Z]\w*\.tsx$/.test(module)
    })
  },
  resolver: require("react-docgen").resolver.findAllComponentDefinitions,
  propsParser: require("react-docgen-typescript").withDefaultConfig({ propFilter: { skipPropsWithoutDoc: true } })
    .parse,
  skipComponentsWithoutExample: true,
}
