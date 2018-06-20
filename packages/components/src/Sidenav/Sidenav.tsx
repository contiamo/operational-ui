import * as React from "react"
import styled from "react-emotion"
import { lighten, readableTextColor } from "@operational/utils"
import { OperationalStyleConstants, Theme, expandColor } from "@operational/theme"
import deprecate from "../utils/deprecate"
import { sidenavExpandedWidth } from "../constants"
import { WithTheme, Css, CssStatic } from "../types"

export interface Props {
  id?: string
  className?: string
  children?: React.ReactNode
  /**
   * Expanded state
   *
   * @deprecated this prop is ignored as per design decision (all sidenavs are expanded)
   */

  expanded?: boolean
  /**
   * Specifies whether sidenav should expand on hover
   *
   * @deprecated this prop is ignored as per design decision (all sidenavs are expanded)
   */

  expandOnHover?: boolean
}

export interface State {
  isHovered: boolean
}

const Container = styled("div")(
  ({
    theme,
  }: {
    theme?: OperationalStyleConstants & {
      deprecated: Theme
    }
  }): CssStatic => {
    const backgroundColor = theme.deprecated.colors.white
    const lighterBackgroundColor = lighten(theme.deprecated.colors.navBackground, 8)
    const color = readableTextColor(backgroundColor, [theme.deprecated.colors.text, theme.deprecated.colors.white])
    return {
      color,
      background: theme.deprecated.colors.white,
      label: "sidenav",
      width: sidenavExpandedWidth,
      borderRight: "1px solid",
      borderRightColor: theme.deprecated.colors.separator,
      zIndex: theme.deprecated.baseZIndex + 100,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      height: "100%",
    }
  },
)

export class Sidenav extends React.Component<Props, State> {
  render() {
    return (
      <Container id={this.props.id} className={this.props.className}>
        {this.props.children}
      </Container>
    )
  }
}

export default deprecate<Props>(
  props =>
    props.expanded || props.expandOnHover
      ? ["`expanded` and `expandOnHover` props are no longer supported. Sidenavs are expanded by default."]
      : [],
)(Sidenav)
