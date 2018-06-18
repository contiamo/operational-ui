import * as React from "react"
import styled from "react-emotion"

const CardColumn = styled("div")(({ children }: React.Props<{}>) => ({
  display: "flex",
  flexWrap: "wrap",
  margin: -11,
  "& > *": {
    flexBasis: `${React.Children.count(children)}%`,
  },
}))

export default CardColumn
