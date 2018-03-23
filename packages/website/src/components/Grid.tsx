import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"

export interface Props {
  children?: React.ReactNode
}

const Container = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  label: "website-grid",
  display: "grid",
  height: "100%",
  padding: theme.spacing * 4 / 3,
  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
  gridTemplateRows: "1fr 1fr 1fr 1fr",
  gridColumnGap: theme.spacing * 4 / 3,
  gridRowGap: theme.spacing * 4 / 3,
  "& > *": {
    minHeight: 0
  },
  "& > :first-child": {
    gridColumnStart: "1",
    gridColumnEnd: "span 3",
    gridRowStart: "1",
    gridRowEnd: "span 4"
  },
  "& > :nth-child(2)": {
    gridColumnStart: "4",
    gridColumnEnd: "span 2",
    gridRowStart: "1",
    gridRowEnd: "span 2"
  },
  "& > :nth-child(3)": {
    gridColumnStart: "4",
    gridColumnEnd: "span 1",
    gridRowStart: "3",
    gridRowEnd: "span 1"
  },
  "& > :nth-child(4)": {
    gridColumnStart: "5",
    gridColumnEnd: "span 1",
    gridRowStart: "4",
    gridRowEnd: "span 1"
  }
}))

const Grid = (props: Props) => <Container>{props.children}</Container>

export default Grid
