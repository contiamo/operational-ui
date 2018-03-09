import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"

import Progress from "./Progress"
import { headerHeight, sidenavWidth } from "./constants"

export interface Props {
  css?: {}
  className?: string
  children?: React.ReactNode
  loading?: boolean
}

const Container = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  label: "Layout",
  position: "relative",
  height: "100%",
  display: "grid",
  gridTemplateColumns: `${sidenavWidth}px auto`,
  gridTemplateRows: `${headerHeight}px auto`,
  // Side navigation (1st child is always the spinner or a placeholder)
  "& > *:nth-child(2)": {
    gridColumnStart: "1",
    gridColumnEnd: "span 1",
    gridRowStart: "1",
    gridRowEnd: "span 2"
  },
  // Header
  "& > *:nth-child(3)": {
    width: "100%",
    gridColumnStart: "2",
    gridColumnEnd: "span 1",
    gridRowStart: "1",
    gridRowEnd: "span 1"
  },
  // Content
  "& > *:nth-child(4)": {
    gridColumnStart: "2",
    gridColumnEnd: "span 1",
    gridRowStart: "2",
    gridRowEnd: "span 1"
  }
}))

const Layout = (props: Props) => (
  <Container css={props.css} className={props.className}>
    {props.loading ? <Progress /> : <div />}
    {props.children}
  </Container>
)

export default Layout
