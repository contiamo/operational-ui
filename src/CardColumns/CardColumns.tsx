import * as React from "react"
import styled from "../utils/styled"

export const CardColumns = styled("div")<React.Props<{}> & { columns?: number }>(({ children, theme, columns }) => {
  columns = columns === undefined ? React.Children.count(children) : columns
  return {
    display: "flex",
    flexWrap: "wrap",
    margin: -(theme.space.element / 2),
    "& > *": {
      flexBasis: `calc(100% / ${columns})`,
      maxWidth: `calc(100% / ${columns})`,
    },
  }
})

export default CardColumns
