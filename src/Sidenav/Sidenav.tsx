import * as React from "react"
import styled from "react-emotion"
import { readableTextColor } from "../utils"
import { OperationalStyleConstants } from "../utils/constants"
import deprecate from "../utils/deprecate"

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

const Container = styled("div")(({ theme }: { theme?: OperationalStyleConstants }) => {
  const backgroundColor = theme.color.white
  const color = readableTextColor(backgroundColor, [theme.color.text.default, theme.color.white])
  return {
    color,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    overflow: "auto",
    width: theme.sidebarWidth,
    height: "100%",
    borderRight: "1px solid",
    borderRightColor: theme.color.separators.default,
    background: theme.color.white,
  }
})

export class Sidenav extends React.Component<Props, State> {
  public render() {
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
