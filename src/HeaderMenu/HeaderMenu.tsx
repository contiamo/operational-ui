import { Cancelable } from "lodash"
import debounce from "lodash/debounce"
import * as React from "react"

import ContextMenu, { ContextMenuProps } from "../ContextMenu/ContextMenu"
import { DefaultProps } from "../types"
import styled from "../utils/styled"
import { headerHeight } from "../utils/constants"

export interface HeaderMenuProps extends DefaultProps {
  /** Clickable component(s) from which menu appears  */
  children: React.ReactNode | React.ReactNode[]
  /** Action when item in dropdown is selected - if specified here, it is applied to all dropdown items */
  onClick?: ContextMenuProps["onClick"]
  /** Items to display in dropdown */
  items: ContextMenuProps["items"]
  /** Display caret on opposite side to align prop */
  withCaret?: boolean
  /** Alignment */
  align?: ContextMenuProps["align"]
}

interface HeaderMenuState {
  renderedMenuWidth: number
}

const backgroundColor = "hsla(0, 0%, 100%, 0.1)"
const boxShadow = "0 3px 6px rgba(0, 0%, 0%, 0.3)"

const HeaderContextMenu = styled(ContextMenu)`
  height: 100%;
`

const Container = styled("div")<{
  align: HeaderMenuProps["align"]
  isOpen: boolean
  withCaret: HeaderMenuProps["withCaret"]
}>(({ theme, align, isOpen, withCaret }) => ({
  width: 250,
  lineHeight: 1,
  padding: `${theme.space.content / 2}px ${theme.space.content}px`,
  height: "100%",
  [align === "left" ? "paddingRight" : "paddingLeft"]: headerHeight, // leave room for the caret
  color: isOpen ? theme.color.white : "#ffffffcc",
  backgroundColor: isOpen ? backgroundColor : "transparent",
  boxShadow: isOpen ? boxShadow : "none",
  fontWeight: theme.font.weight.medium,
  display: "flex",
  alignItems: "center",
  justifyContent: align === "left" ? "flex-start" : "flex-end",
  "& > div": {
    marginLeft: theme.space.small,
  },
  "&:hover": {
    boxShadow,
    backgroundColor,
    color: theme.color.white,
  },
  ...(withCaret
    ? {
        "&::after": {
          content: "''",
          position: "absolute",
          top: "50%",
          [align === "left" ? "right" : "left"]: theme.space.content,
          width: 0,
          height: 0,
          border: "4px solid transparent",
          borderTopColor: "#ffffff80",
          transform: "translateY(calc(-50% + 2px))",
        },
        "&:hover": {
          boxShadow,
          backgroundColor,
          color: theme.color.white,
          "&::after": {
            borderTopColor: theme.color.white,
          },
        },
      }
    : {}),
}))

class HeaderMenu extends React.PureComponent<HeaderMenuProps, Readonly<HeaderMenuState>> {
  public readonly state: HeaderMenuState = {
    renderedMenuWidth: 0,
  }

  public static defaultProps = {
    align: "left",
    withCaret: false,
  }

  private $menu = React.createRef<HTMLDivElement>()

  public componentDidMount() {
    this.updateRenderedWidth()
    window.addEventListener("resize", this.handleResize)
  }

  public componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize)
  }

  public componentDidUpdate() {
    this.updateRenderedWidth()
  }

  /**
   * Explicit typing is required here in order to give the typescript compiler access to typings
   * used to work out type definitions for the debounce method.
   * @todo look into making this unnecessary.
   */
  public handleResize: (() => void) & Cancelable = debounce(() => {
    this.updateRenderedWidth()
  }, 200)

  private updateRenderedWidth() {
    if (!this.$menu || this.$menu.current === null) {
      return
    }
    const node = this.$menu.current
    const renderedMenuWidth = node.clientWidth
    if (renderedMenuWidth !== this.state.renderedMenuWidth) {
      this.setState(() => ({
        renderedMenuWidth,
      }))
    }
  }

  public render() {
    const props = this.props
    return (
      <HeaderContextMenu width={this.state.renderedMenuWidth} {...props}>
        {isOpen => (
          <Container ref={this.$menu} isOpen={isOpen} align={props.align} withCaret={Boolean(props.withCaret)}>
            {props.children}
          </Container>
        )}
      </HeaderContextMenu>
    )
  }
}

export default HeaderMenu
