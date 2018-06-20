import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants, Theme, expandColor } from "@operational/theme"
import { fadeIn } from "@operational/utils"
import { deprecate, isModifiedEvent } from "../utils"
import { Icon, IconName, ContextConsumer, Context } from "../"
import { WithTheme, Css, CssStatic } from "../types"

export interface Props {
  id?: string
  className?: string
  /** Main label for the header */
  label: string | React.ReactNode
  /** Navigation property à la react-router <Link/> */
  to?: string
  /** Specifies an icon to render on the left of the label, displayed only if the `condensed` option is used. */
  icon?: IconName | React.ReactNode
  /** Color used in highlights and the side strip (hex or named color from `theme.colors`) */
  color?: string
  /** Condensed option  */
  condensed?: boolean
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
  theme?: OperationalStyleConstants & {
    deprecated: Theme
  }
  color?: string
  isActive: boolean
}): CssStatic => {
  const stripColor: string = expandColor(theme.deprecated, color) || theme.deprecated.colors.info
  return {
    label: "sidenavheader",
    textDecoration: "none",
    width: "100%",
    position: "relative",
    borderBottom: "1px solid",
    borderLeft: "4px solid",
    borderLeftColor: isActive ? stripColor : "transparent",
    borderBottomColor: theme.deprecated.colors.separator,

    /** @todo Add to theme once colors are updated across codebase */
    backgroundColor: isActive ? "#F8F8F8" : "transparent",
    ":hover": {
      backgroundColor: "#F8F8F8",
    },
  }
}

const Container = styled("div")(containerStyles)
const ContainerLink = styled("a")(containerStyles)

const Content = styled("div")(
  ({
    theme,
    isCondensed,
  }: {
    theme?: OperationalStyleConstants & {
      deprecated: Theme
    }
    isCondensed: boolean
  }): CssStatic => ({
    textDecoration: "none",
    cursor: "pointer",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    height: isCondensed ? 60 : 73,
    overflow: "hidden",
    padding: `0 ${theme.space.content}px`,
    width: "100%",
  }),
)

const LabelText = styled("p")`
  position: relative;
  color: #333333;
  font-weight: 500;
  letter-spacing: 0.25;
  font-size: 14;
  text-transform: uppercase;
  white-space: nowrap;
  margin: 0;
  ${({ isActive }: { isActive: boolean }) =>
    isActive
      ? `
    top: -5px;
    `
      : `
    margin-top: 8px;
  `};
`

const ItemsContainer = styled("div")(
  ({
    theme,
  }: {
    theme?: OperationalStyleConstants & {
      deprecated: Theme
    }
  }): {} => ({
    position: "relative",
    top: -theme.space.content - 6,
  }),
)

const CloseButton = styled("div")(
  ({
    theme,
  }: {
    theme?: OperationalStyleConstants & {
      deprecated: Theme
    }
  }): {} => ({
    position: "absolute",
    cursor: "pointer",
    display: "none",
    alignItems: "center",
    justifyContent: "center",
    width: theme.space.content * 1.5,
    height: theme.space.content * 1.5,
    top: theme.space.content * 1.5,
    right: theme.space.content,
    color: theme.deprecated.colors.info,
    ".op_sidenavheader:hover &": {
      display: "flex",
    },
    "& svg": {
      width: theme.deprecated.spacing,
      height: theme.deprecated.spacing,
    },
  }),
)

const IconContainer = styled("p")`
  display: inline-block;
  vertical-align: middle;
  margin: 0 0 0 8px;
  width: 18px;
  height: 18px;
  & > svg {
    position: relative;
    top: -2px;
  }
`

const Summary = styled("div")`
  display: block;
  font-weight: normal;
  text-transform: none;
  margin-top: 4px;
  ${({ theme }: { theme?: OperationalStyleConstants }) => `
    font-size: ${theme.font.size.fineprint}px;
    color: ${theme.color.text.lightest};
    left: ${theme.space.content}px;
  `};
`

const truncate = (maxLength: number) => (text: string) => {
  if (text.length < maxLength) {
    return text
  }
  return text.slice(0, maxLength) + "..."
}

export class SidenavHeader extends React.Component<Props, State> {
  state = {
    isOpen: false,
  }

  render() {
    const hasChildren = React.Children.count(this.props.children) > 0
    const hasChildLinks = React.Children.toArray(this.props.children).some(child => (child as any).props.to)
    const isActive =
      Boolean(this.state.isOpen || (this.props.to && window.location.pathname.match(`^${this.props.to}`))) &&
      hasChildren

    // Actual `to` prop should invalidate if the element has sublinks and is active
    const to = isActive && hasChildLinks ? undefined : this.props.to
    const ContainerComponent = to ? ContainerLink : Container
    const childLabels: string[] = React.Children.map(this.props.children, child => (child as any).props.label) || []
    return (
      <ContextConsumer>
        {(ctx: Context) => {
          return (
            <ContainerComponent
              id={this.props.id}
              href={to}
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
              <Content onClick={this.props.onClick} isCondensed={Boolean(this.props.condensed)}>
                <LabelText isActive={isActive}>
                  {this.props.label}
                  <IconContainer>
                    {this.props.icon === String(this.props.icon) ? (
                      <Icon name={this.props.icon as IconName} size={18} />
                    ) : (
                      this.props.icon
                    )}
                  </IconContainer>
                </LabelText>
                {!isActive && <Summary>{truncate(24)(childLabels.join(", "))}</Summary>}
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

export default SidenavHeader
