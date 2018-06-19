import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants, Theme } from "@operational/theme"
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

const Container = styled("div")(
  ({
    theme,
  }: {
    theme?: OperationalStyleConstants & {
      deprecated: Theme
    }
  }): CssStatic => ({
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
  }),
)

const Main = styled("div")(
  ({ theme }: WithTheme): CssStatic => ({
    label: "layout-main",
    display: "block",
    height: "100%",
    overflow: "auto",
    backgroundColor: theme.deprecated.colors.white,
  }),
)

/* 
 * This placeholder element is added to the dom in case there is no
 * <Progress /> element, allowing the CSS to target children by the same
 * nth-child identifier regardless of whether the loader is present.
 * Absolute positioning is required to remove it from document flow
 * so that it doesn't affect the grid.
 */
const CssPlaceholder = styled("div")({
  position: "absolute"
})

const Layout = (props: Props) => {
  return (
    <Container css={props.css} className={props.className}>
      {props.loading ? <Progress /> : <CssPlaceholder />}
      {props.sidenav}
      <Main>{props.main}</Main>
    </Container>
  )
}

export default Layout
