import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"

import Progress from "./Progress"
import { headerHeight, sidenavWidth, sidenavExpandedWidth } from "./constants"

export interface Props {
  css?: {}
  className?: string
  children?: React.ReactNode
  loading?: boolean
}

const Container = glamorous.div(({ theme, isSidenavExpanded }: { theme: Theme; isSidenavExpanded: boolean }): {} => ({
  label: "Layout",
  position: "relative",
  height: "100%",
  display: "grid",
  gridTemplateColumns: `${isSidenavExpanded ? sidenavExpandedWidth : sidenavWidth}px auto`,
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

const Layout = (props: Props) => {
  const sidenavProps = (React.Children.toArray(props.children)[0] as any).props as { expanded?: boolean }
  return (
    <Container css={props.css} className={props.className} isSidenavExpanded={Boolean(sidenavProps.expanded)}>
      {/* Absolute positioning is required in the placeholder in order to remove 
        * it from document flow and not mess up the grid.
        * Having it around in the first place is necessary to be able to refer to
        * layout children using the same `nth-child(n)` selector regardless
        * of whether there is a <Progress /> element or not.
        */}
      {props.loading ? <Progress /> : <div style={{ position: "absolute" }} />}
      {props.children}
    </Container>
  )
}

export default Layout
