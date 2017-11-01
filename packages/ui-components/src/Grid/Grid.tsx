import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "../theme"

export type Dimension = string | number

export interface IProps {
  css?: any
  className?: string
  children?: React.ReactNode
  rows?: Dimension[]
  columns?: Dimension[]
  gap?: number
}

const Container = glamorous.div(
  {
    display: "grid"
  },
  // Dynamic/theme-dependent styles
  ({
    theme,
    rowData = ["auto", "auto"],
    columnData = ["auto", "auto"],
    gap
  }: {
    theme: Theme
    rowData?: Dimension[]
    columnData?: Dimension[]
    gap?: number
  }): any => ({
    gridTemplateColumns: columnData.map(val => (typeof val === "string" ? val : val + "px")).join(" "),
    gridTemplateRows: rowData.map(val => (typeof val === "string" ? val : val + "px")).join(" "),
    gridColumnGap: gap || theme.spacing,
    gridRowGap: gap || theme.spacing
  })
)

const Grid: React.SFC<IProps> = ({ css, rows, columns, gap, children }: IProps) => (
  <Container css={css} rowData={rows} columnData={columns} gap={gap}>
    {children}
  </Container>
)

export default Grid
