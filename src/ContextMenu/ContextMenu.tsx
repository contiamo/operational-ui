import * as React from "react"
import { DefaultProps } from "../types"
import styled from "../utils/styled"

import ContextMenuItem, { IContextMenuItem } from "./ContextMenu.Item"

export interface ContextMenuProps extends DefaultProps {
  children: React.ReactNode | ((isActive: boolean) => React.ReactNode)
  /** Specify whether the menu items are visible. Overrides internal open state that triggers on click. */
  open?: boolean
  /** Condensed mode */
  condensed?: boolean
  /** onClick method for all menu items */
  onClick?: (item?: string | IContextMenuItem) => void
  /** Handles click events anywhere outside the context menu container, including menu items. */
  onOutsideClick?: () => void
  /** Suppresses the default behavior of closing the context menu when one of its items is clicked. */
  keepOpenOnItemClick?: boolean
  /** Menu items */
  items: Array<string | IContextMenuItem>
  /** Where shall we place an icon in rows? */
  iconLocation?: "left" | "right"
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

const Container = styled("div")(({ align }: { align: ContextMenuProps["align"] }) => ({
  label: "contextmenu",
  cursor: "pointer",
  position: "relative",
  width: "fit-content",
  display: "flex",
  alignItems: "center",
  justifyContent: align === "left" ? "flex-start" : "flex-end",
}))

const MenuContainer = styled("div")<{
  isExpanded: boolean
  embedChildrenInMenu?: ContextMenuProps["embedChildrenInMenu"]
}>(({ theme, isExpanded, embedChildrenInMenu }) => ({
  position: "absolute",
  top: embedChildrenInMenu ? 0 : "100%",
  left: 0,
  maxHeight: 360,
  overflow: "auto",
  boxShadow: theme.shadows.popup,
  zIndex: theme.zIndex.selectOptions,
  width: `calc(100% - ${theme.space.small}px)`,
  minWidth: "fit-content",
  display: isExpanded ? "block" : "none",
}))

class ContextMenu extends React.Component<ContextMenuProps, State> {
  public state = {
    isOpen: false,
  }

  public static defaultProps: Partial<ContextMenuProps> = {
    align: "left",
    embedChildrenInMenu: false,
  }

  public componentDidUpdate() {
    if (this.state.isOpen) {
      document.addEventListener("click", this.toggle)
    } else {
      document.removeEventListener("click", this.toggle)
    }
  }

  public toggle = () =>
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }))

  public render() {
    if (!this.props.items) {
      throw new Error("No array of items has been provided for the ContextMenu.")
    }

    const { items, condensed, iconLocation, children, open, embedChildrenInMenu, align, width, ...props } = this.props

    const renderedChildren =
      typeof children === "function"
        ? (children as ((isActive: boolean) => React.ReactNode))(this.state.isOpen)
        : children
    return (
      <Container {...props} align={align} onClick={this.toggle}>
        {renderedChildren}
        <MenuContainer isExpanded={open || this.state.isOpen} embedChildrenInMenu={this.props.embedChildrenInMenu}>
          {embedChildrenInMenu && renderedChildren}
          {items.map((item: string | IContextMenuItem, index: number) => {
            const clickHandler = (typeof item !== "string" && item.onClick) || this.props.onClick
            return (
              <ContextMenuItem
                onClick={clickHandler && (() => clickHandler(item))}
                key={`contextmenu-${index}`}
                condensed={condensed}
                align={align}
                iconLocation={iconLocation}
                width={width || "100%"}
                item={item}
              />
            )
          })}
        </MenuContainer>
      </Container>
    )
  }
}

export default ContextMenu
