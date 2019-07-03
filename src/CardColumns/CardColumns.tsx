import * as React from "react"
import styled from "../utils/styled"

export type CardColumnsProps = React.Props<{}> & {
  /** Render an exact number of columns */
  columns?: number
}

export const CardColumns = styled("div")<CardColumnsProps>(({ children, theme, columns }) => {
  columns = columns === undefined ? React.Children.count(children) : columns
  return {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridGap: theme.space.element,
  }
})

export default CardColumns
