module.exports = function(babel) {
  const { types: t } = babel
  const IdentifiersWithTheme = {
    Identifier(path) {
      if (path.node.name !== "theme") {
        return
      }
      if (path.container.type !== "MemberExpression") {
        return
      }
      path.node.name = "theme.deprecated"
    },
    LogicalExpression(path) {
      if (!path.node.left.arguments) {
        return
      }
      path.node.left.arguments = path.node.left.arguments.map(arg => ({
        ...arg,
        name: arg.name === "theme" ? "theme.deprecated" : arg.name,
      }))
    },
  }
  return {
    visitor: {
      ImportDeclaration(path) {
        if (path.node.specifiers[0].local.name !== "glamorous") {
          return
        }
        path.node.specifiers[0].local.name = "styled"
        path.node.source = t.stringLiteral("react-emotion")
      },
      ...IdentifiersWithTheme,
      CallExpression(path) {
        if (path.node.type !== "CallExpression") {
          return
        }
        if (!path.node.callee.object) {
          return
        }
        if (path.node.callee.object.name !== "glamorous") {
          return
        }
        path.traverse({
          ...IdentifiersWithTheme,
        })

        path.replaceWith(
          t.callExpression(t.identifier(`styled('${path.node.callee.property.name}')`), path.node.arguments),
        )
      },
    },
  }
}
