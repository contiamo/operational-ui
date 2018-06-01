import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme, expandColor } from "@operational/theme"
import { fadeIn } from "@operational/utils"

import { deprecate, isModifiedEvent } from "../utils"
import { Icon, IconName, ContextConsumer, Context } from "../"
import { WithTheme, Css, CssStatic } from "../types"

export interface Props {
  id?: string
  /** `css` prop as expected in a glamorous component */
  css?: Css
  className?: string
  /** Main label for the header */
  label: string | React.ReactNode
  /** Navigation property à la react-router <Link/> */
  to?: string
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
  /**
   * Expanded state
   *
   * @deprecated this prop is ignored as per design decision (all sidenavs are expanded)
   */
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

const containerStyles = ({
  theme,
  color,
  isActive,
}: {
  theme: Theme
  color?: string
  isActive: boolean
}): CssStatic => {
  const stripColor: string = expandColor(theme, color) || theme.colors.info
  return {
    label: "sidenavheader",
    textDecoration: "none",
    width: "100%",
    position: "relative",
    borderBottom: "1px solid",
    borderLeft: "4px solid",
    borderLeftColor: isActive ? stripColor : "transparent",
    borderBottomColor: theme.colors.separator,
    /** @todo Add to theme once colors are updated across codebase */
    backgroundColor: isActive ? "#F8F8F8" : "transparent",
    ":hover": {
      backgroundColor: "#F8F8F8",
    },
  }
}

const Container = glamorous.div(containerStyles)

const ContainerLink = glamorous.a(containerStyles)

const Content = glamorous.div(({ theme, isActive }: { theme: Theme; isActive: boolean }): CssStatic => ({
  textDecoration: "none",
  cursor: "pointer",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  overflow: "hidden",
  width: "100%",
  height: theme.box,
  padding: `0 ${theme.spacing}px`,
  color: "#333333",
  fontWeight: 500,
  letterSpacing: 0.25,
  fontSize: 14,
  textTransform: "uppercase",
  whiteSpace: "nowrap",
}))

const ItemsContainer = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  position: "relative",
  top: -theme.spacing,
}))

const CloseButton = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  position: "absolute",
  cursor: "pointer",
  display: "none",
  alignItems: "center",
  justifyContent: "center",
  width: theme.spacing * 1.5,
  height: theme.spacing * 1.5,
  top: theme.spacing * 1.5,
  right: theme.spacing,
  color: theme.colors.info,
  ".op_sidenavheader:hover &": {
    display: "flex",
  },
  "& svg": {
    width: theme.spacing,
    height: theme.spacing,
  },
}))

export class SidenavHeader extends React.Component<Props, State> {
  state = {
    isOpen: false,
  }

  render() {
    const hasChildLinks = React.Children.toArray(this.props.children).some(child => (child as any).props.to)
    const isActive = Boolean(
      this.state.isOpen || (this.props.to && window.location.pathname.match(`^${this.props.to}`))
    )
    // Actual `to` prop should invalidate if the element has sublinks and is active
    const to = isActive && hasChildLinks ? undefined : this.props.to
    const ContainerComponent = to ? ContainerLink : Container
    return (
      <ContextConsumer>
        {(ctx: Context) => {
          return (
            <ContainerComponent
              id={this.props.id}
              href={to}
              css={this.props.css}
              color={this.props.color}
              isActive={isActive}
              className={[this.props.className, "op_sidenavheader"].filter(cls => Boolean(cls)).join(" ")}
              onClick={(ev: React.SyntheticEvent<Node>) => {
                this.props.onClick && this.props.onClick()
                this.setState(prevState => ({
                  isOpen: !prevState.isOpen,
                }))
                if (!isModifiedEvent(ev) && ctx.pushState && this.props.to) {
                  ev.preventDefault()
                  // Even if the `props.to` prop was ignored, redirect should still happen here
                  ctx.pushState(this.props.to)
                }
              }}
            >
              <Content isActive={!!this.props.active} onClick={this.props.onClick}>
                {this.props.label}
              </Content>
              {React.Children.count(this.props.children) > 0 && (
                <CloseButton
                  onClick={(ev: React.SyntheticEvent<Node>) => {
                    // Prevent clicks on parent in order to avoid conflicting behavior
                    ev.stopPropagation()
                    this.setState(prevState => ({
                      isOpen: !prevState.isOpen,
                    }))
                  }}
                >
                  <Icon name={this.state.isOpen ? "ChevronUp" : "ChevronDown"} />
                </CloseButton>
              )}
              {isActive && this.state.isOpen && <ItemsContainer>{this.props.children}</ItemsContainer>}
            </ContainerComponent>
          )
        }}
      </ContextConsumer>
    )
  }
}

export default deprecate<Props>(
  props =>
    props.icon ? ["By design, this component doesn't render the icon you specify in the `icon` prop anymore."] : []
)(SidenavHeader)
