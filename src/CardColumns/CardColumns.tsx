import * as React from "react"
import styled from "../utils/styled"

export const CardColumns = styled("div")<React.Props<{}>>(({ children, theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  margin: -(theme.space.element / 2),
  width: `calc(100% + ${theme.space.element}px)`,
  "& > *": {
    flexBasis: `${React.Children.count(children)}%`,
  },
}))

export default CardColumns
