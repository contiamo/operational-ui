import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme, expandColor } from "@operational/theme"
import { fadeIn } from "@operational/utils"

import deprecate from "../utils/deprecate"
import { Icon, IconName } from "../"
import { WithTheme, Css, CssStatic } from "../types"

export interface Props {
  id?: string
  /** `css` prop as expected in a glamorous component */
  css?: Css
  className?: string
  /** Main label for the header */
  label: string | React.ReactNode
  /**
   * Specifies an icon to render on the left of the label
   *
   * @deprecated this prop is ignored as per design decision
   */
  icon?: IconName | React.ReactNode
  /** Color used in highlights and the side strip (hex or named color from `theme.colors`) */
  color?: string
  /** Active state - renders colored strip on the left */
  active?: boolean
  /** Expanded state */
  expanded?: boolean
  /** Click handler */
  onClick?: () => void
  /** Close handler (via chevron button on the top right) */
  onClose?: () => void
  children?: React.ReactNode
}

export interface State {
  isOpen: boolean
}

const Container = glamorous.div(
  ({ theme, color, isActive }: { theme: Theme; color?: string; isActive: boolean }): CssStatic => {
    const stripColor: string = expandColor(theme, color) || theme.colors.info
    return {
      label: "sidenavheader",
      width: "100%",
      position: "relative",
      borderBottom: "1px solid",
      borderLeft: "4px solid",
      borderLeftColor: isActive ? stripColor : "transparent",
      borderBottomColor: theme.colors.separator,
      backgroundColor: isActive ? "#F9F9F9" : "transparent",
    }
  }
)

const Content = glamorous.div(
  ({ theme, isActive, isExpanded }: { theme: Theme; isActive: boolean; isExpanded: boolean }): CssStatic => ({
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    overflow: "hidden",
    width: "100%",
    height: theme.box,
    padding: `0 ${theme.spacing}px`,
    // Readable text color is calculated in the <Sidenav> component,
    // and cascades down to both sidenav headers and items.
    color: "#333333",
    fontWeight: 600,
    fontSize: 14,
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    ":hover": {
      backgroundColor: isActive ? "transparent" : "rgba(0, 0, 0, 0.05)",
    },
  })
)

const ItemsContainer = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  position: "relative",
  top: -theme.spacing / 2,
}))

const CloseButton = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  position: "absolute",
  cursor: "pointer",
  width: theme.spacing,
  height: theme.spacing,
  top: theme.spacing * 1.25,
  right: theme.spacing,
  color: theme.colors.info,
  "& svg": {
    width: "100%",
    height: "100%",
  },
}))

class SidenavHeader extends React.Component<Props, State> {
  state = {
    isOpen: true,
  }

  render() {
    const isActive = Boolean(this.props.active)
    // See ./SidenavItem.tsx for reason why class name is set.
    // Note that the click listener is set on `<Content>` so it doesn't interfere
    // with click listeners set on the children.
    return (
      <Container
        id={this.props.id}
        css={this.props.css}
        color={this.props.color}
        isActive={isActive}
        className={["op_sidenavheader", this.props.className].filter(a => !!a).join(" ")}
      >
        <Content isActive={!!this.props.active} isExpanded={!!this.props.expanded} onClick={this.props.onClick}>
          {this.props.label}
        </Content>
        {isActive &&
          React.Children.count(this.props.children) > 0 && (
            <CloseButton
              onClick={() => {
                this.setState(prevState => ({
                  isOpen: !prevState.isOpen,
                }))
              }}
            >
              <Icon name={this.state.isOpen ? "ChevronUp" : "ChevronDown"} />
            </CloseButton>
          )}
        {isActive && this.state.isOpen && <ItemsContainer>{this.props.children}</ItemsContainer>}
      </Container>
    )
  }
}

export default deprecate<Props>(
  props =>
    props.icon ? ["By design, this component doesn't render the icon you specify in the `icon` prop anymore."] : []
)(SidenavHeader)
