import glamorous from "glamorous"

export default glamorous.div({
  display: "flex",
  alignItems: "flex-start",
  padding: 16,
  height: "100vh",
  // Targets Sidebar
  "& > :first-child": {
    height: "100%"
  }
})
