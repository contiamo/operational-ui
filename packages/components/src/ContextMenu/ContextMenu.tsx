import * as React from "react"
import styled from "react-emotion"

import { OperationalStyleConstants } from "../utils/constants"
import ContextMenuItem from "./ContextMenu.Item"

export interface Item {
  label: string
  onClick?: (item: string | Item) => void
}

export interface Props {
  /** Id */
  id?: string
  /** Class name */
  className?: string
  children: React.ReactNode | ((isActive: boolean) => React.ReactNode)
  /** Specify whether the menu items are visible. Overrides internal open state that triggers on click. */
  open?: boolean
  /** Condensed mode */
  condensed?: boolean
  /** onClick method for all menu items */
  onClick?: (item?: string | Item) => void
  /** Handles click events anywhere outside the context menu container, including menu items. */
  onOutsideClick?: () => void
  /** Suppresses the default behavior of closing the context menu when one of its items is clicked. */
  keepOpenOnItemClick?: boolean
  /** Menu items */
  items: (string | Item)[]
  /** Alignment */
  align?: "left" | "right"
  /** Custom width */
  width?: number
  /**
   * Whether to include the click element in the context menu styling.
   * Only recommended when the click element is the same width as the context menu.
   */
  embedChildrenInMenu?: boolean
}

export interface State {
  isOpen: boolean
}

const Container = styled("div")(({ align }: { align: Props["align"] }) => ({
  label: "contextmenu",
  cursor: "pointer",
  position: "relative",
  width: "fit-content",
  display: "flex",
  alignItems: "center",
  justifyContent: align === "left" ? "flex-start" : "flex-end",
}))

const MenuContainer = styled("div")(
  ({
    theme,
    isExpanded,
    embedChildrenInMenu,
  }: {
      theme?: OperationalStyleConstants
      isExpanded: boolean
      embedChildrenInMenu: boolean
    }) => ({
      position: "absolute",
      top: embedChildrenInMenu ? 0 : "100%",
      left: 0,
      boxShadow: theme.shadows.popup,
      zIndex: theme.zIndex.selectOptions,
      width: "fit-content",
      display: isExpanded ? "block" : "none",
    }),
)

const StyledContextMenuItem = styled(ContextMenuItem)(
  ({ theme, align }: { theme?: OperationalStyleConstants; align: Props["align"] }) => ({
    color: theme.color.text.default,
    textAlign: align,
  }),
)

class ContextMenu extends React.Component<Props, State> {
  state = {
    isOpen: false,
  }

  static defaultProps: Partial<Props> = {
    align: "left",
    embedChildrenInMenu: false,
  }

  componentDidUpdate() {
    if (this.state.isOpen) {
      document.addEventListener("click", this.toggle)
    } else {
      document.removeEventListener("click", this.toggle)
    }
  }

  toggle = () =>
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }))

  render() {
    if (!this.props.items) {
      throw new Error("No array of items has been provided for the ContextMenu.")
    }

    const children =
      typeof this.props.children === "function" ? this.props.children(this.state.isOpen) : this.props.children
    return (
      <Container id={this.props.id} className={this.props.className} align={this.props.align} onClick={this.toggle}>
        {children}
        <MenuContainer
          isExpanded={this.props.open || this.state.isOpen}
          embedChildrenInMenu={this.props.embedChildrenInMenu}
        >
          {this.props.embedChildrenInMenu && children}
          {this.props.items.map((item: string | Item, index: number) => {
            const clickHandler = (typeof item !== "string" && item.onClick) || this.props.onClick
            return (
              <StyledContextMenuItem
                onClick={clickHandler && (() => clickHandler(item))}
                key={`contextmenu-${index}`}
                condensed={this.props.condensed}
                align={this.props.align}
                width={this.props.width}
              >
                {typeof item === "string" ? item : item.label}
              </StyledContextMenuItem>
            )
          })}
        </MenuContainer>
      </Container>
    )
  }
}

export default ContextMenu
