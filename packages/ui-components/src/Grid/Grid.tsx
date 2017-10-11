import * as React from "react"
import glamorous from "glamorous"

type Dimension = string | number

interface IProps {
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

const Grid: React.SFC<IProps> = ({ rows, columns, gap, children }: IProps) => (
  <Container rowData={rows} columnData={columns} gap={gap}>
    {children}
  </Container>
)

export default Grid
