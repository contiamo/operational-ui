import glamorous, { GlamorousComponent } from "glamorous"

export default glamorous.div({
  display: "flex",
  alignItems: "flex-start",
  padding: 16,
  height: "100vh",
  "& > *": {
    height: "100%"
  },
  "& > :first-child": {}
})
