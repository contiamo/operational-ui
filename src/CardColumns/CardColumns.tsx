import * as React from "react"
import styled from "../utils/styled"

export type CardColumnsProps = React.Props<{}> & {
  /** Force exact number of columns */
  columns?: number
}

export const CardColumns = styled("div")<CardColumnsProps>(({ children, theme, columns }) => {
  columns = columns === undefined ? React.Children.count(children) : columns
  return {
    display: "flex",
    flexWrap: "wrap",
    margin: -(theme.space.element / 2),
    "& > *": {
      flex: `1 1 calc(100% / ${columns})`,
      maxWidth: `calc(100% / ${columns})`,
    },
  }
})

export default CardColumns
