import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "contiamo-ui-theme"

export type Dimension = string | number

export interface IProps {
  id?: string | number
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

const Grid: React.SFC<IProps> = (props: IProps) => (
  <Container
    key={props.id}
    css={props.css}
    className={props.className}
    rowData={props.rows}
    columnData={props.columns}
    gap={props.gap}
  >
    {props.children}
  </Container>
)

export default Grid
