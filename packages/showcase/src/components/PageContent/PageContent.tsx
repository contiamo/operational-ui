import glamorous, { GlamorousComponent } from "glamorous"

const PageContent: GlamorousComponent<{}, {}> = glamorous.div({
  display: "flex",
  alignItems: "flex-start",
  padding: 16,
  height: "100vh",
  // Targets Sidebar
  "& > :first-child": {
    height: "100%"
  }
})

export default PageContent
