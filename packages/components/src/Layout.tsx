import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"

import Progress from "./Progress"
import { Props as SidenavProps } from "./Sidenav"
import { sidenavExpandedWidth } from "./constants"

export interface Props {
  css?: {}
  className?: string
  sidenav?: React.ReactNode
  main?: React.ReactNode
  loading?: boolean
}

const Container = glamorous.div(({ theme, isSidenavExpanded }: { theme: Theme; isSidenavExpanded: boolean }): {} => ({
  label: "Layout",
  position: "relative",
  height: "100%",
  display: "grid",
  gridTemplateColumns: `${isSidenavExpanded ? sidenavExpandedWidth : theme.box}px auto`,
  gridTemplateRows: "auto",
  // Side navigation (1st child is always the spinner or a placeholder)
  "& > *:nth-child(2)": {
    gridColumnStart: "1",
    gridColumnEnd: "span 1",
    gridRowStart: "1",
    gridRowEnd: "span 1"
  },
  // Content
  "& > *:nth-child(3)": {
    gridColumnStart: "2",
    gridColumnEnd: "span 1",
    gridRowStart: "1",
    gridRowEnd: "span 1"
  }
}))

const Layout = (props: Props) => {
  const sidenavProps = (React.Children.toArray(props.sidenav)[0] as any).props as SidenavProps
  /* 
   * This placeholder element is added to the dom in case there is no
   * <Progress /> element, allowing the CSS to target children by the same
   * nth-child identifier regardless of whether the loader is present.
   * Absolute positioning is required to remove it from document flow
   * so that it doesn't affect the grid.
   */
  const cssPlaceholder = <glamorous.Div css={{ position: "absolute" }} />
  return (
    <Container css={props.css} className={props.className} isSidenavExpanded={Boolean(sidenavProps.expanded)}>
      {props.loading ? <Progress /> : cssPlaceholder}
      {props.sidenav}
      {props.main}
    </Container>
  )
}

export default Layout
