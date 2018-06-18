import * as React from "react"
import styled from "react-emotion"
import { css } from "glamor"
import { fadeIn } from "@operational/utils"
import { OperationalStyleConstants, Theme } from "@operational/theme"
import { WithTheme, Css, CssStatic } from "../types"
export interface Props {
  /** Id */
  id?: string
  /** `css` prop as expected in a glamorous component */

  css?: Css
  /** `css` prop for the menu's popup container */

  menuCss?: Css
  /** Class name */

  className?: string
  children: React.ReactNode
  /** Specify whether the menu items are visible. Overrides internal open state that triggers on click. */

  open?: boolean
  onClick?: () => void
  /** Handles click events anywhere outside the context menu container, including menu items. */

  onOutsideClick?: () => void
  /** Suppresses the default behavior of closing the context menu when one of its items is clicked. */

  keepOpenOnItemClick?: boolean
}
export interface State {
  isOpen: boolean
}
const Container = styled("div")(
  ({ theme }: WithTheme): {} => ({
    label: "contextmenu",
    cursor: "pointer",
    position: "relative",
    width: "fit-content",
  }),
)
const MenuContainer = styled("div")(
  ({
    theme,
    isExpanded,
  }: {
    theme?: OperationalStyleConstants & {
      deprecated: Theme
    }
    isExpanded: boolean
  }): {} => ({
    position: "absolute",
    top: `calc(100% + ${theme.deprecated.spacing / 2}px)`,
    left: -theme.deprecated.spacing,
    boxShadow: theme.deprecated.shadows.popup,
    width: "fit-content",
    zIndex: theme.deprecated.baseZIndex + 300,
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
        css={this.props.css}
        className={this.props.className}
      >
        {children}
        <MenuContainer
          css={this.props.menuCss}
          innerRef={node => {
            this.menuContainerNode = node
          }}
          isExpanded={this.props.open || this.state.isOpen}
        >
          {menuItems}
        </MenuContainer>
      </Container>
    )
  }
}

export default ContextMenu
