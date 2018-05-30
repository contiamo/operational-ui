import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"

import { WithTheme, Css, CssStatic } from "../types"
import { Progress } from "../"
import { Props as SidenavProps } from "../Sidenav/Sidenav"
import { sidenavExpandedWidth } from "../constants"

export interface Props {
  /** `css` prop as expected in a glamorous component */
  css?: Css
  className?: string
  /** Side navigation, see `Sidenav` component */
  sidenav?: React.ReactNode
  /** Main content, see `Page` component */
  main?: React.ReactNode
  /** Sets whether a loading progress bar should be rendered */
  loading?: boolean
}

const Container = glamorous.div(({ theme }: { theme: Theme }): CssStatic => ({
  label: "Layout",
  position: "relative",
  height: "100%",
  overflow: "hidden",
  display: "grid",
  gridTemplateColumns: `${sidenavExpandedWidth}px auto`,
  gridTemplateRows: "100%",
  // Side navigation (1st child is always the spinner or a placeholder)
  "& > *:nth-child(2)": {
    gridColumnStart: "1",
    gridColumnEnd: "span 1",
    gridRowStart: "1",
    gridRowEnd: "span 1",
  },
  // Content
  "& > *:nth-child(3)": {
    gridColumnStart: "2",
    gridColumnEnd: "span 1",
    gridRowStart: "1",
    gridRowEnd: "span 1",
  },
}))

const Main = glamorous.div(({ theme }: WithTheme): CssStatic => ({
  label: "layout-main",
  display: "block",
  height: "100%",
  overflow: "auto",
  backgroundColor: theme.colors.white,
}))

const Layout = (props: Props) => {
  /* 
   * This placeholder element is added to the dom in case there is no
   * <Progress /> element, allowing the CSS to target children by the same
   * nth-child identifier regardless of whether the loader is present.
   * Absolute positioning is required to remove it from document flow
   * so that it doesn't affect the grid.
   */
  const cssPlaceholder = <glamorous.Div css={{ position: "absolute" }} />
  return (
    <Container css={props.css} className={props.className}>
      {props.loading ? <Progress /> : cssPlaceholder}
      {props.sidenav}
      <Main>{props.main}</Main>
    </Container>
  )
}

export default Layout
