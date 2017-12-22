import glamorous, { GlamorousComponent } from "glamorous"

const PageContent: GlamorousComponent<{}, {}> = glamorous.div({
  display: "flex",
  alignItems: "flex-start",
  padding: 16,
  height: "100vh",
  "& > *": {
    height: "100%"
  },
  "& > :first-child": {}
})

export default PageContent
