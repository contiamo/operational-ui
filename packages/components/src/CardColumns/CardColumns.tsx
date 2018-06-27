import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants } from "@operational/theme"

export const CardColumns = styled("div")(
  ({ children, theme }: React.Props<{}> & { theme?: OperationalStyleConstants }) => ({
    display: "flex",
    flexWrap: "wrap",
    margin: -(theme.space.element / 2),
    "& > *": {
      flexBasis: `${React.Children.count(children)}%`,
    },
  }),
)

export default CardColumns
