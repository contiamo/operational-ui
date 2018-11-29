import { isEqual } from "lodash"
import * as React from "react"

import { DefaultProps } from "../types"
import styled from "../utils/styled"

import { keyCodes } from "../utils"
import ContextMenuItem, { IContextMenuItem } from "./ContextMenu.Item"

export interface ContextMenuProps extends DefaultProps {
  children: React.ReactNode | ((isActive: boolean) => React.ReactNode)
  /** Specify whether the menu items are visible. Overrides internal open state that triggers on click. */
  open?: boolean
  /** Condensed mode */
  condensed?: boolean
  /** onClick method for all menu items */
  onClick?: (item: IContextMenuItem) => void
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
  focusedItemIndex: number
}

const Container = styled("div")<{ align: ContextMenuProps["align"] }>(({ theme, align }) => ({
  label: "contextmenu",
  cursor: "pointer",
  position: "relative",
  width: "fit-content",
  display: "flex",
  alignItems: "center",
  justifyContent: align === "left" ? "flex-start" : "flex-end",
  zIndex: theme.zIndex.selectOptions,
}))

const MenuContainer = styled("div")<{
  embedChildrenInMenu?: ContextMenuProps["embedChildrenInMenu"]
}>(({ theme, embedChildrenInMenu }) => ({
  position: "absolute",
  top: embedChildrenInMenu ? 0 : "100%",
  left: 0,
  maxHeight: 360,
  overflow: "auto",
  boxShadow: theme.shadows.popup,
  zIndex: theme.zIndex.selectOptions,
  width: `calc(100% - ${theme.space.small}px)`,
  minWidth: "fit-content",
}))

/**
 * Overlay to prevent mouse events when the context menu is open
 */
const InvisibleOverlay = styled("div")(({ theme }) => ({
  position: "fixed",
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  cursor: "default",
  zIndex: theme.zIndex.selectOptions - 1,
}))

class ContextMenu extends React.Component<ContextMenuProps, Readonly<State>> {
  private menu: HTMLDivElement | null = null

  private toggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }))
  }

  private focusElement = () => {
    if (this.menu && this.menu.querySelector('[tabindex="0"]')) {
      setTimeout(() => (this.menu!.querySelector('[tabindex="0"]') as HTMLDivElement).focus())
    }
  }

  private onUpPress = () => ({
    focusedItemIndex: this.state.focusedItemIndex === 0 ? this.props.items.length - 1 : this.state.focusedItemIndex - 1,
  })

  private onDownPress = () => ({
    focusedItemIndex: this.state.focusedItemIndex === this.props.items.length - 1 ? 0 : this.state.focusedItemIndex + 1,
  })

  private handleKeyPress = ({ keyCode }: React.KeyboardEvent<HTMLDivElement>) => {
    if (keyCode === keyCodes.enter && this.props.onClick) {
      this.props.onClick(this.makeItem(this.props.items[this.state.focusedItemIndex]))
      this.setState(() => ({ isOpen: false }))
      return
    }

    if (keyCode === keyCodes.esc) {
      this.setState(() => ({ isOpen: false }))
      return
    }

    if ([keyCodes.up, keyCodes.down].includes(keyCode)) {
      this.setState(keyCode === keyCodes.up ? this.onUpPress : this.onDownPress)
      this.focusElement()
    }
  }

  /**
   * Preserve the public API: if users submit strings in props.items,
   * convert them into actual ContextMenuItems.
   */
  private makeItem = (itemFromProps: ContextMenuProps["items"][-1]) =>
    typeof itemFromProps === "string" ? { label: itemFromProps } : itemFromProps

  public readonly state: State = {
    isOpen: false,
    focusedItemIndex: 0,
  }

  public static defaultProps: Partial<ContextMenuProps> = {
    align: "left",
    embedChildrenInMenu: false,
  }

  public componentDidUpdate(prevProps: ContextMenuProps) {
    // Reset focused item to first if items change.
    if (!isEqual(this.props.items, prevProps.items)) {
      this.setState(() => ({ focusedItemIndex: this.props.items.length - 1 }))
    }
  }

  public render() {
    if (!this.props.items) {
      throw new Error("No array of items has been provided for the ContextMenu.")
    }

    const { condensed, iconLocation, children, open, embedChildrenInMenu, align, width, ...props } = this.props
    const isOpen = open || this.state.isOpen
    const renderedChildren = typeof children === "function" ? children(this.state.isOpen) : children
    return (
      <>
        {isOpen && <InvisibleOverlay onClick={this.toggle} />}
        <Container {...props} align={align} onClick={this.toggle} onKeyUp={this.handleKeyPress}>
          {renderedChildren}
          {isOpen && (
            <MenuContainer innerRef={node => (this.menu = node)} embedChildrenInMenu={this.props.embedChildrenInMenu}>
              {embedChildrenInMenu && renderedChildren}
              {props.items.map((itemFromProps, index: number) => {
                const item = this.makeItem(itemFromProps)
                const clickHandler = item.onClick ? item.onClick : this.props.onClick

                return (
                  <ContextMenuItem
                    tabIndex={this.state.focusedItemIndex === index ? 0 : -1} // ref "tabindex roving": https://developers.google.com/web/fundamentals/accessibility/focus/using-tabindex
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
          )}
        </Container>
      </>
    )
  }
}

export default ContextMenu
