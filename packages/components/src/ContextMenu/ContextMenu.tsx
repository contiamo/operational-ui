import * as React from "react"
import styled from "react-emotion"
import { fadeIn } from "@operational/utils"
import { OperationalStyleConstants } from "../utils/constants"
import { WithTheme, Css, CssStatic } from "../types"

export interface Props {
  /** Id */
  id?: string

  /** Class name */
  className?: string

  children: React.ReactNode

  /** Specify whether the menu items are visible. Overrides internal open state that triggers on click. */
  open?: boolean

  /** Condensed mode */
  condensed?: boolean

  onClick?: () => void

  /** Handles click events anywhere outside the context menu container, including menu items. */
  onOutsideClick?: () => void

  /** Suppresses the default behavior of closing the context menu when one of its items is clicked. */
  keepOpenOnItemClick?: boolean

  noOffset?: boolean
}

export interface State {
  isOpen: boolean
}

const Container = styled("div")(({ theme }: WithTheme) => ({
  label: "contextmenu",
  cursor: "pointer",
  position: "relative",
  width: "fit-content",
}))

const MenuContainer = styled("div")(
  ({ theme, isExpanded, noOffset }: { theme?: OperationalStyleConstants; isExpanded: boolean; noOffset: boolean }) => ({
    position: "absolute",
    top: noOffset ? "100%" : `calc(100% + ${theme.space.small}px)`,
    left: noOffset ? 0 : -theme.space.content,
    boxShadow: theme.shadows.popup,
    width: "fit-content",
    zIndex: theme.zIndex.selectOptions,
    ...(isExpanded
      ? {
          display: "block",
          animation: `${fadeIn} ease-in-out forwards 0.2s`,
        }
      : {
          display: "none",
        }),
  }),
)

class ContextMenu extends React.Component<Props, State> {
  state = {
    isOpen: false,
  }

  containerNode: any
  menuContainerNode: any
  outsideClickHandler: any

  handleClick = (ev: any): void => {
    const isTargetInsideMenu = this.menuContainerNode.contains(ev.target)
    const isTargetInsideContainer = this.containerNode.contains(ev.target)

    if (!isTargetInsideContainer && this.props.onOutsideClick) {
      this.props.onOutsideClick()
    }

    if (isTargetInsideContainer && this.props.onClick) {
      this.props.onClick()
    }

    const newIsActive = isTargetInsideMenu ? this.state.isOpen : isTargetInsideContainer ? !this.state.isOpen : false
    this.setState(prevState => ({
      isOpen: newIsActive,
    }))
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClick)
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClick)
  }

  render() {
    const menuItems: any = []
    const children: any = []
    React.Children.forEach(
      this.props.children,
      (child: any, index: number): void => {
        if (child.props && child.props.__isContextMenuItem) {
          const { onClick } = child.props
          menuItems.push(
            React.cloneElement(child, {
              key: "contextmenu-" + index,
              condensed: this.props.condensed,
              onClick:
                onClick &&
                (() => {
                  if (!this.props.keepOpenOnItemClick) {
                    this.setState(prevState => ({
                      isOpen: false,
                    }))
                  }

                  onClick()
                }),
            }),
          )
        } else {
          children.push(child)
        }
      },
    )
    return (
      <Container
        innerRef={node => {
          this.containerNode = node
        }}
        id={this.props.id}
        className={this.props.className}
      >
        {children}
        <MenuContainer
          innerRef={node => {
            this.menuContainerNode = node
          }}
          isExpanded={this.props.open || this.state.isOpen}
          noOffset={this.props.noOffset}
        >
          {menuItems}
        </MenuContainer>
      </Container>
    )
  }
}

export default ContextMenu
